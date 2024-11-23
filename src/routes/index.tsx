import FilmDetail from '@/components/films/FilmDetail'
import { P } from '@/components/ui/typeography'
import { useGetFilms } from '@/services/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: films, isSuccess, isLoading } = useGetFilms()

  if (isLoading) return <P>Loading...</P>
  if (!isSuccess) return <P>Error</P>
  if (films.error) return <P>Error</P>

  return (
    <>
      {films.data.map((film) => (
        <FilmDetail key={film.id} film={film} />
      ))}
    </>
  )
}
