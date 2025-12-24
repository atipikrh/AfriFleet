export type UserRole = 'manager' | 'driver' | 'workshop';

export interface User {
  id: string;
  identifier: string;
  password: string;
  role: UserRole;
  nom: string;
  email?: string;
  telephone?: string;
  actif: boolean;
}

