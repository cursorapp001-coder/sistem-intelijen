import React, { useState } from 'react';
import { ToolPageLayout } from '../ToolPageLayout';
import { generateSadapHp } from '../../services/geminiService';
import { useTool } from '../useTool';
import { SadapHpData } from '../../types';
import { Spinner } from '../Spinner';

export const SadapHpTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [number, setNumber] = useState('');
  const { isLoading, error, data, execute } = useTool<SadapHpData, string>(generateSadapHp);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(number);
  };
  
  const ResultDisplay = ({ result }: { result: SadapHpData }) => (
    <div className="mt-6 animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-brand-accent/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Log Panggilan</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {result.callLogs.map((log, i) => (
                    <div key={i} className="p-2 bg-brand-light-blue/50 rounded text-sm">
                        <div className="flex justify-between items-center">
                            <span className={`font-semibold ${log.direction === 'Masuk' ? 'text-green-400' : 'text-orange-400'}`}>{log.direction} dari {log.number}</span>
                            <span className="text-xs text-brand-text/70">{log.duration}</span>
                        </div>
                        <p className="text-xs text-brand-text/60">{new Date(log.timestamp).toLocaleString('id-ID')}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-brand-accent/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Log Pesan</h3>
             <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {result.messages.map((msg, i) => (
                    <div key={i} className="p-2 bg-brand-light-blue/50 rounded text-sm">
                        <div className="flex justify-between items-center mb-1">
                            <span className={`font-semibold ${msg.direction === 'Masuk' ? 'text-green-400' : 'text-orange-400'}`}>{msg.direction} dari {msg.number}</span>
                            <span className="text-xs text-brand-text/70">{new Date(msg.timestamp).toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-brand-text/90">{msg.content}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  return (
    <ToolPageLayout title="Sadap HP" icon="wiretap" onBack={onBack}>
      <p className="text-brand-text/80 mb-4">Masukkan nomor telepon target untuk memonitor log panggilan dan pesan (simulasi).</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Contoh: 081234567890"
          disabled={isLoading}
          className="flex-grow bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" disabled={isLoading} className="bg-red-600 text-white font-semibold px-6 rounded-md hover:bg-red-700 disabled:bg-brand-gray">
          {isLoading ? 'Memantau...' : 'Pantau'}
        </button>
      </form>
      {isLoading && <Spinner />}
      {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      {data && <ResultDisplay result={data} />}
    </ToolPageLayout>
  );
};
