import { useState } from 'react'

import Film from '@/components/films/Film'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { P } from '@/components/ui/typeography'
import { useAddFilm, useAuthedUser, useGetFilms } from '@/services/supabase'
import { usePopularMovies, useSearchMovies } from '@/services/tmdb'
import { createFileRoute } from '@tanstack/react-router'
import { useDebounce } from '@uidotdev/usehooks'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
})

function RouteComponent() {
  const [movieSearch, setMovieSearch] = useState('')

  const { data: user } = useAuthedUser(true)

  const { data: popularMovies } = usePopularMovies()
  const { data: movies } = useSearchMovies(movieSearch)
  const { data: films, refetch } = useGetFilms()

  const { mutate } = useAddFilm()

  function handleAddFilm(id: number) {
    const userId = user?.id
    if (!userId) {
      alert('Not logged in')
      return
    }

    mutate({ id, userId }, { onSettled: () => refetch() })
  }

  const filmIds = films?.map((film) => film.film_id) ?? []

  // Hack but it works?
  const queryStartDebounce = useDebounce(movieSearch.trim(), 500)
  const predictedQueryEndDebouce = useDebounce(movieSearch.trim(), 1000)

  // Why is no results flashing up sometimes????
  // I think it's because it has a cache of a result with no results that is being used as previous data
  // Seems to work worse when the network is faster?
  // Seems to happen if you quickly change, debounce might overlap?
  // Maybe seperating the component that searches and the component that gets the movies would help? if that's possible
  // if (!movies?.results.length && queryStartDebounce && predictedQueryEndDebouce) {
  //   // console.log('WEE WOO')
  //   // console.log(movies?.results)
  //   console.log(queryStartDebounce, predictedQueryEndDebouce)
  // }

  return (
    <>
      <Input onChange={(e) => setMovieSearch(e.target.value)} placeholder="Search for a movie..." />

      {movies?.results.length ? (
        movies?.results.map((movie) => (
          <Film key={movie.id} movie={movie}>
            <div>
              <Button disabled={filmIds.includes(movie.id)} onClick={() => handleAddFilm(movie.id)}>
                Add
              </Button>
            </div>
          </Film>
        ))
      ) : !queryStartDebounce ? (
        <>
          {popularMovies?.results.map((movie) => (
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
      ) : (
        !!predictedQueryEndDebouce && <P>No results</P>
      )}
    </>
  )
}
