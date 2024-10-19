locals {
  lambda_zip_path = "../../../packages/todo-app/dist/function.zip"
}

resource "aws_cloudwatch_log_group" "todo_app" {
  name              = "/aws/lambda/todo-app/web.stdout.log"
  retention_in_days = 3
}

resource "aws_lambda_function" "todo_app" {
  function_name    = "todo-app"
  role             = aws_iam_role.lambda_exec_role.arn
  runtime          = "nodejs20.x"
  handler          = "dist/handler.handler"
  filename         = local.lambda_zip_path
  source_code_hash = filebase64sha256(local.lambda_zip_path)

  logging_config {
    log_format = "JSON"
    log_group  = aws_cloudwatch_log_group.todo_app.name
  }

  tracing_config {
    mode = "ACTIVE"
  }

  environment {
    variables = {
      DYNAMODB_TABLE          = aws_dynamodb_table.todo_tasks.name
      AWS_LAMBDA_EXEC_WRAPPER = "/opt/otel-handler"
    }
  }

  layers = ["arn:aws:lambda:ap-northeast-1:901920570463:layer:aws-otel-nodejs-amd64-ver-1-17-1:1"]
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

resource "aws_iam_role_policy" "lambda_dynamodb_policy" {
  name = "lambda-dynamodb-policy"
  role = aws_iam_role.lambda_exec_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:DeleteItem",
          "dynamodb:UpdateItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ]
        Resource = aws_dynamodb_table.todo_tasks.arn
      }
    ]
  })
}

# AWS XRayにトレースを送信できるようにする
resource "aws_iam_role_policy" "xray_policy" {
  name = "lambda-xray-policy"
  role = aws_iam_role.lambda_exec_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "xray:PutTraceSegments",
          "xray:PutTelemetryRecords",
          "xray:GetSamplingRules",
          "xray:GetSamplingTargets",
          "xray:GetSamplingStatisticSummaries"
        ]
        Resource = "*"
      }
    ]
  })
}
