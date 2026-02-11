import { randomUUID } from "crypto";
import { ILead } from "../../gateways/ILead";
import { IContact } from "../../gateways/IContact";
import { Lead, LeadStatus } from "@/src/api/domain/entities/Lead";

interface Input {
  contactId: string;
  name: string;
  company: string;
  status: LeadStatus;
}

export class CreateLead {
  constructor(
    private repo: ILead,
    private contactRepo: IContact,
  ) {}

  async execute(input: Input): Promise<Lead> {
    console.log(input.contactId);
    const contact = await this.contactRepo.findById(input.contactId);
    if (!contact) throw new Error("Contact not found");

    const lead: Lead = {
      id: randomUUID(),
      contactId: contact.id,
      name: input.name,
      company: input.company,
      status: input.status,
      createdAt: new Date().toISOString(),
    };

    await this.repo.create(lead);
    return lead;
  }
}
