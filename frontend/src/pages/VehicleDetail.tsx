import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import { useVehicle } from '../hooks/useVehicles';
import { VehicleWithRelations } from '../services/vehiclesApi';
import { fadeIn } from '../lib/animations';
import { StatusDot } from '../components/ui/StatusDot';

export default function VehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, isLoading, error } = useVehicle(id || '', true);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-red-600">Erreur lors du chargement du véhicule</div>
      </div>
    );
  }

  const vehicleData = vehicle as VehicleWithRelations;

  const getStatusColor = (statut: VehicleWithRelations['statut']) => {
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

  const getStatusText = (statut: VehicleWithRelations['statut']) => {
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const statusColor = getStatusColor(vehicleData.statut);
  const statusText = getStatusText(vehicleData.statut);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Détail du véhicule</h1>
        <div className="flex items-center gap-2">
          <StatusDot color={statusColor} />
          <span className="text-sm font-medium">{statusText}</span>
        </div>
      </div>

      <div className="w-full">
        <Tabs.Root defaultValue="details">
          <Tabs.List className="flex gap-4 border-b">
            <Tabs.Trigger
              value="details"
              className="pb-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 text-gray-600 transition-colors"
            >
              Détails
            </Tabs.Trigger>

            <Tabs.Trigger
              value="history"
              className="pb-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 text-gray-600 transition-colors"
            >
              Historique
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="details" className="pt-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Immatriculation</h3>
                  <p className="text-lg font-semibold text-gray-800">{vehicleData.immatriculation}</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Véhicule</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {vehicleData.marque && vehicleData.modele
                      ? `${vehicleData.marque} ${vehicleData.modele}`
                      : 'N/A'}
                  </p>
                  {vehicleData.annee && (
                    <p className="text-sm text-gray-600">{vehicleData.annee}</p>
                  )}
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Kilométrage</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {vehicleData.kilometrage?.toLocaleString('fr-FR') || 'N/A'} km
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Type de carburant</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {vehicleData.type_carburant || 'N/A'}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Conducteur actif</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {vehicleData.conducteur_actif
                      ? vehicleData.conducteur_actif.nom
                      : 'Aucun'}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Score de conformité</h3>
                  <p className="text-lg font-semibold text-gray-800">{vehicleData.score_conformite}</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Dernier contrôle</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(vehicleData.date_dernier_controle)}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Expiration assurance</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(vehicleData.assurance_expiration)}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Prochain entretien</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(vehicleData.entretien_prochain)}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Double équipage</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {vehicleData.mode_double_equipage ? 'Oui' : 'Non'}
                  </p>
                </div>
              </div>
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="history" className="pt-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="space-y-6"
            >
              {/* Assignments */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Assignations</h3>
                {vehicleData.assignments && vehicleData.assignments.length > 0 ? (
                  <div className="space-y-3">
                    {vehicleData.assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="bg-white rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">
                              {assignment.driver
                                ? assignment.driver.nom
                                : 'Conducteur inconnu'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(assignment.date_debut)} -{' '}
                              {assignment.date_fin ? formatDate(assignment.date_fin) : 'En cours'}
                            </p>
                            {assignment.mode_double_equipage && (
                              <p className="text-xs text-gray-500 mt-1">Double équipage</p>
                            )}
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              assignment.statut === 'ACTIF'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {assignment.statut === 'ACTIF' ? 'Actif' : 'Terminé'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Aucune assignation</p>
                )}
              </div>

              {/* Expenses */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Dépenses</h3>
                {vehicleData.expenses && vehicleData.expenses.length > 0 ? (
                  <div className="space-y-3">
                    {vehicleData.expenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="bg-white rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">{expense.type}</p>
                            <p className="text-sm text-gray-600">{formatDate(expense.date)}</p>
                            {expense.description && (
                              <p className="text-sm text-gray-600 mt-1">{expense.description}</p>
                            )}
                          </div>
                          <p className="font-semibold text-gray-800">
                            {expense.montant.toLocaleString('fr-FR')} FCFA
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Aucune dépense</p>
                )}
              </div>

              {/* Checklists */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Checklists de sécurité</h3>
                {vehicleData.checklists && vehicleData.checklists.length > 0 ? (
                  <div className="space-y-3">
                    {vehicleData.checklists.map((checklist) => (
                      <div
                        key={checklist.id}
                        className="bg-white rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">
                              {formatDate(checklist.date)}
                            </p>
                            {checklist.driver && (
                              <p className="text-sm text-gray-600">
                                Par {checklist.driver.nom}
                              </p>
                            )}
                            {checklist.anomalies.length > 0 && (
                              <p className="text-sm text-red-600 mt-1">
                                {checklist.anomalies.length} anomalie(s) détectée(s)
                              </p>
                            )}
                          </div>
                          {checklist.anomalies.length > 0 ? (
                            <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                              Anomalies
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                              OK
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Aucune checklist</p>
                )}
              </div>
            </motion.div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </motion.div>
  );
}
