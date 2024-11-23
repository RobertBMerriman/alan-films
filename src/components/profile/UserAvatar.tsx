import type { Tables } from 'database.types'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useGetUsersFilms, useUpsertUsersFilms } from '@/services/supabase'

interface Props {
  user: Tables<'users'>
  filmId: number
}

function UserAvatar({ user, filmId }: Props) {
  const { data, error, refetch } = useGetUsersFilms(user.id, filmId)
  const { mutate } = useUpsertUsersFilms()

  if (error) {
    console.log(error)
  }
  const state = data?.state as 'interested' | 'maybe' | undefined
  const cl = state
    ? state === 'maybe'
      ? 'bg-green-400 dark:bg-green-800'
      : 'bg-blue-400 dark:bg-blue-800'
    : ''

  function handleUpsert() {
    if (!state) {
      alert('State not loaded?')
      return
    }
    mutate(
      {
        userId: user.id,
        filmId: filmId,
        state: state === 'interested' ? 'maybe' : 'interested',
      },
      {
        onSuccess: () => {
          refetch()
          // refetch2()
        },
      },
    )
  }

  return (
    <Avatar className={cn('cursor-pointer select-none')} onClick={handleUpsert}>
      <AvatarFallback className={cl}>{user.name?.at(0) ?? '-'}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
