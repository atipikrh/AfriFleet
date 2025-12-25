import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onScreenChange }) => {
  const location = useLocation();
  
  const navItems = [
    { id: 'manager-dashboard', path: '/dashboard', icon: 'fa-home', label: 'Accueil' },
    { id: 'safety-checklist', path: '/safety-checklist', icon: 'fa-clipboard-check', label: 'Checklist' },
    { id: 'fuel-entry', path: '/fuel-entry', icon: 'fa-gas-pump', label: 'Carburant' },
    { id: 'ai-reports', path: '/ai-reports', icon: 'fa-chart-bar', label: 'Rapports' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 glass-card border-t border-gray-200/50 max-w-md mx-auto">
      <div className="flex justify-around py-3">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`nav-btn flex flex-col items-center transition-colors ${
              isActive(item.path)
                ? 'text-indigo-600 active'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
          >
            <i className={`fas ${item.icon} text-lg mb-1`}></i>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

