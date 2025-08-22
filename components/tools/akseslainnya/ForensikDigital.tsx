import React, { useState } from 'react';
import { generateForensikData } from '../../../services/geminiService';
import { useTool } from '../../useTool';
import { ForensikReport } from '../../../types';
import { Spinner } from '../../Spinner';
import { Icon } from '../../Icon';

export const ForensikDigital: React.FC = () => {
  const [caseId, setCaseId] = useState('');
  const { isLoading, error, data, execute } = useTool<ForensikReport, string>(generateForensikData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(caseId);
  };
  
  const ResultDisplay = ({ result }: { result: ForensikReport }) => (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in space-y-4">
        <div>
            <h3 className="text-lg font-semibold text-white">Laporan Analisis Forensik</h3>
            <p className="text-sm text-brand-text/70">ID Kasus: {result.idKasus}</p>
        </div>
        
        <div className="p-4 bg-brand-light-blue/50 rounded-lg">
            <p className="font-semibold text-white mb-2">Ringkasan Temuan:</p>
            <p className="text-brand-text/90 text-sm">{result.ringkasan}</p>
        </div>

        <div>
            <p className="font-semibold text-white mb-2">Barang Bukti Dianalisis:</p>
            <ul className="list-disc list-inside text-sm text-brand-text/90 space-y-1">
                {result.barangBukti.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </div>
        
        <div className="text-xs text-brand-text/70 mt-2 border-t border-brand-accent/50 pt-2">
            <p>Analis: {result.analis}</p>
            <p>Tanggal Analisis: {new Date(result.tanggalAnalisis).toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
        </div>
    </div>
  );

  return (
    <div>
      <p className="text-brand-text/80 mb-4">Masukkan ID kasus untuk mendapatkan ringkasan laporan dari laboratorium forensik digital.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          placeholder="Contoh: K-2024-07-123"
          disabled={isLoading}
          className="flex-grow bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 rounded-md hover:bg-blue-700 disabled:bg-brand-gray">
          {isLoading ? 'Ambil Data...' : 'Ambil'}
        </button>
      </form>
      {isLoading && <Spinner />}
      {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      {data && <ResultDisplay result={data} />}
    </div>
  );
};
