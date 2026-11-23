variable "name" {
  description = "Name prefix for the KMS key and alias."
  type        = string
}

variable "secrets" {
  description = "Secret containers to create, keyed by secret name."
  type = map(object({
    description = string
  }))
}

variable "recovery_window_in_days" {
  description = "Days a deleted secret stays recoverable (7-30)."
  type        = number
  default     = 30
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
