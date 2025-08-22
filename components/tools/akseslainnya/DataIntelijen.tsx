import React, { useState } from 'react';
import { generateDataIntelijen } from '../../../services/geminiService';
import { useTool } from '../../useTool';
import { DataIntelijenReport } from '../../../types';
import { Spinner } from '../../Spinner';
import { Icon } from '../../Icon';

export const DataIntelijen: React.FC = () => {
  const [query, setQuery] = useState('');
  const { isLoading, error, data, execute } = useTool<DataIntelijenReport, string>(generateDataIntelijen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(query);
  };
  
  const ResultDisplay = ({ result }: { result: DataIntelijenReport }) => {
    const confidenceStyles = {
        'Tinggi': 'bg-green-500 border-green-400',
        'Sedang': 'bg-yellow-500 border-yellow-400',
        'Rendah': 'bg-red-500 border-red-400',
    };
    const confidenceClass = confidenceStyles[result.confidenceLevel] || 'bg-gray-500';

    return (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in space-y-4">
        <div>
            <h3 className="text-lg font-semibold text-white">Laporan Intelijen untuk: "{result.query}"</h3>
            <p className="text-sm text-brand-text/70">Sumber: {result.source}</p>
        </div>
        
        <div className="p-4 bg-brand-light-blue/50 rounded-lg">
            <p className="font-semibold text-white mb-2">Ringkasan Laporan:</p>
            <p className="text-brand-text/90 text-sm">{result.reportSummary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <p className="font-semibold text-white mb-2">Entitas Terkait:</p>
                <ul className="list-disc list-inside text-sm text-brand-text/90 space-y-1">
                    {result.relatedEntities.map((entity, i) => <li key={i}>{entity}</li>)}
                </ul>
            </div>
            <div className="flex flex-col items-start">
                <p className="font-semibold text-white mb-2">Tingkat Kepercayaan:</p>
                <span className={`text-sm text-white font-bold px-3 py-1 rounded-full border-2 ${confidenceClass}`}>
                    {result.confidenceLevel.toUpperCase()}
                </span>
            </div>
        </div>
    </div>
  )};

  return (
    <div>
      <p className="text-brand-text/80 mb-4">Masukkan topik, nama, atau kata kunci untuk menarik data dari bank data intelijen.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Contoh: Operasi Narkoba Jakarta Utara"
          disabled={isLoading}
          className="flex-grow bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 rounded-md hover:bg-blue-700 disabled:bg-brand-gray">
          {isLoading ? 'Mengakses...' : 'Akses'}
        </button>
      </form>
      {isLoading && <Spinner />}
      {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      {data && <ResultDisplay result={data} />}
    </div>
  );
};
