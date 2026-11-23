output "secret_arns" {
  description = "Secret ARNs keyed by secret name."
  value       = { for name, secret in aws_secretsmanager_secret.this : name => secret.arn }
}

output "kms_key_arn" {
  description = "KMS key encrypting the secrets."
  value       = aws_kms_key.this.arn
}
