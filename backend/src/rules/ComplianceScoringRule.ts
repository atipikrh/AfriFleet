import { Vehicle } from '../models/Vehicle.js';
import { Driver } from '../models/Driver.js';

export class ComplianceScoringRule {
  static calculateVehicleScore(vehicle: Vehicle, driver: Driver | null): 'VERT' | 'ORANGE' | 'ROUGE' {
    // Vérifier permis conducteur
    if (driver) {
      const permisExpired = this.isExpired(driver.permis_expiration);
      if (permisExpired) {
        return 'ROUGE';
      }
    }

    // Vérifier assurance
    if (vehicle.assurance_expiration) {
      const assuranceExpired = this.isExpired(vehicle.assurance_expiration);
      if (assuranceExpired) {
        return 'ROUGE';
      }
    }

    // Vérifier entretien
    if (vehicle.entretien_prochain) {
      const entretienDepasse = this.isExpired(vehicle.entretien_prochain);
      if (entretienDepasse) {
        return 'ORANGE';
      }
    }

    return 'VERT';
  }

  static calculateDriverScore(driver: Driver): 'VERT' | 'ORANGE' | 'ROUGE' {
    const permisExpired = this.isExpired(driver.permis_expiration);
    if (permisExpired) {
      return 'ROUGE';
    }

    // Vérifier si le permis expire dans moins de 30 jours
    const expiresSoon = this.expiresWithinDays(driver.permis_expiration, 30);
    if (expiresSoon) {
      return 'ORANGE';
    }

    return 'VERT';
  }

  private static isExpired(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  private static expiresWithinDays(dateString: string, days: number): boolean {
    const date = new Date(dateString);
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);
    return date <= futureDate && date >= today;
  }
}

