import { IAbstractCrud } from "./IAbstractCrud";
import { Lead, LeadStatus } from "@/src/domain/entities/Lead";

export interface ILead extends IAbstractCrud<Lead> {
  findByContactId(contactId: string): Promise<Lead[]>;
  search(query: string, status?: LeadStatus): Promise<Lead[]>;
}
