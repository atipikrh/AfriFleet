import winston from 'winston';
import morgan from 'morgan';

/**
 * Configuration Winston pour le logging structuré
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'afrifleet-backend' },
  transports: [
    // Écrire tous les logs dans console.log
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, ...meta }) =>
            `${timestamp} [${level}]: ${message} ${
              Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
            }`
        )
      ),
    }),
  ],
});

/**
 * Configuration Morgan pour le logging HTTP
 */
export const httpLogger = morgan('combined', {
  stream: {
    write: (message: string) => {
      logger.info(message.trim());
    },
  },
});

