import { useState, useEffect } from 'react';
import { useMediaQuery as useReactResponsiveMediaQuery } from 'react-responsive';

/**
 * Hook personnalisé pour les media queries avec support SSR
 */
export const useMediaQuery = (query: string | number) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof query === 'string') {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const handler = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Si c'est un nombre, on l'utilise comme breakpoint
      const mediaQuery = window.matchMedia(`(min-width: ${query}px)`);
      setMatches(mediaQuery.matches);

      const handler = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [query]);

  return matches;
};

/**
 * Hooks pré-configurés pour les breakpoints courants
 */
export const useIsMobile = () => useReactResponsiveMediaQuery({ maxWidth: 767 });
export const useIsTablet = () => useReactResponsiveMediaQuery({ minWidth: 768, maxWidth: 1023 });
export const useIsDesktop = () => useReactResponsiveMediaQuery({ minWidth: 1024 });
export const useIsLargeDesktop = () => useReactResponsiveMediaQuery({ minWidth: 1280 });

