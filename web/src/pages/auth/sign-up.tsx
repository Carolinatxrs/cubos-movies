import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import z from "zod"

const signUpSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha é obrigatória')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
})

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignUp() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // TODO: Implementar chamada real à API
      console.log('SignUp data:', data)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulando registro e login automático
      const mockUser = {
        id: '1',
        name: data.name,
        email: data.email
      }

      const mockToken = 'mock-jwt-token'

      login(mockToken, mockUser)
      navigate('/')
    } catch (error) {
      console.error('SignUp error:', error)
    }
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-full max-w-[412px] dark:bg-[#232225] bg-[#F7EDFE] rounded-sm p-4 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="name">
                Nome
              </Label>
            </div>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              {...register('name')}
              className="w-full"
            />
            {errors.name && (
              <span className="text-destructive text-xs font-roboto">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="email">
                E-mail
              </Label>
            </div>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
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

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="confirmPassword">
                Confirmação de senha
              </Label>
            </div>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Digite sua senha novamente"
              {...register('confirmPassword')}
              className="w-full"
            />
            {errors.confirmPassword && (
              <span className="text-destructive text-xs font-roboto">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="default"
              className="whitespace-nowrap"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div >
    </div >
  )
}