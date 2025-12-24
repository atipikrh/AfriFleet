import { DataService } from './DataService.js';
import { Expense } from '../models/Expense.js';

export class AIService {
  static async analyzeFuelExpenses(vehicleId: string, days: number = 30): Promise<{
    vehicleId: string;
    period: number;
    totalExpenses: number;
    totalLiters: number;
    averagePricePerLiter: number;
    averageConsumption: number;
    anomalies: string[];
    recommendations: string[];
  }> {
    // Récupérer les dépenses carburant du véhicule
    const expenses = DataService.getExpensesByVehicle(vehicleId)
      .filter(e => e.type === 'CARBURANT')
      .filter(e => {
        const expenseDate = new Date(e.date);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        return expenseDate >= cutoffDate;
      });

    const totalExpenses = expenses.reduce((sum, e) => sum + e.montant, 0);
    const totalLiters = expenses.reduce((sum, e) => sum + (e.quantite_litres || 0), 0);
    const averagePricePerLiter = totalLiters > 0 ? totalExpenses / totalLiters : 0;

    // Calculer consommation moyenne (simulation)
    const vehicle = DataService.getVehicleById(vehicleId);
    const averageConsumption = vehicle ? (totalLiters / (days / 30)) : 0;

    // Détecter anomalies (mock)
    const anomalies: string[] = [];
    const recommendations: string[] = [];

    if (averagePricePerLiter > 1200) {
      anomalies.push('Prix du carburant anormalement élevé détecté');
      recommendations.push('Vérifier les tickets de carburant et comparer avec les prix du marché');
    }

    if (averageConsumption > 15) {
      anomalies.push('Consommation excessive détectée');
      recommendations.push('Vérifier l\'état des pneus, la pression et l\'entretien du véhicule');
    }

    if (expenses.length === 0) {
      recommendations.push('Aucune dépense carburant enregistrée pour cette période');
    }

    return {
      vehicleId,
      period: days,
      totalExpenses,
      totalLiters,
      averagePricePerLiter,
      averageConsumption,
      anomalies,
      recommendations,
    };
  }

  static async generateFleetReport(): Promise<{
    summary: string;
    totalVehicles: number;
    activeVehicles: number;
    vehiclesInMaintenance: number;
    immobilizedVehicles: number;
    complianceScore: {
      green: number;
      orange: number;
      red: number;
    };
    recommendations: string[];
  }> {
    const vehicles = DataService.getVehicles();
    const drivers = DataService.getDrivers();
    const assignments = DataService.getAssignments();

    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter(v => v.statut === 'ACTIF').length;
    const vehiclesInMaintenance = vehicles.filter(v => v.statut === 'EN_MAINTENANCE').length;
    const immobilizedVehicles = vehicles.filter(v => v.statut === 'IMMOBILISÉ').length;

    const complianceScore = {
      green: vehicles.filter(v => v.score_conformite === 'VERT').length,
      orange: vehicles.filter(v => v.score_conformite === 'ORANGE').length,
      red: vehicles.filter(v => v.score_conformite === 'ROUGE').length,
    };

    // Générer résumé (mock)
    const summary = `
      Résumé de la performance de la flotte AfriFleet :
      
      Sur ${totalVehicles} véhicules au total, ${activeVehicles} sont actuellement en service,
      ${vehiclesInMaintenance} en maintenance, et ${immobilizedVehicles} immobilisés pour raisons de sécurité.
      
      Score de conformité : ${complianceScore.green} véhicules en vert (conformes),
      ${complianceScore.orange} en orange (attention requise), et ${complianceScore.red} en rouge (non conformes).
      
      ${activeVehicles > 0 ? `Taux d'utilisation : ${((activeVehicles / totalVehicles) * 100).toFixed(1)}%` : 'Aucun véhicule actif'}
    `.trim();

    const recommendations: string[] = [];

    if (complianceScore.red > 0) {
      recommendations.push(`${complianceScore.red} véhicule(s) nécessitent une attention immédiate (permis expiré, assurance, etc.)`);
    }

    if (complianceScore.orange > 0) {
      recommendations.push(`${complianceScore.orange} véhicule(s) nécessitent une vérification prochaine`);
    }

    if (immobilizedVehicles > 0) {
      recommendations.push(`${immobilizedVehicles} véhicule(s) sont immobilisés - intervention urgente requise`);
    }

    if (vehiclesInMaintenance > totalVehicles * 0.2) {
      recommendations.push('Taux de maintenance élevé - réviser le planning d\'entretien');
    }

    return {
      summary,
      totalVehicles,
      activeVehicles,
      vehiclesInMaintenance,
      immobilizedVehicles,
      complianceScore,
      recommendations,
    };
  }
}

