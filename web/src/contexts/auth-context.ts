import { createContext } from 'react'

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthContextState {
  user: User | null
  token: string | null
  login: (token: string, userData: User) => void
  logout: () => void
  isAuthenticated: boolean
}

export interface AuthProviderProps {
  children: React.ReactNode
  storageKey?: string
}

export interface JwtPayload {
  exp: number
  iat?: number
  sub?: string
  [key: string]: unknown
}

export const initialState: AuthContextState = {
  user: null,
  token: null,
  login: () => null,
  logout: () => null,
  isAuthenticated: false,
}

export const AuthContext = createContext<AuthContextState>(initialState)

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload
    const expirationTime = payload.exp * 1000
    return Date.now() < expirationTime
  } catch {
    return false
  }
}
