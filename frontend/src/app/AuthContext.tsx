import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService, User, UserRole } from '@/services/auth'

export type Role = UserRole

type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedAuth = authService.getStoredAuth()
    if (storedAuth?.user) {
      setUser(storedAuth.user)
    }

    // Écouter les événements de logout depuis api.ts
    const handleLogoutEvent = () => {
      setUser(null)
    }

    window.addEventListener('afrifleet:logout', handleLogoutEvent)

    return () => {
      window.removeEventListener('afrifleet:logout', handleLogoutEvent)
    }
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

