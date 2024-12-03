import type { Tables } from 'database.types'
import { useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { MovieDetail } from '@/services/tmdb'
import type { User } from '@supabase/supabase-js'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  movie: MovieDetail
  authedUser: User | undefined
  film: Tables<'films'> & { users_films: Tables<'users_films'>[] }
}

function FilmDetailDialog({ open, setOpen, movie, film }: Props) {
  useEffect(() => {
    if (open) {
      console.log(movie)
    }
  }, [open, movie])

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{movie.title}</DialogTitle>
          <DialogDescription>{movie.overview}</DialogDescription>
        </DialogHeader>
        <a
          href={`https://www.themoviedb.org/movie/${film.film_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open on TMDB
        </a>
      </DialogContent>
    </Dialog>
  )
}

export default FilmDetailDialog
