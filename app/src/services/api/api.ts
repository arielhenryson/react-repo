import appConfig from '../../config/app.config'

const getToken = () => localStorage.getItem('token')

const getHeaders = (customHeaders: HeadersInit = {}) => {
  const token = getToken()

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    ...customHeaders,
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'API Error')
  }
  return response.json()
}

export const api = {
  get: async (path: string, customHeaders: HeadersInit = {}) =>
    handleResponse(
      await fetch(`${appConfig.apiUrl}${path}`, {
        method: 'GET',
        headers: getHeaders(customHeaders),
      }),
    ),

  post: async (path: string, data: never, customHeaders: HeadersInit = {}) =>
    handleResponse(
      await fetch(`${appConfig.apiUrl}${path}`, {
        method: 'POST',
        headers: getHeaders(customHeaders),
        body: JSON.stringify(data),
      }),
    ),

  put: async (path: string, data: never, customHeaders: HeadersInit = {}) =>
    handleResponse(
      await fetch(`${appConfig.apiUrl}${path}`, {
        method: 'PUT',
        headers: getHeaders(customHeaders),
        body: JSON.stringify(data),
      }),
    ),

  delete: async (path: string, customHeaders: HeadersInit = {}) =>
    handleResponse(
      await fetch(`${appConfig.apiUrl}${path}`, {
        method: 'DELETE',
        headers: getHeaders(customHeaders),
      }),
    ),
}
