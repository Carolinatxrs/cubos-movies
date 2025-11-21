import { Navigate, Outlet } from 'react-router'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { useAuth } from '@/contexts'

export function AppLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />
  }

  return (
    <main className="h-dvh flex flex-col dark:bg-cinema">
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}
