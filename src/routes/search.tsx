import { useState } from 'react'

import Film from '@/components/films/Film'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { P } from '@/components/ui/typeography'
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

      {movies?.results.length === 0 && <P>No results</P>}

      {movies
        ? movies.results.map((movie) => (
            <Film key={movie.id} movie={movie}>
              <div>
                <Button
                  disabled={filmIds.includes(movie.id)}
                  onClick={() => handleAddFilm(movie.id)}
                >
                  Add
                </Button>
              </div>
            </Film>
          ))
        : popularMovies?.results.map((movie) => (
            <Film key={movie.id} movie={movie}>
              <div>
                <Button
                  disabled={filmIds.includes(movie.id)}
                  onClick={() => handleAddFilm(movie.id)}
                >
                  Add
                </Button>
              </div>
            </Film>
          ))}
    </>
  )
}
