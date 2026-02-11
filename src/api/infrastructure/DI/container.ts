import { InMemoryContactRepository } from "../repositories/InMemoryContactRepository";
import { InMemoryLeadRepository } from "../repositories/InMemoryLeadRepository";

export const repositories = {
  contact: new InMemoryContactRepository(),
  lead: new InMemoryLeadRepository(),
};
