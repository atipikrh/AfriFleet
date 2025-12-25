import { useQuery } from '@tanstack/react-query';
import { driversApi } from '../services/driversApi';

export const useDrivers = () => {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: () => driversApi.getAll(),
  });
};

export const useDriver = (id: string) => {
  return useQuery({
    queryKey: ['drivers', id],
    queryFn: () => driversApi.getById(id),
    enabled: !!id,
  });
};

