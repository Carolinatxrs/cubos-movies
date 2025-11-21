import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { FilterModal } from '@/components/filter-modal'
import { MovieCard } from '@/components/movie-card'
import { MovieDrawer } from '@/components/movie-drawer'
import { Pagination } from '@/components/pagination'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import {
  listMovies,
  type MoviesFilters,
} from '@/services/movies/list-movies-service'

export function Home() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<MoviesFilters>({})
  const itemsPerPage = 10

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const filters: MoviesFilters = {
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearch || undefined,
    ...activeFilters,
  }

  const {
    data: moviesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['movies', filters],
    queryFn: () => listMovies(filters),
    staleTime: 1000 * 60 * 5,
  })

  const currentMovies = moviesData?.movies ?? []
  const pagination = moviesData?.pagination

  const handleAddMovie = () => {
    setIsCreateDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsCreateDrawerOpen(false)
  }

  const handleMovieCreated = async () => {
    await refetch()
  }

  const handleOpenFilters = () => {
    setIsFilterModalOpen(true)
  }

  const handleCloseFilters = () => {
    setIsFilterModalOpen(false)
  }

  const handleApplyFilters = (newFilters: MoviesFilters) => {
    setActiveFilters(newFilters)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setActiveFilters({})
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasActiveFilters = Object.keys(activeFilters).some(
    (key) => activeFilters[key as keyof MoviesFilters] !== undefined,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-4 mb-8 lg:justify-end">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Pesquise por filmes"
        />

        <div className="flex gap-2 flex-1 lg:flex-initial">
          <Button
            variant="secondary"
            onClick={handleOpenFilters}
            className={`flex items-center gap-2 flex-1 lg:flex-initial lg:w-auto ${
              hasActiveFilters ? 'bg-primary/20 border-primary' : ''
            }`}
          >
            Filtros
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-primary rounded-full"></span>
            )}
          </Button>

          <Button
            onClick={handleAddMovie}
            className="flex-1 lg:flex-initial lg:w-auto"
          >
            Adicionar Filme
          </Button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mb-4 p-3 bg-movie-accent-purple border border-border rounded-sm">
          <p className="text-sm text-movie-primary-text font-roboto">
            Atenção: Filtros ativos
          </p>
        </div>
      )}

      <div className="bg-movie-box-bg rounded-sm p-6 border border-movie-box-border backdrop-blur-sm">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-movie-secondary-text font-roboto text-lg">
              Carregando filmes...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-destructive font-roboto text-lg">
              Erro ao carregar filmes:{' '}
              {error instanceof Error
                ? error.message
                : 'Não foi possível carregar a lista de filmes.'}
            </p>
          </div>
        ) : currentMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.posterUrl}
                genre={movie.genre}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-movie-secondary-text font-roboto text-lg">
              {debouncedSearch || hasActiveFilters
                ? 'Nenhum filme encontrado para sua busca ou filtros.'
                : 'Nenhum filme cadastrado.'}
            </p>
          </div>
        )}
      </div>

      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
        />
      )}

      <MovieDrawer
        isOpen={isCreateDrawerOpen}
        onClose={handleCloseDrawer}
        onSuccess={handleMovieCreated}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        isLoading={isLoading}
      />
    </div>
  )
}
