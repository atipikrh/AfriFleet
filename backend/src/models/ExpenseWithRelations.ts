import { Expense } from './Expense.js';
import { Vehicle } from './Vehicle.js';

export interface ExpenseWithRelations extends Expense {
  vehicle?: Vehicle;
}

