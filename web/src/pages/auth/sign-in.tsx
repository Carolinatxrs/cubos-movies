import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link as CustomLink } from "@/components/ui/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import z from "zod"

const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha é obrigatória')
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      // TODO: Implementar chamada à API
      console.log('Login data:', data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/movies')
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
