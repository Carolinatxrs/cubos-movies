import api from "../axios"
import type { Movie } from "./list-movies-service"

export interface CreateMovieRequest {
  title: string
  originalTitle: string
  releaseDate: string
  description: string
  budget: number
  duration: number
  genre: string
  posterUrl: string
  rating: string
  votes?: number
  score?: number
  language: string
  revenue?: number
}

export async function createMovie(data: CreateMovieRequest): Promise<Movie> {
  const response = await api.post('/movies', data)
  return response.data
}