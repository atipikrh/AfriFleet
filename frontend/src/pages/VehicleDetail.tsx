import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { StatusDot } from '../components/ui/StatusDot';
import { vehiclesApi, VehicleWithRelations } from '../services/vehiclesApi';

interface VehicleDetailProps {
  onBack: () => void;
  vehicleId?: string;
}

export const VehicleDetail: React.FC<VehicleDetailProps> = ({ onBack, vehicleId }) => {
  const [vehicle, setVehicle] = useState<VehicleWithRelations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setLoading(true);
        if (vehicleId) {
          const data = await vehiclesApi.getById(vehicleId, true);
          setVehicle(data as VehicleWithRelations);
        } else {
          // Charger le premier véhicule si aucun ID n'est fourni
          const vehicles = await vehiclesApi.getAll(true);
          if (vehicles.length > 0) {
            setVehicle(vehicles[0] as VehicleWithRelations);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du véhicule:', error);
      } finally {
        setLoading(false);
      }
    };
    loadVehicle();
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center text-gray-500">Chargement...</div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center text-gray-500">Véhicule non trouvé</div>
      </div>
    );
  }

  const getStatusColor = (statut: string) => {
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <button
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          onClick={onBack}
        >
          <i className="fas fa-arrow-left mr-2"></i>Retour
        </button>
      </div>

      <GlassCard className="rounded-xl sm:rounded-2xl border border-gray-200/50 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 gap-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <StatusDot color={getStatusColor(vehicle.statut) as any} />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {vehicle.marque} {vehicle.modele}
              </h2>
            </div>
            <div className="text-gray-600 text-sm sm:text-base">
              #{vehicle.id} • {vehicle.annee} • {vehicle.type_carburant}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {vehicle.kilometrage?.toLocaleString('fr-FR') || 'N/A'} km
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Kilométrage</div>
          </div>
        </div>

        <img
          src="https://picsum.photos/400/200?random=5"
          alt={`${vehicle.marque} ${vehicle.modele}`}
          className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6 vehicle-image"
          loading="lazy"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-500">Conducteur</div>
            <div className="font-medium text-sm sm:text-base">
              {vehicle.conducteur_actif?.nom || 'Aucun conducteur assigné'}
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-500">Dernier contrôle</div>
            <div className="font-medium text-sm sm:text-base">
              {formatDate(vehicle.date_dernier_controle)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-500">Statut</div>
            <div className="font-medium text-sm sm:text-base">{vehicle.statut}</div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-500">Conformité</div>
            <div className="font-medium text-sm sm:text-base">{vehicle.score_conformite}</div>
          </div>
        </div>

        {vehicle.assignments && vehicle.assignments.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Affectations actives</h3>
            <div className="space-y-2">
              {vehicle.assignments
                .filter(a => a.statut === 'ACTIF')
                .map((assignment) => (
                  <div key={assignment.id} className="bg-gray-50 p-3 rounded-lg text-sm">
                    <div className="font-medium">
                      {assignment.driver?.nom || 'Conducteur inconnu'}
                    </div>
                    <div className="text-gray-600 text-xs">
                      Depuis le {formatDate(assignment.date_debut)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          <GradientButton className="w-full">
            <i className="fas fa-exchange-alt mr-2"></i>Changer conducteur
          </GradientButton>
          <button className="w-full border-2 border-indigo-500 text-indigo-600 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-all">
            <i className="fas fa-history mr-2"></i>Voir historique
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

