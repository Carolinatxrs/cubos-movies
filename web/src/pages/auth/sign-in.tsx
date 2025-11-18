import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link as CustomLink } from "@/components/ui/link"
import { useAuth } from "@/contexts/auth-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router"
import z from "zod"

const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha é obrigatória')
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const from = location.state?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      // Simulando resposta da API
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockUser = {
        id: '1',
        name: 'Usuário Teste',
        email: data.email
      }

      const mockToken = 'mock-jwt-token'

      login(mockToken, mockUser)
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-full max-w-[412px] dark:bg-[#232225] bg-[#F7EDFE] rounded-sm p-4 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="email">
                Nome/E-mail
              </Label>
            </div>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu nome/E-mail"
              {...register('email')}
              className="w-full"
            />
            {errors.email && (
              <span className="text-destructive text-xs font-roboto">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">
                Senha
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register('password')}
              className="w-full"
            />
            {errors.password && (
              <span className="text-destructive text-xs font-roboto">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <CustomLink
              href="#"
              className="text-base whitespace-nowrap"
            >
              Esqueci minha senha
            </CustomLink>
            <Button
              type="submit"
              variant="default"
              className="whitespace-nowrap"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </div >
    </div >
  )
}
