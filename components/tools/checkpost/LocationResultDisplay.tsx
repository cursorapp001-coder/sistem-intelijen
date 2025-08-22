import React from 'react';
import { TrackedLocation } from '../../../types';
import { Icon } from '../../Icon';

interface LocationResultDisplayProps {
  data: TrackedLocation;
}

export const LocationResultDisplay: React.FC<LocationResultDisplayProps> = ({ data }) => {
  return (
    <div className="mt-6 bg-brand-accent/30 p-4 rounded-lg animate-fade-in">
        <h3 className="text-lg font-semibold text-white mb-2">Hasil Pelacakan Lokasi</h3>
        <p className="text-sm text-brand-text/70 mb-3">Sumber Data: <span className="font-semibold text-white">{data.source}</span></p>

        <div className="bg-brand-light-blue/50 p-4 rounded-lg mb-4">
            <p className="text-sm text-brand-text/80">LOKASI TERDETEKSI</p>
            <p className="text-xl font-bold text-white mt-1">{data.address}</p>
            <p className="text-sm text-green-400 mt-1">
                {new Date(data.timestamp).toLocaleString('id-ID')} (Akurasi: ~{data.accuracy} meter)
            </p>
        </div>

        <div className="h-40 bg-gray-800/50 rounded-lg relative overflow-hidden flex items-center justify-center">
            <div className="absolute w-full h-full bg-cover bg-center opacity-20" style={{backgroundImage: `url('https://i.imgur.com/gKj3eZg.png')`}}></div>
            <div className="text-center z-10">
                <Icon type="pin" className="w-10 h-10 text-red-500 animate-pulse" />
                <span className="text-white font-semibold block mt-1">Sinyal Ditemukan</span>
            </div>
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                Lat: {data.latitude.toFixed(4)} | Lon: {data.longitude.toFixed(4)}
            </div>
        </div>
    </div>
  );
};
