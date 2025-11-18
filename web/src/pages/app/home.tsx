import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from '@/components/ui/link'

export function Home() {
  return (
    <div className="space-y-2 space-x-2 p-4">
      <ThemeToggle />

      <Button variant="default">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="default" disabled>
        Primary Button Disabled
      </Button>
      <Button variant="secondary" disabled>
        Secondary Button Disabled
      </Button>

      <Input placeholder="Type something..." />
      <Input value={'Alguma coisa'} disabled />

      <div className="flex flex-col gap-2 max-w-2xs">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>

      <Link>Esqueci minha senha</Link>
    </div>
  )
}
