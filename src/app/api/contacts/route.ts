import { handle } from "hono/vercel";
import { createHonoApp } from "../_global/hono";
import { InMemoryContactRepository } from "@/src/infrastructure/repositories/InMemoryContactRepository";
import { createContactSchema } from "@/src/validation/contact.schema";
import { CreateContact } from "@/src/application/use-cases/contacts/CreateContact";
import { GetContacts } from "@/src/application/use-cases/contacts/GetContacts";

const app = createHonoApp();

const contactRepo = new InMemoryContactRepository();

app.post("/contacts", async (c) => {
  const body = await c.req.json();

  const parsed = createContactSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ errors: parsed.error.format() }, 400);
  }

  const useCase = new CreateContact(contactRepo);
  const contact = await useCase.execute(parsed.data);

  return c.json(contact, 201);
});

app.get("/contacts", async (c) => {
  const search = c.req.query("search");
  const useCase = new GetContacts(contactRepo);
  const contacts = await useCase.execute({ query: search });
  return c.json(contacts);
});

export const GET = handle(app);
export const POST = handle(app);
