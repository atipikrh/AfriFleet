import { api } from './api';
import { Driver } from './driversApi';
import { AssignmentWithRelations } from './assignmentsApi';
import { Expense } from './expensesApi';
import { ChecklistWithRelations } from './checklistsApi';

export interface Vehicle {
  id: string;
  immatriculation: string;
  statut: 'ACTIF' | 'EN_MAINTENANCE' | 'IMMOBILISÉ' | 'HORS_SERVICE';
  score_conformite: 'VERT' | 'ORANGE' | 'ROUGE';
  conducteur_actif_id: string | null;
  mode_double_equipage?: boolean;
  marque?: string;
  modele?: string;
  annee?: number;
  kilometrage?: number;
  type_carburant?: string;
  date_dernier_controle?: string;
  assurance_expiration?: string;
  entretien_prochain?: string;
}

export interface VehicleWithRelations extends Vehicle {
  conducteur_actif?: Driver | null;
  assignments?: AssignmentWithRelations[];
  expenses?: Expense[];
  checklists?: ChecklistWithRelations[];
}

export const vehiclesApi = {
  getAll: (withRelations = false) => 
    api.get<VehicleWithRelations[] | Vehicle[]>(`/vehicles${withRelations ? '?withRelations=true' : ''}`),
  getById: (id: string, withRelations = false) => 
    api.get<VehicleWithRelations | Vehicle>(`/vehicles/${id}${withRelations ? '?withRelations=true' : ''}`),
  create: (vehicle: Vehicle) => api.post<Vehicle>('/vehicles', vehicle),
  update: (id: string, updates: Partial<Vehicle>) =>
    api.put<Vehicle>(`/vehicles/${id}`, updates),
  delete: (id: string) => api.delete<void>(`/vehicles/${id}`),
};

