import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/leads", (c) => {
  return c.json({
    message: "Hello from Leads!",
  });
});

export const GET = handle(app);
