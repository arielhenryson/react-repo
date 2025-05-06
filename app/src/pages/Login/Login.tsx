export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        <p className="text-gray-600 mb-6">
          This is a placeholder for the login screen. Implement your login form
          or OAuth button here.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Login
        </button>
      </div>
    </div>
  )
}
