import React from 'react';
import { Icon } from './Icon';
import { Tool } from '../App';

const menuItems: { label: string; icon: Tool }[] = [
  { label: 'Chek Post', icon: 'checkpoint' },
  { label: 'ETRACK MSISDN', icon: 'msisdn' },
  { label: 'CEK DATA DIRI', icon: 'idCard' },
  { label: 'TRACK IMEI', icon: 'imei' },
  { label: 'SADAP HP', icon: 'wiretap' },
  { label: 'CEK DATA SOSMED', icon: 'social' },
  { label: 'INFORMASI', icon: 'info' },
  { label: 'AKSES LAINYA', icon: 'apps' },
];

interface ToolsMenuProps {
    onToolSelect: (tool: Tool) => void;
}

export const ToolsMenu: React.FC<ToolsMenuProps> = ({ onToolSelect }) => {
  return (
    <div className="bg-brand-light-blue/50 backdrop-blur-sm border border-brand-accent/50 rounded-lg p-6 shadow-2xl animate-fade-in">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">Pusat Kendali Operasi</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onToolSelect(item.icon)}
            className="flex flex-col items-center justify-center p-4 bg-brand-light-blue/80 rounded-lg border border-brand-accent/50 hover:bg-brand-accent/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-1"
            aria-label={item.label}
          >
            <Icon type={item.icon} className="w-8 h-8 text-white mb-2" />
            <span className="text-white text-xs md:text-sm font-semibold text-center">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
