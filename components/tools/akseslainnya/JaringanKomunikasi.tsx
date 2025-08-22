import React from 'react';
import { generateJaringanKomunikasiStatus } from '../../../services/geminiService';
import { useTool } from '../../useTool';
import { JaringanKomunikasiStatus } from '../../../types';
import { Spinner } from '../../Spinner';
import { Icon } from '../../Icon';

export const JaringanKomunikasi: React.FC = () => {
  const { isLoading, error, data, execute } = useTool<JaringanKomunikasiStatus, boolean>(() => generateJaringanKomunikasiStatus());

  const handleCheck = () => {
    execute(true); // pass dummy data to trigger
  };

  const ResultDisplay = ({ result }: { result: JaringanKomunikasiStatus }) => {
    const statusStyles = {
        'Aman': 'bg-green-500 border-green-400 text-green-100',
        'Rentan': 'bg-yellow-500 border-yellow-400 text-yellow-100',
        'Disadap': 'bg-red-500 border-red-400 text-red-100',
    };
    const statusClass = statusStyles[result.status] || 'bg-gray-500';

    return (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in text-center">
        <h3 className="text-lg font-semibold text-white mb-3">Status Keamanan Jaringan</h3>
        <div className={`inline-block p-4 rounded-lg border-2 ${statusClass}`}>
            <p className="text-2xl font-bold">{result.status.toUpperCase()}</p>
        </div>
        <p className="text-brand-text/90 mt-3">{result.detail}</p>
        <p className="text-xs text-brand-text/60 mt-4">Diperiksa pada: {new Date(result.timestamp).toLocaleString('id-ID')}</p>
    </div>
  )};

  return (
    <div className="text-center">
      <p className="text-brand-text/80 mb-4">Memeriksa status keamanan jaringan komunikasi terenkripsi saat ini.</p>
      <button 
        onClick={handleCheck}
        disabled={isLoading} 
        className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 disabled:bg-brand-gray text-lg"
      >
        {isLoading ? 'Memeriksa...' : 'Periksa Status'}
      </button>
      
      {isLoading && <Spinner />}
      {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      {data && <ResultDisplay result={data} />}
    </div>
  );
};
