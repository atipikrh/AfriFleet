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

