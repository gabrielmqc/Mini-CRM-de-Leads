import { ILead } from "@/src/application/gateways/ILead";
import { Lead } from "@/src/domain/entities/Lead";

export class InMemoryLeadRepository implements ILead {
  private leads: Lead[] = [];

  async findAll(): Promise<Lead[]> {
    return this.leads;
  }

  async create(lead: Lead): Promise<Lead> {
    this.leads.push(lead);
    return lead;
  }

  async update(id: string, lead: Lead): Promise<Lead> {
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) throw new Error("Lead not found");
    this.leads[index] = { ...lead, id };
    return this.leads[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) throw new Error("Lead not found");
    this.leads.splice(index, 1);
  }

  async findByContactId(contactId: string): Promise<Lead[]> {
    return this.leads.filter((l) => l.contactId === contactId);
  }
  async findById(id: string): Promise<Lead | null> {
    return this.leads.find((l) => l.id === id) || null;
  }
  async search(query: string, status?: string): Promise<Lead[]> {
    const q = query.toLowerCase();
    console.log(`Searching for "${query}" with status ${status}`);
    return this.leads.filter((l) => {
      const matchesQuery =
        l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q);

      const matchesStatus = status ? l.status === status : true;

      return matchesQuery && matchesStatus;
    });
  }
}
