output "repository_urls" {
  description = "Repository URLs keyed by repository name."
  value       = { for name, repo in aws_ecr_repository.this : name => repo.repository_url }
}

output "registry" {
  description = "Registry host (the Helm chart's image.registry)."
  value       = length(aws_ecr_repository.this) > 0 ? split("/", values(aws_ecr_repository.this)[0].repository_url)[0] : null
}

output "ci_role_arn" {
  description = "Role for GitHub Actions to assume (the AWS_ECR_PUSH_ROLE_ARN repository variable)."
  value       = one(aws_iam_role.ci[*].arn)
}
