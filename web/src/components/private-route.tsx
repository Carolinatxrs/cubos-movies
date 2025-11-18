// src/components/private-route.tsx
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '@/contexts/auth-provider'

interface PrivateRouteProps {
  children: React.ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const normalizedPathname = location.pathname.replace(/^\/app/, '')
    const from = normalizedPathname || '/'
    
    return <Navigate to="/auth/sign-in" state={{ from: { pathname: from } }} replace />
  }

  return <>{children}</>
}