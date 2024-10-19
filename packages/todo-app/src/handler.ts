import { Hono } from "hono"
import { handle } from "hono/aws-lambda"
import { configureApp } from "./configure";
import { tracer } from "./tracing";

const app = new Hono();
configureApp(app);

const decoratedHandler = tracer.captureLambdaHandler();
export const handler = decoratedHandler(handle(app));
