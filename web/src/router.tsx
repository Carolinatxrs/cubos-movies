import { createBrowserRouter } from 'react-router'

import { AuthLayout } from './pages/_layouts/auth'
import { Home } from './pages/app/home'
import { MovieDetails } from './pages/app/movie-details'
import { MovieNew } from './pages/app/movie-new'
import { MovieEdit } from './pages/app/movie-edit'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Error } from './pages/error'
import { NotFound } from './pages/not-found'
import { PrivateRoute } from '@/components/private-route'
import { PublicRoute } from '@/components/public-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AuthLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies/new', element: <MovieNew /> },
      { path: '/movies/:movieId', element: <MovieDetails /> },
      { path: '/movies/edit/:movieId', element: <MovieEdit /> },
      { path: '/app/movies', element: <Home /> },
    ],
  },
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
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