variable "name" {
  description = "Name prefix for the KMS key and the CI role."
  type        = string
}

variable "repository_names" {
  description = "ECR repositories to create."
  type        = set(string)
  default     = ["faiss/backend", "faiss/web"]
}

variable "untagged_image_expiry_days" {
  description = "Days after which untagged images are expired."
  type        = number
  default     = 14
}

variable "max_tagged_images" {
  description = "Number of tagged images to keep per repository. Keep this well above the number of releases you may need to roll back across."
  type        = number
  default     = 200
}

variable "pull_account_ids" {
  description = "Other AWS account IDs allowed to pull images."
  type        = list(string)
  default     = []
}

variable "github_repository" {
  description = "GitHub repository (owner/name) whose workflows may push images. null skips the CI role."
  type        = string
  default     = null
}

variable "github_refs" {
  description = "Git refs allowed to assume the CI role."
  type        = list(string)
  default     = ["refs/heads/main"]
}

variable "github_oidc_provider_arn" {
  description = "ARN of the account's existing IAM OIDC provider for token.actions.githubusercontent.com. Required when github_repository is set."
  type        = string
  default     = null
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
