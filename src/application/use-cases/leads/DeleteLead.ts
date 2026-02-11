import { ILead } from "../../gateways/ILead";

interface Input {
  id: string;
}

export class DeleteLead {
  constructor(private repo: ILead) {}

  async execute(input: Input): Promise<void> {
    const existingLead = await this.repo.findById(input.id);

    if (!existingLead) {
      throw new Error("Lead not found");
    }

    await this.repo.delete(existingLead.id);
  }
}
