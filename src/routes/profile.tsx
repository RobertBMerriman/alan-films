import Profile from '@/components/profile/Profile'
// import ProfileUserCheck from '@/components/profile/ProfileUserCheck'
import SignIn from '@/components/profile/SignIn'
import { P } from '@/components/ui/typeography'
import { useAuthedUser, useGetSession } from '@/services/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session, isLoading: isLoadingSession } = useGetSession()
  const { data: user, isLoading: isLoadingUser } = useAuthedUser(!!session?.session)

  if (isLoadingSession) return <P>Loading session...</P>
  if (isLoadingUser) return <P>Loading user...</P>

  // return <ProfileUserCheck />
  return <>{session?.session && user ? <Profile id={user.id} /> : <SignIn />}</>
}
