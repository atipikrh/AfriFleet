import { Checklist } from './Checklist.js';
import { Vehicle } from './Vehicle.js';
import { Driver } from './Driver.js';

export interface ChecklistWithRelations extends Checklist {
  vehicle?: Vehicle;
  driver?: Driver;
}

