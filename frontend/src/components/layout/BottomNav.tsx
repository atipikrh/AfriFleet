import React from 'react';

interface BottomNavProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { id: 'manager-dashboard', icon: 'fa-home', label: 'Accueil' },
    { id: 'vehicle-detail', icon: 'fa-truck', label: 'Véhicules' },
    { id: 'safety-checklist', icon: 'fa-clipboard-check', label: 'Checklist' },
    { id: 'fuel-entry', icon: 'fa-gas-pump', label: 'Carburant' },
    { id: 'ai-reports', icon: 'fa-chart-bar', label: 'Rapports' },
  ];

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 glass-card border-t border-gray-200/50 max-w-md mx-auto">
      <div className="flex justify-around py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn flex flex-col items-center transition-colors ${
              currentScreen === item.id
                ? 'text-indigo-600 active'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
            onClick={() => onScreenChange(item.id)}
          >
            <i className={`fas ${item.icon} text-lg mb-1`}></i>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

