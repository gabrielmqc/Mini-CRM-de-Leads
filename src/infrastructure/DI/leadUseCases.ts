import { CreateLead } from "@/src/application/use-cases/leads/CreateLead";
import { GetLeads } from "@/src/application/use-cases/leads/GetLeads";
import { InMemoryLeadRepository } from "../repositories/InMemoryLeadRepository";
import { InMemoryContactRepository } from "../repositories/InMemoryContactRepository";

const leadRepo = new InMemoryLeadRepository();
const contactRepo = new InMemoryContactRepository();

export const makeCreateLead = () => new CreateLead(leadRepo, contactRepo);

export const makeGetLeads = () => new GetLeads(leadRepo);
