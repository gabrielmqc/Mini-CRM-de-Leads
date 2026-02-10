import { IContact } from "../../gateways/IContact";
import { Contact } from "@/src/domain/entities/Contact";

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
