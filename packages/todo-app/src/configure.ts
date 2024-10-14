import { Hono } from "hono";
import { tasksApp } from "./routes/tasks";

export const configureApp = (app: Hono) => {
  app.route("/api", tasksApp);
  app.notFound(c => c.json({message: "Not Found"}, 400));
}