import { Hono } from "hono"
import { handle } from "hono/aws-lambda"
import { configureApp } from "./configure";

const app = new Hono();
configureApp(app);

export const handler = handle(app);