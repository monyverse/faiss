output "endpoint" {
  description = "Writer endpoint."
  value       = aws_rds_cluster.this.endpoint
}

output "reader_endpoint" {
  description = "Reader endpoint."
  value       = aws_rds_cluster.this.reader_endpoint
}

output "port" {
  description = "PostgreSQL port."
  value       = aws_rds_cluster.this.port
}

output "database_name" {
  description = "Initial database name."
  value       = aws_rds_cluster.this.database_name
}

output "master_user_secret_arn" {
  description = "Secrets Manager secret (managed by RDS) holding the master username and password."
  value       = aws_rds_cluster.this.master_user_secret[0].secret_arn
}

output "kms_key_arn" {
  description = "KMS key encrypting the cluster storage and the master secret."
  value       = aws_kms_key.this.arn
}

output "security_group_id" {
  description = "Security group attached to the cluster."
  value       = aws_security_group.this.id
}
