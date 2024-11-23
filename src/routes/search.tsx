import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { H3, P } from '@/components/ui/typeography'
import { useAddFilm, useGetFilms } from '@/services/supabase'
import { useSearchMovies } from '@/services/tmdb'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
})

function RouteComponent() {
  const [movieSearch, setMovieSearch] = useState('')

  const { data: movies } = useSearchMovies(movieSearch)
  const { data: films, refetch } = useGetFilms()

  const { mutate } = useAddFilm()

  const filmIds = films?.data?.map((film) => film.film_id) ?? []

  return (
    <>
      <Input onChange={(e) => setMovieSearch(e.target.value)} placeholder="Search for a movie..." />

      {movies?.results.map((movie) => (
        <div key={movie.id}>
          <H3>{movie.title}</H3>
          <P className="line-clamp-3">{movie.overview}</P>
          <Button
            disabled={filmIds.includes(movie.id)}
            onClick={() => mutate(movie.id, { onSettled: () => refetch() })}
          >
            Add
          </Button>
        </div>
      ))}

      {movies?.results.length === 0 && <P>No results</P>}
    </>
  )
}
