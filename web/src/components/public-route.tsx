import { Navigate } from 'react-router'
import { useAuth } from '@/contexts/auth-provider'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/app/movies" replace />
  }

  return <>{children}</>
}