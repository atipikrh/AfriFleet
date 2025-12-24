import { DataService } from './DataService.js';
import { ComplianceScoringRule } from '../rules/ComplianceScoringRule.js';
import { Vehicle } from '../models/Vehicle.js';
import { Driver } from '../models/Driver.js';

export class BusinessRulesService {
  // Appliquer le scoring de conformité automatiquement
  static applyComplianceScoring(): void {
    const vehicles = DataService.getVehicles();
    const drivers = DataService.getDrivers();

    vehicles.forEach(vehicle => {
      const driver = vehicle.conducteur_actif_id
        ? drivers.find(d => d.id === vehicle.conducteur_actif_id)
        : null;

      const score = ComplianceScoringRule.calculateVehicleScore(vehicle, driver || null);
      
      if (vehicle.score_conformite !== score) {
        DataService.updateVehicle(vehicle.id, { score_conformite: score });
      }
    });

    drivers.forEach(driver => {
      const score = ComplianceScoringRule.calculateDriverScore(driver);
      
      if (driver.score_conformite !== score) {
        DataService.updateDriver(driver.id, { score_conformite: score });
      }
    });
  }

  // Appliquer toutes les règles métier
  static applyAllRules(): void {
    this.applyComplianceScoring();
  }
}

