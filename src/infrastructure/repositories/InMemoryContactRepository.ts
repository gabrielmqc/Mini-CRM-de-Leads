import { IContact } from "@/src/application/gateways/IContact";
import { Contact } from "@/src/domain/entities/Contact";
import { randomUUID } from "node:crypto";

export class InMemoryContactRepository implements IContact {
  private contacts: Contact[] = [];

  async create(contact: Contact): Promise<Contact> {
    const newContact = { ...contact, id: randomUUID() };
    this.contacts.push(newContact);
    return newContact;
  }

  async update(id: string, contact: Contact): Promise<Contact> {
    const index = this.contacts.findIndex((c) => c.id === id);
    if (index === -1) throw new Error(`Contact with id ${id} not found`);
    this.contacts[index] = contact;
    return contact;
  }

  async delete(id: string): Promise<void> {
    const index = this.contacts.findIndex((c) => c.id === id);
    if (index === -1) throw new Error(`Contact with id ${id} not found`);
    this.contacts.splice(index, 1);
  }

  async findAll(): Promise<Contact[]> {
    return this.contacts;
  }

  async findByName(name: string): Promise<Contact[]> {
    return this.contacts.filter((c) =>
      c.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  async findByEmail(email: string): Promise<Contact[]> {
    return this.contacts.filter((c) =>
      c.email.toLowerCase().includes(email.toLowerCase()),
    );
  }
}
