################################################################################
# General
################################################################################

variable "region" {
  # Data residency: the bank's data must stay in South Africa, so the default is
  # af-south-1 (Cape Town). Changing the region moves every data store in this
  # stack; treat it as a residency decision, not a tuning knob.
  description = "AWS region for every resource in this stack."
  type        = string
  default     = "af-south-1"
}

variable "allowed_account_ids" {
  description = "AWS account IDs this stack may be applied to. Guards against applying with the wrong credentials."
  type        = list(string)
}

variable "project" {
  description = "Project name, used as a prefix for resource names."
  type        = string
  default     = "faiss"
}

variable "stack" {
  description = "Name of this infrastructure stack (one VPC + cluster)."
  type        = string
  default     = "prod"
}

variable "app_environments" {
  description = "Application environments hosted on this stack. Each key becomes namespace <project>-<key> with its own database, buckets, secrets and IAM roles."
  type = map(object({
    db_min_capacity   = optional(number, 0.5)
    db_max_capacity   = optional(number, 2)
    db_instance_count = optional(number, 1)
  }))
  default = {
    prod = {
      db_min_capacity   = 1
      db_max_capacity   = 8
      db_instance_count = 2
    }
  }
}

variable "tags" {
  description = "Extra tags applied to every resource."
  type        = map(string)
  default     = {}
}

variable "deletion_protection" {
  description = "Deletion protection for the EKS cluster and the Aurora clusters."
  type        = bool
  default     = true
}

variable "log_retention_days" {
  description = "CloudWatch retention for VPC flow logs and EKS control-plane logs."
  type        = number
  default     = 365
}

################################################################################
# Network
################################################################################

variable "vpc_cidr" {
  description = "VPC CIDR (/16). Must not overlap networks this VPC is peered or routed to."
  type        = string
  default     = "10.50.0.0/16"
}

variable "single_nat_gateway" {
  description = "One shared NAT gateway instead of one per AZ."
  type        = bool
  default     = false
}

################################################################################
# EKS
################################################################################

variable "kubernetes_version" {
  description = "EKS Kubernetes minor version."
  type        = string
  default     = "1.36"
}

variable "cluster_endpoint_public_access" {
  description = "Expose the Kubernetes API publicly. Keep false; Terraform and kubectl then need network access to the VPC."
  type        = bool
  default     = false
}

variable "cluster_endpoint_public_access_cidrs" {
  description = "CIDRs allowed on the public API endpoint when it is enabled."
  type        = list(string)
  default     = []
}

variable "cluster_endpoint_private_access_cidrs" {
  description = "Non-VPC CIDRs (VPN, CI runners) allowed to reach the private API endpoint."
  type        = list(string)
  default     = []
}

variable "cluster_access_entries" {
  description = "EKS access entries for operators (terraform-aws-modules/eks `access_entries` format)."
  type        = any
  default     = {}
}

variable "node_instance_types" {
  description = "Managed node group instance types (x86_64 to match the images CI builds). Confirm availability in the region."
  type        = list(string)
  default     = ["m6i.large"]
}

variable "node_min_size" {
  description = "Minimum number of nodes."
  type        = number
  default     = 3
}

variable "node_max_size" {
  description = "Maximum number of nodes."
  type        = number
  default     = 9
}

variable "node_desired_size" {
  description = "Initial desired number of nodes."
  type        = number
  default     = 3
}

################################################################################
# Database
################################################################################

variable "db_engine_version" {
  description = "Aurora PostgreSQL version. Confirm with `aws rds describe-db-engine-versions --engine aurora-postgresql` in the region."
  type        = string
  default     = "17.4"
}

variable "db_parameter_group_family" {
  description = "Parameter group family matching db_engine_version."
  type        = string
  default     = "aurora-postgresql17"
}

variable "db_backup_retention_days" {
  description = "Automated backup retention."
  type        = number
  default     = 35
}

variable "db_skip_final_snapshot" {
  description = "Skip the final snapshot when a database is destroyed."
  type        = bool
  default     = false
}

################################################################################
# Storage
################################################################################

variable "documents_object_lock_enabled" {
  description = "Create documents buckets with Object Lock so legal holds can be placed on objects. Only settable at bucket creation."
  type        = bool
  default     = true
}

