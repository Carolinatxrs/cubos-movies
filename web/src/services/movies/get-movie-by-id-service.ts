import api from "../axios"
import type { Movie } from "./list-movies-service"

export async function getMovieById(id: string): Promise<Movie> {
  const response = await api.get(`/movies/${id}`)
  return response.data
}