import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Dashboard } from './components/Dashboard';
import { Spinner } from './components/Spinner';
import { generateSuspectProfile } from './services/geminiService';
import { SuspectProfile } from './types';
import { ToolsMenu } from './components/ToolsMenu';
import { CheckPostTool } from './components/tools/CheckPostTool';
import { EtrackMsisdnTool } from './components/tools/EtrackMsisdnTool';
import { CekDataDiriTool } from './components/tools/CekDataDiriTool';
import { TrackImeiTool } from './components/tools/TrackImeiTool';
import { SadapHpTool } from './components/tools/SadapHpTool';
import { CekDataSosmedTool } from './components/tools/CekDataSosmedTool';
import { InformasiTool } from './components/tools/InformasiTool';
import { AksesLainnyaTool } from './components/tools/AksesLainnyaTool';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';

export type Tool = 'checkpoint' | 'msisdn' | 'idCard' | 'imei' | 'wiretap' | 'social' | 'info' | 'apps';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suspectData, setSuspectData] = useState<SuspectProfile | null>(null);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError("Kolom pencarian tidak boleh kosong.");
      return;
    };
    setIsLoading(true);
    setError(null);
    setSuspectData(null);
    setActiveTool(null);
    try {
      const profile = await generateSuspectProfile(query);
      setSuspectData(profile);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan yang tidak diketahui.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToolSelect = (tool: Tool) => {
    setSuspectData(null);
    setError(null);
    setActiveTool(tool);
  };

  const handleBackToMenu = () => {
    setActiveTool(null);
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Reset state on logout
    setSuspectData(null);
    setActiveTool(null);
    setError(null);
  };

  const renderTool = () => {
    switch(activeTool) {
      case 'checkpoint': return <CheckPostTool onBack={handleBackToMenu} />;
      case 'msisdn': return <EtrackMsisdnTool onBack={handleBackToMenu} />;
      case 'idCard': return <CekDataDiriTool onBack={handleBackToMenu} />;
      case 'imei': return <TrackImeiTool onBack={handleBackToMenu} />;
      case 'wiretap': return <SadapHpTool onBack={handleBackToMenu} />;
      case 'social': return <CekDataSosmedTool onBack={handleBackToMenu} />;
      case 'info': return <InformasiTool onBack={handleBackToMenu} />;
      case 'apps': return <AksesLainnyaTool onBack={handleBackToMenu} />;
      default: return null;
    }
  }

  const renderMainContent = () => {
    if (isLoading) return <Spinner />;
    if (error) return <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg border border-red-700">{error}</div>;
    if (suspectData) return <Dashboard data={suspectData} />;
    if (activeTool) return renderTool();
    
    return <ToolsMenu onToolSelect={handleToolSelect} />;
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen font-sans text-brand-text flex flex-col">
      <Header onLogout={handleLogout} />
      <main className="container mx-auto p-4 md:p-6 flex-grow">
        <div className="bg-brand-light-blue/50 backdrop-blur-sm border border-brand-accent/50 rounded-lg p-6 mb-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">Sistem Pelacakan Intelijen</h2>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="mt-6">
          {renderMainContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;