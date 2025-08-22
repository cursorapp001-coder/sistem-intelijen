import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-brand-light-blue/50 backdrop-blur-sm border-b border-brand-accent/50 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="https://i.ibb.co/XrTCLpN4/san-jose-state-university-logo-indonesian-state-intelligence-agency-san-jose-state-spartans-men-s-ba.png" alt="Logo Badan Intelijen Negara" className="h-12" />
        </div>
        <div className="flex items-center space-x-4">
            <div className="text-sm text-brand-text/70 text-right hidden sm:block">
                Divisi Teknologi & Informasi Badan Intelijen
            </div>
            <button 
                onClick={onLogout}
                className="flex items-center space-x-2 text-brand-gray hover:text-white bg-brand-accent/50 hover:bg-brand-accent px-3 py-2 rounded-md transition-colors"
                aria-label="Logout"
            >
                <Icon type="logout" className="w-5 h-5" />
                <span className="text-sm font-semibold">Logout</span>
            </button>
        </div>
      </div>
    </header>
  );
};
