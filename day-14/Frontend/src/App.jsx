import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import "./style.scss"
import { AuthProvider } from './features/auth/auth.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App