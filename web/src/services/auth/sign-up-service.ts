import api from '../axios'

export interface SignUpRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignUpResponse {
  user: {
    id: string
    name: string
    email: string
    createdAt: string
  }
  token: string
}

export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  const response = await api.post<SignUpResponse>('/auth/register', data)
  return response.data
}
