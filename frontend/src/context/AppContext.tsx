import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vehicle } from '../services/vehiclesApi';
import { Driver } from '../services/driversApi';
import { vehiclesApi } from '../services/vehiclesApi';
import { driversApi } from '../services/driversApi';

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshVehicles = async () => {
    try {
      const data = await vehiclesApi.getAll();
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des véhicules');
    }
  };

  const refreshDrivers = async () => {
    try {
      const data = await driversApi.getAll();
      setDrivers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des conducteurs');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([refreshVehicles(), refreshDrivers()]);
      setLoading(false);
    };
    loadData();
  }, []);

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

