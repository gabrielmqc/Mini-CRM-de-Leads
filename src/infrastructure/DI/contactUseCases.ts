import { CreateContact } from "@/src/application/use-cases/contacts/CreateContact";
import { GetContacts } from "@/src/application/use-cases/contacts/GetContacts";
import { UpdateContact } from "@/src/application/use-cases/contacts/UpdateContact";
import { InMemoryContactRepository } from "../repositories/InMemoryContactRepository";

const contactRepo = new InMemoryContactRepository();

export const makeCreateContact = () => new CreateContact(contactRepo);

export const makeGetContacts = () => new GetContacts(contactRepo);

export const makeUpdateContact = () => new UpdateContact(contactRepo);
