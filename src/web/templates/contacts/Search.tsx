interface SearchAndActionsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onCreate: () => void;
}

export default function SearchAndActions({
  searchTerm,
  setSearchTerm,
  onCreate,
}: SearchAndActionsProps) {
  return (
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
        onClick={onCreate}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        + Novo Contato
      </button>
    </div>
  );
}
