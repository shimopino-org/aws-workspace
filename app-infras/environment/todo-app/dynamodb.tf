resource "aws_dynamodb_table" "todo_tasks" {
  name         = "todo-tasks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
