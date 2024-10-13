output "bucket_name" {
  description = "The name of the S3 bucket"
  value       = aws_s3_bucket.global_bucket.bucket
}

output "lock_table_name" {
  description = "The name of the DynamoDB table"
  value       = aws_dynamodb_table.global_bucket_lock_table.name
}
