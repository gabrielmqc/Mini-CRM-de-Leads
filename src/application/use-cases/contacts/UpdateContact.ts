import { IContact } from "../../gateways/IContact";
import { Contact } from "@/src/domain/entities/Contact";

interface Input {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export class CreateContact {
  constructor(private repo: IContact) {}

  async execute(input: Input): Promise<Contact> {
    const existingContact = await this.repo.findById(input.id);

    if (!existingContact) {
      throw new Error("Contact not found");
    }

    if (input.name) {
      existingContact.name = input.name;
    }

    if (input.email) {
      existingContact.email = input.email;
    }

    if (input.phone) {
      existingContact.phone = input.phone;
    }

    await this.repo.update(existingContact.id, existingContact);
    return existingContact;
  }
}
