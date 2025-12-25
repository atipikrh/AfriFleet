import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehiclesApi, Vehicle, VehicleWithRelations } from '../services/vehiclesApi';

export const useVehicles = (withRelations = false) => {
  return useQuery({
    queryKey: ['vehicles', withRelations],
    queryFn: () => vehiclesApi.getAll(withRelations),
  });
};

export const useVehicle = (id: string, withRelations = false) => {
  return useQuery({
    queryKey: ['vehicles', id, withRelations],
    queryFn: () => vehiclesApi.getById(id, withRelations),
    enabled: !!id,
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (vehicle: Vehicle) => vehiclesApi.create(vehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
};

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Vehicle> }) =>
      vehiclesApi.update(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles', variables.id] });
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => vehiclesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
};

