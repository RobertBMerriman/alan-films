import { useState } from 'react'

import FilmAdded from '@/components/films/FilmAdded'
import UserFilters from '@/components/films/UserFilters'
import { Button } from '@/components/ui/button'
import { H3, P } from '@/components/ui/typeography'
import { partition } from '@/lib/utils'
import { useAuthedUser, useGetFilms, usePublicUsers } from '@/services/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: authedUser, isError: isAuthError } = useAuthedUser()
  const { data: films, isSuccess: isFilmsSuccess, isLoading: isFilmsLoading } = useGetFilms()
  const { data: allUsers, isSuccess: isUsersSuccess, isLoading: isUsersLoading } = usePublicUsers()

  const [userIds, setUserIds] = useState<string[]>([])
  const [watched, setWatched] = useState(false)

  if (isFilmsLoading) return <P>Loading...</P>
  if (isUsersLoading) return <P>Loading...</P>
  if (!isFilmsSuccess) return <P>Error</P>
  if (!isUsersSuccess) return <P>Error</P>

  const filmsForWhosIn = films.filter((film) => {
    if (film.watched !== watched) return false

    const interestedIds = film.users_films
      .filter((uf) => uf.state === 'interested')
      .map((uf) => uf.user_id)

    return !interestedIds.some((id) => userIds.includes(id))
  })

  const [filmsRated, filmsUnratedByYou] = authedUser
    ? partition(filmsForWhosIn, (film) =>
        film.users_films.some((uf) => uf.user_id === authedUser.id),
      )
    : [filmsForWhosIn, []]

  return (
    <>
      {isAuthError && <p className="text-center">Login to make changes!</p>}

      <Button onClick={() => setWatched(!watched)}>
        {!watched ? 'See watched' : 'See unwatched'}
      </Button>

      <UserFilters userIds={userIds} setUserIds={setUserIds} />

      {filmsUnratedByYou.length !== 0 && (
        <>
          <H3>Unrated by you</H3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filmsUnratedByYou.map((film) => (
              <FilmAdded key={film.id} film={film} users={allUsers} />
            ))}
          </div>

          <hr className="my-4" />

          <H3>The List &trade;</H3>
        </>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {filmsRated.map((film) => (
          <FilmAdded key={film.id} film={film} users={allUsers} />
        ))}
      </div>
    </>
  )
}
