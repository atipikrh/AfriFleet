import { useState, useEffect } from 'react';

/**
 * Hook pour gérer le localStorage de manière synchrone avec React
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // État pour stocker la valeur
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture du localStorage pour la clé "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur dans le state et le localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permet de passer une fonction comme setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur lors de l'écriture dans le localStorage pour la clé "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

