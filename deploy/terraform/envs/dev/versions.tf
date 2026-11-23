terraform {
  required_version = ">= 1.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.73.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "3.3.0"
    }
  }

  # Partial configuration: supply the rest with
  #   terraform init -backend-config=backend.hcl
  # (see backend.hcl.example).
  backend "s3" {}
}
