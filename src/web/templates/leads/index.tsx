import { Lead, LeadStatus, Contact } from "../../@types";
import ConfirmDialog from "../../components/ConfirmDialog";
import Header from "../../components/Header";
import LeadForm from "../../components/LeadForm";
import Modal from "../../components/Modal";
import FiltersAndActions from "./Filter";
import LeadsTable from "./LeadsTable";
import StatusTabs from "./StatusTabs";

interface LeadsTemplateProps {
  leads: Lead[];
  contacts: Contact[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: LeadStatus | "";
  setStatusFilter: (status: LeadStatus | "") => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  editingLead: Lead | null;
  setEditingLead: (lead: Lead | null) => void;
  deletingLead: Lead | null;
  setDeletingLead: (lead: Lead | null) => void;
  isDeleting: boolean;
  handleCreateLead: (data: Omit<Lead, "id" | "createdAt">) => Promise<void>;
  handleUpdateLead: (data: Omit<Lead, "id" | "createdAt">) => Promise<void>;
  handleDeleteLead: () => Promise<void>;
  getContactName: (contactId: string) => string;
  formatDate: (dateString: string) => string;
}

export default function LeadsTemplate({
  leads,
  loading,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isCreateModalOpen,
  setIsCreateModalOpen,
  editingLead,
  setEditingLead,
  deletingLead,
  setDeletingLead,
  isDeleting,
  handleCreateLead,
  handleUpdateLead,
  handleDeleteLead,
  getContactName,
  formatDate,
}: LeadsTemplateProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header title="Leads" subtitle="Gerencie seus leads e oportunidades" />

      <FiltersAndActions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onCreate={() => setIsCreateModalOpen(true)}
      />

      <StatusTabs
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <LeadsTable
        leads={leads}
        loading={loading}
        formatDate={formatDate}
        getContactName={getContactName}
        onEdit={setEditingLead}
        onDelete={setDeletingLead}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Novo Lead"
      >
        <LeadForm
          onSubmit={handleCreateLead}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingLead}
        onClose={() => setEditingLead(null)}
        title="Editar Lead"
      >
        {editingLead && (
          <LeadForm
            lead={editingLead}
            onSubmit={handleUpdateLead}
            onCancel={() => setEditingLead(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingLead}
        onClose={() => setDeletingLead(null)}
        onConfirm={handleDeleteLead}
        title="Excluir Lead"
        message={`Tem certeza que deseja excluir o lead "${deletingLead?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />
    </div>
  );
}
