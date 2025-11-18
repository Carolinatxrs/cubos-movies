import { createContext, type ReactNode, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'cubos@theme-ui',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const rootElement = window.document.documentElement

    rootElement.classList.remove('light', 'dark')
    rootElement.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return <ThemeProviderContext value={value}>{children}</ThemeProviderContext>
}

export { ThemeProvider, ThemeProviderContext }
