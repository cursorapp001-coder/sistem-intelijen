import React, { useState } from 'react';
import { generateETilangData } from '../../../services/geminiService';
import { useTool } from '../../useTool';
import { ETilangRecord } from '../../../types';
import { Spinner } from '../../Spinner';
import { Icon } from '../../Icon';

export const ETilang: React.FC = () => {
  const [plate, setPlate] = useState('');
  const { isLoading, error, data, execute } = useTool<ETilangRecord[], string>(generateETilangData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(plate);
  };
  
  const ResultDisplay = ({ results }: { results: ETilangRecord[] }) => (
    <div className="mt-6 animate-fade-in space-y-3">
        <h3 className="text-lg font-semibold text-white">Catatan Pelanggaran Ditemukan: {results.length}</h3>
        {results.length === 0 ? (
            <p className="text-center text-brand-text/80 bg-brand-accent/30 p-4 rounded-lg">Tidak ada catatan pelanggaran untuk plat nomor ini.</p>
        ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {results.map((record) => (
                <div key={record.nomorReferensi} className="bg-brand-accent/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-white">{record.pelanggaran}</p>
                            <p className="text-sm text-brand-text/80">{record.nomorReferensi}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${record.status === 'Belum Dibayar' ? 'bg-red-500' : 'bg-green-500'}`}>
                            {record.status}
                        </span>
                    </div>
                    <div className="text-xs text-brand-text/70 mt-2 border-t border-brand-accent/50 pt-2">
                        <p>Lokasi: {record.lokasi}</p>
                        <p>Tanggal: {new Date(record.tanggal).toLocaleString('id-ID')}</p>
                        <p>Denda: Rp {record.denda.toLocaleString('id-ID')}</p>
                    </div>
                </div>
            ))}
            </div>
        )}
    </div>
  );

  return (
    <div>
      <p className="text-brand-text/80 mb-4">Masukkan plat nomor kendaraan untuk mencari data dari sistem tilang elektronik (ETLE).</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          placeholder="Contoh: B 1234 ABC"
          disabled={isLoading}
          className="flex-grow bg-brand-light-blue border-2 border-brand-accent placeholder-brand-gray text-brand-text rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 rounded-md hover:bg-blue-700 disabled:bg-brand-gray">
          {isLoading ? 'Mencari...' : 'Cari'}
        </button>
      </form>
      {isLoading && <Spinner />}
      {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      {data && <ResultDisplay results={data} />}
    </div>
  );
};
