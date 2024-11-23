import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { P } from '@/components/ui/typeography'
import { usePublicUser } from '@/services/supabase'

interface Props {
  id: string
}

function Profile({ id }: Props) {
  const { data: user } = usePublicUser(id)

  if (!user) return <P>Loading</P>

  const loggedInUser = user.data?.at(0)
  if (!loggedInUser) return <P>Error</P>

  return (
    <div>
      <Avatar>
        <AvatarFallback>{loggedInUser.name?.at(0)}</AvatarFallback>
      </Avatar>
      {loggedInUser.name}
    </div>
  )
}

export default Profile
