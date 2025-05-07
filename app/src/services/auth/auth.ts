import { useUserStore } from '../../store/userStore'

export const login = async () => {
  // Simulate an async login request
  const fakeUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  }

  // In a real app, you'd call your backend API here
  await new Promise((resolve) => setTimeout(resolve, 1000))

  useUserStore.getState().setUser(fakeUser)
}

export const logout = () => {
  useUserStore.getState().setUser({
    name: '',
    email: '',
  })
}
