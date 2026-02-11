import { Lead } from "@/src/api/domain/entities/Lead";
import { ILead } from "../../gateways/ILead";

interface Input {
  contactId: string;
}

export class GetLeadsByContact {
  constructor(private repo: ILead) {}

  async execute(input: Input): Promise<Lead[]> {
    return this.repo.findByContactId(input.contactId);
  }
}
