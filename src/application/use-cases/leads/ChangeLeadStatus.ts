import { Lead, LeadStatus } from "@/src/domain/entities/Lead";

import { ILead } from "../../gateways/ILead";

interface Input {
  id: string;
  status: LeadStatus;
}

export class ChangeLeadStatus {
  constructor(private repo: ILead) {}

  async execute(input: Input): Promise<Lead> {
    const existingLead = await this.repo.findById(input.id);

    if (!existingLead) {
      throw new Error("Lead not found");
    }

    existingLead.status = input.status;

    await this.repo.update(existingLead.id, existingLead);
    return existingLead;
  }
}
