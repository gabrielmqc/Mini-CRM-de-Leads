import { IContact } from "@/src/application/gateways/IContact";
import { Contact } from "@/src/domain/entities/Contact";

export class InMemoryContactRepository implements IContact {
  private contacts: Contact[] = [];

  async create(contact: Contact): Promise<Contact> {
    this.contacts.push(contact);
    return contact;
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
  async findById(id: string): Promise<Contact | null> {
    return this.contacts.find((c) => c.id === id) || null;
  }
  async findByEmail(email: string): Promise<Contact[]> {
    return this.contacts.filter((c) =>
      c.email.toLowerCase().includes(email.toLowerCase()),
    );
  }
}
