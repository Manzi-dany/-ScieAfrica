'use client'

import { useState, useEffect, useCallback } from 'react'

interface Article {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  image: string | null
  images: string[]
  pdfUrl: string | null
  author: string | null
  published: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
}

interface UseArticlesResult {
  articles: Article[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Hook for fetching articles with optional filtering
 */
export function useArticles(
  category?: string,
  limit?: number
): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (category && category !== 'all') params.append('category', category)
      if (limit) params.append('limit', limit.toString())

      const url = `/api/articles${params.toString() ? `?${params.toString()}` : ''}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }

      const data = await response.json()
      setArticles(data.articles || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [category, limit])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  return { articles, loading, error, refetch: fetchArticles }
}

/**
 * Hook for fetching a single article by ID
 */
export function useArticle(id: string | null) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchArticle = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/articles/${id}`)

        if (!response.ok) {
          throw new Error('Failed to fetch article')
        }

        const data = await response.json()
        setArticle(data.article)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  return { article, loading, error }
}

/**
 * Hook for searching articles
 */
export function useArticleSearch() {
  const [results, setResults] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string, category?: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    try {
      setLoading(true)
      const params = new URLSearchParams({ q: query })
      if (category && category !== 'all') params.append('category', category)

      const response = await fetch(`/api/articles/search?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setResults(data.articles || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, error, search }
}
