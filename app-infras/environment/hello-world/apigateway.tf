# API Gateway
resource "aws_apigatewayv2_api" "hello_world_api" {
  name          = "hello-world-api"
  protocol_type = "HTTP"
}

# API Gatewayステージ
resource "aws_apigatewayv2_stage" "hello_world_stage" {
  api_id      = aws_apigatewayv2_api.hello_world_api.id
  name        = "$default"
  auto_deploy = true
}

# API GatewayとLambdaの統合
resource "aws_apigatewayv2_integration" "hello_world_integration" {
  api_id             = aws_apigatewayv2_api.hello_world_api.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.hello_world.invoke_arn
}

# API Gatewayルート
resource "aws_apigatewayv2_route" "hello_world_route" {
  api_id    = aws_apigatewayv2_api.hello_world_api.id
  route_key = "GET /hello"
  target    = "integrations/${aws_apigatewayv2_integration.hello_world_integration.id}"
}

# LambdaにAPI Gatewayからの呼び出し許可を与える
resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.hello_world.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.hello_world_api.execution_arn}/*/*"
}
