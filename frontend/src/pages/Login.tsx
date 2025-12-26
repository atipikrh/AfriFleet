import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { useAuth } from '@/app/AuthContext';
import { User } from '../services/auth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDemoLogin = () => {
    const demoUser: User = {
      id: '1',
      identifier: 'demo',
      email: 'demo@afrifleet.com',
      role: 'manager',
      nom: 'Utilisateur Démo',
      actif: true,
    };

    login(demoUser);
    navigate('/dashboard');
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
        <div className="text-center">
          <GradientButton 
            onClick={handleDemoLogin}
            className="w-full"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Entrer dans AfriFleet
          </GradientButton>
        </div>

        <div className="text-center text-xs sm:text-sm text-gray-500 mt-4">
          <p>
            Application fonctionnant hors ligne<br />
            Données synchronisées automatiquement
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

