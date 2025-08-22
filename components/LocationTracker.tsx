import React from 'react';
import { LocationData, LocationHistoryItem } from '../types';
import { Icon } from './Icon';

interface LocationTrackerProps {
  locationData: LocationData;
  history: LocationHistoryItem[];
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

export const LocationTracker: React.FC<LocationTrackerProps> = ({ locationData, history }) => {
  return (
    <div className="bg-brand-light-blue/80 backdrop-blur-sm rounded-lg shadow-xl border border-brand-accent/50 overflow-hidden">
      <div className="p-4 border-b border-brand-accent/50 flex items-center space-x-3">
        <Icon type="location" className="w-6 h-6 text-red-500" />
        <h3 className="text-lg font-semibold text-white">Pelacakan Lokasi Real-Time</h3>
      </div>
      <div className="p-6">
        <div className="bg-brand-accent/30 p-4 rounded-lg">
            <p className="text-sm text-brand-text/80">LOKASI TERAKHIR TERDETEKSI</p>
            <p className="text-xl font-bold text-white mt-1">{locationData.address}</p>
            <p className="text-sm text-green-400 mt-1">{formatDate(locationData.timestamp)} (Sinyal Akurat)</p>
        </div>
        <div className="h-40 bg-gray-800/50 mt-4 rounded-lg relative overflow-hidden flex items-center justify-center">
            <div className="absolute w-full h-full bg-cover bg-center opacity-20" style={{backgroundImage: `url('https://i.imgur.com/gKj3eZg.png')`}}></div>
            <div className="text-center z-10">
                <Icon type="pin" className="w-10 h-10 text-red-500 animate-pulse" />
                <span className="text-white font-semibold block mt-1">Sinyal Aktif</span>
            </div>
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                Lat: {locationData.latitude.toFixed(4)} | Lon: {locationData.longitude.toFixed(4)}
            </div>
        </div>
      </div>
      <div className="px-6 pb-6">
          <h4 className="text-md font-semibold text-white mb-3">Riwayat Pergerakan (72 Jam Terakhir)</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {history.slice(0, 5).map((loc, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                    <Icon type="clock" className="w-4 h-4 text-brand-gray mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-brand-text">{loc.address}</p>
                        <p className="text-xs text-brand-text/60">{formatDate(loc.timestamp)}</p>
                    </div>
                </div>
            ))}
          </div>
      </div>
    </div>
  );
};
