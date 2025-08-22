import React, { useState } from 'react';
import { ToolPageLayout } from '../ToolPageLayout';
import { generateMsisdnData } from '../../services/geminiService';
import { useTool } from '../useTool';
import { MsisdnData } from '../../types';
import { Spinner } from '../Spinner';
import { Icon } from '../Icon';

export const EtrackMsisdnTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [msisdn, setMsisdn] = useState('');
  const { isLoading, error, data, execute } = useTool<MsisdnData, string>(generateMsisdnData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(msisdn);
  };
  
  const ResultDisplay = ({ result }: { result: MsisdnData }) => (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in space-y-4">
        <div>
            <h3 className="text-lg font-semibold text-white mb-2">Data Registrasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <p><strong className="text-brand-text/70">Nomor:</strong> {result.msisdn}</p>
                <p><strong className="text-brand-text/70">Provider:</strong> {result.provider}</p>
                <p><strong className="text-brand-text/70">Nama Terdaftar:</strong> {result.registeredName}</p>
                <p><strong className="text-brand-text/70">Alamat:</strong> {result.address}</p>
            </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-white mb-2">Sinyal Terakhir</h3>
             <div className="flex items-start space-x-3 text-sm p-3 bg-brand-light-blue/50 rounded-lg">
                <Icon type="pin" className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                    <p className="font-bold text-white">{result.lastPing.location}</p>
                    <p className="text-xs text-brand-text/80">Lat: {result.lastPing.latitude.toFixed(5)}, Lon: {result.lastPing.longitude.toFixed(5)}</p>
                    <p className="text-xs text-green-400 mt-1">{new Date(result.lastPing.timestamp).toLocaleString('id-ID')}</p>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <ToolPageLayout title="ETRACK MSISDN" icon="msisdn" onBack={onBack}>
      <p className="text-brand-text/80 mb-4">Masukkan nomor telepon (MSISDN) untuk melacak data registrasi dan lokasi sinyal terakhir.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={msisdn}
          onChange={(e) => setMsisdn(e.target.value)}
          placeholder="Contoh: 081234567890"
          disabled={isLoading}
          className="flex-grow bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 rounded-md hover:bg-blue-700 disabled:bg-brand-gray">
          {isLoading ? 'Melacak...' : 'Lacak'}
        </button>
      </form>
      {isLoading && <Spinner />}
      {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      {data && <ResultDisplay result={data} />}
    </ToolPageLayout>
  );
};
