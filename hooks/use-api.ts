'use client'

import { useState, useCallback } from 'react'

interface UseApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  execute: (url: string, options?: UseApiOptions) => Promise<T | null>
}

/**
 * Generic API hook for making HTTP requests
 * @returns Object with data, loading state, error, and execute function
 */
export function useApi<T = any>(): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async (
    url: string,
    options: UseApiOptions = {}
  ): Promise<T | null> => {
    const { method = 'GET', body, headers = {} } = options

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, execute }
}

/**
 * Hook for fetching data on component mount
 */
export function useFetch<T = any>(url: string, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useState(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  })

  return { data, loading, error }
}
