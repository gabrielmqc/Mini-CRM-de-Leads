import { IContact } from "../../gateways/IContact";

interface Input {
  id: string;
}

export class DeleteContact {
  constructor(private repo: IContact) {}

  async execute(input: Input): Promise<void> {
    const existingContact = await this.repo.findById(input.id);

    if (!existingContact) {
      throw new Error("Contact not found");
    }

    await this.repo.delete(existingContact.id);
  }
}
