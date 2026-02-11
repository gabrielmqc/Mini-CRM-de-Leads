import { CreateContact } from "../../application/use-cases/contacts/CreateContact";
import { DeleteContact } from "../../application/use-cases/contacts/DeleteContact";
import { GetContacts } from "../../application/use-cases/contacts/GetContacts";
import { UpdateContact } from "../../application/use-cases/contacts/UpdateContact";
import { repositories } from "./container";

export const makeCreateContact = () => new CreateContact(repositories.contact);

export const makeGetContacts = () => new GetContacts(repositories.contact);

export const makeUpdateContact = () => new UpdateContact(repositories.contact);

export const makeDeleteContact = () => new DeleteContact(repositories.contact);
