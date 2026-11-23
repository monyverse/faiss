data "aws_partition" "current" {}

locals {
  create_ci_role = var.github_repository != null
}

resource "aws_kms_key" "this" {
  description             = "${var.name} ECR image encryption"
  enable_key_rotation     = true
  deletion_window_in_days = var.kms_deletion_window_in_days
  tags                    = var.tags
}

resource "aws_kms_alias" "this" {
  name          = "alias/${var.name}-ecr"
  target_key_id = aws_kms_key.this.key_id
}

resource "aws_ecr_repository" "this" {
  for_each = var.repository_names

  name                 = each.value
  image_tag_mutability = "IMMUTABLE"
  force_delete         = false

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
    kms_key         = aws_kms_key.this.arn
  }

  tags = var.tags
}

resource "aws_ecr_lifecycle_policy" "this" {
  for_each = var.repository_names

  repository = aws_ecr_repository.this[each.key].name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Expire untagged images"
        selection = {
          tagStatus   = "untagged"
          countType   = "sinceImagePushed"
          countUnit   = "days"
          countNumber = var.untagged_image_expiry_days
        }
        action = { type = "expire" }
      },
      {
        rulePriority = 2
        description  = "Keep the most recent tagged images"
        selection = {
          tagStatus      = "tagged"
          tagPatternList = ["*"]
          countType      = "imageCountMoreThan"
          countNumber    = var.max_tagged_images
        }
        action = { type = "expire" }
      },
    ]
  })
}

# Other accounts (for example the prod account pulling images built once and
# promoted unchanged) get read-only pull access.
data "aws_iam_policy_document" "pull" {
  count = length(var.pull_account_ids) > 0 ? 1 : 0

  statement {
    sid = "CrossAccountPull"
    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:BatchGetImage",
      "ecr:GetDownloadUrlForLayer",
    ]

    principals {
      type        = "AWS"
      identifiers = [for id in var.pull_account_ids : "arn:${data.aws_partition.current.partition}:iam::${id}:root"]
    }
  }
}

resource "aws_ecr_repository_policy" "pull" {
  for_each = length(var.pull_account_ids) > 0 ? var.repository_names : toset([])

  repository = aws_ecr_repository.this[each.key].name
  policy     = data.aws_iam_policy_document.pull[0].json
}

################################################################################
# Role assumed by GitHub Actions (OIDC) to push images. No long-lived keys.
################################################################################

data "aws_iam_policy_document" "ci_trust" {
  count = local.create_ci_role ? 1 : 0

  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [var.github_oidc_provider_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = [for ref in var.github_refs : "repo:${var.github_repository}:ref:${ref}"]
    }
  }
}

data "aws_iam_policy_document" "ci_push" {
  count = local.create_ci_role ? 1 : 0

  statement {
    sid       = "Login"
    actions   = ["ecr:GetAuthorizationToken"]
    resources = ["*"]
  }

  statement {
    sid = "PushAndInspect"
    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:BatchGetImage",
      "ecr:CompleteLayerUpload",
      "ecr:DescribeImages",
      "ecr:GetDownloadUrlForLayer",
      "ecr:InitiateLayerUpload",
      "ecr:PutImage",
      "ecr:UploadLayerPart",
    ]
    resources = [for repo in aws_ecr_repository.this : repo.arn]
  }
}

resource "aws_iam_role" "ci" {
  count = local.create_ci_role ? 1 : 0

  name               = "${var.name}-ci-ecr-push"
  description        = "GitHub Actions image push for ${var.github_repository}"
  assume_role_policy = data.aws_iam_policy_document.ci_trust[0].json
  tags               = var.tags
}

resource "aws_iam_role_policy" "ci" {
  count = local.create_ci_role ? 1 : 0

  name   = "ecr-push"
  role   = aws_iam_role.ci[0].id
  policy = data.aws_iam_policy_document.ci_push[0].json
}
