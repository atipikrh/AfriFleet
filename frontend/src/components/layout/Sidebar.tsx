import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { slideIn } from '@/lib/animations';

interface SidebarProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
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
    <motion.aside
      className="sidebar fixed left-0 top-0 h-full w-64 z-20 hidden lg:block"
      initial="hidden"
      animate="visible"
      variants={slideIn}
    >
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-truck text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-800">AfriFleet</h1>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`sidebar-nav-btn w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 ${
                isActive(item.path)
                  ? 'bg-indigo-50 text-indigo-600 active'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

