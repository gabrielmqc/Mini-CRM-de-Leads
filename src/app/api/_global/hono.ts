import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

export function createHonoApp() {
  const app = new Hono({ strict: true }).basePath("/api");

  app.use("*", logger());
  app.use("*", cors());

  return app;
}
