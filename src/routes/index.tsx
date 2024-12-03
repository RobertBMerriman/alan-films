import FilmAdded from '@/components/films/FilmAdded'
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

  if (isFilmsLoading) return <P>Loading...</P>
  if (isUsersLoading) return <P>Loading...</P>
  if (!isFilmsSuccess) return <P>Error</P>
  if (!isUsersSuccess) return <P>Error</P>

  return (
    <>
      {isAuthError && <p className="text-center">Login to make changes!</p>}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {films.map((film) => (
          <FilmAdded key={film.id} film={film} users={allUsers} />
        ))}
      </div>
    </>
  )
}
