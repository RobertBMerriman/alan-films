import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
}

const BASE_URL = 'https://api.themoviedb.org/3'

function url(url: string, query?: Record<string, string>) {
  const queryString = query ? `?${new URLSearchParams(query).toString()}` : ''

  return `${BASE_URL}${url}${queryString}`
}

export function tmdbImageUrl(
  url: string,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w154',
) {
  return `https://image.tmdb.org/t/p/${size}${url}`
}

export interface MovieResult {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
  // And more ofc
}

interface MovieSearch {
  page: number
  results: MovieResult[]
  total_pages: number
  total_results: number
}

export function useSearchMovies(query: string, page = 1) {
  const memo = useMemo(() => ({ query: query.trim(), page }), [page, query])

  const { query: deboucedQuery, page: debouncedPage } = useDebounce(memo, 500)

  return useQuery({
    queryKey: ['search-movies', deboucedQuery, debouncedPage],
    queryFn: async () => {
      const res = await fetch(
        url('/search/movie', {
          query: deboucedQuery,
          page: String(debouncedPage),
          language: 'en-GB',
          region: 'GB',
        }),
        options,
      )
      if (!res.ok) {
        throw new Error(`Network response error: ${res.status}`)
      }

      return (await res.json()) as MovieSearch
    },
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
    placeholderData: (data) => data,
  })
}

export interface MovieDetail extends MovieResult {
  status: string
}

export function useGetMovie(id: number) {
  return useQuery({
    queryKey: ['get-movie', id],
    queryFn: async () => {
      const res = await fetch(
        url(`/movie/${id}`, {
          language: 'en-GB',
        }),
        options,
      )
      if (!res.ok) {
        throw new Error(`Network response error: ${res.status}`)
      }

      return (await res.json()) as MovieDetail
    },
    staleTime: 60 * 60 * 1000,
  })
}

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ['popular-movies', page],
    queryFn: async () => {
      const res = await fetch(
        url(`/movie/popular`, {
          language: 'en-GB',
          page: String(page),
          region: 'GB',
        }),
        options,
      )
      if (!res.ok) {
        throw new Error(`Network response error: ${res.status}`)
      }

      return (await res.json()) as MovieSearch
    },
    staleTime: 60 * 60 * 1000,
  })
}
