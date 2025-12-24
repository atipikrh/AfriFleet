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

