import type { Tables } from 'database.types'

import Film from '@/components/films/Film'
import UserAvatar from '@/components/profile/UserAvatar'
import UserAvatarNotAdded from '@/components/profile/UserAvatarNotAdded'
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

  const addedUserIds = film.users.map((f) => f.id)
  const filteredUsers = users.filter((user) => !addedUserIds.includes(user.id))

  return (
    <Film movie={movie}>
      <div className="flex gap-2">
        {film.users.map((user) => (
          <UserAvatar key={user.id} user={user} filmId={film.id} />
        ))}
        {filteredUsers.map((user) => (
          <UserAvatarNotAdded key={user.id} user={user} filmId={film.id} />
        ))}
      </div>
    </Film>
  )
}

export default FilmDetail
