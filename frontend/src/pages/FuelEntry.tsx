import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { Select, SelectItem } from '../components/ui/radix/Select';
import { useApp } from '../context/AppContext';
import { expensesApi } from '../services/expensesApi';

interface FuelEntryProps {
  onBack: () => void;
}

export const FuelEntry: React.FC<FuelEntryProps> = ({ onBack }) => {
  const { vehicles } = useApp();
  const [vehicleId, setVehicleId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const expense = {
        id: `EXP-${Date.now()}`,
        vehicle_id: vehicleId,
        type: 'CARBURANT' as const,
        montant: parseFloat(price) * parseFloat(quantity),
        date: new Date().toISOString().split('T')[0],
        description: 'Plein carburant',
        kilometrage: parseInt(mileage),
        quantite_litres: parseFloat(quantity),
        prix_unitaire: parseFloat(price),
      };

      await expensesApi.create(expense);
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
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Saisie carburant</h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Véhicule</label>
            <Select
              value={vehicleId}
              onValueChange={setVehicleId}
              placeholder="Sélectionnez un véhicule"
            >
              {vehicles.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.marque} {v.modele} (#{v.id})
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantité (litres)</label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prix unitaire (FCFA)</label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kilométrage actuel</label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="0"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo du ticket</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 sm:h-40 flex items-center justify-center hover:border-indigo-400 transition-colors cursor-pointer">
              <i className="fas fa-receipt text-gray-400 text-3xl sm:text-4xl"></i>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm mb-4">{error}</div>
          )}
          <GradientButton type="submit" className="w-full mt-4 sm:mt-6" disabled={loading}>
            <i className="fas fa-save mr-2"></i>{loading ? 'Enregistrement...' : 'Enregistrer'}
          </GradientButton>
        </form>
      </GlassCard>
    </div>
  );
};

