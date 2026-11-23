provider "aws" {
  region              = var.region
  allowed_account_ids = var.allowed_account_ids

  default_tags {
    tags = merge(
      {
        Project   = var.project
        Stack     = var.stack
        ManagedBy = "terraform"
      },
      var.tags,
    )
  }
}

# The cluster API endpoint is private by default, so this provider only works
# from a network that can reach the VPC. Authentication uses short-lived tokens
# from the AWS CLI; nothing is written to a kubeconfig.
provider "helm" {
  kubernetes = {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

    exec = {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name, "--region", var.region]
    }
  }
}
