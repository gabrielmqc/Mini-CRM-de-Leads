import { Lead, LEAD_STATUS_COLORS, LEAD_STATUS_LABELS } from "../../@types";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";

interface ViewLeadsModalProps {
  isOpen: boolean;
  contactName: string | null;
  leads: Lead[];
  loading: boolean;
  onClose: () => void;
  formatDate: (dateString: string) => string;
}

export default function ViewLeadsModal({
  isOpen,
  contactName,
  leads,
  loading,
  onClose,
  formatDate,
}: ViewLeadsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Leads de ${contactName}`}>
      {loading ? (
        <LoadingSpinner />
      ) : leads.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          Este contato não possui leads.
        </p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
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
  );
}
