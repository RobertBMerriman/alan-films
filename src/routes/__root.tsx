import { Button } from '@/components/ui/button'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="col container flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-3">
        <Link to="/">
          {({ isActive }) => <Button variant={isActive ? 'default' : 'outline'}>Home</Button>}
        </Link>
        <Link to="/search">
          {({ isActive }) => <Button variant={isActive ? 'default' : 'outline'}>Search</Button>}
        </Link>
      </div>
      <Outlet />

      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  )
}
