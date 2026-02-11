import { LeadStatus, LEAD_STATUS_LABELS } from "../../@types";

interface FiltersAndActionsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: LeadStatus | "";
  setStatusFilter: (status: LeadStatus | "") => void;
  onCreate: () => void;
}

export default function FiltersAndActions({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onCreate,
}: FiltersAndActionsProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Buscar por nome ou empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "")}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os status</option>
          {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onCreate}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        + Novo Lead
      </button>
    </div>
  );
}
