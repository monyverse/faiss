variable "cluster_name" {
  description = "EKS cluster name."
  type        = string
}

variable "cluster_arn" {
  description = "EKS cluster ARN (pinned in the controller role trust policies)."
  type        = string
}

variable "vpc_id" {
  description = "VPC of the cluster, passed to the AWS Load Balancer Controller."
  type        = string
}

variable "chart_versions" {
  description = "Pinned Helm chart versions."
  type = object({
    argo_cd                      = string
    aws_load_balancer_controller = string
    external_secrets             = string
  })
}

variable "argocd_hostname" {
  description = "Hostname Argo CD believes it is served on. No ingress is created for it here."
  type        = string
}

variable "argocd_ha" {
  description = "Run Argo CD with redis-ha and two server / repo-server replicas."
  type        = bool
  default     = false
}

variable "argocd_extra_values" {
  description = "Extra Argo CD chart values documents (YAML strings), merged after the defaults. Use this for SSO/OIDC and RBAC."
  type        = list(string)
  default     = []
}

variable "gitops_repo_url" {
  description = "Git repository Argo CD syncs from."
  type        = string
}

variable "gitops_target_revision" {
  description = "Branch or tag Argo CD tracks."
  type        = string
  default     = "main"
}

variable "gitops_apps_path" {
  description = "Path in the repository holding this cluster's AppProject and Applications."
  type        = string
}

variable "gitops_repo_credentials_secret" {
  description = "Name of the Secrets Manager secret holding Argo CD repository credentials (JSON keys as Argo CD expects them, e.g. username/password or githubAppID/githubAppInstallationID/githubAppPrivateKey). null for a public repository or credentials managed elsewhere."
  type        = string
  default     = null
}

variable "cluster_secret_store_name" {
  description = "Name of the ClusterSecretStore the FAISS chart references."
  type        = string
  default     = "aws-secrets-manager"
}

variable "workload_namespaces" {
  description = "Namespaces allowed to use the ClusterSecretStore."
  type        = list(string)
}

variable "secret_arns" {
  description = "Secrets Manager secrets External Secrets may read."
  type        = list(string)
}

variable "secret_kms_key_arns" {
  description = "KMS keys External Secrets may decrypt with."
  type        = list(string)
}

variable "tags" {
  description = "Tags applied to every resource."
  type        = map(string)
  default     = {}
}
