'use client'

import { useState, useEffect, useCallback } from 'react'

interface User {
  id: string
  email: string
  name: string | null
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  token: string
  user: User
}

/**
 * Hook for managing authentication state
 * Handles login, logout, and token persistence
 */
export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('sciafrica_token')
    const userStr = localStorage.getItem('sciafrica_user')

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        setAuth({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem('sciafrica_token')
        localStorage.removeItem('sciafrica_user')
        setAuth({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    } else {
      setAuth((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  /**
   * Login function
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        return false
      }

      const data: LoginResponse = await response.json()

      // Store token and user data
      localStorage.setItem('sciafrica_token', data.token)
      localStorage.setItem('sciafrica_user', JSON.stringify(data.user))

      setAuth({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      })

      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }, [])

  /**
   * Logout function
   */
  const logout = useCallback(() => {
    localStorage.removeItem('sciafrica_token')
    localStorage.removeItem('sciafrica_user')

    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }, [])

  /**
   * Get auth headers for API requests
   */
  const getAuthHeaders = useCallback(() => {
    if (!auth.token) return {}
    return {
      Authorization: `Bearer ${auth.token}`,
    }
  }, [auth.token])

  return {
    ...auth,
    login,
    logout,
    getAuthHeaders,
  }
}
