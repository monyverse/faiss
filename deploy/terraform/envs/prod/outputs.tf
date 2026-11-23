output "cluster_name" {
  description = "EKS cluster name."
  value       = module.eks.cluster_name
}

output "nat_public_ips" {
  description = "Egress addresses of this VPC, for allow-lists on the LiteLLM gateway and other external dependencies."
  value       = module.network.nat_public_ips
}

output "ecr_registry" {
  description = "ECR registry host (Helm image.registry and the ECR_REGISTRY repository variable)."
  value       = one(module.ecr[*].registry)
}

output "ci_ecr_push_role_arn" {
  description = "Role for GitHub Actions to assume when pushing images."
  value       = one(module.ecr[*].ci_role_arn)
}

output "workload_role_arns" {
  description = "Workload IAM roles per environment. The OpenSearch owners need these for their access policy / role mapping."
  value       = { for env, wi in module.workload_identity : env => wi.role_arns }
}

output "secret_names" {
  description = "Secrets Manager containers whose values must be set out of band."
  value       = keys(module.secrets.secret_arns)
}

# Values to copy into deploy/helm/faiss/values-<env>.yaml.
output "helm_values" {
  description = "Per-environment values for the FAISS Helm chart."
  value = {
    for env, _ in var.app_environments : env => {
      "image.registry"                            = one(module.ecr[*].registry)
      "aws.region"                                = var.region
      "database.host"                             = module.database[env].endpoint
      "database.name"                             = module.database[env].database_name
      "externalSecrets.database.remoteKey"        = "${var.project}/${env}/database"
      "externalSecrets.migrateDatabase.remoteKey" = module.database[env].master_user_secret_arn
      "externalSecrets.litellm.remoteKey"         = "${var.project}/${env}/litellm"
      "externalSecrets.secretStore.name"          = module.platform.cluster_secret_store_name
      "config.documentsBucket"                    = module.storage[env].documents_bucket_name
      "config.opensearch.url"                     = var.opensearch_endpoint
      "config.opensearch.service"                 = var.opensearch_service
      "config.opensearch.auth"                    = var.opensearch_auth
      "networkPolicy.vpcCidr"                     = module.network.vpc_cidr
      "networkPolicy.egress.database.cidrs"       = module.network.database_subnet_cidrs
    }
  }
}

output "audit_archive_buckets" {
  description = "Audit archive bucket per environment. The backend contract has no setting for it yet; only the worker role may write to it."
  value       = { for env, s in module.storage : env => s.audit_bucket_name }
}
