output "api_url" {
  description = "API GatewayのURL"
  value       = aws_apigatewayv2_api.hello_world_api.api_endpoint
}
