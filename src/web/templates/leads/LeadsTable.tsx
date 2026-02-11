import {
  Lead,
  LEAD_STATUS_LABELS,
  LEAD_STATUS_COLORS,
  LeadStatus,
} from "../../@types";

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  formatDate: (dateString: string) => string;
  getContactName: (contactId: string) => string;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onChangeStatus: (leadId: string, status: LeadStatus) => void;
}

export default function LeadsTable({
  leads,
  loading,
  formatDate,
  getContactName,
  onEdit,
  onDelete,
  onChangeStatus,
}: LeadsTableProps) {
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Nenhum lead encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
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
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {lead.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{lead.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {getContactName(lead.contactId)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      onChangeStatus(lead.id, e.target.value as LeadStatus)
                    }
                    className={`px-2 py-1 text-xs font-semibold rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 ${LEAD_STATUS_COLORS[lead.status]}`}
                  >
                    {Object.entries(LEAD_STATUS_LABELS).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ),
                    )}
                  </select>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(lead.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(lead)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(lead)}
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
  );
}
