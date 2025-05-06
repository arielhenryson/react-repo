import { createBrowserRouter } from 'react-router'

import Login from '../pages/Login/Login'
import LoginCallback from '../pages/Login/LoginCallback'
import Home from '../pages/Home/Home'
import MainLayout from '../layouts/MainLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        path: '',
        Component: Home,
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/login-callback',
    Component: LoginCallback,
  },
])
