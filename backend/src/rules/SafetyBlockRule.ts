import { DataService } from '../services/DataService.js';
import { Checklist } from '../models/Checklist.js';

export class SafetyBlockRule {
  // Définir les types d'anomalies critiques
  private static CRITICAL_ANOMALIES = [
    'freins défectueux',
    'frein à main défectueux',
    'pneus usés',
    'pneus crevés',
    'système de freinage défaillant',
    'direction défectueuse',
    'feux de stop non fonctionnels',
  ];

  static checkAndBlockVehicle(vehicleId: string, checklist: Checklist): void {
    const vehicle = DataService.getVehicleById(vehicleId);
    if (!vehicle) return;

    // Vérifier si la checklist contient des anomalies critiques
    const hasCriticalAnomaly = this.hasCriticalAnomaly(checklist);

    if (hasCriticalAnomaly) {
      // Bloquer le véhicule
      DataService.updateVehicle(vehicleId, {
        statut: 'IMMOBILISÉ'
      });
    } else if (vehicle.statut === 'IMMOBILISÉ') {
      // Si plus d'anomalies critiques, remettre en ACTIF si toutes les anomalies sont résolues
      const allItemsChecked = checklist.items.every(item => item.checked);
      if (allItemsChecked && checklist.anomalies.length === 0) {
        DataService.updateVehicle(vehicleId, {
          statut: 'ACTIF'
        });
      }
    }
  }

  private static hasCriticalAnomaly(checklist: Checklist): boolean {
    // Vérifier les items avec anomalie_critique = true
    const hasCriticalItem = checklist.items.some(
      item => !item.checked && item.anomalie_critique === true
    );

    // Vérifier les anomalies textuelles
    const hasCriticalAnomalyText = checklist.anomalies.some(anomaly =>
      this.CRITICAL_ANOMALIES.some(critical =>
        anomaly.toLowerCase().includes(critical.toLowerCase())
      )
    );

    return hasCriticalItem || hasCriticalAnomalyText;
  }

  static getCriticalAnomalies(): string[] {
    return [...this.CRITICAL_ANOMALIES];
  }
}

