import React, { useState } from 'react';
import { generateWhatsAppLocation } from '../../../services/geminiService';
import { useTool } from '../../useTool';
import { TrackedLocation } from '../../../types';
import { Spinner } from '../../Spinner';
import { LocationResultDisplay } from './LocationResultDisplay';

export const WhatsAppCheck: React.FC = () => {
  const [number, setNumber] = useState('');
  const { isLoading, error, data, execute } = useTool<TrackedLocation, string>(generateWhatsAppLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(number);
  };

  return (
    <div>
      <p className="text-brand-text/80 mb-4">Masukkan nomor WhatsApp target untuk melacak via fitur "Live Location".</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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
      {data && <LocationResultDisplay data={data} />}
    </div>
  );
};
