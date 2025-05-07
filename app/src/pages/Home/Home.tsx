import { useUserStore } from '../../store/userStore'

export default function Home() {
  const { user } = useUserStore()

  return (
    <div className="p-8">
      <h1 className="text-gray-700">App home page</h1>
      <p className="text-gray-700">{user?.name}</p>
    </div>
  )
}
