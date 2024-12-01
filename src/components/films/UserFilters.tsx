import { useState } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { usePublicUsers } from '@/services/supabase'

function UserFilters() {
  const { data: users } = usePublicUsers()

  const [userIds, setUserIds] = useState<string[]>([])

  if (!users) return <></>

  return (
    <div className="ml-2 flex flex-row items-center justify-center gap-2">
      <span className="whitespace-nowrap">Who's in?</span>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {users.map((user) => (
          <Avatar
            key={user.id}
            className="cursor-pointer"
            onClick={() => {
              if (userIds.includes(user.id)) {
                setUserIds(userIds.filter((id) => id !== user.id))
              } else {
                setUserIds([...userIds, user.id])
              }
            }}
          >
            <AvatarFallback
              className={cn({
                'bg-green-400 dark:bg-green-800': !userIds.includes(user.id),
              })}
            >
              {user.name?.at(0) ?? '-'}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  )
}

export default UserFilters
