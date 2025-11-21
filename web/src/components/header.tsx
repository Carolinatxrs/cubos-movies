import { useLocation, useNavigate } from 'react-router'

import { Logo } from '@/assets/logo'
import { LogoIcon } from '@/assets/logo-icon'
import { useAuth } from '@/contexts'

import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

export function Header() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isLoginPage = location.pathname === '/auth/sign-in'
  const isSignUpPage = location.pathname === '/auth/sign-up'

  const handleLogout = () => {
    logout()
  }

  const handleToggleAuth = () => {
    if (isLoginPage) {
      void navigate('/auth/sign-up')
    } else if (isSignUpPage) {
      void navigate('/auth/sign-in')
    } else {
      void navigate('/auth/sign-in')
    }
  }

  return (
    <header className="flex justify-between p-4 border-b border-[#F1E6FD30]">
      <div className="flex items-center gap-4">
        <LogoIcon className="block md:hidden" />
        <Logo className="hidden md:block" />
        <span className="font-inter font-bold text-xl">Movies</span>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {isAuthenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Button onClick={handleToggleAuth}>
              {isLoginPage ? 'Cadastrar' : 'Login'}
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
