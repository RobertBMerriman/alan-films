import type { Tables } from 'database.types'

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

function FilmDetailDialog({ open, setOpen, movie }: Props) {
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{movie.title}</DialogTitle>
          <DialogDescription>{movie.overview}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default FilmDetailDialog
