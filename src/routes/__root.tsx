import NavAvatar from '@/components/nav/NavAvatar'
import { Button } from '@/components/ui/button'
import { useAuthedUser, useGetSession } from '@/services/supabase'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  // Preload session
  useGetSession()
  const { data: user, isLoading } = useAuthedUser(true)

  return (
    <div className="flex min-h-screen flex-col gap-4 p-4 lg:container">
      <div className="flex flex-row justify-between gap-3">
        <div className="flex flex-row gap-3">
          <Link to="/">
            {({ isActive }) => <Button variant={isActive ? 'default' : 'outline'}>List</Button>}
          </Link>
          <Link to="/search">
            {({ isActive }) => <Button variant={isActive ? 'default' : 'outline'}>Search</Button>}
          </Link>
        </div>
        {!isLoading ? (
          user ? (
            <Link to="/profile">
              <NavAvatar userId={user.id} />
            </Link>
          ) : (
            <Link to="/profile">
              {({ isActive }) => (
                <Button variant={isActive ? 'default' : 'outline'}>Sign in</Button>
              )}
            </Link>
          )
        ) : (
          <></>
        )}
      </div>
      <Outlet />

      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      )}
    </div>
  )
}
