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

