import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

import PageContainer from '../components/PageContainer'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageContainer />,
    errorElement: <Navigate to="/" replace />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <p>Dashboard module here</p>
      },
      {
        path: 'crops',
        element: <p>Crop module here</p>
      },
      {
        path: 'rural-producers',
        element: <p>Rural producers module here</p>
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
])

export default function Routes() {
  return <RouterProvider router={router} />
}
