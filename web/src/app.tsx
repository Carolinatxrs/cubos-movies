import { RouterProvider } from 'react-router'

import { ThemeProvider } from './contexts/theme-provider'
import { router } from './router'

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
