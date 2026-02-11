import { Lead } from "../../domain/entities/Lead";
import { IAbstractCrud } from "./IAbstractCrud";

export interface ILead extends IAbstractCrud<Lead> {
  findByContactId(contactId: string): Promise<Lead[]>;
  search(query: string, status?: string): Promise<Lead[]>;
}
