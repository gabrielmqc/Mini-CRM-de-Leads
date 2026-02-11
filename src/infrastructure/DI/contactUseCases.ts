import { CreateContact } from "@/src/application/use-cases/contacts/CreateContact";
import { GetContacts } from "@/src/application/use-cases/contacts/GetContacts";
import { UpdateContact } from "@/src/application/use-cases/contacts/UpdateContact";
import { repositories } from "./container";
import { DeleteContact } from "@/src/application/use-cases/contacts/DeleteContact";

export const makeCreateContact = () => new CreateContact(repositories.contact);

export const makeGetContacts = () => new GetContacts(repositories.contact);

export const makeUpdateContact = () => new UpdateContact(repositories.contact);

export const makeDeleteContact = () => new DeleteContact(repositories.contact);
