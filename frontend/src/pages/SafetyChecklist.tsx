import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { useApp } from '../context/AppContext';
import { checklistsApi, ChecklistItem } from '../services/checklistsApi';

interface SafetyChecklistProps {
  onBack: () => void;
  vehicleId?: string;
}

export const SafetyChecklist: React.FC<SafetyChecklistProps> = ({ onBack, vehicleId }) => {
  const { vehicles, drivers } = useApp();
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicleId || '');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', text: "Pression des pneus", checked: true, anomalie_critique: false },
    { id: '2', text: "Niveau d'huile moteur", checked: true, anomalie_critique: false },
    { id: '3', text: "Liquide de refroidissement", checked: false, anomalie_critique: false },
    { id: '4', text: "Feux avant et arrière", checked: true, anomalie_critique: false },
    { id: '5', text: "Freins et frein à main", checked: false, anomalie_critique: true },
    { id: '6', text: "Ceintures de sécurité", checked: true, anomalie_critique: false },
    { id: '7', text: "Extincteur présent", checked: true, anomalie_critique: false },
    { id: '8', text: "Trousse de secours", checked: false, anomalie_critique: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSubmit = async () => {
    if (!selectedVehicleId || !selectedDriverId) {
      setError('Veuillez sélectionner un véhicule et un conducteur');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const anomalies = items
        .filter(item => !item.checked && item.anomalie_critique)
        .map(item => item.text);

      const checklist = {
        id: `CHK-${Date.now()}`,
        vehicle_id: selectedVehicleId,
        driver_id: selectedDriverId,
        date: new Date().toISOString().split('T')[0],
        items,
        anomalies,
      };

      await checklistsApi.create(checklist);
      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <button
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          onClick={onBack}
        >
          <i className="fas fa-arrow-left mr-2"></i>Retour
        </button>
      </div>

      <GlassCard className="rounded-xl sm:rounded-2xl border border-gray-200/50 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Checklist sécurité</h2>
        
        <div className="mb-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Véhicule</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              required
            >
              <option value="">Sélectionnez un véhicule</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.marque} {v.modele} (#{v.id})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conducteur</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
              required
            >
              <option value="">Sélectionnez un conducteur</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-gray-600 mb-6">
          {selectedVehicleId && `Véhicule #${selectedVehicleId} • ${new Date().toLocaleDateString('fr-FR')}`}
        </div>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className={`checklist-item glass-card p-3 sm:p-4 rounded-lg ${item.checked ? 'checked' : ''}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">{item.text}</span>
                <button
                  className={`check-btn w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all ${
                    item.checked
                      ? 'gradient-secondary border-green-500 text-white shadow-lg'
                      : 'border-gray-300 text-gray-400 hover:border-indigo-400'
                  }`}
                  onClick={() => toggleItem(item.id)}
                >
                  <i className="fas fa-check text-xs sm:text-sm"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="font-medium text-gray-700 text-sm sm:text-base">Photo du véhicule</h3>
            <button className="text-indigo-600 text-xs sm:text-sm hover:text-indigo-700 transition-colors">
              <i className="fas fa-camera mr-1"></i>Prendre photo
            </button>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 sm:h-40 flex items-center justify-center hover:border-indigo-400 transition-colors cursor-pointer">
            <i className="fas fa-camera text-gray-400 text-3xl sm:text-4xl"></i>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Signature numérique</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-24 sm:h-32 flex items-center justify-center hover:border-indigo-400 transition-colors cursor-pointer">
            <div className="text-gray-400 text-center">
              <i className="fas fa-signature text-2xl sm:text-3xl mb-2"></i>
              <div className="text-xs sm:text-sm">Signer ici</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-4">{error}</div>
        )}
        <GradientButton variant="secondary" className="w-full" onClick={handleSubmit} disabled={loading}>
          <i className="fas fa-check-circle mr-2"></i>{loading ? 'Validation...' : 'Valider checklist'}
        </GradientButton>
      </GlassCard>
    </div>
  );
};

