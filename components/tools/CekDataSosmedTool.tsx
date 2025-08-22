import React, { useState } from 'react';
import { ToolPageLayout } from '../ToolPageLayout';
import { generateCekDataSosmed } from '../../services/geminiService';
import { useTool } from '../useTool';
import { SosmedData } from '../../types';
import { Spinner } from '../Spinner';
import { Icon, PlatformIcon } from '../Icon';

export const CekDataSosmedTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const { isLoading, error, data, execute } = useTool<SosmedData, string>(generateCekDataSosmed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(query);
  };
  
  const ResultDisplay = ({ result }: { result: SosmedData }) => (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in">
        <h3 className="text-lg font-semibold text-white mb-3">Profil Ditemukan untuk "{result.searchQuery}"</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.profiles.map((p, index) => (
                <a key={index} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 bg-brand-accent/50 hover:bg-brand-accent p-3 rounded-md transition duration-200">
                    <PlatformIcon platform={p.platform} className="w-8 h-8 text-white flex-shrink-0 mt-1" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-md text-white">{p.platform}</p>
                            <Icon type="externalLink" className="w-4 h-4 text-brand-text/60" />
                        </div>
                        <p className="text-sm text-blue-300">@{p.username}</p>
                        <p className="text-xs text-brand-text/80 mt-1">{p.bio}</p>
                    </div>
                </a>
            ))}
            {result.profiles.length === 0 && <p className="text-center text-brand-text/70 md:col-span-2">Tidak ada profil yang ditemukan.</p>}
        </div>
    </div>
  );

  return (
    <ToolPageLayout title="Cek Data Sosmed" icon="social" onBack={onBack}>
      <p className="text-brand-text/80 mb-4">Masukkan nama atau username untuk mencari profil di berbagai platform media sosial.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Contoh: Budi Santoso"
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
    </ToolPageLayout>
  );
};
