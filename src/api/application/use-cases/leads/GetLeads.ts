import { Lead } from "@/src/api/domain/entities/Lead";
import { ILead } from "../../gateways/ILead";

interface Input {
  query?: string;
  status?: string;
}

export class GetLeads {
  constructor(private repo: ILead) {}

  async execute(input: Input): Promise<Lead[]> {
    const query = input.query?.trim();
    const status = input.status?.trim();

    if (!query && !status) {
      return this.repo.findAll();
    }

    if (!query) {
      return this.repo.search("", status);
    }

    return this.repo.search(query, status);
  }
}
