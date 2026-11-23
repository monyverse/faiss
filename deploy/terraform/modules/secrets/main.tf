################################################################################
# Secrets Manager containers
#
# Only the containers are created here. No aws_secretsmanager_secret_version is
# managed, so secret values never enter Terraform state; operators set them out
# of band (see deploy/README.md).
################################################################################

resource "aws_kms_key" "this" {
  description             = "${var.name} Secrets Manager encryption"
  enable_key_rotation     = true
  deletion_window_in_days = var.kms_deletion_window_in_days
  tags                    = var.tags
}

resource "aws_kms_alias" "this" {
  name          = "alias/${var.name}-secrets"
  target_key_id = aws_kms_key.this.key_id
}

resource "aws_secretsmanager_secret" "this" {
  for_each = var.secrets

  name                    = each.key
  description             = each.value.description
  kms_key_id              = aws_kms_key.this.arn
  recovery_window_in_days = var.recovery_window_in_days

  tags = var.tags
}
