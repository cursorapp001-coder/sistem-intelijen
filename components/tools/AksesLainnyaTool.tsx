import React, { useState } from 'react';
import { ToolPageLayout } from '../ToolPageLayout';
import { Icon } from '../Icon';
import { ETilang } from './akseslainnya/ETilang';
import { DatabaseTahanan } from './akseslainnya/DatabaseTahanan';
import { ForensikDigital } from './akseslainnya/ForensikDigital';
import { JaringanKomunikasi } from './akseslainnya/JaringanKomunikasi';
import { SantetHp } from './akseslainnya/SantetHp';
import { DataIntelijen } from './akseslainnya/DataIntelijen';

type SubTool = 'menu' | 'tilang' | 'tahanan' | 'forensik' | 'jaringan' | 'santet' | 'intelijen';

const subTools: { id: SubTool; label: string; icon: string }[] = [
    { id: 'tilang', label: "Sistem E-Tilang", icon: "archive" },
    { id: 'tahanan', label: "Database Tahanan", icon: "briefcase" },
    { id: 'forensik', label: "Analisis Forensik Digital", icon: "search" },
    { id: 'jaringan', label: "Jaringan Terenkripsi", icon: "shieldCheck" },
    { id: 'santet', label: "Santet HP", icon: "zap" },
    { id: 'intelijen', label: "Akses Data Intelijen", icon: "database" },
];

export const AksesLainnyaTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
            case 'tilang': return <ETilang />;
            case 'tahanan': return <DatabaseTahanan />;
            case 'forensik': return <ForensikDigital />;
            case 'jaringan': return <JaringanKomunikasi />;
            case 'santet': return <SantetHp />;
            case 'intelijen': return <DataIntelijen />;
            default:
                return (
                    <div>
                        <p className="text-brand-text/80 mb-6 text-center">Pilih sistem terintegrasi lainnya untuk melanjutkan.</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {subTools.map((tool) => (
                                <button
                                    key={tool.id}
                                    onClick={() => setActiveSubTool(tool.id)}
                                    className="flex flex-col items-center justify-center p-4 bg-brand-light-blue/80 rounded-lg border border-brand-accent/50 hover:bg-brand-accent/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-1"
                                    aria-label={tool.label}
                                >
                                    <Icon type={tool.icon} className="w-10 h-10 text-white mb-3" />
                                    <span className="text-white text-sm font-semibold text-center">{tool.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
        }
    };
    
    const currentTool = subTools.find(t => t.id === activeSubTool);
    const title = activeSubTool === 'menu' ? 'Akses Lainnya' : currentTool?.label || 'Akses Lainnya';
    
    return (
        <ToolPageLayout title={title} icon="apps" onBack={handleBack}>
            {renderContent()}
        </ToolPageLayout>
    );
};
