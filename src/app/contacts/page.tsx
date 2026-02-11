"use client";

import { Contact, Lead } from "@/src/web/@types";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactLeads,
} from "@/src/web/lib/api";
import ContactsTemplate from "@/src/web/templates/contacts";
import { useState, useEffect } from "react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewingContactLeads, setViewingContactLeads] =
    useState<Contact | null>(null);
  const [contactLeads, setContactLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  useEffect(() => {
    loadContacts();
  }, [searchTerm]);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts(searchTerm || undefined);
      setContacts(data);
    } catch (error) {
      console.error("Erro ao carregar contatos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContact = async (
    data: Omit<Contact, "id" | "createdAt">,
  ) => {
    await createContact(data);
    setIsCreateModalOpen(false);
    loadContacts();
  };

  const handleUpdateContact = async (
    data: Omit<Contact, "id" | "createdAt">,
  ) => {
    if (!editingContact) return;
    await updateContact(editingContact.id, data);
    setEditingContact(null);
    loadContacts();
  };

  const handleDeleteContact = async () => {
    if (!deletingContact) return;
    setIsDeleting(true);
    try {
      await deleteContact(deletingContact.id);
      setDeletingContact(null);
      loadContacts();
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewLeads = async (contact: Contact) => {
    setViewingContactLeads(contact);
    setLoadingLeads(true);
    try {
      const leads = await getContactLeads(contact.id);
      setContactLeads(leads);
    } catch (error) {
      console.error("Erro ao carregar leads:", error);
    } finally {
      setLoadingLeads(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <ContactsTemplate
      contacts={contacts}
      loading={loading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      isCreateModalOpen={isCreateModalOpen}
      setIsCreateModalOpen={setIsCreateModalOpen}
      editingContact={editingContact}
      setEditingContact={setEditingContact}
      deletingContact={deletingContact}
      setDeletingContact={setDeletingContact}
      isDeleting={isDeleting}
      handleCreateContact={handleCreateContact}
      handleUpdateContact={handleUpdateContact}
      handleDeleteContact={handleDeleteContact}
      viewingContactLeads={viewingContactLeads}
      setViewingContactLeads={setViewingContactLeads}
      contactLeads={contactLeads}
      setContactLeads={setContactLeads}
      loadingLeads={loadingLeads}
      handleViewLeads={handleViewLeads}
      formatDate={formatDate}
    />
  );
}
