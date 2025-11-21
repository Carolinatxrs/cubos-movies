import api from '../axios'

export async function deleteMovie(id: string): Promise<void> {
  await api.delete(`/movies/${id}`)
}
