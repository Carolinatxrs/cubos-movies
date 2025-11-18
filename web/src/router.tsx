import { createBrowserRouter } from 'react-router'

import { AuthLayout } from './pages/_layouts/auth'
import { Home } from './pages/app/home'
import { MovieDetails } from './pages/app/movie-details'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Error } from './pages/error'
import { NotFound } from './pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies/:movieId', element: <MovieDetails /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
