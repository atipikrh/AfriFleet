import { format as formatDateFn, formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Formate une date selon un pattern donné
 */
export const formatDate = (date: Date | string, pattern: string = 'dd/MM/yyyy') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDateFn(dateObj, pattern, { locale: fr });
};

/**
 * Formate une date en temps relatif (ex: "il y a 2 heures")
 */
export const formatRelativeTime = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: fr });
};

/**
 * Formate un nombre en devise
 */
export const formatCurrency = (amount: number, currency: string = 'XOF') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formate un nombre avec séparateurs
 */
export const formatNumber = (value: number, decimals: number = 0) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

