import FilmDetail from '@/components/films/FilmDetail'
import { P } from '@/components/ui/typeography'
import { useGetFilms, usePublicUsers } from '@/services/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: films, isSuccess, isLoading } = useGetFilms()
  const { data: allUsers, isSuccess: isSuccess2, isLoading: isLoading2 } = usePublicUsers()

  if (isLoading) return <P>Loading...</P>
  if (isLoading2) return <P>Loading...</P>
  if (!isSuccess) return <P>Error</P>
  if (!isSuccess2) return <P>Error</P>

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {films.map((film) => (
        <FilmDetail key={film.id} film={film} users={allUsers} />
      ))}
    </div>
  )
}
