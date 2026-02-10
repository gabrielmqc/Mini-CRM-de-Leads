import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/contacts", (c) => {
  return c.json({
    message: "Hello from Contatcs!",
  });
});

export const GET = handle(app);
