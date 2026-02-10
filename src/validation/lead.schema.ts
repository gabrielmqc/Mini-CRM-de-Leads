import { z } from "zod";
import { LeadStatus } from "../domain/entities/Lead";

export const createLeadSchema = z.object({
  contactId: z.uuid(),
  name: z.string().min(2),
  company: z.string().min(2),
  status: z.enum(LeadStatus),
});

export const updateLeadSchema = z.object({
  contactId: z.uuid().optional(),
  name: z.string().min(2).optional(),
  company: z.string().min(2).optional(),
  status: z.enum(LeadStatus).optional(),
});
