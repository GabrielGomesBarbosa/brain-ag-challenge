import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import PageContainer from './components/PageContainer'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageContainer />,
    children: [
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
      }
    ],
    errorElement: <p>Page not found</p>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
