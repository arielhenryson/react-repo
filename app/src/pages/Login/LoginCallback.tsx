import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { handleCallback } from '../../services/auth/auth'

const CallbackPage = () => {
  const navigate = useNavigate()
  const hasRun = useRef(false)

  useEffect(() => {
    const processCallback = async () => {
      if (!hasRun.current) {
        hasRun.current = true
        const res = await handleCallback()
        navigate(res ? '/' : '/login')
      }
    }

    processCallback()
  }, [navigate])

  return <div>Processing login...</div>
}

export default CallbackPage
