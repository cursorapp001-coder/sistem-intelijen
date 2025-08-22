import React, { useState } from 'react';
import { generateCheckPostData } from '../../../services/geminiService';
import { useTool } from '../../useTool';
import { CheckPostData } from '../../../types';
import { Spinner } from '../../Spinner';

export const PlateCheck: React.FC = () => {
  const [plate, setPlate] = useState('');
  const { isLoading, error, data, execute } = useTool<CheckPostData, string>(generateCheckPostData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(plate);
  };
  
  const ResultDisplay = ({ result }: { result: CheckPostData }) => (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in">
        <h3 className="text-lg font-semibold text-white mb-2">Hasil Pengecekan Plat Nomor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong className="text-brand-text/70">Plat Nomor:</strong> {result.plateNumber}</p>
            <p><strong className="text-brand-text/70">Nama Pemilik:</strong> {result.ownerName}</p>
            <p><strong className="text-brand-text/70">Jenis Kendaraan:</strong> {result.vehicleType}</p>
            <p><strong className="text-brand-text/70">Warna:</strong> {result.color}</p>
            <p><strong className="text-brand-text/70">Tahun Registrasi:</strong> {result.registrationYear}</p>
            <p><strong className="text-brand-text/70">Status Pajak:</strong> {result.status}</p>
            <p className="md:col-span-2"><strong className="text-brand-text/70">Terlihat Terakhir:</strong> {result.lastSeen.location} pada {new Date(result.lastSeen.timestamp).toLocaleString('id-ID')}</p>
        </div>
    </div>
  );

  return (
    <div>
      <p className="text-brand-text/80 mb-4">Masukkan plat nomor kendaraan untuk memeriksa data registrasi dan status.</p>
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
          {isLoading ? 'Memeriksa...' : 'Cek'}
        </button>
      </form>
      {isLoading && <Spinner />}
      {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      {data && <ResultDisplay result={data} />}
    </div>
  );
};
