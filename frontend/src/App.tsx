import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt';
import { Login } from './pages/Login';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { VehicleDetail } from './pages/VehicleDetail';
import { SafetyChecklist } from './pages/SafetyChecklist';
import { FuelEntry } from './pages/FuelEntry';
import { AIReports } from './pages/AIReports';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState<'manager' | 'driver' | 'workshop'>('manager');
  const [currentScreen, setCurrentScreen] = useState('manager-dashboard');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>();

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setCurrentRole(role as 'manager' | 'driver' | 'workshop');
    setCurrentScreen('manager-dashboard');
  };

  const handleScreenChange = (screen: string) => {
    // Gérer les paramètres dans le screen (format: "screen:param")
    const [screenName, param] = screen.split(':');
    setCurrentScreen(screenName);
    if (screenName === 'vehicle-detail') {
      setSelectedVehicleId(param);
    }
  };

  const handleBack = () => {
    setCurrentScreen('manager-dashboard');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-8">
          <Login onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <div className="w-full min-h-screen">
        <Sidebar currentScreen={currentScreen} onScreenChange={handleScreenChange} />
        
        <div className="lg:ml-64">
          <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
          
          <main className="pb-20 lg:pb-8">
            <div className="max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
              {currentScreen === 'manager-dashboard' && (
                <ManagerDashboard onScreenChange={handleScreenChange} />
              )}
              {currentScreen === 'vehicle-detail' && (
                <VehicleDetail onBack={handleBack} vehicleId={selectedVehicleId} />
              )}
              {currentScreen === 'safety-checklist' && (
                <SafetyChecklist onBack={handleBack} />
              )}
              {currentScreen === 'fuel-entry' && (
                <FuelEntry onBack={handleBack} />
              )}
              {currentScreen === 'ai-reports' && (
                <AIReports onBack={handleBack} />
              )}
            </div>
          </main>
          
          <BottomNav currentScreen={currentScreen} onScreenChange={handleScreenChange} />
        </div>
      </div>
      <PWAUpdatePrompt />
    </div>
  );
}

export default App;


