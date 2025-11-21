import { useState } from 'react'

import {
  AuthContext,
  type AuthProviderProps,
  isTokenValid,
  type User,
} from './auth-context'

export function AuthProvider({
  children,
  storageKey = '@cubos:auth',
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem(`${storageKey}:token`)
    const storedUser = localStorage.getItem(`${storageKey}:user`)

    if (storedToken && storedUser && isTokenValid(storedToken)) {
      return storedToken
    }

    if (storedToken && storedUser && !isTokenValid(storedToken)) {
      localStorage.removeItem(`${storageKey}:token`)
      localStorage.removeItem(`${storageKey}:user`)
    }

    return null
  })

  const [user, setUser] = useState<User | null>(() => {
    const storedToken = localStorage.getItem(`${storageKey}:token`)
    const storedUser = localStorage.getItem(`${storageKey}:user`)

    if (storedToken && storedUser && isTokenValid(storedToken)) {
      try {
        return JSON.parse(storedUser) as User
      } catch {
        localStorage.removeItem(`${storageKey}:token`)
        localStorage.removeItem(`${storageKey}:user`)
        return null
      }
    }
    return null
  })

  const login = (newToken: string, userData: User) => {
    setToken(newToken)
    setUser(userData)
    localStorage.setItem(`${storageKey}:token`, newToken)
    localStorage.setItem(`${storageKey}:user`, JSON.stringify(userData))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(`${storageKey}:token`)
    localStorage.removeItem(`${storageKey}:user`)
  }

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
