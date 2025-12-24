import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Vehicle } from '../models/Vehicle.js';
import { Driver } from '../models/Driver.js';
import { Assignment } from '../models/Assignment.js';
import { Checklist } from '../models/Checklist.js';
import { Expense } from '../models/Expense.js';
import { VehicleWithRelations } from '../models/VehicleWithRelations.js';
import { AssignmentWithRelations } from '../models/AssignmentWithRelations.js';
import { ExpenseWithRelations } from '../models/ExpenseWithRelations.js';
import { ChecklistWithRelations } from '../models/ChecklistWithRelations.js';

// Détecter si on est dans backend/ ou à la racine
const isInBackend = process.cwd().endsWith('backend');
const DATA_DIR = isInBackend 
  ? join(process.cwd(), 'data')
  : join(process.cwd(), 'backend', 'data');

function getFilePath(filename: string): string {
  return join(DATA_DIR, filename);
}

function readJsonFile<T>(filename: string): T[] {
  const filePath = getFilePath(filename);
  if (!existsSync(filePath)) {
    return [];
  }
  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T[];
  } catch (error) {
    console.error(`Erreur lecture ${filename}:`, error);
    return [];
  }
}

function writeJsonFile<T>(filename: string, data: T[]): void {
  const filePath = getFilePath(filename);
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Erreur écriture ${filename}:`, error);
    throw error;
  }
}

export class DataService {
  // Vehicles
  static getVehicles(): Vehicle[] {
    return readJsonFile<Vehicle>('vehicles.json');
  }

  static getVehicleById(id: string): Vehicle | undefined {
    const vehicles = this.getVehicles();
    return vehicles.find(v => v.id === id);
  }

  static createVehicle(vehicle: Vehicle): Vehicle {
    const vehicles = this.getVehicles();
    vehicles.push(vehicle);
    writeJsonFile('vehicles.json', vehicles);
    return vehicle;
  }

  static updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | null {
    const vehicles = this.getVehicles();
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) return null;
    vehicles[index] = { ...vehicles[index], ...updates };
    writeJsonFile('vehicles.json', vehicles);
    return vehicles[index];
  }

  static deleteVehicle(id: string): boolean {
    const vehicles = this.getVehicles();
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) return false;
    vehicles.splice(index, 1);
    writeJsonFile('vehicles.json', vehicles);
    return true;
  }

  // Drivers
  static getDrivers(): Driver[] {
    return readJsonFile<Driver>('drivers.json');
  }

  static getDriverById(id: string): Driver | undefined {
    const drivers = this.getDrivers();
    return drivers.find(d => d.id === id);
  }

  static createDriver(driver: Driver): Driver {
    const drivers = this.getDrivers();
    drivers.push(driver);
    writeJsonFile('drivers.json', drivers);
    return driver;
  }

  static updateDriver(id: string, updates: Partial<Driver>): Driver | null {
    const drivers = this.getDrivers();
    const index = drivers.findIndex(d => d.id === id);
    if (index === -1) return null;
    drivers[index] = { ...drivers[index], ...updates };
    writeJsonFile('drivers.json', drivers);
    return drivers[index];
  }

  static deleteDriver(id: string): boolean {
    const drivers = this.getDrivers();
    const index = drivers.findIndex(d => d.id === id);
    if (index === -1) return false;
    drivers.splice(index, 1);
    writeJsonFile('drivers.json', drivers);
    return true;
  }

  // Assignments
  static getAssignments(): Assignment[] {
    return readJsonFile<Assignment>('assignments.json');
  }

  static getAssignmentById(id: string): Assignment | undefined {
    const assignments = this.getAssignments();
    return assignments.find(a => a.id === id);
  }

  static getActiveAssignmentsByVehicle(vehicleId: string): Assignment[] {
    const assignments = this.getAssignments();
    return assignments.filter(a => 
      a.vehicle_id === vehicleId && a.statut === 'ACTIF' && a.date_fin === null
    );
  }

  static createAssignment(assignment: Assignment): Assignment {
    const assignments = this.getAssignments();
    assignments.push(assignment);
    writeJsonFile('assignments.json', assignments);
    return assignment;
  }

  static updateAssignment(id: string, updates: Partial<Assignment>): Assignment | null {
    const assignments = this.getAssignments();
    const index = assignments.findIndex(a => a.id === id);
    if (index === -1) return null;
    assignments[index] = { ...assignments[index], ...updates };
    writeJsonFile('assignments.json', assignments);
    return assignments[index];
  }

  // Checklists
  static getChecklists(): Checklist[] {
    return readJsonFile<Checklist>('checklists.json');
  }

  static getChecklistById(id: string): Checklist | undefined {
    const checklists = this.getChecklists();
    return checklists.find(c => c.id === id);
  }

  static getChecklistsByVehicle(vehicleId: string): Checklist[] {
    const checklists = this.getChecklists();
    return checklists.filter(c => c.vehicle_id === vehicleId);
  }

  static createChecklist(checklist: Checklist): Checklist {
    const checklists = this.getChecklists();
    checklists.push(checklist);
    writeJsonFile('checklists.json', checklists);
    return checklist;
  }

  static updateChecklist(id: string, updates: Partial<Checklist>): Checklist | null {
    const checklists = this.getChecklists();
    const index = checklists.findIndex(c => c.id === id);
    if (index === -1) return null;
    checklists[index] = { ...checklists[index], ...updates };
    writeJsonFile('checklists.json', checklists);
    return checklists[index];
  }

  // Expenses
  static getExpenses(): Expense[] {
    return readJsonFile<Expense>('expenses.json');
  }

  static getExpenseById(id: string): Expense | undefined {
    const expenses = this.getExpenses();
    return expenses.find(e => e.id === id);
  }

  static getExpensesByVehicle(vehicleId: string): Expense[] {
    const expenses = this.getExpenses();
    return expenses.filter(e => e.vehicle_id === vehicleId);
  }

  static createExpense(expense: Expense): Expense {
    const expenses = this.getExpenses();
    expenses.push(expense);
    writeJsonFile('expenses.json', expenses);
    return expense;
  }

  static updateExpense(id: string, updates: Partial<Expense>): Expense | null {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index === -1) return null;
    expenses[index] = { ...expenses[index], ...updates };
    writeJsonFile('expenses.json', expenses);
    return expenses[index];
  }

  // Méthodes avec relations
  static getVehicleWithRelations(id: string): VehicleWithRelations | null {
    const vehicle = this.getVehicleById(id);
    if (!vehicle) return null;

    const drivers = this.getDrivers();
    const assignments = this.getAssignments();
    const expenses = this.getExpenses();
    const checklists = this.getChecklists();

    return {
      ...vehicle,
      conducteur_actif: vehicle.conducteur_actif_id 
        ? drivers.find(d => d.id === vehicle.conducteur_actif_id) || null
        : null,
      assignments: assignments.filter(a => a.vehicle_id === id),
      expenses: expenses.filter(e => e.vehicle_id === id),
      checklists: checklists.filter(c => c.vehicle_id === id),
    };
  }

  static getVehiclesWithRelations(): VehicleWithRelations[] {
    const vehicles = this.getVehicles();
    return vehicles.map(v => this.getVehicleWithRelations(v.id)!).filter(Boolean);
  }

  static getAssignmentWithRelations(id: string): AssignmentWithRelations | null {
    const assignment = this.getAssignmentById(id);
    if (!assignment) return null;

    const vehicles = this.getVehicles();
    const drivers = this.getDrivers();

    return {
      ...assignment,
      vehicle: vehicles.find(v => v.id === assignment.vehicle_id),
      driver: drivers.find(d => d.id === assignment.driver_id),
      conducteur_secondaire: assignment.conducteur_secondaire_id
        ? drivers.find(d => d.id === assignment.conducteur_secondaire_id) || null
        : null,
    };
  }

  static getAssignmentsWithRelations(): AssignmentWithRelations[] {
    const assignments = this.getAssignments();
    return assignments.map(a => this.getAssignmentWithRelations(a.id)!).filter(Boolean);
  }

  static getExpenseWithRelations(id: string): ExpenseWithRelations | null {
    const expense = this.getExpenseById(id);
    if (!expense) return null;

    const vehicles = this.getVehicles();

    return {
      ...expense,
      vehicle: vehicles.find(v => v.id === expense.vehicle_id),
    };
  }

  static getExpensesWithRelations(): ExpenseWithRelations[] {
    const expenses = this.getExpenses();
    return expenses.map(e => this.getExpenseWithRelations(e.id)!).filter(Boolean);
  }

  static getExpensesByVehicleWithRelations(vehicleId: string): ExpenseWithRelations[] {
    const expenses = this.getExpensesByVehicle(vehicleId);
    return expenses.map(e => this.getExpenseWithRelations(e.id)!).filter(Boolean);
  }

  static getChecklistWithRelations(id: string): ChecklistWithRelations | null {
    const checklist = this.getChecklistById(id);
    if (!checklist) return null;

    const vehicles = this.getVehicles();
    const drivers = this.getDrivers();

    return {
      ...checklist,
      vehicle: vehicles.find(v => v.id === checklist.vehicle_id),
      driver: drivers.find(d => d.id === checklist.driver_id),
    };
  }

  static getChecklistsWithRelations(): ChecklistWithRelations[] {
    const checklists = this.getChecklists();
    return checklists.map(c => this.getChecklistWithRelations(c.id)!).filter(Boolean);
  }

  static getChecklistsByVehicleWithRelations(vehicleId: string): ChecklistWithRelations[] {
    const checklists = this.getChecklistsByVehicle(vehicleId);
    return checklists.map(c => this.getChecklistWithRelations(c.id)!).filter(Boolean);
  }
}

