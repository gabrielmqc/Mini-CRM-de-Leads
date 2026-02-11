import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(1),
});

export const updateContactSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email().optional(),
  phone: z.string().min(1).optional(),
});
