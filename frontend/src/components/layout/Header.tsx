import React, { useState, useEffect } from 'react';
import { StatusDot } from '../ui/StatusDot';

interface HeaderProps {
  currentRole: 'manager' | 'driver' | 'workshop';
  onRoleChange: (role: 'manager' | 'driver' | 'workshop') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRole, onRoleChange }) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkOnline = () => {
      setIsOnline(navigator.onLine);
    };
    
    checkOnline();
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);
    
    setTimeout(() => setIsOnline(true), 2000);
    
    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-10 glass-card border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-primary rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-truck text-white text-sm sm:text-base"></i>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">AfriFleet</h1>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center text-xs sm:text-sm">
              <StatusDot color={isOnline ? 'success' : 'gray'} className={isOnline ? '' : 'offline-indicator'} />
              <span className="text-gray-600 hidden sm:inline">{isOnline ? 'En ligne' : 'Hors ligne'}</span>
            </div>
            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center hover:shadow-lg transition-all">
              <i className="fas fa-user text-indigo-600 text-sm sm:text-base"></i>
            </button>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <div className="flex space-x-1 sm:space-x-2">
            <button
              className={`role-tab flex-1 py-2 px-2 sm:px-4 text-center rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentRole === 'manager' ? 'active' : 'text-gray-600'
              }`}
              onClick={() => onRoleChange('manager')}
            >
              <i className="fas fa-user-tie mr-1"></i>
              <span className="hidden sm:inline">Gestionnaire</span>
              <span className="sm:hidden">Gestion</span>
            </button>
            <button
              className={`role-tab flex-1 py-2 px-2 sm:px-4 text-center rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentRole === 'driver' ? 'active' : 'text-gray-600'
              }`}
              onClick={() => onRoleChange('driver')}
            >
              <i className="fas fa-user mr-1"></i>
              <span className="hidden sm:inline">Conducteur</span>
              <span className="sm:hidden">Conduite</span>
            </button>
            <button
              className={`role-tab flex-1 py-2 px-2 sm:px-4 text-center rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentRole === 'workshop' ? 'active' : 'text-gray-600'
              }`}
              onClick={() => onRoleChange('workshop')}
            >
              <i className="fas fa-tools mr-1"></i>
              <span className="hidden sm:inline">Atelier</span>
              <span className="sm:hidden">Atelier</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

