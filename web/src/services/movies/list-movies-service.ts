import api from "../axios"

export interface Movie {
  id: string
  title: string
  originalTitle: string
  releaseDate: string
  description: string
  budget: number
  duration: number
  posterUrl: string
  genre: string
  rating: string
  votes: number
  score: number | null
  language: string
  revenue: number
  deletedAt: string | null
  userId: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
  }
  profit: number
  status: string
}

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export interface MoviesResponse {
  movies: Movie[]
  pagination: Pagination
}

export interface MoviesFilters {
  page?: number
  limit?: number
  search?: string
  genre?: string
  minDuration?: number
  maxDuration?: number
  startDate?: string
  endDate?: string
}

export async function listMovies(filters?: MoviesFilters): Promise<MoviesResponse> {
  const params = new URLSearchParams()

  if (filters?.page) params.append('page', filters.page.toString())
  if (filters?.limit) params.append('limit', filters.limit.toString())
  if (filters?.search) params.append('search', filters.search)
  if (filters?.genre) params.append('genre', filters.genre)
  if (filters?.minDuration) params.append('minDuration', filters.minDuration.toString())
  if (filters?.maxDuration) params.append('maxDuration', filters.maxDuration.toString())
  if (filters?.startDate) params.append('startDate', filters.startDate)
  if (filters?.endDate) params.append('endDate', filters.endDate)

  const response = await api.get(`/movies?${params.toString()}`)
  return response.data
}