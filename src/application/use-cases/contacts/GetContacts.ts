import { IContact } from "../../gateways/IContact";
import { Contact } from "@/src/domain/entities/Contact";

interface Input {
  query?: string;
}

export class GetContacts {
  constructor(private repo: IContact) {}

  async execute(input: Input): Promise<Contact[]> {
    if (!input.query) {
      return this.repo.findAll();
    }
    if (input.query.includes("@")) {
      return this.repo.findByEmail(input.query);
    } else {
      return this.repo.findByName(input.query);
    }
  }
}
