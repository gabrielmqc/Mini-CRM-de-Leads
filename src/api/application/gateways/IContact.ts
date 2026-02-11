import { Contact } from "../../domain/entities/Contact";
import { IAbstractCrud } from "./IAbstractCrud";

export interface IContact extends IAbstractCrud<Contact> {
  search(query: string): Promise<Contact[]>;
}
