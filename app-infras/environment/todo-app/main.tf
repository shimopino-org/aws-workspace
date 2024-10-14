locals {
  lambda_zip_path = "../../../packages/todo-app/dist/function.zip"
}

resource "aws_lambda_function" "todo_app" {
  function_name    = "todo-app"
  role             = aws_iam_role.lambda_exec_role.arn
  runtime          = "nodejs20.x"
  handler          = "handler.handler"
  filename         = local.lambda_zip_path
  source_code_hash = filebase64sha256(local.lambda_zip_path)
}

resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda-exec-role-todo-app"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Lambda基本実行ポリシーのアタッチ
resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


