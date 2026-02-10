import { CreateLead } from "@/src/application/use-cases/leads/CreateLead";
import { GetLeads } from "@/src/application/use-cases/leads/GetLeads";
import { repositories } from "./container";

export const makeCreateLead = () =>
  new CreateLead(repositories.lead, repositories.contact);

export const makeGetLeads = () => new GetLeads(repositories.lead);
