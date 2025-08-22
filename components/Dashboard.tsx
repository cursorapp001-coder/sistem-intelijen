
import React from 'react';
import { SuspectProfile } from '../types';
import { ProfileCard } from './ProfileCard';
import { LocationTracker } from './LocationTracker';
import { SocialMediaFeed } from './SocialMediaFeed';

interface DashboardProps {
  data: SuspectProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <ProfileCard profile={data} />
      </div>
      <div className="lg:col-span-2 flex flex-col gap-6">
        <LocationTracker locationData={data.lastKnownLocation} history={data.locationHistory} />
        <SocialMediaFeed activities={data.recentActivity} />
      </div>
    </div>
  );
};
