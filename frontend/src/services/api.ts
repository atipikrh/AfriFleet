const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE || '/api';
const REQUEST_TIMEOUT = 30000; // 30 secondes

interface ApiError extends Error {
  status?: number;
  code?: string;
}

function getAuthToken(): string | null {
  const rememberMe = localStorage.getItem('afrifleet_remember');
  const storage = rememberMe === 'true' ? localStorage : sessionStorage;
  const stored = storage.getItem('afrifleet_auth');
  
  if (!stored) return null;
  
  try {
    const auth = JSON.parse(stored);
    return auth?.token || null;
  } catch {
    return null;
  }
}

function createTimeoutPromise(timeout: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('La requête a pris trop de temps. Veuillez réessayer.'));
    }, timeout);
  });
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await Promise.race([
      fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      }),
      createTimeoutPromise(REQUEST_TIMEOUT),
    ]);

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = 'Erreur inconnue';
      let errorData: { error?: string; message?: string } = {};

      try {
        errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        errorMessage = `Erreur HTTP: ${response.status}`;
      }

      const error: ApiError = new Error(errorMessage);
      error.status = response.status;

      if (response.status === 401) {
        error.code = 'UNAUTHORIZED';
        localStorage.removeItem('afrifleet_auth');
        localStorage.removeItem('afrifleet_remember');
        sessionStorage.removeItem('afrifleet_auth');
        
        // Déclencher un événement pour notifier AuthContext
        window.dispatchEvent(new CustomEvent('afrifleet:logout'));
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      throw error;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response as unknown as T;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        const timeoutError: ApiError = new Error('La requête a pris trop de temps. Veuillez réessayer.');
        timeoutError.code = 'TIMEOUT';
        throw timeoutError;
      }
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        const networkError: ApiError = new Error('Erreur de connexion. Vérifiez votre connexion internet.');
        networkError.code = 'NETWORK_ERROR';
        throw networkError;
      }
    }
    
    throw error;
  }
}

export const api = {
  get: <T>(endpoint: string) => fetchAPI<T>(endpoint, { method: 'GET' }),
  
  post: <T>(endpoint: string, data?: unknown) =>
    fetchAPI<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
  
  put: <T>(endpoint: string, data?: unknown) =>
    fetchAPI<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
  
  delete: <T>(endpoint: string) => fetchAPI<T>(endpoint, { method: 'DELETE' }),
};

