import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';

interface LoginProps {
  onLogin: (role: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role && identifier && password) {
      onLogin(role);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8 mt-4 sm:mt-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 gradient-primary rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
          <i className="fas fa-truck-moving text-white text-3xl sm:text-4xl"></i>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">AfriFleet</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Gestion de flotte africaine<br />Zéro papier • Hors ligne • Sécurisé
        </p>
      </div>

      <GlassCard className="rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Sélectionnez votre rôle</option>
              <option value="manager">Gestionnaire de flotte</option>
              <option value="driver">Conducteur</option>
              <option value="workshop">Technicien atelier</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Identifiant</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Votre identifiant"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Rester connecté
            </label>
          </div>

          <GradientButton type="submit" className="w-full">
            <i className="fas fa-sign-in-alt mr-2"></i>Se connecter
          </GradientButton>
        </form>

        <div className="text-center text-xs sm:text-sm text-gray-500 mt-4">
          <p>
            Application fonctionnant hors ligne<br />
            Données synchronisées automatiquement
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

