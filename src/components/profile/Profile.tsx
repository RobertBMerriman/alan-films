import { useLayoutEffect, useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { P } from '@/components/ui/typeography'
import { usePublicUser, useUpdateName } from '@/services/supabase'

interface Props {
  id: string
}

function Profile({ id }: Props) {
  const [editName, setEditName] = useState('')

  const { data: user, refetch, isFetching } = usePublicUser(id)
  const { mutate, isPending } = useUpdateName()

  const loggedInUser = user?.data?.at(0)

  useLayoutEffect(() => {
    if (loggedInUser && loggedInUser.name) {
      setEditName(loggedInUser.name)
    }
  }, [loggedInUser])

  if (!user) return <P>Loading</P>
  if (!loggedInUser) return <P>Error</P>

  return (
    <div className="flex flex-row gap-4">
      <Avatar>
        <AvatarFallback>{loggedInUser.name?.at(0) ?? ''}</AvatarFallback>
      </Avatar>
      <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
      <Button
        disabled={isFetching || isPending || !editName || editName === loggedInUser.name}
        onClick={() =>
          mutate({ id: loggedInUser.id, name: editName }, { onSettled: () => refetch() })
        }
      >
        Save
      </Button>
    </div>
  )
}

export default Profile
