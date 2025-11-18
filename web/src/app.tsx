import { RouterProvider } from 'react-router'

import { ThemeProvider } from './contexts/theme-provider'
import { router } from './router'
import { AuthProvider } from './contexts/auth-provider'
import { Toaster } from 'sonner'

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  )
}
