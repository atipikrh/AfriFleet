import React, { createContext, useContext, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Vehicle } from '../services/vehiclesApi';
import { Driver } from '../services/driversApi';
import { useVehicles, useDrivers } from '../hooks';

interface AppContextType {
  vehicles: Vehicle[];
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  refreshVehicles: () => Promise<void>;
  refreshDrivers: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: vehicles = [], isLoading: vehiclesLoading, error: vehiclesError } = useVehicles();
  const { data: drivers = [], isLoading: driversLoading, error: driversError } = useDrivers();
  const queryClient = useQueryClient();

  const loading = vehiclesLoading || driversLoading;
  const error = vehiclesError ? (vehiclesError instanceof Error ? vehiclesError.message : 'Erreur inconnue') 
    : driversError ? (driversError instanceof Error ? driversError.message : 'Erreur inconnue')
    : null;

  const refreshVehicles = async () => {
    await queryClient.invalidateQueries({ queryKey: ['vehicles'] });
  };

  const refreshDrivers = async () => {
    await queryClient.invalidateQueries({ queryKey: ['drivers'] });
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        drivers,
        loading,
        error,
        refreshVehicles,
        refreshDrivers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp doit être utilisé dans un AppProvider');
  }
  return context;
};

