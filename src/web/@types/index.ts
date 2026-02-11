export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  contactId: string;
  name: string;
  company: string;
  status: "novo" | "contactado" | "qualificado" | "convertido" | "perdido";
  createdAt: string;
}

export type LeadStatus = Lead["status"];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  novo: "Novo",
  contactado: "Contactado",
  qualificado: "Qualificado",
  convertido: "Convertido",
  perdido: "Perdido",
};

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  novo: "bg-blue-100 text-blue-800",
  contactado: "bg-yellow-100 text-yellow-800",
  qualificado: "bg-purple-100 text-purple-800",
  convertido: "bg-green-100 text-green-800",
  perdido: "bg-red-100 text-red-800",
};
