output "vpc_id" {
  description = "VPC ID."
  value       = module.vpc.vpc_id
}

output "vpc_cidr" {
  description = "VPC CIDR block."
  value       = module.vpc.vpc_cidr_block
}

output "private_subnet_ids" {
  description = "Private subnet IDs (nodes, pods, internal load balancers)."
  value       = module.vpc.private_subnets
}

output "database_subnet_ids" {
  description = "Database subnet IDs (no route to the internet)."
  value       = module.vpc.database_subnets
}

output "database_subnet_cidrs" {
  description = "Database subnet CIDR blocks."
  value       = module.vpc.database_subnets_cidr_blocks
}

output "nat_public_ips" {
  description = "Public IPs of the NAT gateways (the addresses external allow-lists will see)."
  value       = module.vpc.nat_public_ips
}

output "logs_kms_key_arn" {
  description = "KMS key for CloudWatch Logs encryption."
  value       = aws_kms_key.logs.arn
}
