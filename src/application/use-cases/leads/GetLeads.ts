import { ILead } from "../../gateways/ILead";
import { Lead } from "@/src/domain/entities/Lead";

interface Input {
  query?: string;
  status?: string;
}

export class GetLeads {
  constructor(private repo: ILead) {}

  async execute(input: Input): Promise<Lead[]> {
    if (!input.query?.trim()) {
      return this.repo.findAll();
    }

    return this.repo.search(input.query.trim(), input.status?.trim());
  }
}
