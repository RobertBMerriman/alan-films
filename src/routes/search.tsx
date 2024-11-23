import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { H3, P } from '@/components/ui/typeography'
import { useAddFilm, useAuthedUser, useGetFilms } from '@/services/supabase'
import { usePopularMovies, useSearchMovies } from '@/services/tmdb'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
})

function RouteComponent() {
  const [movieSearch, setMovieSearch] = useState('')

  const { data: user } = useAuthedUser()

  const { data: popularMovies } = usePopularMovies()
  const { data: movies } = useSearchMovies(movieSearch)
  const { data: films, refetch } = useGetFilms()

  const { mutate } = useAddFilm()

  function handleAddFilm(id: number) {
    const userId = user?.data.user?.id
    if (!userId) {
      alert('Not logged in')
      return
    }

    mutate({ id, userId }, { onSettled: () => refetch() })
  }

  const filmIds = films?.data?.map((film) => film.film_id) ?? []

  return (
    <>
      <Input onChange={(e) => setMovieSearch(e.target.value)} placeholder="Search for a movie..." />

      {movies?.results.length
        ? movies.results.map((movie) => (
            <div key={movie.id}>
              <H3>{movie.title}</H3>
              <P className="line-clamp-3">{movie.overview}</P>
              <Button disabled={filmIds.includes(movie.id)} onClick={() => handleAddFilm(movie.id)}>
                Add
              </Button>
            </div>
          ))
        : popularMovies?.results.map((movie) => (
            <div key={movie.id}>
              <H3>{movie.title}</H3>
              <P className="line-clamp-3">{movie.overview}</P>
              <Button disabled={filmIds.includes(movie.id)} onClick={() => handleAddFilm(movie.id)}>
                Add
              </Button>
            </div>
          ))}

      {movies?.results.length === 0 && <P>No results</P>}
    </>
  )
}
