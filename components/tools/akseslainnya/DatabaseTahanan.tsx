import React, { useState } from 'react';
import { generateTahananData } from '../../../services/geminiService';
import { useTool } from '../../useTool';
import { TahananRecord } from '../../../types';
import { Spinner } from '../../Spinner';
import { Icon } from '../../Icon';

export const DatabaseTahanan: React.FC = () => {
  const [query, setQuery] = useState('');
  const { isLoading, error, data, execute } = useTool<TahananRecord, string>(generateTahananData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(query);
  };
  
  const ResultDisplay = ({ result }: { result: TahananRecord }) => (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in flex items-start gap-6">
        <img src={result.fotoUrl} alt={result.nama} className="w-28 h-36 rounded-lg border-2 border-brand-accent object-cover" />
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-white">{result.nama}</h3>
            <p className="text-brand-text/80 mb-3">ID: {result.idTahanan}</p>
            <div className="space-y-2 text-sm">
                <p><strong className="text-brand-text/70 block">Kasus:</strong> {result.kasus}</p>
                <p><strong className="text-brand-text/70 block">Lokasi Penahanan:</strong> {result.lokasiTahanan}</p>
                <p><strong className="text-brand-text/70 block">Status:</strong> {result.status}</p>
            </div>
        </div>
    </div>
  );

  return (
    <div>
      <p className="text-brand-text/80 mb-4">Masukkan nama atau ID tahanan untuk mencari data dari database lembaga pemasyarakatan.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Contoh: Budi Santoso atau T-12345"
          disabled={isLoading}
          className="flex-grow bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 rounded-md hover:bg-blue-700 disabled:bg-brand-gray">
          {isLoading ? 'Mencari...' : 'Cari'}
        </button>
      </form>
      {isLoading && <Spinner />}
      {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      {data && <ResultDisplay result={data} />}
    </div>
  );
};
