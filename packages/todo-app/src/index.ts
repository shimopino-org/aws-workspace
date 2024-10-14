import { serve } from '@hono/node-server'
import { Hono } from "hono";
import { configureApp } from './configure';

const app = new Hono();
configureApp(app);

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Listening on http://localhost:${info.port}`)
})