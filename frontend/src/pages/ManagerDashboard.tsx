import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '../components/ui/StatCard';
import { QuickAction } from '../components/ui/QuickAction';
import { Dialog } from '../components/ui/radix/Dialog';
import { GradientButton } from '../components/ui/GradientButton';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { fadeIn, staggerContainer } from '../lib/animations';

interface ManagerDashboardProps {
  onScreenChange: (screen: string) => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ onScreenChange }) => {
  const { vehicles, loading, refreshVehicles } = useApp();
  const [stats, setStats] = useState({
    total: 0,
    actifs: 0,
    maintenance: 0,
    horsService: 0,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    refreshVehicles();
  }, []);

  useEffect(() => {
    setStats({
      total: vehicles.length,
      actifs: vehicles.filter(v => v.statut === 'ACTIF').length,
      maintenance: vehicles.filter(v => v.statut === 'EN_MAINTENANCE').length,
      horsService: vehicles.filter(v => v.statut === 'HORS_SERVICE' || v.statut === 'IMMOBILISÉ').length,
    });
  }, [vehicles]);
  return (
    <motion.div
      initial={fadeIn.initial}
      animate={fadeIn.animate}
    >
      <div className="mb-6 sm:mb-8">
        <motion.h2
          className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
        >
          Tableau de bord
        </motion.h2>

        <div className="alert-card rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center mb-3">
            <i className="fas fa-exclamation-triangle text-warning mr-2 text-lg sm:text-xl"></i>
            <h3 className="font-semibold text-warning text-sm sm:text-base">Alertes en attente</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs sm:text-sm">Véhicule #AF-234 maintenance retardée</span>
              <span className="text-xs bg-warning text-white px-2 py-1 rounded-full font-medium">2 jours</span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs sm:text-sm">Assurance #V-567 expire bientôt</span>
              <span className="text-xs bg-danger text-white px-2 py-1 rounded-full font-medium">7 jours</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard value={stats.total} label="Véhicules actifs" variant="primary" />
          <StatCard value={stats.actifs} label="En service" variant="success" />
          <StatCard value={stats.maintenance} label="En maintenance" variant="warning" />
          <StatCard value={stats.horsService} label="Hors service" variant="danger" />
        </div>

        <div className="mb-6 sm:mb-8">
          <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Actions rapides</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <QuickAction
              icon="fas fa-truck"
              label="Nouveau véhicule"
              onClick={() => setDialogOpen(true)}
            />
            <QuickAction
              icon="fas fa-user-plus"
              label="Affecter"
              onClick={() => {}}
            />
            <QuickAction
              icon="fas fa-clipboard-check"
              label="Checklist"
              onClick={() => onScreenChange('safety-checklist')}
            />
            <QuickAction
              icon="fas fa-chart-bar"
              label="Rapports"
              onClick={() => onScreenChange('ai-reports')}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-700 text-base sm:text-lg">Flotte véhicules</h3>
          <button className="text-indigo-600 text-xs sm:text-sm font-medium hover:text-indigo-700 transition-colors">
            <i className="fas fa-filter mr-1"></i>Filtrer
          </button>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            <div className="col-span-full text-center text-gray-500">Chargement...</div>
          ) : vehicles.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">Aucun véhicule</div>
          ) : (
            vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                custom={index}
              >
                <VehicleCard vehicle={vehicle} onScreenChange={onScreenChange} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Nouveau véhicule"
        description="Ajouter un nouveau véhicule à la flotte"
      >
        <div className="space-y-4">
          <p className="text-gray-600">Fonctionnalité à venir : formulaire de création de véhicule</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setDialogOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <GradientButton onClick={() => setDialogOpen(false)}>
              Créer
            </GradientButton>
          </div>
        </div>
      </Dialog>
    </motion.div>
  );
};

