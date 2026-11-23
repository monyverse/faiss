variable "cluster_name" {
  description = "EKS cluster name."
  type        = string
}

variable "kubernetes_version" {
  description = "Kubernetes minor version for the control plane and node group."
  type        = string
}

variable "vpc_id" {
  description = "VPC to place the cluster in."
  type        = string
}

variable "subnet_ids" {
  description = "Private subnets for the control-plane ENIs and the node group."
  type        = list(string)
}

variable "endpoint_public_access" {
  description = "Expose the Kubernetes API on a public endpoint. Leave false outside of a throwaway bootstrap."
  type        = bool
  default     = false
}

variable "endpoint_public_access_cidrs" {
  description = "CIDRs allowed to reach the public API endpoint when it is enabled."
  type        = list(string)
  default     = []

  validation {
    condition     = !var.endpoint_public_access || (length(var.endpoint_public_access_cidrs) > 0 && !contains(var.endpoint_public_access_cidrs, "0.0.0.0/0"))
    error_message = "With endpoint_public_access enabled, endpoint_public_access_cidrs must list specific CIDRs (not 0.0.0.0/0)."
  }
}

variable "endpoint_private_access_cidrs" {
  description = "Non-VPC CIDRs (VPN, CI runners, peered networks) allowed to reach the private API endpoint."
  type        = list(string)
  default     = []
}

variable "enable_cluster_creator_admin_permissions" {
  description = "Grant the identity that runs Terraform cluster-admin through an access entry."
  type        = bool
  default     = true
}

variable "access_entries" {
  description = "Additional EKS access entries (see the terraform-aws-modules/eks `access_entries` input)."
  type        = any
  default     = {}
}

variable "deletion_protection" {
  description = "Enable EKS cluster deletion protection."
  type        = bool
  default     = false
}

variable "node_ami_type" {
  description = "Managed node group AMI type. Must match the image architecture built by CI (linux/amd64)."
  type        = string
  default     = "AL2023_x86_64_STANDARD"
}

variable "node_instance_types" {
  description = "Instance types for the managed node group."
  type        = list(string)
}

variable "node_min_size" {
  description = "Minimum number of nodes."
  type        = number
}

variable "node_max_size" {
  description = "Maximum number of nodes."
  type        = number
}

variable "node_desired_size" {
  description = "Initial desired number of nodes."
  type        = number
}

variable "node_disk_size_gb" {
  description = "Root volume size of each node."
  type        = number
  default     = 80
}

variable "log_retention_days" {
  description = "Retention of the control-plane log group."
  type        = number
  default     = 365
}

variable "logs_kms_key_arn" {
  description = "KMS key that encrypts the control-plane log group."
  type        = string
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
