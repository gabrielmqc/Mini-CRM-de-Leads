import { handle } from "hono/vercel";
import { createHonoApp } from "../_global/hono";
import {
  createContactSchema,
  updateContactSchema,
} from "@/src/validation/contact.schema";

import { createLeadSchema } from "@/src/validation/lead.schema";
import {
  makeCreateContact,
  makeGetContacts,
  makeUpdateContact,
} from "@/src/infrastructure/DI/contactUseCases";
import {
  makeCreateLead,
  makeGetLeads,
} from "@/src/infrastructure/DI/leadUseCases";

const app = createHonoApp();

app.post("/contacts", async (c) => {
  const body = await c.req.json();

  const parsed = createContactSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ errors: parsed.error.format() }, 400);
  }

  const contact = await makeCreateContact().execute(parsed.data);

  return c.json(contact, 201);
});

app.get("/contacts", async (c) => {
  const search = c.req.query("search");
  const contacts = await makeGetContacts().execute({ query: search });
  return c.json(contacts);
});

app.put("/contacts/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  if (!id) {
    return c.json({ error: "Missing ID" }, 400);
  }
  const parsed = updateContactSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ errors: parsed.error.format() }, 400);
  }

  const contact = await makeUpdateContact().execute({ id, ...parsed.data });

  return c.json(contact, 200);
});

//======= Rotas para Leads ========

app.post("/leads", async (c) => {
  const body = await c.req.json();

  const parsed = createLeadSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ errors: parsed.error.format() }, 400);
  }

  const contact = await makeCreateLead().execute(parsed.data);

  return c.json(contact, 201);
});

app.get("/leads", async (c) => {
  const search = c.req.query("search");
  const status = c.req.query("status");
  const leads = await makeGetLeads().execute({ query: search, status: status });
  return c.json(leads);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
