export interface Lead {
  id: string;
  contactId: string; // referência ao contato (Contact.id)
  name: string;
  company: string;
  status: LeadStatus;
  createdAt: string; // ISO date
}

export enum LeadStatus {
  Novo = "novo",
  Contactado = "contactado",
  Qualificado = "qualificado",
  Convertido = "convertido",
  Perdido = "perdido",
}
