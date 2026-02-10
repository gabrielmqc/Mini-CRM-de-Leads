import { IAbstractCrud } from "./IAbstractCrud";
import { Lead, LeadStatus } from "@/src/domain/entities/Lead";

export interface ILead extends IAbstractCrud<Lead> {
  findByContactId(contactId: string): Promise<Lead[]>;
  findByStatus(status?: LeadStatus): Promise<Lead[]>;
}
