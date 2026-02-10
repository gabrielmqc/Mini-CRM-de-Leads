import { handle } from "hono/vercel";
import { createHonoApp } from "../_global/hono";

const app = createHonoApp();

app.get("/leads", (c) => {
  return c.json({
    message: "Hello from Leads!",
  });
});

export const GET = handle(app);
