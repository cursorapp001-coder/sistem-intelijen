import React from 'react';
import { Icon } from './Icon';
import { Tool } from '../App';

interface ToolPageLayoutProps {
  title: string;
  icon: Tool;
  onBack: () => void;
  children: React.ReactNode;
}

export const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({ title, icon, onBack, children }) => {
  return (
    <div className="bg-brand-light-blue/50 backdrop-blur-sm border border-brand-accent/50 rounded-lg p-6 shadow-2xl animate-fade-in">
      <div className="flex items-center mb-6 border-b border-brand-accent/50 pb-4">
        <button 
          onClick={onBack} 
          className="mr-4 p-2 rounded-full hover:bg-brand-accent/50 transition-colors"
          aria-label="Kembali ke menu"
        >
          <Icon type="arrowLeft" className="w-6 h-6 text-white" />
        </button>
        <Icon type={icon} className="w-8 h-8 text-white mr-3" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};
