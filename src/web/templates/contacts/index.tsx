import {
  Contact,
  Lead,
  LEAD_STATUS_COLORS,
  LEAD_STATUS_LABELS,
} from "../../@types";
import ConfirmDialog from "../../components/ConfirmDialog";
import ContactForm from "../../components/ContactForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contatos</h1>
        <p className="mt-2 text-gray-600">Gerencie seus contatos</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          + Novo Contato
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Nenhum contato encontrado</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Criar primeiro contato
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {contact.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {contact.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {contact.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewLeads(contact)}
                        className="text-purple-600 hover:text-purple-900 mr-4"
                      >
                        Ver Leads
                      </button>
                      <button
                        onClick={() => setEditingContact(contact)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setDeletingContact(contact)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

      <Modal
        isOpen={!!viewingContactLeads}
        onClose={() => {
          setViewingContactLeads(null);
          setContactLeads([]);
        }}
        title={`Leads de ${viewingContactLeads?.name}`}
      >
        {loadingLeads ? (
          <LoadingSpinner />
        ) : contactLeads.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            Este contato não possui leads.
          </p>
        ) : (
          <div className="space-y-4">
            {contactLeads.map((lead) => (
              <div
                key={lead.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${LEAD_STATUS_COLORS[lead.status]}`}
                  >
                    {LEAD_STATUS_LABELS[lead.status]}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Empresa:</span> {lead.company}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Criado em:</span>{" "}
                  {formatDate(lead.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
