import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { authService, UserRole } from '../services/auth';

interface LoginProps {
  onLogin: (role: string) => void;
}

interface FormErrors {
  role?: string;
  identifier?: string;
  password?: string;
  general?: string;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole | ''>('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const storedAuth = authService.getStoredAuth();
    if (storedAuth) {
      setIdentifier(storedAuth.user.identifier);
      setRole(storedAuth.user.role);
      setRememberMe(true);
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!role) {
      newErrors.role = 'Veuillez sélectionner un rôle';
    }

    if (!identifier.trim()) {
      newErrors.identifier = 'L\'identifiant est requis';
    } else if (identifier.trim().length < 3) {
      newErrors.identifier = 'L\'identifiant doit contenir au moins 3 caractères';
    } else if (!/^[a-zA-Z0-9_]+$/.test(identifier.trim())) {
      newErrors.identifier = 'L\'identifiant ne peut contenir que des lettres, chiffres et underscores';
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login({
        identifier: identifier.trim(),
        password,
        role: role as UserRole,
        rememberMe,
      });

      if (response.success) {
        onLogin(response.user.role);
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erreur de connexion. Veuillez réessayer.';
      
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdentifier(value);
    if (errors.identifier) {
      setErrors(prev => ({ ...prev, identifier: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as UserRole | '';
    setRole(value);
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: undefined }));
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
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rôle <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.role ? 'border-red-300' : 'border-gray-300'
              }`}
              value={role}
              onChange={handleRoleChange}
              disabled={loading}
            >
              <option value="">Sélectionnez votre rôle</option>
              <option value="manager">Gestionnaire de flotte</option>
              <option value="driver">Conducteur</option>
              <option value="workshop">Technicien atelier</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.role}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Identifiant <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.identifier ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Votre identifiant"
              value={identifier}
              onChange={handleIdentifierChange}
              disabled={loading}
              autoComplete="username"
            />
            {errors.identifier && (
              <p className="mt-1 text-sm text-red-600">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.identifier}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Votre mot de passe"
              value={password}
              onChange={handlePasswordChange}
              disabled={loading}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Rester connecté
            </label>
          </div>

          <GradientButton 
            type="submit" 
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Connexion en cours...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>
                Se connecter
              </>
            )}
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

