import { Contact, Lead, LeadStatus } from "../@types";

const API_BASE_URL = "http://localhost:3000/api";

export async function getContacts(search?: string): Promise<Contact[]> {
  const url = new URL(`${API_BASE_URL}/contacts`);
  if (search) url.searchParams.set("search", search);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Erro ao buscar contatos");
  return response.json();
}

export async function createContact(
  data: Omit<Contact, "id" | "createdAt">,
): Promise<Contact> {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao criar contato");
  }

  return response.json();
}

export async function updateContact(
  id: string,
  data: Partial<Omit<Contact, "id" | "createdAt">>,
): Promise<Contact> {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao atualizar contato");
  }

  return response.json();
}

export async function deleteContact(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao deletar contato");
  }
}

export async function getLeads(
  search?: string,
  status?: LeadStatus,
): Promise<Lead[]> {
  const url = new URL(`${API_BASE_URL}/leads`);
  if (search) url.searchParams.set("search", search);
  if (status) url.searchParams.set("status", status);
  console.log(url.toString());
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Erro ao buscar leads");
  return response.json();
}

export async function getContactLeads(contactId: string): Promise<Lead[]> {
  const response = await fetch(`${API_BASE_URL}/contacts/${contactId}/leads`);
  if (!response.ok) throw new Error("Erro ao buscar leads do contato");
  return response.json();
}

export async function createLead(
  data: Omit<Lead, "id" | "createdAt">,
): Promise<Lead> {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao criar lead");
  }

  return response.json();
}

export async function updateLead(
  id: string,
  data: Partial<Omit<Lead, "id" | "createdAt">>,
): Promise<Lead> {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao atualizar lead");
  }

  return response.json();
}

export async function deleteLead(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao deletar lead");
  }
}
export async function changeLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<Lead> {
  const response = await fetch(`${API_BASE_URL}/leads/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao alterar status do lead");
  }

  return response.json();
}
