import { Navigate } from 'react-router-dom'
import { useAuth, Role } from '@/app/AuthContext'

export function ProtectedRoute({
  children,
  roles,
}: {
  children: JSX.Element
  roles?: Role[]
}) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

