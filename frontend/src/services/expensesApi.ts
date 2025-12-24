import { api } from './api';
import { Vehicle } from './vehiclesApi';

export interface Expense {
  id: string;
  vehicle_id: string;
  type: 'CARBURANT' | 'MAINTENANCE' | 'REPARATION' | 'ASSURANCE' | 'AUTRE';
  montant: number;
  date: string;
  description?: string;
  photo_url?: string;
  kilometrage?: number;
  quantite_litres?: number;
  prix_unitaire?: number;
}

export interface ExpenseWithRelations extends Expense {
  vehicle?: Vehicle;
}

export const expensesApi = {
  getAll: (withRelations = false) => 
    api.get<ExpenseWithRelations[] | Expense[]>(`/expenses${withRelations ? '?withRelations=true' : ''}`),
  getById: (id: string, withRelations = false) => 
    api.get<ExpenseWithRelations | Expense>(`/expenses/${id}${withRelations ? '?withRelations=true' : ''}`),
  getByVehicle: (vehicleId: string, withRelations = false) =>
    api.get<ExpenseWithRelations[] | Expense[]>(`/expenses/vehicle/${vehicleId}${withRelations ? '?withRelations=true' : ''}`),
  create: (expense: Expense) => api.post<Expense>('/expenses', expense),
  update: (id: string, updates: Partial<Expense>) =>
    api.put<Expense>(`/expenses/${id}`, updates),
};

