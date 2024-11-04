import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface CigarNameSearchProps {
  onSearch: (name: string) => void;
  isLoading: boolean;
}

const CigarNameSearch: React.FC<CigarNameSearchProps> = ({ onSearch, isLoading }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSearch(name.trim());
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter cigar name..."
            className="w-full px-4 py-2 pr-12 rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CigarNameSearch;