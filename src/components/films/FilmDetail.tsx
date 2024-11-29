import type { Tables } from 'database.types'

import Film from '@/components/films/Film'
import UserFilmToggle from '@/components/profile/UserFilmToggle'
import { P } from '@/components/ui/typeography'
import { useGetMovie } from '@/services/tmdb'

interface Props {
  film: Tables<'films'> & { users: Tables<'users'>[] }
  users: Tables<'users'>[]
}

function FilmDetail({ film, users }: Props) {
  const { data: movie, isSuccess, isLoading, error } = useGetMovie(film.film_id)

  if (isLoading) return <P>Loading...</P>
  if (!isSuccess) return <P>{error?.message}</P>

  return (
    <Film movie={movie}>
      <div className="flex gap-2">
        {users.map((user) => (
          <UserFilmToggle key={user.id} user={user} filmId={film.id} />
        ))}
      </div>
    </Film>
  )
}

export default FilmDetail
