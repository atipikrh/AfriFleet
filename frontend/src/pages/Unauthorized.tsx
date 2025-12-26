import { useNavigate } from 'react-router-dom'
import { FadeIn } from '@/components/motion/FadeIn'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientButton } from '@/components/ui/GradientButton'

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <FadeIn>
      <div className="min-h-screen flex items-center justify-center p-6">
        <GlassCard className="max-w-md w-full rounded-2xl p-8 text-center">
          <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <i className="fas fa-lock text-white text-3xl"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Accès non autorisé
          </h1>
          
          <p className="text-gray-600 mb-6">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>

          <div className="space-y-3">
            <GradientButton
              onClick={() => navigate(-1)}
              className="w-full"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Retour
            </GradientButton>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-4 py-3 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Aller au tableau de bord
            </button>
          </div>
        </GlassCard>
      </div>
    </FadeIn>
  )
}

