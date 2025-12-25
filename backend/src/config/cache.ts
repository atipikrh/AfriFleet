import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 600, // 10 minutes par défaut
  checkperiod: 120, // Vérifier les entrées expirées toutes les 2 minutes
  useClones: false, // Performance: ne pas cloner les objets
});

export const cacheUtils = {
  get: <T>(key: string): T | undefined => {
    return cache.get<T>(key);
  },

  set: <T>(key: string, value: T, ttl?: number): boolean => {
    return cache.set(key, value, ttl || 600);
  },

  getOrSet: async <T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl?: number
  ): Promise<T> => {
    const cached = cache.get<T>(key);
    if (cached !== undefined) {
      return cached;
    }

    const value = await fetchFn();
    cache.set(key, value, ttl || 600);
    return value;
  },

  delete: (key: string): number => {
    return cache.del(key);
  },

  clear: (): void => {
    cache.flushAll();
  },

  has: (key: string): boolean => {
    return cache.has(key);
  },
};

