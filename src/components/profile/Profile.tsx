import { useLayoutEffect, useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { P } from '@/components/ui/typeography'
import {
  useAuthedUser,
  useGetSession,
  usePublicUser,
  useSignOut,
  useUpdateName,
} from '@/services/supabase'

interface Props {
  id: string
}

function Profile({ id }: Props) {
  const [editName, setEditName] = useState('')

  const { mutate: signOut } = useSignOut()

  const { refetch: refetchSession } = useGetSession()
  const { refetch: refetchUser } = useAuthedUser(true)
  const { data: user, refetch: refetchPublicUser, isFetching } = usePublicUser(id)
  const { mutate: updateName, isPending } = useUpdateName()

  useLayoutEffect(() => {
    if (user && user.name) {
      setEditName(user.name)
    }
  }, [user])

  if (!user) return <P>Loading</P>

  return (
    <div className="mt-4 flex flex-col items-center gap-8">
      <div className="flex flex-row gap-4">
        <Avatar>
          <AvatarFallback>{user.name?.at(0) ?? ''}</AvatarFallback>
        </Avatar>
        <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="md:w-64" />
        <Button
          disabled={isFetching || isPending || !editName || editName === user.name}
          onClick={() =>
            updateName({ id: user.id, name: editName }, { onSettled: () => refetchPublicUser() })
          }
        >
          Save
        </Button>
      </div>
      <div>
        <Button
          variant={'destructive'}
          size={'sm'}
          onClick={() =>
            signOut(undefined, {
              onSettled: () => {
                refetchSession()
                refetchUser()
                refetchPublicUser()
              },
            })
          }
        >
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default Profile
