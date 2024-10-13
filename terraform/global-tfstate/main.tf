data "aws_caller_identity" "current" {}

locals {
  current_account_id = data.aws_caller_identity.current.account_id
}

resource "aws_s3_bucket" "global_bucket" {
  bucket = "${var.bucket_name}-${local.current_account_id}"

  tags = {
    Name = "${var.bucket_name}-${local.current_account_id}"
  }
}

resource "aws_s3_bucket_versioning" "global_bucket_versioning" {
  bucket = aws_s3_bucket.global_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "global_bucket_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.global_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "global_bucket_public_access_block" {
  bucket = aws_s3_bucket.global_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_dynamodb_table" "global_bucket_lock_table" {
  name         = "${aws_s3_bucket.global_bucket.bucket}-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
