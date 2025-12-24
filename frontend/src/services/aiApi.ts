import { api } from './api';

export interface FuelAnalysis {
  vehicleId: string;
  period: number;
  totalExpenses: number;
  totalLiters: number;
  averagePricePerLiter: number;
  averageConsumption: number;
  anomalies: string[];
  recommendations: string[];
}

export interface FleetReport {
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
}

export const aiApi = {
  analyzeFuel: (vehicleId: string, days: number = 30) =>
    api.get<FuelAnalysis>(`/ai/analyze-fuel/${vehicleId}?days=${days}`),
  getFleetReport: () => api.get<FleetReport>('/ai/fleet-report'),
};

