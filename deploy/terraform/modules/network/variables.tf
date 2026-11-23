variable "name" {
  description = "Name prefix for the VPC and its resources."
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR. Must be a /16; the subnet layout in main.tf assumes it."
  type        = string

  validation {
    condition     = can(cidrhost(var.vpc_cidr, 0)) && endswith(var.vpc_cidr, "/16")
    error_message = "vpc_cidr must be a valid /16 CIDR block."
  }
}

variable "az_count" {
  description = "Number of availability zones to spread subnets across."
  type        = number
  default     = 3
}

variable "enable_nat_gateway" {
  description = "Create NAT gateways for outbound traffic from the private subnets. Disable if egress goes through a transit gateway / inspection VPC instead."
  type        = bool
  default     = true
}

variable "single_nat_gateway" {
  description = "Use one shared NAT gateway instead of one per AZ. Cheaper, not zone-resilient."
  type        = bool
  default     = false
}

variable "interface_endpoint_services" {
  description = "AWS services to reach through interface VPC endpoints (short service names)."
  type        = list(string)
  default     = ["ecr.api", "ecr.dkr", "sts", "secretsmanager", "logs"]
}

variable "enable_s3_interface_endpoint" {
  description = "Add an S3 interface endpoint with private DNS next to the gateway endpoint, so pod-to-S3 traffic stays on VPC addresses (required for CIDR-based NetworkPolicy egress to S3)."
  type        = bool
  default     = true
}

variable "flow_log_retention_days" {
  description = "Retention of the VPC flow log group in CloudWatch Logs."
  type        = number
  default     = 365
}

variable "kms_deletion_window_in_days" {
  description = "Waiting period before a scheduled KMS key deletion takes effect."
  type        = number
  default     = 30
}

variable "tags" {
  description = "Tags applied to every resource."
  type        = map(string)
  default     = {}
}
