import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SearchBar } from '@/components/search-bar'
import { MovieCard } from '@/components/movie-card'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import { listMovies, type MoviesFilters } from '@/services/movies/list-movies-service'

export function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState('')
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
  }

  const {
    data: moviesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['movies', filters],
    queryFn: () => listMovies(filters),
    staleTime: 1000 * 60 * 5,
  })

  const currentMovies = moviesData?.movies || []
  const pagination = moviesData?.pagination

  const handleAddMovie = () => {
    navigate('/movies/new')
  }

  const handleOpenFilters = () => {
    console.log('Abrir modal de filtros')
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
            className="flex items-center gap-2 flex-1 lg:flex-initial lg:w-auto"
          >
            Filtros
          </Button>

          <Button
            onClick={handleAddMovie}
            className="flex-1 lg:flex-initial lg:w-auto"
          >
            Adicionar Filme
          </Button>
        </div>
      </div>

      <div className="bg-card dark:bg-[#EBEAF814] rounded-sm p-6 border border-border backdrop-blur-sm">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-roboto text-lg">
              Carregando filmes...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-destructive font-roboto text-lg">
              Erro ao carregar filmes: {error instanceof Error ? error.message : 'Erro desconhecido'}
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
            <p className="text-muted-foreground font-roboto text-lg">
              {debouncedSearch ? 'Nenhum filme encontrado para sua busca.' : 'Nenhum filme cadastrado.'}
            </p>
          </div>
        )}
      </div>

      {pagination && pagination.pages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}