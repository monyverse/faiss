################################################################################
# FAISS production stack
#
# One VPC + EKS cluster that hosts the application environments listed in
# var.app_environments (prod only by default), each in its own namespace with
# its own database, buckets, secrets and IAM roles. Same composition as
# envs/dev; the differences are the defaults in variables.tf.
################################################################################

data "aws_caller_identity" "current" {}

locals {
  cluster_name = "${var.project}-${var.stack}"
  account_id   = data.aws_caller_identity.current.account_id

  namespaces = { for env, _ in var.app_environments : env => "${var.project}-${env}" }

  # Secret containers only; values are set out of band.
  app_secrets = merge([
    for env, _ in var.app_environments : merge(
      {
        "${var.project}/${env}/litellm" = {
          description = "LiteLLM gateway API key for FAISS ${env}. JSON: {\"api_key\": \"...\"}"
        }
        "${var.project}/${env}/database" = {
          description = "FAISS ${env} application database role. JSON: {\"username\": \"...\", \"password\": \"...\"}"
        }
      },
      var.opensearch_auth == "basic" ? {
        "${var.project}/${env}/opensearch" = {
          description = "OpenSearch basic-auth credentials for FAISS ${env}. JSON: {\"username\": \"...\", \"password\": \"...\"}"
        }
      } : {},
    )
  ]...)

  repo_credentials_secret = var.gitops_repo_private ? "${var.project}/${var.stack}/argocd-repo" : null

  platform_secrets = var.gitops_repo_private ? {
    (local.repo_credentials_secret) = {
      description = "Argo CD credentials for the GitOps repository. JSON keys as Argo CD repository secrets expect."
    }
  } : {}
}

module "network" {
  source = "../../modules/network"

  name                    = local.cluster_name
  vpc_cidr                = var.vpc_cidr
  single_nat_gateway      = var.single_nat_gateway
  flow_log_retention_days = var.log_retention_days
}

module "eks" {
  source = "../../modules/eks"

  cluster_name       = local.cluster_name
  kubernetes_version = var.kubernetes_version
  vpc_id             = module.network.vpc_id
  subnet_ids         = module.network.private_subnet_ids

  endpoint_public_access        = var.cluster_endpoint_public_access
  endpoint_public_access_cidrs  = var.cluster_endpoint_public_access_cidrs
  endpoint_private_access_cidrs = var.cluster_endpoint_private_access_cidrs
  access_entries                = var.cluster_access_entries
  deletion_protection           = var.deletion_protection

  node_instance_types = var.node_instance_types
  node_min_size       = var.node_min_size
  node_max_size       = var.node_max_size
  node_desired_size   = var.node_desired_size

  log_retention_days = var.log_retention_days
  logs_kms_key_arn   = module.network.logs_kms_key_arn
}

module "ecr" {
  source = "../../modules/ecr"
  count  = var.create_ecr_repositories ? 1 : 0

  name                     = var.project
  pull_account_ids         = var.ecr_pull_account_ids
  github_repository        = var.github_repository
  github_oidc_provider_arn = var.github_oidc_provider_arn
}

module "secrets" {
  source = "../../modules/secrets"

  name                    = local.cluster_name
  secrets                 = merge(local.app_secrets, local.platform_secrets)
  recovery_window_in_days = var.secret_recovery_window_in_days
}

module "database" {
  source   = "../../modules/database"
  for_each = var.app_environments

  name       = "${var.project}-${each.key}"
  vpc_id     = module.network.vpc_id
  subnet_ids = module.network.database_subnet_ids

  # Pods share the node security group (no security groups for pods).
  allowed_security_group_ids = { nodes = module.eks.node_security_group_id }

  engine_version         = var.db_engine_version
  parameter_group_family = var.db_parameter_group_family
  min_capacity           = each.value.db_min_capacity
  max_capacity           = each.value.db_max_capacity
  instance_count         = each.value.db_instance_count

  backup_retention_days = var.db_backup_retention_days
  deletion_protection   = var.deletion_protection
  skip_final_snapshot   = var.db_skip_final_snapshot
}

module "storage" {
  source   = "../../modules/storage"
  for_each = var.app_environments

  name                  = "${var.project}-${each.key}"
  documents_bucket_name = "${var.project}-${each.key}-documents-${local.account_id}"
  audit_bucket_name     = "${var.project}-${each.key}-audit-archive-${local.account_id}"

  documents_object_lock_enabled = var.documents_object_lock_enabled
  audit_object_lock_mode        = var.audit_object_lock_mode
  audit_retention_days          = var.audit_retention_days
}

module "workload_identity" {
  source   = "../../modules/workload-identity"
  for_each = var.app_environments

  name         = "${var.project}-${each.key}"
  cluster_name = module.eks.cluster_name
  cluster_arn  = module.eks.cluster_arn
  namespace    = local.namespaces[each.key]

  documents_bucket_arn  = module.storage[each.key].documents_bucket_arn
  documents_key_prefix  = var.documents_key_prefix
  allow_document_delete = var.allow_document_delete
  audit_bucket_arn      = module.storage[each.key].audit_bucket_arn
  storage_kms_key_arn   = module.storage[each.key].kms_key_arn

  # Existing OpenSearch RAG engine, owned by another team. Not created here.
  opensearch_arn     = var.opensearch_arn
  opensearch_service = var.opensearch_service
}

module "platform" {
  source = "../../modules/platform"

  cluster_name = module.eks.cluster_name
  cluster_arn  = module.eks.cluster_arn
  vpc_id       = module.network.vpc_id

  chart_versions      = var.chart_versions
  argocd_hostname     = var.argocd_hostname
  argocd_ha           = var.argocd_ha
  argocd_extra_values = var.argocd_extra_values

  gitops_repo_url                = var.gitops_repo_url
  gitops_target_revision         = var.gitops_target_revision
  gitops_apps_path               = var.gitops_apps_path
  gitops_repo_credentials_secret = local.repo_credentials_secret

  workload_namespaces = values(local.namespaces)

  secret_arns = concat(
    values(module.secrets.secret_arns),
    [for env, db in module.database : db.master_user_secret_arn],
  )
  secret_kms_key_arns = concat(
    [module.secrets.kms_key_arn],
    [for env, db in module.database : db.kms_key_arn],
  )
}
