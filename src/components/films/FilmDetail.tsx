import type { Tables } from 'database.types'

import Film from '@/components/films/Film'
import UserAvatar from '@/components/profile/UserAvatar'
import { P } from '@/components/ui/typeography'
// import { usePublicUsers } from '@/services/supabase'
import { useGetMovie } from '@/services/tmdb'

interface Props {
  film: Tables<'films'> & { users: Tables<'users'>[] }
}

function FilmDetail({ film }: Props) {
  const { data: movie, isSuccess, isLoading, error } = useGetMovie(film.film_id)
  // const { data: allUsers } = usePublicUsers()

  if (isLoading) return <P>Loading...</P>
  if (!isSuccess) return <P>{error?.message}</P>

  return (
    <Film movie={movie}>
      <div className="flex gap-2">
        {film.users.map((user) => (
          <UserAvatar key={user.id} user={user} filmId={film.id} />
        ))}
      </div>
    </Film>
  )
}

export default FilmDetail
