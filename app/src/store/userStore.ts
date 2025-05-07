import { create } from 'zustand'

interface User {
  name: string
  email: string
}

interface UserState {
  user: User | null
  setUser: (userData: User) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData: User) => set({ user: userData }),
}))
