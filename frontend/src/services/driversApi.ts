import { api } from './api';

export interface Driver {
  id: string;
  nom: string;
  permis_expiration: string;
  score_conformite: 'VERT' | 'ORANGE' | 'ROUGE';
  telephone?: string;
  email?: string;
}

export const driversApi = {
  getAll: () => api.get<Driver[]>('/drivers'),
  getById: (id: string) => api.get<Driver>(`/drivers/${id}`),
  create: (driver: Driver) => api.post<Driver>('/drivers', driver),
  update: (id: string, updates: Partial<Driver>) =>
    api.put<Driver>(`/drivers/${id}`, updates),
  delete: (id: string) => api.delete<void>(`/drivers/${id}`),
};

