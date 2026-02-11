import { CreateLead } from "@/src/application/use-cases/leads/CreateLead";
import { GetLeads } from "@/src/application/use-cases/leads/GetLeads";
import { repositories } from "./container";
import { UpdateLead } from "@/src/application/use-cases/leads/UpdateLeads";
import { ChangeLeadStatus } from "@/src/application/use-cases/leads/ChangeLeadStatus";

export const makeCreateLead = () =>
  new CreateLead(repositories.lead, repositories.contact);

export const makeGetLeads = () => new GetLeads(repositories.lead);

export const makeUpdateLead = () => new UpdateLead(repositories.lead);

export const makeChangeLeadStatus = () =>
  new ChangeLeadStatus(repositories.lead);
