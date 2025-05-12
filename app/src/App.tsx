import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/AppRoutes'
import { AuthProvider } from 'react-oidc-context'
import appConfig from './config/app.config'

console.log(appConfig)

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
