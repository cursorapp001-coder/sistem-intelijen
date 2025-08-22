import React, { useState } from 'react';
import { generateSantetHpData } from '../../../services/geminiService';
import { useTool } from '../../useTool';
import { SantetHpResult } from '../../../types';
import { Spinner } from '../../Spinner';
import { Icon } from '../../Icon';

export const SantetHp: React.FC = () => {
  const [number, setNumber] = useState('');
  const { isLoading, error, data, execute } = useTool<SantetHpResult, string>(generateSantetHpData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(number);
  };
  
  const ResultDisplay = ({ result }: { result: SantetHpResult }) => {
     const statusStyles = {
        'BERHASIL': 'bg-red-800 border-red-600 text-red-100',
        'GAGAL': 'bg-gray-600 border-gray-500 text-gray-200',
        'DIPROSES': 'bg-yellow-600 border-yellow-500 text-yellow-100',
    };
    const statusClass = statusStyles[result.status] || 'bg-gray-500';

    return (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in text-center">
        <h3 className="text-lg font-semibold text-white mb-3">Hasil Operasi "Santet HP"</h3>
        <div className={`inline-block p-4 rounded-lg border-2 ${statusClass}`}>
            <p className="text-2xl font-bold tracking-widest">{result.status}</p>
        </div>
        <p className="text-white mt-3 text-lg font-mono">{result.message}</p>
        {result.effects.length > 0 && (
             <div className="mt-4 pt-4 border-t border-brand-accent/50 text-left">
                <p className="font-semibold text-white mb-2">Efek Terdeteksi:</p>
                <ul className="list-disc list-inside text-sm text-red-300 space-y-1 font-mono">
                    {result.effects.map((effect, i) => <li key={i}>{effect}</li>)}
                </ul>
            </div>
        )}
    </div>
  )};

  return (
    <div>
      <p className="text-brand-text/80 mb-4">Masukkan nomor telepon target untuk melancarkan serangan siber non-konvensional.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Contoh: 081234567890"
          disabled={isLoading}
          className="flex-grow bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button type="submit" disabled={isLoading} className="bg-red-700 text-white font-semibold px-6 rounded-md hover:bg-red-800 disabled:bg-brand-gray">
          {isLoading ? 'Mengirim...' : 'Kirim'}
        </button>
      </form>
      {isLoading && <Spinner />}
      {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      {data && <ResultDisplay result={data} />}
    </div>
  );
};
