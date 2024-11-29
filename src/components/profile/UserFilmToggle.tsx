import type { Tables } from 'database.types'
import { useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useDeleteUsersFilms, useGetUsersFilms, useUpsertUsersFilms } from '@/services/supabase'

interface Props {
  user: Tables<'users'>
  filmId: number
}

function UserFilmToggle({ user, filmId }: Props) {
  const [open, setOpen] = useState(false)

  const { data, refetch: refetchState } = useGetUsersFilms(user.id, filmId)
  const { mutate: changeState } = useUpsertUsersFilms()
  const { mutate: resetState } = useDeleteUsersFilms()

  const state = data?.state as 'interested' | 'maybe' | undefined
  const cl = state
    ? state === 'maybe'
      ? 'bg-yellow-300 dark:bg-yellow-600'
      : 'bg-green-400 dark:bg-green-800'
    : ''

  function handleUpsert(newState: 'interested' | 'maybe') {
    changeState(
      {
        userId: user.id,
        filmId: filmId,
        state: newState,
      },
      {
        onSuccess: () => {
          refetchState()
        },
        onError: (e) => {
          alert(e.message)
        },
      },
    )
  }

  function handleRemove() {
    resetState(
      { userId: user.id, filmId: filmId },
      {
        onSuccess: () => {
          refetchState()
        },
        onError: (e) => {
          alert(e.message)
        },
      },
    )
  }

  return (
    <HoverCard openDelay={50} closeDelay={100} open={open} onOpenChange={(o) => setOpen(o)}>
      <HoverCardTrigger
        className="flex select-none flex-col items-center"
        onClick={() => setOpen(!open)}
      >
        <Avatar>
          <AvatarFallback className={cl}>{user.name?.at(0) ?? '-'}</AvatarFallback>
        </Avatar>
        <p className="z-30 -mt-4 text-2xl">
          {state === 'interested' && '🤩'}
          {state === 'maybe' && '🤔'}
          {state === undefined && '🫥'}
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
          <p className="cursor-pointer opacity-85 hover:opacity-100" onClick={() => handleRemove()}>
            🫥
          </p>
        </div>
        <p>{user.name}</p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default UserFilmToggle
