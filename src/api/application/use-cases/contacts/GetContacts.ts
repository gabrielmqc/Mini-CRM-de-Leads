import { Contact } from "@/src/api/domain/entities/Contact";
import { IContact } from "../../gateways/IContact";

interface Input {
  query?: string;
}

export class GetContacts {
  constructor(private repo: IContact) {}

  async execute(input: Input): Promise<Contact[]> {
    if (!input.query?.trim()) {
      return this.repo.findAll();
    }

    return this.repo.search(input.query.trim());
  }
}
