import { H3, P } from '@/components/ui/typeography'
import { cn } from '@/lib/utils'
import { tmdbImageUrl, type MovieDetail, type MovieResult } from '@/services/tmdb'
import { Eye } from 'lucide-react'
import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  movie: MovieResult | MovieDetail
  onOpenDetails?: () => void
}

function Film({ children, movie, onOpenDetails }: Props) {
  return (
    <div className="flex gap-2 rounded-xl border p-2 md:gap-4 md:p-4">
      <div className="relative aspect-[2/3] min-w-28 self-start">
        <img className="rounded-lg" src={tmdbImageUrl(movie.poster_path)} alt={movie.title} />
        <div
          className={cn(
            'group absolute inset-0 flex items-center justify-center bg-black/50 opacity-0',
            { 'cursor-pointer hover:opacity-100 focus:opacity-100': !!onOpenDetails },
          )}
          onClick={onOpenDetails}
        >
          <Eye size={32} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div
          className={cn('flex flex-col gap-1 md:gap-0', { 'cursor-pointer': !!onOpenDetails })}
          onClick={onOpenDetails}
        >
          <div className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline md:gap-2">
            <H3>{movie.title}</H3>
            <div className="flex flex-row gap-2">
              {/* Solve NaN issue */}
              <P className="text-muted-foreground">
                {new Date(movie.release_date).getFullYear().toString()}
              </P>
              {'status' in movie && movie.status !== 'Released' && (
                <P className="text-muted-foreground">{movie.status}</P>
              )}
            </div>
          </div>
          <P className="line-clamp-5 md:line-clamp-3">{movie.overview}</P>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Film
