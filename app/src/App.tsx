import './App.css'

import { RouterProvider } from 'react-router'
import { router } from './routes/AppRoutes'

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
