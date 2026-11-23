variable "name" {
  description = "Name prefix for the KMS key and alias."
  type        = string
}

variable "documents_bucket_name" {
  description = "Globally unique name of the deal documents / evidence bucket."
  type        = string
}

variable "audit_bucket_name" {
  description = "Globally unique name of the audit archive bucket."
  type        = string
}

variable "documents_object_lock_enabled" {
  description = "Create the documents bucket with Object Lock so legal holds can be placed on individual objects. Cannot be changed after creation."
  type        = bool
  default     = false
}

variable "audit_object_lock_mode" {
  description = "Default Object Lock mode of the audit archive: GOVERNANCE or COMPLIANCE."
  type        = string
  default     = "GOVERNANCE"

  validation {
    condition     = contains(["GOVERNANCE", "COMPLIANCE"], var.audit_object_lock_mode)
    error_message = "audit_object_lock_mode must be GOVERNANCE or COMPLIANCE."
  }
}

variable "audit_retention_days" {
  description = "Default Object Lock retention of the audit archive, in days."
  type        = number
  default     = 30

  validation {
    condition     = var.audit_retention_days >= 1
    error_message = "audit_retention_days must be at least 1."
  }
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
