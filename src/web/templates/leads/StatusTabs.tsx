import { LeadStatus, LEAD_STATUS_LABELS } from "../../@types";

interface StatusTabsProps {
  statusFilter: LeadStatus | "";
  setStatusFilter: (status: LeadStatus | "") => void;
}

export default function StatusTabs({
  statusFilter,
  setStatusFilter,
}: StatusTabsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={() => setStatusFilter("")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          statusFilter === ""
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Todos
      </button>
      {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
        <button
          key={value}
          onClick={() => setStatusFilter(value as LeadStatus)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            statusFilter === value
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
