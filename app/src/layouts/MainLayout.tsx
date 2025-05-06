import { Outlet } from 'react-router'

export default function MainLayout() {
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
