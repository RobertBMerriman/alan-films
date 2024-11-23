import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { usePublicUser } from '@/services/supabase'

interface Props {
  id: string
}

function UserAvatar({ id }: Props) {
  const { data: user } = usePublicUser(id)

  return (
    <Avatar>
      <AvatarFallback>{user?.data?.at(0)?.name?.at(0) ?? '-'}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
