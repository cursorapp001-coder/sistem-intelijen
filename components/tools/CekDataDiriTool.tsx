import React, { useState } from 'react';
import { ToolPageLayout } from '../ToolPageLayout';
import { generateCekDataDiri } from '../../services/geminiService';
import { useTool } from '../useTool';
import { DataDiri } from '../../types';
import { Spinner } from '../Spinner';

export const CekDataDiriTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [nik, setNik] = useState('');
  const { isLoading, error, data, execute } = useTool<DataDiri, string>(generateCekDataDiri);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(nik);
  };
  
  const ResultDisplay = ({ result }: { result: DataDiri }) => (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in flex items-start gap-6">
        <img src={result.photoUrl} alt={result.fullName} className="w-28 h-36 rounded-lg border-2 border-brand-accent object-cover" />
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-white">{result.fullName}</h3>
            <p className="text-brand-text/80 mb-3">{result.nik}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <p><strong className="text-brand-text/70 block">Tanggal Lahir:</strong> {new Date(result.dateOfBirth).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                <p><strong className="text-brand-text/70 block">Pekerjaan:</strong> {result.occupation}</p>
                <p><strong className="text-brand-text/70 block">Status Kawin:</strong> {result.maritalStatus}</p>
                <p className="md:col-span-2"><strong className="text-brand-text/70 block">Alamat:</strong> {result.address}</p>
            </div>
        </div>
    </div>
  );

  return (
    <ToolPageLayout title="Cek Data Diri" icon="idCard" onBack={onBack}>
      <p className="text-brand-text/80 mb-4">Masukkan Nomor Induk Kependudukan (NIK) untuk mencari data dari database kependudukan.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          placeholder="Masukkan 16 digit NIK"
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
