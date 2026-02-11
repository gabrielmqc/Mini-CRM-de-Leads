import { handle } from "hono/vercel";
import { createHonoApp } from "../_global/hono";
import {
  createContactSchema,
  updateContactSchema,
} from "@/src/validation/contact.schema";

import {
  createLeadSchema,
  updateLeadSchema,
} from "@/src/validation/lead.schema";
import {
  makeCreateContact,
  makeGetContacts,
  makeUpdateContact,
} from "@/src/infrastructure/DI/contactUseCases";
import {
  makeChangeLeadStatus,
  makeCreateLead,
  makeGetLeads,
  makeUpdateLead,
} from "@/src/infrastructure/DI/leadUseCases";
import z from "zod";
import { LeadStatus } from "@/src/domain/entities/Lead";

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

app.put("/leads/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  if (!id) {
    return c.json({ error: "Missing ID" }, 400);
  }
  const parsed = updateLeadSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ errors: parsed.error.format() }, 400);
  }

  const contact = await makeUpdateLead().execute({ id, ...parsed.data });

  return c.json(contact, 200);
});

app.patch("/leads/:id/status", async (c) => {
  const id = c.req.param("id");
  const status = c.req.param("status");
  if (!status) {
    return c.json({ error: "Missing Status" }, 400);
  }
  const statusParsed = z.enum(LeadStatus).safeParse(status);
  if (!statusParsed.success) {
    return c.json({ errors: statusParsed.error.format() }, 400);
  }

  const contact = await makeChangeLeadStatus().execute({
    id,
    status: statusParsed.data,
  });

  return c.json(contact, 200);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