variable "audit_object_lock_mode" {
  description = "Default Object Lock mode of the audit archive buckets (GOVERNANCE or COMPLIANCE). No default in production: COMPLIANCE cannot be undone, so this is an explicit decision."
  type        = string
}

variable "audit_retention_days" {
  description = "Default Object Lock retention of the audit archive buckets, in days. No default in production: set it from the bank's records-retention policy."
  type        = number
}

variable "documents_key_prefix" {
  description = "Object key prefix the workloads are confined to in the documents bucket. Empty means the whole bucket."
  type        = string
  default     = ""
}

variable "allow_document_delete" {
  description = "Allow the api and worker roles to delete document objects."
  type        = bool
  default     = false
}

################################################################################
# Existing OpenSearch RAG engine (owned by another team; nothing is created)
################################################################################

variable "opensearch_endpoint" {
  description = "HTTPS endpoint of the existing OpenSearch domain or Serverless collection. Only echoed into the helm_values output."
  type        = string
}

variable "opensearch_arn" {
  description = "ARN of the existing OpenSearch domain (arn:aws:es:...:domain/NAME) or Serverless collection (arn:aws:aoss:...:collection/ID)."
  type        = string
}

variable "opensearch_service" {
  description = "es for a managed domain, aoss for a Serverless collection."
  type        = string
  default     = "es"
}

variable "opensearch_auth" {
  description = "How the backend authenticates to OpenSearch: sigv4, basic or none. basic adds a credentials secret container per environment."
  type        = string
  default     = "sigv4"

  validation {
    condition     = contains(["sigv4", "basic", "none"], var.opensearch_auth)
    error_message = "opensearch_auth must be sigv4, basic or none."
  }
}

################################################################################
# Images and CI
################################################################################

variable "create_ecr_repositories" {
  description = "Create the ECR repositories in this account. Images are built once and promoted unchanged, so only one stack should own them."
  type        = bool
  default     = false
}

variable "ecr_pull_account_ids" {
  description = "Other AWS accounts allowed to pull images (for example the production account)."
  type        = list(string)
  default     = []
}

variable "github_repository" {
  description = "GitHub repository (owner/name) allowed to push images through OIDC. null skips the CI role."
  type        = string
  default     = null
}

variable "github_oidc_provider_arn" {
  description = "ARN of the account's existing IAM OIDC provider for GitHub Actions."
  type        = string
  default     = null
}

################################################################################
# Secrets
################################################################################

variable "secret_recovery_window_in_days" {
  description = "Days a deleted secret stays recoverable (7-30)."
  type        = number
  default     = 30
}

################################################################################
# Platform (Argo CD, AWS Load Balancer Controller, External Secrets)
################################################################################

variable "chart_versions" {
  description = "Pinned Helm chart versions for the platform components."
  type = object({
    argo_cd                      = string
    aws_load_balancer_controller = string
    external_secrets             = string
  })
  default = {
    argo_cd                      = "10.18.2"
    aws_load_balancer_controller = "3.6.3"
    external_secrets             = "2.15.0"
  }
}

variable "argocd_hostname" {
  description = "Hostname Argo CD is reached on (used for its own URL settings; no ingress is created)."
  type        = string
}

variable "argocd_ha" {
  description = "Run Argo CD in HA mode."
  type        = bool
  default     = true
}

variable "argocd_extra_values" {
  description = "Extra Argo CD chart values (YAML strings), for SSO and RBAC."
  type        = list(string)
  default     = []
}

variable "gitops_repo_url" {
  description = "Git repository Argo CD syncs from. Must match repoURL in deploy/argocd."
  type        = string
}

variable "gitops_target_revision" {
  description = "Branch or tag the root Application tracks."
  type        = string
  default     = "main"
}

variable "gitops_apps_path" {
  description = "Repository path holding this cluster's AppProject and Applications."
  type        = string
  default     = "deploy/argocd/clusters/prod"
}

variable "gitops_repo_private" {
  description = "Create a Secrets Manager container for Argo CD repository credentials and sync it into the cluster."
  type        = bool
  default     = true
}
