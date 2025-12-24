// Utilitaires de logging pour le backend AfriFleet

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`\x1b[36m[INFO]\x1b[0m ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`\x1b[32m[✓]\x1b[0m ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`\x1b[31m[✗]\x1b[0m ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`\x1b[33m[⚠]\x1b[0m ${message}`, ...args);
  },
  route: (method: string, path: string) => {
    const methodColors: Record<string, string> = {
      GET: '\x1b[32m',
      POST: '\x1b[33m',
      PUT: '\x1b[34m',
      DELETE: '\x1b[31m',
      PATCH: '\x1b[35m',
    };
    const color = methodColors[method] || '\x1b[36m';
    console.log(`${color}[${method}]\x1b[0m ${path}`);
  },
  request: (method: string, path: string, statusCode?: number) => {
    const statusColor = statusCode && statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    const status = statusCode ? ` ${statusColor}${statusCode}\x1b[0m` : '';
    console.log(`\x1b[35m[${new Date().toLocaleTimeString()}]\x1b[0m \x1b[36m${method}\x1b[0m ${path}${status}`);
  },
};

