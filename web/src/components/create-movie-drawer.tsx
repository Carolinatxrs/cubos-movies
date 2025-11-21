import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createMovie } from '@/services/movies/create-movie-service'
import { uploadPoster } from '@/services/movies/upload-poster-service'

import { Button } from './ui/button'
import { Drawer } from './ui/drawer'
import { FileInput } from './ui/file-input'
import { Input } from './ui/input'
import { Label } from './ui/label'

const createMovieSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  originalTitle: z.string().min(1, 'Título original é obrigatório'),
  releaseDate: z.string().min(1, 'Data de lançamento é obrigatória'),
  description: z
    .string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  budget: z.number().min(0, 'Orçamento não pode ser negativo'),
  duration: z.number().min(1, 'Duração deve ser maior que 0'),
  genre: z.string().min(1, 'Gênero é obrigatório'),
  rating: z.string().min(1, 'Classificação indicativa é obrigatória'),
  votes: z.number().min(0, 'Votos não pode ser negativo').optional(),
  score: z.number().min(0).max(10, 'Nota deve ser entre 0 e 10').optional(),
  language: z.string().min(1, 'Idioma é obrigatório'),
  revenue: z.number().min(0, 'Receita não pode ser negativo').optional(),
})

type CreateMovieFormData = z.infer<typeof createMovieSchema>

interface CreateMovieDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateMovieDrawer({
  isOpen,
  onClose,
  onSuccess,
}: CreateMovieDrawerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateMovieFormData>({
    resolver: zodResolver(createMovieSchema),
    defaultValues: {
      duration: 0,
      budget: 0,
      votes: 0,
      score: 0,
      revenue: 0,
    },
  })

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleClose = () => {
    reset()
    setSelectedFile(null)
    onClose()
  }

  const onSubmit = async (data: CreateMovieFormData) => {
    try {
      let posterUrl = ''

      if (selectedFile) {
        setIsUploading(true)
        const uploadResponse = await uploadPoster(selectedFile)
        posterUrl = uploadResponse.url
        setIsUploading(false)
      }

      const loadingToast = toast.loading('Cadastrando filme...')

      await createMovie({
        ...data,
        posterUrl,
        votes: data.votes ?? 0,
        score: data.score ?? 0,
        revenue: data.revenue ?? 0,
      })

      toast.dismiss(loadingToast)
      toast.success('Filme cadastrado com sucesso!')

      handleClose()
      onSuccess()
    } catch (error) {
      setIsUploading(false)
      toast.dismiss()
      toast.error(
        error instanceof Error ? error.message : 'Erro ao cadastrar filme',
      )
    }
  }

  const isLoading = isSubmitting || isUploading

  return (
    <Drawer isOpen={isOpen} onClose={handleClose}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-inter">
            Adicionar Filme
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-4"
        >
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                {...register('title')}
                className="w-full"
                placeholder="Digite o título do filme"
              />
              {errors.title && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalTitle">Título Original *</Label>
              <Input
                id="originalTitle"
                {...register('originalTitle')}
                className="w-full"
                placeholder="Digite o título original"
              />
              {errors.originalTitle && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.originalTitle.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseDate">Data de Lançamento *</Label>
              <Input
                id="releaseDate"
                type="date"
                {...register('releaseDate')}
                className="w-full"
              />
              {errors.releaseDate && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.releaseDate.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className="w-full h-24 px-3 py-2 bg-input text-foreground rounded-sm border border-border outline-none focus:border-primary transition-colors font-roboto text-base placeholder:text-muted-foreground resize-none"
                placeholder="Digite a descrição do filme"
              />
              {errors.description && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento *</Label>
              <Input
                id="budget"
                type="number"
                {...register('budget', { valueAsNumber: true })}
                className="w-full"
                placeholder="Digite o orçamento"
              />
              {errors.budget && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.budget.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duração (minutos) *</Label>
              <Input
                id="duration"
                type="number"
                {...register('duration', { valueAsNumber: true })}
                className="w-full"
                placeholder="Digite a duração em minutos"
              />
              {errors.duration && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.duration.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Gênero *</Label>
              <Input
                id="genre"
                {...register('genre')}
                className="w-full"
                placeholder="Digite o gênero"
              />
              {errors.genre && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.genre.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label>Poster</Label>
              <FileInput onFileSelect={handleFileSelect} accept="image/*" />
              {selectedFile && (
                <span className="text-sm text-muted-foreground">
                  Arquivo selecionado: {selectedFile.name}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Classificação Indicativa *</Label>
              <Input
                id="rating"
                {...register('rating')}
                className="w-full"
                placeholder="Ex: L, 10, 12, 14, 16, 18"
              />
              {errors.rating && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.rating.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="votes">Votos</Label>
              <Input
                id="votes"
                type="number"
                {...register('votes', { valueAsNumber: true })}
                className="w-full"
                placeholder="Digite o número de votos"
              />
              {errors.votes && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.votes.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="score">Nota (0-10)</Label>
              <Input
                id="score"
                type="number"
                step="0.1"
                min="0"
                max="10"
                {...register('score', { valueAsNumber: true })}
                className="w-full"
                placeholder="Digite a nota do filme"
              />
              {errors.score && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.score.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Idioma *</Label>
              <Input
                id="language"
                {...register('language')}
                className="w-full"
                placeholder="Digite o idioma original"
              />
              {errors.language && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.language.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenue">Receita</Label>
              <Input
                id="revenue"
                type="number"
                {...register('revenue', { valueAsNumber: true })}
                className="w-full"
                placeholder="Digite a receita"
              />
              {errors.revenue && (
                <span className="text-destructive text-xs font-roboto">
                  {errors.revenue.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 mb-2 border-t border-border lg:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adicionando...' : 'Adicionar Filme'}
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}
