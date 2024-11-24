import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthedUser, useGetSession, useSignIn } from '@/services/supabase'

function SignIn() {
  const { refetch: refetchSession } = useGetSession()
  const { refetch: refetchUser } = useAuthedUser(false)
  const { mutate: signIn } = useSignIn()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input
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
              },
              onError: (error) => alert(error.message),
            },
          )
        }
      >
        Sign in
      </Button>
    </>
  )
}

export default SignIn
