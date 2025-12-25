import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Vehicle, VehicleWithRelations } from '../services/vehiclesApi';
import { StatusDot } from './ui/StatusDot';
import { cardHover } from '../lib/animations';

interface VehicleCardProps {
  vehicle: Vehicle | VehicleWithRelations;
  onScreenChange?: (screen: string) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onScreenChange }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onScreenChange) {
      onScreenChange(`vehicle-detail:${vehicle.id}`);
    } else {
      navigate(`/vehicles/${vehicle.id}`);
    }
  };
  const getStatusColor = (statut: Vehicle['statut']) => {
    switch (statut) {
      case 'ACTIF':
        return 'success';
      case 'EN_MAINTENANCE':
        return 'warning';
      case 'IMMOBILISÉ':
      case 'HORS_SERVICE':
        return 'danger';
      default:
        return 'gray';
    }
  };

  const getStatusText = (statut: Vehicle['statut']) => {
    switch (statut) {
      case 'ACTIF':
        return 'En service';
      case 'EN_MAINTENANCE':
        return 'Maintenance';
      case 'IMMOBILISÉ':
        return 'Immobilisé';
      case 'HORS_SERVICE':
        return 'Hors service';
      default:
        return statut;
    }
  };

  const statusColor = getStatusColor(vehicle.statut);
  const statusText = getStatusText(vehicle.statut);

  return (
    <motion.div
      className="vehicle-card rounded-xl sm:rounded-2xl p-4 sm:p-5"
      whileHover={cardHover}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <StatusDot color={statusColor as any} />
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
              {vehicle.marque} {vehicle.modele}
            </h4>
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            {vehicle.id} • {vehicle.immatriculation}
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm ${
            statusColor === 'success'
              ? 'text-green-600'
              : statusColor === 'warning'
              ? 'text-amber-600'
              : 'text-red-600'
          }`}
        >
          {statusText}
        </span>
      </div>
      <div className="mb-3">
        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
          <i className="fas fa-truck text-gray-400 text-3xl sm:text-4xl"></i>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
        <div>
          <div className="text-gray-500">Kilométrage</div>
          <div className="font-medium text-gray-800">
            {vehicle.kilometrage?.toLocaleString('fr-FR') || 'N/A'} km
          </div>
        </div>
        <div>
          <div className="text-gray-500">
            {'conducteur_actif' in vehicle && vehicle.conducteur_actif
              ? 'Conducteur'
              : 'Conformité'}
          </div>
          <div className="font-medium text-gray-800">
            {'conducteur_actif' in vehicle && vehicle.conducteur_actif
              ? vehicle.conducteur_actif.nom
              : vehicle.score_conformite}
          </div>
        </div>
        <button
          className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors mt-2 sm:mt-0 text-left sm:text-right"
          onClick={handleClick}
        >
          Détails <i className="fas fa-chevron-right ml-1"></i>
        </button>
      </div>
    </motion.div>
  );
};

