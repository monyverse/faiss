output "argocd_namespace" {
  description = "Namespace Argo CD runs in."
  value       = local.argocd_namespace
}

output "external_secrets_role_arn" {
  description = "IAM role used by External Secrets Operator."
  value       = module.eso_pod_identity.iam_role_arn
}

output "cluster_secret_store_name" {
  description = "ClusterSecretStore name (the chart's externalSecrets.secretStore.name)."
  value       = var.cluster_secret_store_name
}
