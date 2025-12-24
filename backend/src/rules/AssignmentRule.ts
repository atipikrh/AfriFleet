import { DataService } from '../services/DataService.js';

export class AssignmentRule {
  static validateAssignment(
    vehicleId: string,
    driverId: string,
    modeDoubleEquipage: boolean = false
  ): { valid: boolean; message: string } {
    const vehicle = DataService.getVehicleById(vehicleId);
    
    if (!vehicle) {
      return { valid: false, message: 'Véhicule non trouvé' };
    }

    // Vérifier si le véhicule a déjà un conducteur actif
    const activeAssignments = DataService.getActiveAssignmentsByVehicle(vehicleId);
    
    if (activeAssignments.length > 0 && !modeDoubleEquipage) {
      const existingDriver = DataService.getDriverById(activeAssignments[0].driver_id);
      return {
        valid: false,
        message: `Le véhicule a déjà un conducteur actif: ${existingDriver?.nom || 'Inconnu'}. Activez le mode double équipage pour ajouter un second conducteur.`
      };
    }

    // Si mode double équipage, vérifier qu'il n'y a pas déjà 2 conducteurs
    if (modeDoubleEquipage && activeAssignments.length >= 2) {
      return {
        valid: false,
        message: 'Le véhicule a déjà deux conducteurs assignés en mode double équipage.'
      };
    }

    return { valid: true, message: 'Affectation valide' };
  }
}

