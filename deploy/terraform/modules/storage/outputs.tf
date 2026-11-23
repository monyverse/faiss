output "documents_bucket_name" {
  description = "Documents bucket name (FAISS_DOCUMENTS_BUCKET)."
  value       = aws_s3_bucket.this["documents"].id
}

output "documents_bucket_arn" {
  description = "Documents bucket ARN."
  value       = aws_s3_bucket.this["documents"].arn
}

output "audit_bucket_name" {
  description = "Audit archive bucket name."
  value       = aws_s3_bucket.this["audit"].id
}

output "audit_bucket_arn" {
  description = "Audit archive bucket ARN."
  value       = aws_s3_bucket.this["audit"].arn
}

output "kms_key_arn" {
  description = "KMS key encrypting both buckets."
  value       = aws_kms_key.this.arn
}
