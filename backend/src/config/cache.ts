import NodeCache from 'node-cache';

/**
 * Configuration du cache en mémoire
 * TTL par défaut : 10 minutes
 */
export const cache = new NodeCache({
  stdTTL: 600, // 10 minutes par défaut
  checkperiod: 120, // Vérifier les entrées expirées toutes les 2 minutes
  useClones: false, // Performance : ne pas cloner les objets
});

/**
 * Utilitaires pour le cache
 */
export const cacheUtils = {
  /**
   * Récupère une valeur du cache ou exécute la fonction et met en cache
   */
  async getOrSet<T>(
    key: string,
    fetchFunction: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = cache.get<T>(key);
    if (cached !== undefined) {
      return cached;
    }

    const value = await fetchFunction();
    cache.set(key, value, ttl || 600);
    return value;
  },

  /**
   * Invalide un cache par pattern
   */
  invalidatePattern(pattern: string): void {
    const keys = cache.keys();
    const regex = new RegExp(pattern);
    keys.forEach((key) => {
      if (regex.test(key)) {
        cache.del(key);
      }
    });
  },
};

