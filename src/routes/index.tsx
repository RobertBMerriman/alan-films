import { useState } from 'react'

import FilmDetail from '@/components/films/FilmDetail'
import UserFilters from '@/components/films/UserFilters'
import { P } from '@/components/ui/typeography'
import { useAuthedUser, useGetFilms, usePublicUsers } from '@/services/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isError: isAuthError } = useAuthedUser()
  const { data: films, isSuccess: isFilmsSuccess, isLoading: isFilmsLoading } = useGetFilms()
  const { data: allUsers, isSuccess: isUsersSuccess, isLoading: isUsersLoading } = usePublicUsers()

  const [userIds, setUserIds] = useState<string[]>([])

  if (isFilmsLoading) return <P>Loading...</P>
  if (isUsersLoading) return <P>Loading...</P>
  if (!isFilmsSuccess) return <P>Error</P>
  if (!isUsersSuccess) return <P>Error</P>

  const filteredFilms = films.filter((film) => {
    const interestedIds = film.users_films
      .filter((uf) => uf.state === 'interested')
      .map((uf) => uf.user_id)

    return !interestedIds.some((id) => userIds.includes(id))
  })

  return (
    <>
      {isAuthError && <p className="text-center">Login to make changes!</p>}

      <UserFilters userIds={userIds} setUserIds={setUserIds} />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {filteredFilms.map((film) => (
          <FilmDetail key={film.id} film={film} users={allUsers} />
        ))}
      </div>
    </>
  )
}
