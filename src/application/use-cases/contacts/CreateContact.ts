import { randomUUID } from "crypto";
import { IContact } from "../../gateways/IContact";
import { Contact } from "@/src/domain/entities/Contact";

interface Input {
  name: string;
  email: string;
  phone: string;
}

export class CreateContact {
  constructor(private repo: IContact) {}

  async execute(input: Input): Promise<Contact> {
    const contact: Contact = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      phone: input.phone,
      createdAt: new Date().toISOString(),
    };

    await this.repo.create(contact);
    return contact;
  }
}
