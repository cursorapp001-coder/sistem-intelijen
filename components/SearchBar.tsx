
import React, { useState } from 'react';
import { Icon } from './Icon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon type="search" className="w-5 h-5 text-brand-gray" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Masukkan No. HP, Nama Tersangka, atau ID Kasus..."
          disabled={isLoading}
          className="w-full bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-3 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute inset-y-0 right-0 m-1.5 flex items-center bg-blue-600 text-white font-semibold px-6 rounded-md hover:bg-blue-700 disabled:bg-brand-gray disabled:cursor-not-allowed transition duration-200"
        >
          {isLoading ? 'Melacak...' : 'Lacak'}
        </button>
      </div>
    </form>
  );
};
