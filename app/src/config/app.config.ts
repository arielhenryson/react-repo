const appConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  Authority: import.meta.env.VITE_AUTHORITY,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
}

console.log(appConfig)

export default appConfig
