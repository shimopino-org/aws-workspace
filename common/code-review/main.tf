data "aws_caller_identity" "current" {}

locals {
  current_account_id = data.aws_caller_identity.current.account_id
}

resource "aws_s3_bucket" "global_bucket" {
  bucket = "codeguru-reviewer-${local.current_account_id}"

  tags = {
    Name = "codeguru-reviewer-${local.current_account_id}"
  }
}
