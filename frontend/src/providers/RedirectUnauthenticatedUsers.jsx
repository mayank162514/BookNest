import React, { useEffect } from 'react'
import { useAuthStore } from '../store/authStore.js'
import { useNavigate } from 'react-router'

const RedirectUnauthenticatedUsers = ({ children }) => {

  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) {
    return null;
  }
  return (
    <>{children}</>
  )
}

export default RedirectUnauthenticatedUsers