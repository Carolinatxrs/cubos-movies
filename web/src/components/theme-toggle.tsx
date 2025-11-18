import { MoonIcon } from '@/assets/moon-icon'
import { SunIcon } from '@/assets/sun-icon'
import { useTheme } from '@/hooks/useTheme'

import { Button } from './ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant="secondary" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
