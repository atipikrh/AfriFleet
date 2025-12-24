import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { aiApi, FleetReport } from '../services/aiApi';

interface AIReportsProps {
  onBack: () => void;
}

export const AIReports: React.FC<AIReportsProps> = ({ onBack }) => {
  const [report, setReport] = useState<FleetReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-start mb-3">
                  <i className="fas fa-chart-line text-green-600 mt-1 mr-3 text-xl sm:text-2xl"></i>
                  <div>
                    <h3 className="font-semibold text-green-800 text-sm sm:text-base mb-1">Score de conformité</h3>
                    <p className="text-xs sm:text-sm text-green-700">
                      Vert: {report.complianceScore.green} • Orange: {report.complianceScore.orange} • Rouge: {report.complianceScore.red}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-start mb-3">
                  <i className="fas fa-truck text-purple-600 mt-1 mr-3 text-xl sm:text-2xl"></i>
                  <div>
                    <h3 className="font-semibold text-purple-800 text-sm sm:text-base mb-1">Statut véhicules</h3>
                    <p className="text-xs sm:text-sm text-purple-700">
                      Actifs: {report.activeVehicles} • Maintenance: {report.vehiclesInMaintenance} • Immobilisés: {report.immobilizedVehicles}
                    </p>
                  </div>
                </div>
              </div>

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

