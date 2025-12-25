import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { PWAUpdatePrompt } from '../PWAUpdatePrompt';
import { pageTransition } from '../lib/animations';

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<'manager' | 'driver' | 'workshop'>('manager');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('afrifleet_auth') || sessionStorage.getItem('afrifleet_auth');
    if (auth) {
      setIsLoggedIn(true);
    } else if (location.pathname !== '/login') {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

  const getCurrentScreen = () => {
    const path = location.pathname;
    if (path.includes('/vehicles/')) return 'vehicle-detail';
    if (path === '/dashboard') return 'manager-dashboard';
    if (path === '/safety-checklist') return 'safety-checklist';
    if (path === '/fuel-entry') return 'fuel-entry';
    if (path === '/ai-reports') return 'ai-reports';
    return 'manager-dashboard';
  };

  const handleScreenChange = (screen: string) => {
    const [screenName, param] = screen.split(':');
    switch (screenName) {
      case 'manager-dashboard':
        navigate('/dashboard');
        break;
      case 'vehicle-detail':
        navigate(`/vehicles/${param}`);
        break;
      case 'safety-checklist':
        navigate('/safety-checklist');
        break;
      case 'fuel-entry':
        navigate('/fuel-entry');
        break;
      case 'ai-reports':
        navigate('/ai-reports');
        break;
      default:
        navigate('/dashboard');
    }
  };

  if (!isLoggedIn && location.pathname !== '/login') {
    return null;
  }

  if (location.pathname === '/login') {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <div className="w-full min-h-screen">
        <Sidebar currentScreen={getCurrentScreen()} onScreenChange={handleScreenChange} />
        
        <div className="lg:ml-64">
          <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
          
          <main className="pb-20 lg:pb-8">
            <div className="max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  {...pageTransition}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
          
          <BottomNav currentScreen={getCurrentScreen()} onScreenChange={handleScreenChange} />
        </div>
      </div>
      <PWAUpdatePrompt />
    </div>
  );
};

