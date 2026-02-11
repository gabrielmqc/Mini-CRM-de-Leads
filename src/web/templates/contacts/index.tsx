import { Contact, Lead } from "../../@types";
import ConfirmDialog from "../../components/ConfirmDialog";
import Header from "../../components/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import ContactForm from "./ContactForm";
import ContactsTable from "./ContactsTable";
import SearchAndActions from "./Search";
import ViewLeadsModal from "./ViewLeadsModal";

interface ContactsTemplateProps {
  contacts: Contact[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  editingContact: Contact | null;
  setEditingContact: (contact: Contact | null) => void;
  deletingContact: Contact | null;
  setDeletingContact: (contact: Contact | null) => void;
  isDeleting: boolean;
  handleCreateContact: (
    data: Omit<Contact, "id" | "createdAt">,
  ) => Promise<void>;
  handleUpdateContact: (
    data: Omit<Contact, "id" | "createdAt">,
  ) => Promise<void>;
  handleDeleteContact: () => void;
  viewingContactLeads: Contact | null;
  setViewingContactLeads: (contact: Contact | null) => void;
  contactLeads: Lead[];
  setContactLeads: (leads: Lead[]) => void;
  loadingLeads: boolean;
  handleViewLeads: (contact: Contact) => void;
  formatDate: (dateString: string) => string;
}

export default function ContactsTemplate({
  contacts,
  loading,
  searchTerm,
  setSearchTerm,
  isCreateModalOpen,
  setIsCreateModalOpen,
  editingContact,
  setEditingContact,
  deletingContact,
  setDeletingContact,
  isDeleting,
  handleCreateContact,
  handleUpdateContact,
  handleDeleteContact,
  viewingContactLeads,
  setViewingContactLeads,
  contactLeads,
  setContactLeads,
  loadingLeads,
  handleViewLeads,
  formatDate,
}: ContactsTemplateProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header title="Contatos" subtitle="Gerencie seus contatos" />

      <SearchAndActions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreate={() => setIsCreateModalOpen(true)}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ContactsTable
          contacts={contacts}
          formatDate={formatDate}
          onViewLeads={handleViewLeads}
          onEdit={setEditingContact}
          onDelete={setDeletingContact}
        />
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Novo Contato"
      >
        <ContactForm
          onSubmit={handleCreateContact}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingContact}
        onClose={() => setEditingContact(null)}
        title="Editar Contato"
      >
        {editingContact && (
          <ContactForm
            contact={editingContact}
            onSubmit={handleUpdateContact}
            onCancel={() => setEditingContact(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingContact}
        onClose={() => setDeletingContact(null)}
        onConfirm={handleDeleteContact}
        title="Excluir Contato"
        message={`Tem certeza que deseja excluir o contato "${deletingContact?.name}"? Todos os leads associados também serão removidos. Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />

      <ViewLeadsModal
        isOpen={!!viewingContactLeads}
        contactName={viewingContactLeads?.name || null}
        leads={contactLeads}
        loading={loadingLeads}
        onClose={() => {
          setViewingContactLeads(null);
          setContactLeads([]);
        }}
        formatDate={formatDate}
      />
    </div>
  );
}
