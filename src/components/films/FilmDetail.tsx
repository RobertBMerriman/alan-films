import type { Tables } from 'database.types'

import Film from '@/components/films/Film'
import UserAvatar from '@/components/profile/UserAvatar'
import { P } from '@/components/ui/typeography'
import { useGetMovie } from '@/services/tmdb'

interface Props {
  film: Tables<'films'>
}

function FilmDetail({ film }: Props) {
  const { data: movie, isSuccess, isLoading } = useGetMovie(film.film_id)

  if (isLoading) return <P>Loading...</P>
  if (!isSuccess) return <P>Error</P>

  return (
    <Film movie={movie}>
      <div>
        <UserAvatar id={film.added_user_id} />
      </div>
    </Film>
  )
}

export default FilmDetail
