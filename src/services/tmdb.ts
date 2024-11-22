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
  const queryString = query && `?${new URLSearchParams(query).toString()}`

  return `${BASE_URL}${url}${queryString}`
}

interface MovieSearch {
  page: number
  results: {
    id: number
    title: string
    overview: string
  }[]
  total_pages: number
  total_results: number
}

export function useSearchMovies(query: string, page = 1) {
  const { query: deboucedQuery, page: debouncedPage } = useDebounce({ query: query.trim(), page }, 500)

  return useQuery({
    queryKey: ['search-movies', deboucedQuery, debouncedPage],
    queryFn: async () => {
      const res = await fetch(
        url('/search/movie', {
          query: deboucedQuery,
          page: String(debouncedPage),
          include_adult: 'true',
          language: 'en-GB',
          region: 'GB',
        }),
        options,
      )
      if (!res.ok) {
        throw new Error('Network response error')
      }

      return (await res.json()) as MovieSearch
    },
    enabled: !!deboucedQuery,
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
    placeholderData: (data) => data,
  })
}
