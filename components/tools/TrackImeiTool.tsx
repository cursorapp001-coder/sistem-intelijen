import React, { useState } from 'react';
import { ToolPageLayout } from '../ToolPageLayout';
import { generateTrackImei } from '../../services/geminiService';
import { useTool } from '../useTool';
import { ImeiData } from '../../types';
import { Spinner } from '../Spinner';
import { Icon } from '../Icon';

export const TrackImeiTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [imei, setImei] = useState('');
  const { isLoading, error, data, execute } = useTool<ImeiData, string>(generateTrackImei);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(imei);
  };
  
  const ResultDisplay = ({ result }: { result: ImeiData }) => (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in space-y-4">
        <div>
            <h3 className="text-lg font-semibold text-white mb-2">Informasi Perangkat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <p><strong className="text-brand-text/70">IMEI:</strong> {result.imei}</p>
                <p><strong className="text-brand-text/70">Model Perangkat:</strong> {result.deviceModel}</p>
                <p><strong className="text-brand-text/70">Nomor Terakhir:</strong> {result.msisdn}</p>
            </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-white mb-2">Riwayat Lokasi</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {result.locationHistory.map((loc, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm p-2 bg-brand-light-blue/50 rounded">
                        <Icon type="clock" className="w-4 h-4 text-brand-gray mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-brand-text">{loc.location}</p>
                            <p className="text-xs text-brand-text/60">{new Date(loc.timestamp).toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  return (
    <ToolPageLayout title="Track IMEI" icon="imei" onBack={onBack}>
      <p className="text-brand-text/80 mb-4">Masukkan IMEI perangkat untuk melacak model dan riwayat lokasi terakhir.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          placeholder="Masukkan 15 digit IMEI"
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
