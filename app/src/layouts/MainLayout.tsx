import { Outlet, useNavigate } from 'react-router'
import { useUserStore } from '../store/userStore'
import { useEffect } from 'react'

export default function MainLayout() {
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Header from layout</h1>
      </header>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  )
}
