import Profile from '@/components/profile/Profile'
import { P } from '@/components/ui/typeography'
import { useAuthedUser } from '@/services/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user, isSuccess, isLoading } = useAuthedUser()

  if (isLoading) return <P>Loading...</P>
  if (!isSuccess) return <P>Error</P>
  if (user.error) return <P>Error</P>

  return <Profile id={user.data.user.id} />
}
