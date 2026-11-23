output "role_arns" {
  description = "Workload role ARNs keyed by workload (api, worker, ingest). Share these with the OpenSearch owners for their access policy / role mapping."
  value       = { for name, role in aws_iam_role.this : name => role.arn }
}
