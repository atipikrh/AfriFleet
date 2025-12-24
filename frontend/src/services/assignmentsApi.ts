import { api } from './api';
import { Vehicle } from './vehiclesApi';
import { Driver } from './driversApi';

export interface Assignment {
  id: string;
  vehicle_id: string;
  driver_id: string;
  date_debut: string;
  date_fin: string | null;
  statut: 'ACTIF' | 'TERMINE';
  mode_double_equipage?: boolean;
  conducteur_secondaire_id?: string | null;
}

export interface AssignmentWithRelations extends Assignment {
  vehicle?: Vehicle;
  driver?: Driver;
  conducteur_secondaire?: Driver | null;
}

export const assignmentsApi = {
  getAll: (withRelations = false) => 
    api.get<AssignmentWithRelations[] | Assignment[]>(`/assignments${withRelations ? '?withRelations=true' : ''}`),
  getById: (id: string, withRelations = false) => 
    api.get<AssignmentWithRelations | Assignment>(`/assignments/${id}${withRelations ? '?withRelations=true' : ''}`),
  getByVehicle: (vehicleId: string, withRelations = false) =>
    api.get<AssignmentWithRelations[] | Assignment[]>(`/assignments/vehicle/${vehicleId}${withRelations ? '?withRelations=true' : ''}`),
  create: (assignment: Assignment) => api.post<Assignment>('/assignments', assignment),
  update: (id: string, updates: Partial<Assignment>) =>
    api.put<Assignment>(`/assignments/${id}`, updates),
};

