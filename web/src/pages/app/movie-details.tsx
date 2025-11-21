import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { DeleteMovieModal } from '@/components/delete-movie-modal'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts'
import { deleteMovie } from '@/services/movies/delete-movie-service'
import { getMovieById } from '@/services/movies/get-movie-by-id-service'
import type { Movie } from '@/services/movies/list-movies-service'

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    void loadMovie()
  }, [id])

  const loadMovie = async () => {
    try {
      if (!id) return
      const movieData = await getMovieById(id)
      setMovie(movieData)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Filme não encontrado',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    if (movie) {
      void navigate(`/movies/edit/${movie.id}`)
    }
  }

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (!movie) return

    try {
      setIsDeleting(true)
      await deleteMovie(movie.id)

      await queryClient.invalidateQueries({ queryKey: ['movies'] })

      toast.success('Filme deletado com sucesso!')
      void navigate('/')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao deletar filme',
      )
    } finally {
      setIsDeleting(false)
      setIsDeleteModalOpen(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-muted rounded-lg h-96"></div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Filme não encontrado
          </h1>
          <Button onClick={() => navigate('/')}>Voltar para a lista</Button>
        </div>
      </div>
    )
  }

  const isOwner = user?.id === movie.userId

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="font-montserrat font-semibold text-[32px] leading-none text-movie-primary-text mb-2">
            {movie.title}
          </h1>
          {movie.originalTitle !== movie.title && (
            <p className="font-montserrat font-normal text-base leading-none text-movie-secondary-text">
              {movie.originalTitle}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate('/')}>
            Voltar
          </Button>

          {isOwner && (
            <>
              <Button variant="secondary" onClick={handleOpenDeleteModal}>
                Deletar
              </Button>
              <Button onClick={handleEdit}>Editar</Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4">
          <div className="w-[374px] h-[542px] rounded-sm overflow-hidden">
            <img
              src={movie.posterUrl || '/placeholder-poster.jpg'}
              alt={`Poster de ${movie.title}`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-movie-box-bg rounded-sm p-6 border border-movie-box-border backdrop-blur-sm">
            <h2 className="font-montserrat font-bold text-base leading-none uppercase text-movie-secondary-text mb-4">
              Sinopse
            </h2>
            <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text">
              {movie.description}
            </p>
          </div>

          <div className="bg-movie-box-bg rounded-sm p-6 border border-movie-box-border backdrop-blur-sm">
            <h3 className="font-montserrat font-bold text-[14px] leading-none text-movie-secondary-text mb-4">
              Gêneros
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="w-[86px] h-[31px] flex items-center justify-center bg-movie-accent-purple rounded-xs px-2 gap-2">
                <span className="font-montserrat font-semibold text-[12px] leading-none uppercase text-white">
                  {movie.genre}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-movie-box-bg rounded-sm p-4 border border-movie-box-border backdrop-blur-sm">
              <h3 className="font-montserrat font-bold text-[14px] leading-none uppercase text-movie-secondary-text mb-2">
                Classificação
              </h3>
              <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text wrap-break-word">
                {movie.rating}
              </p>
            </div>

            <div className="bg-movie-box-bg rounded-sm p-4 border border-movie-box-border backdrop-blur-sm">
              <h3 className="font-montserrat font-bold text-[14px] leading-none uppercase text-movie-secondary-text mb-2">
                Votos
              </h3>
              <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text wrap-break-word">
                {movie.votes.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-movie-box-bg rounded-sm p-4 border border-movie-box-border backdrop-blur-sm">
              <h3 className="font-montserrat font-bold text-[14px] leading-none uppercase text-movie-secondary-text mb-2">
                Lançamento
              </h3>
              <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text wrap-break-word">
                {formatDate(movie.releaseDate)}
              </p>
            </div>

            <div className="bg-movie-box-bg rounded-sm p-4 border border-movie-box-border backdrop-blur-sm">
              <h3 className="font-montserrat font-bold text-[14px] leading-none uppercase text-movie-secondary-text mb-2">
                Duração
              </h3>
              <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text wrap-break-word">
                {formatDuration(movie.duration)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-movie-box-bg rounded-sm p-4 border border-movie-box-border backdrop-blur-sm">
              <h3 className="font-montserrat font-bold text-[14px] leading-none uppercase text-movie-secondary-text mb-2">
                Situação
              </h3>
              <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text wrap-break-word">
                {movie.status}
              </p>
            </div>

            <div className="bg-movie-box-bg rounded-sm p-4 border border-movie-box-border backdrop-blur-sm">
              <h3 className="font-montserrat font-bold text-[14px] leading-none uppercase text-movie-secondary-text mb-2">
                Idioma
              </h3>
              <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text wrap-break-word">
                {movie.language.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-movie-box-bg rounded-sm p-4 border border-movie-box-border backdrop-blur-sm">
              <h3 className="font-montserrat font-bold text-[14px] leading-none uppercase text-movie-secondary-text mb-2">
                Orçamento
              </h3>
              <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text wrap-break-word">
                {formatCurrency(movie.budget)}
              </p>
            </div>

            <div className="bg-movie-box-bg rounded-sm p-4 border border-movie-box-border backdrop-blur-sm">
              <h3 className="font-montserrat font-bold text-[14px] leading-none uppercase text-movie-secondary-text mb-2">
                Receita
              </h3>
              <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text wrap-break-word">
                {formatCurrency(movie.revenue)}
              </p>
            </div>

            <div className="bg-movie-box-bg rounded-sm p-4 border border-movie-box-border backdrop-blur-sm">
              <h3 className="font-montserrat font-bold text-[14px] leading-none uppercase text-movie-secondary-text mb-2">
                Lucro
              </h3>
              <p className="font-montserrat font-normal text-base leading-none text-movie-primary-text wrap-break-word">
                {formatCurrency(movie.profit)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DeleteMovieModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        movieTitle={movie.title}
        isLoading={isDeleting}
      />
    </div>
  )
}

export default MovieDetails
