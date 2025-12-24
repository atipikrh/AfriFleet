import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Configuration du client React Query avec cache et synchronisation
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache par défaut : 5 minutes
      staleTime: 1000 * 60 * 5,
      // Garder les données en cache même si non utilisées : 10 minutes
      gcTime: 1000 * 60 * 10,
      // Réessayer automatiquement en cas d'erreur
      retry: 3,
      // Délai entre les tentatives
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Référencer les données même si le composant est démonté
      refetchOnWindowFocus: true,
      // Référencer lors de la reconnexion réseau
      refetchOnReconnect: true,
      // Ne pas référencer au montage si les données sont fraîches
      refetchOnMount: true,
    },
    mutations: {
      // Réessayer les mutations en cas d'erreur
      retry: 1,
      // Délai entre les tentatives pour les mutations
      retryDelay: 1000,
    },
  },
});

// Provider React Query pour l'application
export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

