import type { Tables } from 'database.types'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useGetUsersFilms } from '@/services/supabase'

interface Props {
  user: Tables<'users'>
  filmId: number
}

function UserAvatar({ user, filmId }: Props) {
  const { data, error } = useGetUsersFilms(user.id, filmId)
  if (error) {
    console.log(error)
  }
  const state = data?.state as 'interested' | 'maybe' | undefined
  const cl = !state || state === 'maybe' ? 'opacity-50' : ''

  return (
    <Avatar className={cn('cursor-pointer select-none')}>
      <AvatarFallback className={cl}>{user.name?.at(0) ?? '-'}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
