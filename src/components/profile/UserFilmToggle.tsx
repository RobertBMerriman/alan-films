import type { Tables } from 'database.types'
import { useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'
import {
  // useDeleteUsersFilms,
  useGetUsersFilms,
  useUpsertUsersFilms,
  type UserFilmState,
} from '@/services/supabase'

interface Props {
  user: Tables<'users'>
  filmId: number
}

function UserFilmToggle({ user, filmId }: Props) {
  const [open, setOpen] = useState(false)

  const { data, refetch: refetchState } = useGetUsersFilms(user.id, filmId)
  const { mutate: changeState } = useUpsertUsersFilms()
  // const { mutate: resetState } = useDeleteUsersFilms()

  function handleUpsert(newState: UserFilmState) {
    changeState(
      {
        userId: user.id,
        filmId: filmId,
        state: newState,
      },
      {
        onSuccess: () => {
          refetchState()
          setOpen(false)
        },
        onError: (e) => {
          alert(e.message)
        },
      },
    )
  }

  // function handleRemove() {
  //   resetState(
  //     { userId: user.id, filmId: filmId },
  //     {
  //       onSuccess: () => {
  //         refetchState()
  //         setOpen(false)
  //       },
  //       onError: (e) => {
  //         alert(e.message)
  //       },
  //     },
  //   )
  // }

  const state = data?.state

  return (
    <HoverCard openDelay={50} closeDelay={100} open={open} onOpenChange={(o) => setOpen(o)}>
      <HoverCardTrigger
        className="flex select-none flex-col items-center"
        onClick={() => setOpen(!open)}
      >
        <Avatar>
          <AvatarFallback
            className={cn({
              'bg-yellow-300 dark:bg-yellow-600': state === 'maybe',
              'bg-green-400 dark:bg-green-800': state === 'interested',
              'opacity-60': !state,
            })}
          >
            {user.name?.at(0) ?? '-'}
          </AvatarFallback>
        </Avatar>
        <p className="z-30 -mt-4 text-2xl">
          {state === 'interested' && '🤩'}
          {state === 'maybe' && '🤔'}
          {state === 'not_interested' && '🫥'}
        </p>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-auto select-none flex-col items-center gap-2 px-4 py-2">
        <div className="flex flex-row justify-between gap-4 text-4xl">
          <p
            className="cursor-pointer opacity-85 hover:opacity-100"
            onClick={() => handleUpsert('interested')}
          >
            🤩
          </p>
          <p
            className="cursor-pointer opacity-85 hover:opacity-100"
            onClick={() => handleUpsert('maybe')}
          >
            🤔
          </p>
          <p
            className="cursor-pointer opacity-85 hover:opacity-100"
            onClick={() => handleUpsert('not_interested')}
          >
            🫥
          </p>
        </div>
        <p>{user.name}</p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default UserFilmToggle
