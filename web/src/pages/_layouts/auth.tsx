import { Outlet } from 'react-router'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export function AuthLayout() {
  return (
    <main className="h-dvh flex flex-col dark:bg-cinema">
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}
