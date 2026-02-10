import { Contact } from "@/src/domain/entities/Contact";
import { IAbstractCrud } from "./IAbstractCrud";

export interface IContact extends IAbstractCrud<Contact> {
  findByName(name: string): Promise<Contact[]>;
  findByEmail(email: string): Promise<Contact[]>;
}
