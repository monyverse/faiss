variable "name" {
  description = "Cluster identifier and name prefix."
  type        = string
}

variable "vpc_id" {
  description = "VPC of the cluster."
  type        = string
}

variable "subnet_ids" {
  description = "Database subnets (no internet route)."
  type        = list(string)
}

variable "allowed_security_group_ids" {
  description = "Security groups allowed to connect on 5432, keyed by a static label (for example { nodes = sg-... })."
  type        = map(string)
}

variable "engine_version" {
  description = "Aurora PostgreSQL engine version. Confirm it is offered in the target region before applying."
  type        = string
}

variable "parameter_group_family" {
  description = "Cluster parameter group family matching engine_version."
  type        = string
}

variable "database_name" {
  description = "Name of the initial database."
  type        = string
  default     = "faiss"
}

variable "master_username" {
  description = "Master user name. The password is managed by RDS in Secrets Manager."
  type        = string
  default     = "faiss_admin"
}

variable "min_capacity" {
  description = "Serverless v2 minimum capacity in ACUs. 0 enables auto-pause."
  type        = number
  default     = 0.5
}

variable "max_capacity" {
  description = "Serverless v2 maximum capacity in ACUs."
  type        = number
  default     = 2
}

variable "seconds_until_auto_pause" {
  description = "Idle time before the cluster pauses. Only used when min_capacity is 0."
  type        = number
  default     = 1800
}

variable "instance_count" {
  description = "Number of db.serverless instances (1 writer plus readers in other AZs)."
  type        = number
  default     = 1
}

variable "backup_retention_days" {
  description = "Automated backup retention."
  type        = number
  default     = 7
}

variable "preferred_backup_window" {
  description = "Daily backup window (UTC)."
  type        = string
  default     = "23:00-00:00"
}

variable "preferred_maintenance_window" {
  description = "Weekly maintenance window (UTC)."
  type        = string
  default     = "sun:01:00-sun:02:00"
}

variable "deletion_protection" {
  description = "Block deletion of the cluster."
  type        = bool
  default     = true
}

variable "skip_final_snapshot" {
  description = "Skip the final snapshot when the cluster is deleted."
  type        = bool
  default     = false
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
