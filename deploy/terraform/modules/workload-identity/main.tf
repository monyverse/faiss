################################################################################
# Least-privilege IAM roles for the FAISS workloads, bound with EKS Pod Identity
#
#   api     documents bucket (read/write), OpenSearch (search)
#   worker  documents bucket (read/write), audit archive (write-only), OpenSearch (search)
#   ingest  OpenSearch (index + search)
#
# Model traffic goes through the LiteLLM gateway; there are deliberately no
# Bedrock permissions here. The migrate Job and the web pods get no AWS role.
################################################################################

data "aws_region" "current" {}

locals {
  is_aoss = var.opensearch_service == "aoss"

  # Managed domain: IAM authorises per HTTP method on the domain's sub-resources.
  # Serverless collection: IAM only gates API access; index-level permissions
  # live in the collection's data access policy, owned by the search team.
  opensearch_resources = local.is_aoss ? [var.opensearch_arn] : ["${var.opensearch_arn}/*"]
  opensearch_read      = local.is_aoss ? ["aoss:APIAccessAll"] : ["es:ESHttpGet", "es:ESHttpHead", "es:ESHttpPost"]
  opensearch_write     = local.is_aoss ? ["aoss:APIAccessAll"] : ["es:ESHttpDelete", "es:ESHttpGet", "es:ESHttpHead", "es:ESHttpPost", "es:ESHttpPut"]

  documents_objects = "${var.documents_bucket_arn}/${var.documents_key_prefix}*"

  document_object_actions = concat(
    ["s3:AbortMultipartUpload", "s3:GetObject", "s3:GetObjectVersion", "s3:PutObject"],
    var.allow_document_delete ? ["s3:DeleteObject"] : [],
  )

  roles = {
    api = {
      service_account = var.service_accounts.api
      policy          = data.aws_iam_policy_document.api.json
    }
    worker = {
      service_account = var.service_accounts.worker
      policy          = data.aws_iam_policy_document.worker.json
    }
    ingest = {
      service_account = var.service_accounts.ingest
      policy          = data.aws_iam_policy_document.ingest.json
    }
  }
}

################################################################################
# Permission policies
################################################################################

data "aws_iam_policy_document" "documents" {
  statement {
    sid       = "ListDocuments"
    actions   = ["s3:ListBucket"]
    resources = [var.documents_bucket_arn]

    dynamic "condition" {
      for_each = var.documents_key_prefix == "" ? [] : [1]

      content {
        test     = "StringLike"
        variable = "s3:prefix"
        values   = ["${var.documents_key_prefix}*"]
      }
    }
  }

  statement {
    sid       = "ReadWriteDocuments"
    actions   = local.document_object_actions
    resources = [local.documents_objects]
  }

  statement {
    sid       = "UseStorageKeyThroughS3"
    actions   = ["kms:Decrypt", "kms:GenerateDataKey"]
    resources = [var.storage_kms_key_arn]

    condition {
      test     = "StringEquals"
      variable = "kms:ViaService"
      values   = ["s3.${data.aws_region.current.region}.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "opensearch_read" {
  statement {
    sid       = "SearchKnowledgeIndex"
    actions   = local.opensearch_read
    resources = local.opensearch_resources
  }
}

data "aws_iam_policy_document" "audit_write" {
  # Write-only: the worker can append to the archive but cannot read or delete
  # it. Versioning plus Object Lock keep earlier versions if a key is rewritten.
  statement {
    sid       = "AppendAuditArchive"
    actions   = ["s3:PutObject"]
    resources = ["${var.audit_bucket_arn}/*"]
  }
}

data "aws_iam_policy_document" "api" {
  source_policy_documents = [
    data.aws_iam_policy_document.documents.json,
    data.aws_iam_policy_document.opensearch_read.json,
  ]
}

data "aws_iam_policy_document" "worker" {
  source_policy_documents = [
    data.aws_iam_policy_document.documents.json,
    data.aws_iam_policy_document.opensearch_read.json,
    data.aws_iam_policy_document.audit_write.json,
  ]
}

data "aws_iam_policy_document" "ingest" {
  statement {
    sid       = "IndexKnowledgeCorpus"
    actions   = local.opensearch_write
    resources = local.opensearch_resources
  }
}

################################################################################
# Roles and Pod Identity associations
################################################################################

data "aws_iam_policy_document" "trust" {
  for_each = local.roles

  statement {
    sid     = "EksPodIdentity"
    actions = ["sts:AssumeRole", "sts:TagSession"]

    principals {
      type        = "Service"
      identifiers = ["pods.eks.amazonaws.com"]
    }

    # Pod Identity tags the session; pin the role to one cluster, namespace and
    # service account so it cannot be associated anywhere else.
    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/eks-cluster-arn"
      values   = [var.cluster_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/kubernetes-namespace"
      values   = [var.namespace]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/kubernetes-service-account"
      values   = [each.value.service_account]
    }
  }
}

resource "aws_iam_role" "this" {
  for_each = local.roles

  name               = "${var.name}-${each.key}"
  description        = "FAISS ${each.key} workload in ${var.namespace} on ${var.cluster_name}"
  assume_role_policy = data.aws_iam_policy_document.trust[each.key].json
  tags               = var.tags
}

resource "aws_iam_role_policy" "this" {
  for_each = local.roles

  name   = "workload"
  role   = aws_iam_role.this[each.key].id
  policy = each.value.policy
}

resource "aws_eks_pod_identity_association" "this" {
  for_each = local.roles

  cluster_name    = var.cluster_name
  namespace       = var.namespace
  service_account = each.value.service_account
  role_arn        = aws_iam_role.this[each.key].arn
  tags            = var.tags
}
