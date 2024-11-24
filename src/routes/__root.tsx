import { Button } from '@/components/ui/button'
import { useAuthedUser, useGetSession } from '@/services/supabase'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  // TODO store sign in + public user

  // Preload session
  useGetSession()
  useAuthedUser(true)

  return (
    <div className="flex flex-col gap-4 p-4 lg:container">
      <div className="flex flex-row gap-3">
        <Link to="/">
          {({ isActive }) => <Button variant={isActive ? 'default' : 'outline'}>List</Button>}
        </Link>
        <Link to="/search">
          {({ isActive }) => <Button variant={isActive ? 'default' : 'outline'}>Search</Button>}
        </Link>
        <Link to="/profile">
          {({ isActive }) => <Button variant={isActive ? 'default' : 'outline'}>Profile</Button>}
        </Link>
      </div>
      <Outlet />

      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  )
}
