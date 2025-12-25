import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { VehicleStatsChart } from '../components/charts/VehicleStatsChart';
import { ComplianceChart } from '../components/charts/ComplianceChart';
import { ExpenseChart } from '../components/charts/ExpenseChart';
import { useVehicles } from '../hooks/useVehicles';
import { aiApi, FleetReport } from '../services/aiApi';

interface AIReportsProps {
  onBack: () => void;
}

export const AIReports: React.FC<AIReportsProps> = ({ onBack }) => {
  const [report, setReport] = useState<FleetReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: vehicles = [] } = useVehicles();

  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);
        const data = await aiApi.getFleetReport();
        setReport(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du rapport');
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, []);

  const statsData = [
    {
      name: 'Flotte',
      actifs: vehicles.filter(v => v.statut === 'ACTIF').length,
      maintenance: vehicles.filter(v => v.statut === 'EN_MAINTENANCE').length,
      horsService: vehicles.filter(v => v.statut === 'HORS_SERVICE' || v.statut === 'IMMOBILISÉ').length,
    },
  ];

  const complianceData = report
    ? [
        { name: 'Vert', value: report.complianceScore.green },
        { name: 'Orange', value: report.complianceScore.orange },
        { name: 'Rouge', value: report.complianceScore.red },
      ]
    : [];

  const expenseData = [
    { date: 'Jan', montant: 500000 },
    { date: 'Fév', montant: 750000 },
    { date: 'Mar', montant: 600000 },
    { date: 'Avr', montant: 800000 },
    { date: 'Mai', montant: 700000 },
  ];
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

      <GlassCard className="rounded-xl sm:rounded-2xl border border-gray-200/50 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Rapports intelligents</h2>

        {loading ? (
          <div className="text-center text-gray-500 py-8">Chargement du rapport...</div>
        ) : error ? (
          <div className="text-red-600 py-8">{error}</div>
        ) : report ? (
          <>
            <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
              <h3 className="font-semibold text-blue-800 mb-2">Résumé de la flotte</h3>
              <p className="text-sm text-blue-700 whitespace-pre-line">{report.summary}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <GlassCard className="p-4 sm:p-6">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-4">Statistiques des véhicules</h3>
                <VehicleStatsChart data={statsData} />
              </GlassCard>

              <GlassCard className="p-4 sm:p-6">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-4">Score de conformité</h3>
                {complianceData.length > 0 ? (
                  <ComplianceChart data={complianceData} />
                ) : (
                  <div className="text-center text-gray-500 py-8">Données non disponibles</div>
                )}
              </GlassCard>

              <GlassCard className="p-4 sm:p-6 lg:col-span-2">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-4">Évolution des dépenses</h3>
                <ExpenseChart data={expenseData} />
              </GlassCard>

              {report.recommendations.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:col-span-2">
                  <div className="flex items-start mb-3">
                    <i className="fas fa-exclamation-triangle text-amber-600 mt-1 mr-3 text-xl sm:text-2xl"></i>
                    <div>
                      <h3 className="font-semibold text-amber-800 text-sm sm:text-base mb-1">Recommandations</h3>
                      <ul className="text-xs sm:text-sm text-amber-700 list-disc list-inside space-y-1">
                        {report.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <GradientButton className="w-full">
              <i className="fas fa-download mr-2"></i>Exporter rapport complet
            </GradientButton>
          </>
        ) : null}
      </GlassCard>
    </div>
  );
};

