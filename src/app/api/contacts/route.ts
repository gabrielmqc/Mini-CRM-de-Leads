import { handle } from "hono/vercel";
import { createHonoApp } from "../_global/hono";

const app = createHonoApp();

app.get("/contacts", (c) => {
  return c.json({
    message: "Hello from Contatcs!",
  });
});

export const GET = handle(app);
