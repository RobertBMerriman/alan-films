import { H3, P } from '@/components/ui/typeography'
import { tmdbImageUrl, type MovieDetail, type MovieResult } from '@/services/tmdb'
import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  movie: MovieResult | MovieDetail
}

function Film({ movie, children }: Props) {
  return (
    <div className="flex gap-2 rounded-xl border p-2 md:gap-4 md:p-4">
      <div className="relative aspect-[2/3] min-w-28 self-start md:min-w-36">
        <div className="absolute inset-0 -z-10 rounded-lg bg-gray-400">&nbsp;</div>
        <img className="rounded-lg" src={tmdbImageUrl(movie.poster_path)} alt={movie.title} />
      </div>
      <div className="flex flex-col gap-1 md:gap-1">
        <div className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline md:gap-2">
          <H3>{movie.title}</H3>
          <div className="flex flex-row gap-2">
            <P className="text-muted-foreground">{new Date(movie.release_date).getFullYear()}</P>
            {'status' in movie && movie.status !== 'Released' && (
              <P className="text-muted-foreground">{movie.status}</P>
            )}
          </div>
        </div>
        <P className="line-clamp-5 md:line-clamp-3">{movie.overview}</P>
        {children}
      </div>
    </div>
  )
}

export default Film