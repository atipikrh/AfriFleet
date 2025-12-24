import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

/**
 * Configuration de sécurité avec Helmet
 */
export const securityConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false, // Désactivé pour compatibilité
});

/**
 * Configuration du rate limiting
 */
export const rateLimitConfig = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par windowMs
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.',
  standardHeaders: true, // Retourne les infos de rate limit dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
});

/**
 * Rate limiting strict pour les routes d'authentification
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite à 5 tentatives de connexion
  message: 'Trop de tentatives de connexion, veuillez réessayer plus tard.',
  skipSuccessfulRequests: true, // Ne pas compter les requêtes réussies
});

