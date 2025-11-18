import { Logo } from '@/assets/logo'
import { LogoIcon } from '@/assets/logo-icon'

import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="flex justify-between p-4 border-b border-[#F1E6FD30]">
      <div className="flex items-center gap-4">
        <LogoIcon className="block md:hidden" />
        <Logo className="hidden md:block" />
        <span className="font-inter font-bold text-xl">Movies</span>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button>Cadastrar</Button>
      </div>
    </header>
  )
}
