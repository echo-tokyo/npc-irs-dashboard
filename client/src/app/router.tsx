import { createBrowserRouter, Navigate } from 'react-router'
import { AppLayout } from './AppLayout'
import { routes } from './routes'

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      ...routes.map(({ path, Component }) => ({ path, Component })),
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  },
])
