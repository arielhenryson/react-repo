import { useUserStore } from '../../store/userStore'
import { UserManager } from 'oidc-client-ts'
import { api } from '../api/api'

const userManager = new UserManager({
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  response_type: 'code',
  scope: 'openid profile',
})

export const login = async () => {
  await userManager.signinRedirect()
}

export const logout = () => {
  localStorage.removeItem('token')
  useUserStore.getState().setUser({
    name: '',
    id: '',
  })
  userManager.signoutRedirect()
}

export const handleCallback = async (): Promise<boolean> => {
  try {
    const user = await userManager.signinRedirectCallback()

    console.log(user)

    useUserStore.getState().setUser({
      name: user.profile.name || '',
      id: user.profile.sub || '',
    })

    localStorage.setItem('token', user.id_token || '')

    const configData = await api.get('/config')
    console.log(configData)

    return true
  } catch (error) {
    console.error('Callback error:', error)
    return false
  }
}
