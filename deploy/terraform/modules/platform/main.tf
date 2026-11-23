################################################################################
# Cluster platform: AWS Load Balancer Controller, External Secrets Operator,
# Argo CD, and the bootstrap chart (ClusterSecretStore + Argo CD root Application).
# Everything after this point is delivered by Argo CD from git.
################################################################################

data "aws_region" "current" {}

locals {
  lbc_namespace       = "kube-system"
  lbc_service_account = "aws-load-balancer-controller"
  eso_namespace       = "external-secrets"
  eso_service_account = "external-secrets"
  argocd_namespace    = "argocd"

  pod_identity_conditions = [
    {
      test     = "StringEquals"
      variable = "aws:RequestTag/eks-cluster-arn"
      values   = [var.cluster_arn]
    },
  ]
}

################################################################################
# IAM (EKS Pod Identity)
################################################################################

module "lbc_pod_identity" {
  source  = "terraform-aws-modules/eks-pod-identity/aws"
  version = "2.11.0"

  name                    = "${var.cluster_name}-aws-lbc"
  use_name_prefix         = false
  trust_policy_conditions = local.pod_identity_conditions

  attach_aws_lb_controller_policy = true

  associations = {
    this = {
      cluster_name    = var.cluster_name
      namespace       = local.lbc_namespace
      service_account = local.lbc_service_account
    }
  }

  tags = var.tags
}

# External Secrets reads only the secrets listed in var.secret_arns (the FAISS
# containers plus the RDS-managed master secrets) and can decrypt only with the
# keys that protect them. It has no write permission.
module "eso_pod_identity" {
  source  = "terraform-aws-modules/eks-pod-identity/aws"
  version = "2.11.0"

  name                    = "${var.cluster_name}-external-secrets"
  use_name_prefix         = false
  trust_policy_conditions = local.pod_identity_conditions

  attach_external_secrets_policy        = true
  external_secrets_secrets_manager_arns = var.secret_arns
  external_secrets_kms_key_arns         = var.secret_kms_key_arns
  external_secrets_create_permission    = false

  associations = {
    this = {
      cluster_name    = var.cluster_name
      namespace       = local.eso_namespace
      service_account = local.eso_service_account
    }
  }

  tags = var.tags
}

################################################################################
# Helm releases
################################################################################

resource "helm_release" "aws_load_balancer_controller" {
  name       = "aws-load-balancer-controller"
  namespace  = local.lbc_namespace
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  version    = var.chart_versions.aws_load_balancer_controller

  values = [
    yamlencode({
      clusterName = var.cluster_name
      region      = data.aws_region.current.region
      vpcId       = var.vpc_id
      serviceAccount = {
        create = true
        name   = local.lbc_service_account
      }
      # Internal ALBs only; Shield Advanced and WAF Classic are not used.
      enableShield = false
      enableWaf    = false
    }),
  ]

  depends_on = [module.lbc_pod_identity]
}

resource "helm_release" "external_secrets" {
  name             = "external-secrets"
  namespace        = local.eso_namespace
  create_namespace = true
  repository       = "https://charts.external-secrets.io"
  chart            = "external-secrets"
  version          = var.chart_versions.external_secrets

  values = [
    yamlencode({
      installCRDs = true
      serviceAccount = {
        create = true
        name   = local.eso_service_account
      }
    }),
  ]

  # The ALB controller's Service webhook must be up before other charts create
  # Services, hence the ordering behind it.
  depends_on = [
    module.eso_pod_identity,
    helm_release.aws_load_balancer_controller,
  ]
}

resource "helm_release" "argocd" {
  name             = "argocd"
  namespace        = local.argocd_namespace
  create_namespace = true
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  version          = var.chart_versions.argo_cd

  values = concat(
    [
      yamlencode({
        global = {
          domain = var.argocd_hostname
        }
        configs = {
          cm = {
            "exec.enabled" = false
          }
        }
        # SSO is wired separately against the bank's identity provider; the
        # bundled Dex and the notifications controller are not deployed.
        dex           = { enabled = false }
        notifications = { enabled = false }
        "redis-ha"    = { enabled = var.argocd_ha }
        server        = { replicas = var.argocd_ha ? 2 : 1 }
        repoServer    = { replicas = var.argocd_ha ? 2 : 1 }
      }),
    ],
    var.argocd_extra_values,
  )

  depends_on = [helm_release.aws_load_balancer_controller]
}

# Local chart shared with manual bootstrap: deploy/argocd/bootstrap.
resource "helm_release" "bootstrap" {
  name      = "faiss-bootstrap"
  namespace = local.argocd_namespace
  chart     = "${path.module}/../../../argocd/bootstrap"

  values = [
    yamlencode({
      repoURL        = var.gitops_repo_url
      targetRevision = var.gitops_target_revision
      appsPath       = var.gitops_apps_path
      clusterSecretStore = {
        name       = var.cluster_secret_store_name
        region     = data.aws_region.current.region
        namespaces = concat([local.argocd_namespace], var.workload_namespaces)
      }
      repoCredentials = {
        enabled   = var.gitops_repo_credentials_secret != null
        remoteKey = var.gitops_repo_credentials_secret
      }
    }),
  ]

  depends_on = [
    helm_release.argocd,
    helm_release.external_secrets,
  ]
}
