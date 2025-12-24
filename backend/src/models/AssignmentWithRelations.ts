import { Assignment } from './Assignment.js';
import { Vehicle } from './Vehicle.js';
import { Driver } from './Driver.js';

export interface AssignmentWithRelations extends Assignment {
  vehicle?: Vehicle;
  driver?: Driver;
  conducteur_secondaire?: Driver | null;
}

