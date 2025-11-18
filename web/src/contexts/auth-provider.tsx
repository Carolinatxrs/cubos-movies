import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextState {
  user: User | null
  token: string | null
  login: (token: string, userData: User) => void
  logout: () => void
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
  storageKey?: string
}

const initialState: AuthContextState = {
  user: null,
  token: null,
  login: () => null,
  logout: () => null,
  isAuthenticated: false,
}

const AuthContext = createContext<AuthContextState>(initialState)

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = payload.exp * 1000
    return Date.now() < expirationTime
  } catch {
    return false
  }
}

export function AuthProvider({
  children,
  storageKey = '@cubos:auth',
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem(`${storageKey}:token`)
    const storedUser = localStorage.getItem(`${storageKey}:user`)

    if (storedToken && storedUser && isTokenValid(storedToken)) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    } else {
      localStorage.removeItem(`${storageKey}:token`)
      localStorage.removeItem(`${storageKey}:user`)
    }

    setIsLoading(false)
  }, [storageKey])

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
    isAuthenticated: !!token && !!user
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}