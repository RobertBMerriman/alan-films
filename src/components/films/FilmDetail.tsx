import type { Tables } from 'database.types'

import { H3, P } from '@/components/ui/typeography'
import { tmdbImageUrl, useGetMovie } from '@/services/tmdb'

interface Props {
  film: Tables<'films'>
}

function FilmDetail({ film }: Props) {
  const { data: movie, isSuccess, isLoading } = useGetMovie(film.film_id)

  if (isLoading) return <P>Loading...</P>
  if (!isSuccess) return <P>Error</P>

  return (
    <div className="flex gap-2 rounded-xl border p-2 md:gap-4 md:p-4">
      <div className="relative aspect-[2/3] min-w-28 self-start md:min-w-36">
        <div className="absolute inset-0 -z-10 rounded-lg bg-gray-400">&nbsp;</div>
        <img className="rounded-lg" src={tmdbImageUrl(movie.poster_path)} alt={movie.title} />
      </div>
      <div className="flex flex-col gap-1 md:gap-1">
        <div className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline md:gap-2">
          <H3>{movie.title}</H3>
          <P className="text-muted-foreground">{new Date(movie.release_date).getFullYear()}</P>
        </div>
        <P className="line-clamp-5 md:line-clamp-3">{movie.overview}</P>
      </div>
    </div>
  )
}

export default FilmDetail
