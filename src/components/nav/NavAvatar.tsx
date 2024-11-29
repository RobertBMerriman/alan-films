import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { usePublicUser } from '@/services/supabase'

interface Props {
  userId: string
}

function NavAvatar({ userId }: Props) {
  const { data: user } = usePublicUser(userId)

  return (
    <Avatar>
      <AvatarFallback>{user?.name?.at(0) ?? ''}</AvatarFallback>
    </Avatar>
  )
}

export default NavAvatar
