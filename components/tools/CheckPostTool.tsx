import React, { useState } from 'react';
import { ToolPageLayout } from '../ToolPageLayout';
import { Icon } from '../Icon';
import { PlateCheck } from './checkpost/PlateCheck';
import { GsmCheck } from './checkpost/GsmCheck';
import { WhatsAppCheck } from './checkpost/WhatsAppCheck';
import { SocialCheck } from './checkpost/SocialCheck';

type SubTool = 'menu' | 'plate' | 'gsm' | 'whatsapp' | 'social';

const subTools: { id: SubTool; label: string; icon: string }[] = [
    { id: 'plate', label: 'Cek Plat Nomor', icon: 'checkpoint' },
    { id: 'gsm', label: 'Lacak Lokasi GSM', icon: 'cellTower' },
    { id: 'whatsapp', label: 'Lacak via WhatsApp', icon: 'whatsapp' },
    { id: 'social', label: 'Lacak via Sosmed', icon: 'social' },
];

export const CheckPostTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeSubTool, setActiveSubTool] = useState<SubTool>('menu');

    const handleBack = () => {
        if (activeSubTool === 'menu') {
            onBack();
        } else {
            setActiveSubTool('menu');
        }
    };

    const renderContent = () => {
        switch (activeSubTool) {
            case 'plate': return <PlateCheck />;
            case 'gsm': return <GsmCheck />;
            case 'whatsapp': return <WhatsAppCheck />;
            case 'social': return <SocialCheck />;
            default:
                return (
                    <div>
                        <p className="text-brand-text/80 mb-4 text-center">Pilih jenis pemeriksaan yang ingin dilakukan.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {subTools.map((tool) => (
                                <button
                                    key={tool.id}
                                    onClick={() => setActiveSubTool(tool.id)}
                                    className="flex flex-col items-center justify-center p-4 bg-brand-light-blue/80 rounded-lg border border-brand-accent/50 hover:bg-brand-accent/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-1"
                                    aria-label={tool.label}
                                >
                                    <Icon type={tool.icon} className="w-8 h-8 text-white mb-2" />
                                    <span className="text-white text-xs md:text-sm font-semibold text-center">{tool.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    const currentTitle = subTools.find(t => t.id === activeSubTool)?.label || 'Chek Post';

    return (
        <ToolPageLayout title={activeSubTool === 'menu' ? 'Chek Post' : currentTitle} icon="checkpoint" onBack={handleBack}>
            {renderContent()}
        </ToolPageLayout>
    );
};
