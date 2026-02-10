import { Lead } from "@/src/domain/entities/Lead";

import { ILead } from "../../gateways/ILead";

interface Input {
  id: string;
  name?: string;
  company?: string;
}

export class UpdateLead {
  constructor(private repo: ILead) {}

  async execute(input: Input): Promise<Lead> {
    const existingLead = await this.repo.findById(input.id);

    if (!existingLead) {
      throw new Error("Lead not found");
    }

    if (input.name) {
      existingLead.name = input.name;
    }

    if (input.company) {
      existingLead.company = input.company;
    }

    await this.repo.update(existingLead.id, existingLead);
    return existingLead;
  }
}
