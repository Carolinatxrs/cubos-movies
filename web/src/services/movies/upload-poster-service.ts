import api from "../axios"

export interface UploadPosterResponse {
  url: string
}

export async function uploadPoster(file: File): Promise<UploadPosterResponse> {
  const formData = new FormData()
  formData.append('poster', file)

  const response = await api.post('/movies/upload-poster', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}