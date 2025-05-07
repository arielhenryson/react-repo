import { useNavigate } from 'react-router' // Use react-router-dom for navigate
import { useState } from 'react' // Import useState for loading state
import { login } from '../../services/auth/auth'

// Assuming you have PrimeIcons or a similar icon library set up,
// if not, you might need to replace these with actual icons or SVGs.
// For this example, we'll assume 'pi pi-sign-in' and 'pi pi-spin pi-spinner' work.

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    await login()
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="w-full min-h-screen flex">
      <div
        className="hidden md:flex lg:w-2/3 bg-cover bg-center"
        style={{
          backgroundImage: "url('login_back.jpg')", // Replace with your desired background image URL
        }}
      ></div>
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-black min-h-screen">
        <div className="container flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-sm text-center">
            <i className="pi pi-sign-in mb-4 text-4xl text-gray-300"></i>

            <h1 className="text-2xl font-bold text-gray-300 mb-3">PolicyHub</h1>

            <h2 className="text-2xl font-light text-gray-300 mb-3">
              Sign in to your account
            </h2>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <i className="pi pi-spin pi-spinner mr-2"></i>
              ) : (
                <i className="pi pi-sign-in mr-2"></i>
              )}
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
