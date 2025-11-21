import api from '../axios'
import type { CreateMovieRequest } from './create-movie-service'
import type { Movie } from './list-movies-service'

export type UpdateMovieRequest = Partial<CreateMovieRequest>

export async function updateMovie(
  id: string,
  data: UpdateMovieRequest,
): Promise<Movie> {
  const response = await api.patch<Movie>(`/movies/${id}`, data)
  return response.data
}
