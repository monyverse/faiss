output "cluster_name" {
  description = "EKS cluster name."
  value       = module.eks.cluster_name
}

output "cluster_arn" {
  description = "EKS cluster ARN."
  value       = module.eks.cluster_arn
}

output "cluster_endpoint" {
  description = "Kubernetes API endpoint."
  value       = module.eks.cluster_endpoint
}

output "cluster_certificate_authority_data" {
  description = "Base64-encoded cluster CA certificate."
  value       = module.eks.cluster_certificate_authority_data
}

output "node_security_group_id" {
  description = "Security group shared by the nodes (and therefore the pods)."
  value       = module.eks.node_security_group_id
}

output "secrets_kms_key_arn" {
  description = "KMS key used for Kubernetes Secrets envelope encryption."
  value       = aws_kms_key.secrets.arn
}
