import api from "../axios"

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  user: {
    id: string
    name: string
    email: string
    createdAt: string
  }
  token: string
}

export async function signIn(data: SignInRequest): Promise<SignInResponse> {
  const response = await api.post('/auth/login', data)
  return response.data
}