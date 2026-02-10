export interface Lead {
  id: string;
  contactId: string; // referência ao contato (Contact.id)
  name: string;
  company: string;
  status: LeadStatus;
  createdAt: string; // ISO date
}

export type LeadStatus =
  | "novo"
  | "contactado"
  | "qualificado"
  | "convertido"
  | "perdido";
