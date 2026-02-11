import { ChangeLeadStatus } from "../../application/use-cases/leads/ChangeLeadStatus";
import { CreateLead } from "../../application/use-cases/leads/CreateLead";
import { DeleteLead } from "../../application/use-cases/leads/DeleteLead";
import { GetLeads } from "../../application/use-cases/leads/GetLeads";
import { GetLeadsByContact } from "../../application/use-cases/leads/GetLeadsByContact";
import { UpdateLead } from "../../application/use-cases/leads/UpdateLeads";
import { repositories } from "./container";

export const makeCreateLead = () =>
  new CreateLead(repositories.lead, repositories.contact);

export const makeGetLeads = () => new GetLeads(repositories.lead);

export const makeUpdateLead = () => new UpdateLead(repositories.lead);

export const makeChangeLeadStatus = () =>
  new ChangeLeadStatus(repositories.lead);

export const makeDeleteLead = () => new DeleteLead(repositories.lead);

export const makeGetLeadsByContact = () =>
  new GetLeadsByContact(repositories.lead);
