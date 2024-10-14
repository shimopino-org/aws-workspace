output "api_endpoint" {
  description = "API Gateway のエンドポイント URL"
  value       = aws_apigatewayv2_api.todo_app_api.api_endpoint
}
