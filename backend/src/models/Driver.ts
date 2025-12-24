export interface Driver {
  id: string;
  nom: string;
  permis_expiration: string;
  score_conformite: 'VERT' | 'ORANGE' | 'ROUGE';
  telephone?: string;
  email?: string;
}

