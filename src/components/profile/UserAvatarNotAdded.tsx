import type { Tables } from 'database.types'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useGetFilms, useUpsertUsersFilms } from '@/services/supabase'

interface Props {
  user: Tables<'users'>
  filmId: number
}

function UserAvatarNotAdded({ user, filmId }: Props) {
  const { refetch } = useGetFilms()
  const { mutate } = useUpsertUsersFilms()

  return (
    <Avatar
      className={cn('cursor-pointer select-none')}
      onClick={() =>
        mutate(
          { userId: user.id, filmId: filmId, state: 'interested' },
          { onSettled: () => refetch() },
        )
      }
    >
      <AvatarFallback className={'bg-red-400 dark:bg-red-800'}>
        {user.name?.at(0) ?? '-'}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatarNotAdded
