variable "name" {
  description = "Role name prefix, for example faiss-dev."
  type        = string
}

variable "cluster_name" {
  description = "EKS cluster the workloads run on."
  type        = string
}

variable "cluster_arn" {
  description = "ARN of that cluster (pinned in the role trust policies)."
  type        = string
}

variable "namespace" {
  description = "Kubernetes namespace of the workloads."
  type        = string
}

variable "service_accounts" {
  description = "ServiceAccount names created by the Helm chart."
  type = object({
    api    = optional(string, "faiss-api")
    worker = optional(string, "faiss-worker")
    ingest = optional(string, "faiss-ingest")
  })
  default = {}
}

variable "documents_bucket_arn" {
  description = "ARN of the deal documents / evidence bucket."
  type        = string
}

variable "documents_key_prefix" {
  description = "Object key prefix the workloads are confined to. Empty means the whole bucket."
  type        = string
  default     = ""
}

variable "allow_document_delete" {
  description = "Allow the api and worker roles to delete document objects (creates a delete marker; versions are retained)."
  type        = bool
  default     = false
}

variable "audit_bucket_arn" {
  description = "ARN of the audit archive bucket."
  type        = string
}

variable "storage_kms_key_arn" {
  description = "KMS key encrypting the documents and audit buckets."
  type        = string
}

variable "opensearch_arn" {
  description = "ARN of the EXISTING OpenSearch domain or Serverless collection owned by the search team. Nothing is created."
  type        = string
}

variable "opensearch_service" {
  description = "es for a managed OpenSearch domain, aoss for an OpenSearch Serverless collection."
  type        = string

  validation {
    condition     = contains(["es", "aoss"], var.opensearch_service)
    error_message = "opensearch_service must be es or aoss."
  }
}

variable "tags" {
  description = "Tags applied to every resource."
  type        = map(string)
  default     = {}
}
