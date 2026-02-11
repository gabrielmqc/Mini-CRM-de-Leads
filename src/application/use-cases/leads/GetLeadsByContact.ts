import { ILead } from "../../gateways/ILead";
import { Lead } from "@/src/domain/entities/Lead";

interface Input {
  contactId: string;
}

export class GetLeadsByContact {
  constructor(private repo: ILead) {}

  async execute(input: Input): Promise<Lead[]> {
    return this.repo.findByContactId(input.contactId);
  }
}
