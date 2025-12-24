import React from 'react';

interface SidebarProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { id: 'manager-dashboard', icon: 'fa-home', label: 'Accueil' },
    { id: 'vehicle-detail', icon: 'fa-truck', label: 'Véhicules' },
    { id: 'safety-checklist', icon: 'fa-clipboard-check', label: 'Checklist' },
    { id: 'fuel-entry', icon: 'fa-gas-pump', label: 'Carburant' },
    { id: 'ai-reports', icon: 'fa-chart-bar', label: 'Rapports' },
  ];

  return (
    <aside className="sidebar fixed left-0 top-0 h-full w-64 z-20 hidden lg:block">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-truck text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-800">AfriFleet</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-btn w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 ${
                currentScreen === item.id
                  ? 'bg-indigo-50 text-indigo-600 active'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
              onClick={() => onScreenChange(item.id)}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

