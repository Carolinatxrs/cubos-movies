import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@cubos:auth:token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Erro na requisição'
    
    if (error.response?.status === 401) {
      localStorage.removeItem('@cubos:auth:token')
      localStorage.removeItem('@cubos:auth:user')
      window.location.href = '/auth/sign-in'
    }
    
    return Promise.reject(new Error(message))
  }
)

export default api