data "aws_caller_identity" "current" {}
data "aws_partition" "current" {}
data "aws_region" "current" {}

locals {
  account_root_arn = "arn:${data.aws_partition.current.partition}:iam::${data.aws_caller_identity.current.account_id}:root"
}

################################################################################
# KMS: envelope encryption of Kubernetes Secrets
################################################################################

resource "aws_kms_key" "secrets" {
  description             = "${var.cluster_name} EKS secrets envelope encryption"
  enable_key_rotation     = true
  deletion_window_in_days = var.kms_deletion_window_in_days
  tags                    = var.tags
}

resource "aws_kms_alias" "secrets" {
  name          = "alias/${var.cluster_name}-eks-secrets"
  target_key_id = aws_kms_key.secrets.key_id
}

################################################################################
# KMS: node root volumes
#
# Same shape as the AWS-managed aws/ebs key policy: any principal in this account
# may use the key, but only through EC2/EBS. That covers the Auto Scaling
# service-linked role that launches the managed node group instances.
################################################################################

data "aws_iam_policy_document" "ebs_key" {
  statement {
    sid       = "AccountAdministration"
    actions   = ["kms:*"]
    resources = ["*"]

    principals {
      type        = "AWS"
      identifiers = [local.account_root_arn]
    }
  }

  statement {
    sid = "UseThroughEBSInThisAccount"
    actions = [
      "kms:Encrypt",
      "kms:Decrypt",
      "kms:ReEncrypt*",
      "kms:GenerateDataKey*",
      "kms:CreateGrant",
      "kms:DescribeKey",
    ]
    resources = ["*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    condition {
      test     = "StringEquals"
      variable = "kms:CallerAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "StringEquals"
      variable = "kms:ViaService"
      values   = ["ec2.${data.aws_region.current.region}.amazonaws.com"]
    }
  }
}

resource "aws_kms_key" "ebs" {
  description             = "${var.cluster_name} EKS node volumes"
  enable_key_rotation     = true
  deletion_window_in_days = var.kms_deletion_window_in_days
  policy                  = data.aws_iam_policy_document.ebs_key.json
  tags                    = var.tags
}

resource "aws_kms_alias" "ebs" {
  name          = "alias/${var.cluster_name}-eks-ebs"
  target_key_id = aws_kms_key.ebs.key_id
}

################################################################################
# Cluster
################################################################################

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "21.30.2"

  name               = var.cluster_name
  kubernetes_version = var.kubernetes_version

  # Private API endpoint by default. Terraform (helm provider) and operators must
  # then run from a network that can reach the VPC.
  endpoint_private_access = true
  endpoint_public_access  = var.endpoint_public_access
  # While the public endpoint is disabled this list is inert; the EKS API default
  # is sent so the plan stays clean. When it is enabled, the validation on
  # var.endpoint_public_access_cidrs requires explicit, non-global CIDRs.
  endpoint_public_access_cidrs = var.endpoint_public_access ? var.endpoint_public_access_cidrs : ["0.0.0.0/0"]

  vpc_id     = var.vpc_id
  subnet_ids = var.subnet_ids

  # Access entries only; no aws-auth ConfigMap.
  authentication_mode                      = "API"
  enable_cluster_creator_admin_permissions = var.enable_cluster_creator_admin_permissions
  access_entries                           = var.access_entries

  # Workloads use EKS Pod Identity, so no IAM OIDC provider is created.
  enable_irsa = false

  create_kms_key = false
  encryption_config = {
    provider_key_arn = aws_kms_key.secrets.arn
    resources        = ["secrets"]
  }

  enabled_log_types                      = ["api", "audit", "authenticator", "controllerManager", "scheduler"]
  cloudwatch_log_group_retention_in_days = var.log_retention_days
  cloudwatch_log_group_kms_key_id        = var.logs_kms_key_arn

  deletion_protection = var.deletion_protection

  security_group_additional_rules = length(var.endpoint_private_access_cidrs) == 0 ? {} : {
    ingress_private_api = {
      description = "Kubernetes API from operator / CI networks"
      type        = "ingress"
      protocol    = "tcp"
      from_port   = 443
      to_port     = 443
      cidr_blocks = var.endpoint_private_access_cidrs
    }
  }

  addons = {
    coredns    = {}
    kube-proxy = {}
    vpc-cni = {
      before_compute = true
      # Without this the NetworkPolicy objects in the Helm chart are not enforced.
      configuration_values = jsonencode({ enableNetworkPolicy = "true" })
    }
    eks-pod-identity-agent = {
      before_compute = true
    }
    # Required by the HorizontalPodAutoscalers in the Helm chart.
    metrics-server = {}
  }

  eks_managed_node_groups = {
    default = {
      ami_type       = var.node_ami_type
      instance_types = var.node_instance_types
      capacity_type  = "ON_DEMAND"

      min_size     = var.node_min_size
      max_size     = var.node_max_size
      desired_size = var.node_desired_size

      block_device_mappings = {
        root = {
          device_name = "/dev/xvda"
          ebs = {
            volume_size           = var.node_disk_size_gb
            volume_type           = "gp3"
            encrypted             = true
            kms_key_id            = aws_kms_key.ebs.arn
            delete_on_termination = true
          }
        }
      }

      # IMDSv2 only, hop limit 1: pods cannot reach the node's instance profile.
      metadata_options = {
        http_endpoint               = "enabled"
        http_tokens                 = "required"
        http_put_response_hop_limit = 1
      }

      update_config = {
        max_unavailable_percentage = 33
      }
    }
  }

  tags = var.tags
}
