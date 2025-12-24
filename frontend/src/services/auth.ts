import { api } from './api';

export type UserRole = 'manager' | 'driver' | 'workshop';

export interface User {
  id: string;
  identifier: string;
  role: UserRole;
  nom: string;
  email?: string;
  telephone?: string;
  actif: boolean;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
  role: UserRole;
  rememberMe?: boolean;
}

const AUTH_STORAGE_KEY = 'afrifleet_auth';
const REMEMBER_ME_KEY = 'afrifleet_remember';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    
    if (response.success) {
      if (credentials.rememberMe) {
        localStorage.setItem(REMEMBER_ME_KEY, 'true');
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          user: response.user,
          token: response.token,
        }));
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          user: response.user,
          token: response.token,
        }));
      }
    }
    
    return response;
  },

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(REMEMBER_ME_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  },

  getStoredAuth(): { user: User; token: string } | null {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY);
    const storage = rememberMe === 'true' ? localStorage : sessionStorage;
    const stored = storage.getItem(AUTH_STORAGE_KEY);
    
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getStoredAuth() !== null;
  },

  getCurrentUser(): User | null {
    const auth = this.getStoredAuth();
    return auth?.user || null;
  },

  getToken(): string | null {
    const auth = this.getStoredAuth();
    return auth?.token || null;
  },
};

