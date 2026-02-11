"use client";

import { useState, useEffect } from "react";
import { Contact, Lead, LEAD_STATUS_LABELS, LeadStatus } from "../@types";
import { getContacts } from "../lib/api";

interface LeadFormProps {
  lead?: Lead;
  onSubmit: (data: Omit<Lead, "id" | "createdAt">) => Promise<void>;
  onCancel: () => void;
}

export default function LeadForm({ lead, onSubmit, onCancel }: LeadFormProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [formData, setFormData] = useState({
    contactId: lead?.contactId || "",
    name: lead?.name || "",
    company: lead?.company || "",
    status: lead?.status || ("novo" as LeadStatus),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error(error);
      setErrors({ contacts: "Erro ao carregar contatos" });
    } finally {
      setLoadingContacts(false);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.contactId) {
      newErrors.contactId = "Selecione um contato";
    }

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Nome deve ter no mínimo 2 caracteres";
    }

    if (!formData.company.trim() || formData.company.length < 2) {
      newErrors.company = "Empresa deve ter no mínimo 2 caracteres";
    }

    if (!formData.status) {
      newErrors.status = "Status é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : "Erro ao salvar lead",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {errors.submit}
        </div>
      )}

      {errors.contacts && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {errors.contacts}
        </div>
      )}

      <div>
        <label
          htmlFor="contactId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Contato *
        </label>
        <select
          id="contactId"
          value={formData.contactId}
          onChange={(e) => handleChange("contactId", e.target.value)}
          disabled={loadingContacts || !!lead}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.contactId ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Selecione um contato</option>
          {contacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.name} ({contact.email})
            </option>
          ))}
        </select>
        {errors.contactId && (
          <p className="mt-1 text-sm text-red-600">{errors.contactId}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nome *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Nome do lead"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Empresa *
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.company ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Nome da empresa"
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600">{errors.company}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status *
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value as LeadStatus)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.status ? "border-red-500" : "border-gray-300"
          }`}
        >
          {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : lead ? "Atualizar" : "Criar"}
        </button>
      </div>
    </form>
  );
}
