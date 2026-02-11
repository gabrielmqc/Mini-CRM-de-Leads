"use client";
import LeadsTemplate from "@/src/web/templates/leads";
import { useState, useEffect } from "react";
import { Lead, Contact, LeadStatus } from "../web/@types";
import {
  getLeads,
  getContacts,
  createLead,
  updateLead,
  deleteLead,
  changeLeadStatus,
} from "../web/lib/api";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "">("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, [searchTerm, statusFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsData, contactsData] = await Promise.all([
        getLeads(searchTerm || undefined, statusFilter || undefined),
        getContacts(),
      ]);
      setLeads(leadsData);
      setContacts(contactsData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLead = async (data: Omit<Lead, "id" | "createdAt">) => {
    await createLead(data);
    setIsCreateModalOpen(false);
    loadData();
  };

  const handleChangeStatus = async (leadId: string, status: LeadStatus) => {
    try {
      const updated = await changeLeadStatus(leadId, status);

      setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

  const handleUpdateLead = async (
    data: Omit<Lead, "id" | "createdAt" | "status">,
  ) => {
    if (!editingLead) return;
    await updateLead(editingLead.id, data);
    setEditingLead(null);
    loadData();
  };

  const handleDeleteLead = async () => {
    if (!deletingLead) return;
    setIsDeleting(true);
    try {
      await deleteLead(deletingLead.id);
      setDeletingLead(null);
      loadData();
    } catch (error) {
      console.error("Erro ao deletar lead:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getContactName = (contactId: string) => {
    const contact = contacts.find((c) => c.id === contactId);
    return contact?.name || "Desconhecido";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <LeadsTemplate
      leads={leads}
      contacts={contacts}
      loading={loading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      isCreateModalOpen={isCreateModalOpen}
      setIsCreateModalOpen={setIsCreateModalOpen}
      editingLead={editingLead}
      setEditingLead={setEditingLead}
      deletingLead={deletingLead}
      setDeletingLead={setDeletingLead}
      isDeleting={isDeleting}
      handleCreateLead={handleCreateLead}
      handleUpdateLead={handleUpdateLead}
      handleDeleteLead={handleDeleteLead}
      getContactName={getContactName}
      formatDate={formatDate}
      handleChangeStatus={handleChangeStatus}
    />
  );
}
