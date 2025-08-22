
import React from 'react';
import { SocialMediaPost } from '../types';
import { Icon, PlatformIcon } from './Icon';

interface SocialMediaFeedProps {
  activities: SocialMediaPost[];
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 60) return `${diffSeconds} detik lalu`;
    if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString('id-ID');
};

export const SocialMediaFeed: React.FC<SocialMediaFeedProps> = ({ activities }) => {
  return (
    <div className="bg-brand-light-blue/80 backdrop-blur-sm rounded-lg shadow-xl border border-brand-accent/50">
       <div className="p-4 border-b border-brand-accent/50 flex items-center space-x-3">
        <Icon type="social" className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Analisis Aktivitas Digital</h3>
      </div>
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="bg-brand-accent/30 p-4 rounded-lg flex items-start space-x-4">
            <div className="mt-1">
              <PlatformIcon platform={activity.platform} className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center text-xs text-brand-text/60 mb-1">
                <span className="font-semibold text-brand-text/80">{activity.platform}</span>
                <span>{formatDate(activity.timestamp)}</span>
              </div>
              <p className="text-sm text-brand-text/90">
                {activity.post}
              </p>
               <a href={activity.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline mt-2 inline-flex items-center space-x-1">
                <span>Lihat Postingan Asli</span>
                <Icon type="externalLink" className="w-3 h-3"/>
              </a>
            </div>
          </div>
        ))}
        {activities.length === 0 && <p className="text-center text-brand-text/70">Tidak ada aktivitas terbaru.</p>}
      </div>
    </div>
  );
};
