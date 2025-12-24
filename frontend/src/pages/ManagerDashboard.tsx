import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { StatCard } from '../components/ui/StatCard';
import { QuickAction } from '../components/ui/QuickAction';
import { StatusDot } from '../components/ui/StatusDot';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';

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
    <div>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Tableau de bord</h2>

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
          <StatCard value={stats.total} label="Véhicules actifs" gradient="from-indigo-600 to-purple-600" />
          <StatCard value={stats.actifs} label="En service" gradient="from-green-600 to-emerald-600" />
          <StatCard value={stats.maintenance} label="En maintenance" gradient="from-amber-600 to-orange-600" />
          <StatCard value={stats.horsService} label="Hors service" gradient="from-red-600 to-rose-600" />
        </div>

        <div className="mb-6 sm:mb-8">
          <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Actions rapides</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <QuickAction
              icon="fas fa-truck"
              label="Nouveau véhicule"
              onClick={() => {}}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-500">Chargement...</div>
          ) : vehicles.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">Aucun véhicule</div>
          ) : (
            vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onScreenChange={onScreenChange} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

