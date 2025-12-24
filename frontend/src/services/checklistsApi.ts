import { api } from './api';
import { Vehicle } from './vehiclesApi';
import { Driver } from './driversApi';

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  anomalie_critique?: boolean;
}

export interface Checklist {
  id: string;
  vehicle_id: string;
  driver_id: string;
  date: string;
  items: ChecklistItem[];
  anomalies: string[];
  photo_url?: string;
  signature?: string;
}

export interface ChecklistWithRelations extends Checklist {
  vehicle?: Vehicle;
  driver?: Driver;
}

export const checklistsApi = {
  getAll: (withRelations = false) => 
    api.get<ChecklistWithRelations[] | Checklist[]>(`/checklists${withRelations ? '?withRelations=true' : ''}`),
  getById: (id: string, withRelations = false) => 
    api.get<ChecklistWithRelations | Checklist>(`/checklists/${id}${withRelations ? '?withRelations=true' : ''}`),
  getByVehicle: (vehicleId: string, withRelations = false) =>
    api.get<ChecklistWithRelations[] | Checklist[]>(`/checklists/vehicle/${vehicleId}${withRelations ? '?withRelations=true' : ''}`),
  create: (checklist: Checklist) => api.post<Checklist>('/checklists', checklist),
  update: (id: string, updates: Partial<Checklist>) =>
    api.put<Checklist>(`/checklists/${id}`, updates),
};

