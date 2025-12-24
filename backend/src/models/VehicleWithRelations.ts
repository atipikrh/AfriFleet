import { Vehicle } from './Vehicle.js';
import { Driver } from './Driver.js';
import { Assignment } from './Assignment.js';
import { Expense } from './Expense.js';
import { Checklist } from './Checklist.js';

export interface VehicleWithRelations extends Vehicle {
  conducteur_actif?: Driver | null;
  assignments?: Assignment[];
  expenses?: Expense[];
  checklists?: Checklist[];
}

