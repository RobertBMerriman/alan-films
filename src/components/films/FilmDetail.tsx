import type { Tables } from 'database.types'
import { Trash } from 'lucide-react'

import DeleteConfirmation from '@/components/films/DeleteConfirmation'
import Film from '@/components/films/Film'
import UserFilmToggle from '@/components/profile/UserFilmToggle'
import { Button } from '@/components/ui/button'
import { P } from '@/components/ui/typeography'
import { useAuthedUser, useDeleteFilm, useGetFilms } from '@/services/supabase'
import { useGetMovie } from '@/services/tmdb'

interface Props {
  film: Tables<'films'> & { users_films: Tables<'users_films'>[] }
  users: Tables<'users'>[]
}

function FilmDetail({ film, users }: Props) {
  const { data: movie, isSuccess, isLoading, error } = useGetMovie(film.film_id)
  const { data: user } = useAuthedUser()
  const { mutate: deleteFilm } = useDeleteFilm()
  const { refetch: refetchFilms } = useGetFilms()

  if (isLoading) return <P>Loading...</P>
  if (!isSuccess) return <P>{error?.message}</P>

  return (
    <Film movie={movie}>
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <div className="flex flex-wrap gap-2">
          {users.map((user) => (
            <UserFilmToggle key={user.id} user={user} filmId={film.id} />
          ))}
        </div>
        {user && user.id === film.added_user_id && (
          <DeleteConfirmation
            onConfirm={() => {
              deleteFilm({ id: film.id }, { onSuccess: () => refetchFilms() })
            }}
          >
            <Button variant={'ghost'} size={'icon'}>
              <Trash />
            </Button>
          </DeleteConfirmation>
        )}
      </div>
    </Film>
  )
}

export default FilmDetail
