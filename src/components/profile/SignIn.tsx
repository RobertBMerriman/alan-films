import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthedUser, useGetSession, useSignIn } from '@/services/supabase'
import { useNavigate } from '@tanstack/react-router'

function SignIn() {
  const { refetch: refetchSession } = useGetSession()
  const { refetch: refetchUser } = useAuthedUser(false)
  const { mutate: signIn } = useSignIn()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col gap-4 sm:w-64">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button
          onClick={() =>
            signIn(
              { email, password },
              {
                onSuccess: () => {
                  refetchSession()
                  refetchUser()
                  navigate({ to: '/' })
                },
                onError: (error) => alert(error.message),
              },
            )
          }
        >
          Sign in
        </Button>
      </div>
    </div>
  )
}

export default SignIn
