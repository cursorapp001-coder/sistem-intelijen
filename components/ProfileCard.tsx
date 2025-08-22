
import React from 'react';
import { SuspectProfile } from '../types';
import { Icon, PlatformIcon } from './Icon';

interface ProfileCardProps {
  profile: SuspectProfile;
}

const statusStyles = {
    'Buron': 'bg-red-500 border-red-400',
    'Diawasi': 'bg-yellow-500 border-yellow-400',
    'Dicari': 'bg-orange-500 border-orange-400',
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const statusClass = statusStyles[profile.status] || 'bg-gray-500 border-gray-400';

  return (
    <div className="bg-brand-light-blue/80 backdrop-blur-sm rounded-lg shadow-xl border border-brand-accent/50 p-6">
      <div className="flex flex-col items-center">
        <div className="relative">
            <img src={profile.photoUrl} alt={profile.name} className="w-32 h-32 rounded-full border-4 border-brand-accent object-cover shadow-lg" />
            <span className={`absolute bottom-0 right-0 text-xs text-white font-bold px-2 py-1 rounded-full border-2 ${statusClass}`}>
                {profile.status.toUpperCase()}
            </span>
        </div>
        <h2 className="text-2xl font-bold text-white mt-4">{profile.name}</h2>
        <p className="text-brand-text/80">Usia: {profile.age} tahun</p>
        <div className="flex items-center space-x-2 mt-2 text-brand-text/90">
            <Icon type="phone" className="w-4 h-4" />
            <span>{profile.phoneNumber}</span>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-brand-accent/50">
        <h3 className="text-lg font-semibold text-white mb-3">Profil Media Sosial</h3>
        <div className="space-y-3">
          {profile.socialMediaProfiles.map((p, index) => (
            <a key={index} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-brand-accent/50 hover:bg-brand-accent p-2 rounded-md transition duration-200">
              <PlatformIcon platform={p.platform} className="w-6 h-6 text-white" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">{p.platform}</p>
                <p className="text-xs text-brand-text/70">@{p.username}</p>
              </div>
               <Icon type="externalLink" className="w-4 h-4 text-brand-text/60" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
