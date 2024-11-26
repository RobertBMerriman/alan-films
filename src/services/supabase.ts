import { createClient } from '@supabase/supabase-js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Database } from '../../database.types'

const supabaseUrl = 'https://xhifbxvkghdfimmdvqjf.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

interface SignIn {
  email: string
  password: string
}

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: SignIn) => {
      const res = await supabase.auth.signInWithPassword({
        // email: 'robertbmerriman@gmail.com',
        // email: 'therobz12@gmail.com',
        // email: 'robert@alteam.io',
        email,
        // password: import.meta.env.VITE_TEMP_PW,
        password,
      })

      if (res.error) throw new Error(res.error.message)
      return res.data
    },
    retry: false,
  })
}

export function useSignOut() {
  return useMutation({
    mutationFn: async () => {
      const res = await supabase.auth.signOut({ scope: 'local' })

      if (res.error) throw new Error(res.error.message)
      return res
    },
  })
}

export function useGetSession() {
  return useQuery({
    queryKey: ['supabase-get-session'],
    queryFn: async () => {
      const res = await supabase.auth.getSession()

      if (res.error) throw new Error(res.error.message)
      return res.data
    },
  })
}

export function useAuthedUser(session = false) {
  return useQuery({
    queryKey: ['supabase-authed-user'],
    queryFn: async () => {
      const res = await supabase.auth.getUser()

      if (res.error) throw new Error(res.error.message)
      return res.data.user
    },
    enabled: session,
    retry: false,
  })
}

export function usePublicUser(id: string) {
  return useQuery({
    queryKey: ['supabase-public-user', id],
    queryFn: async () => {
      const res = await supabase.from('users').select().eq('id', id).limit(1).single()

      if (res.error) throw new Error(res.error.message)
      return res.data
    },
  })
}

export function usePublicUsers() {
  return useQuery({
    queryKey: ['supabase-public-users'],
    queryFn: async () => {
      const res = await supabase.from('users').select().order('id')

      if (res.error) throw new Error(res.error.message)
      return res.data
    },
    staleTime: Infinity,
  })
}

export function useGetFilms() {
  return useQuery({
    queryKey: ['supabase-get-films'],
    queryFn: async () => {
      const res = await supabase
        .from('films')
        .select('*, users!users_films ( * )')
        .order('created_at', { ascending: false })

      if (res.error) throw new Error(res.error.message)
      return res.data
    },
  })
}

export function useGetUsersFilms(userId: string, filmId: number) {
  return useQuery({
    queryKey: ['supabase-get-users-films', userId, filmId],
    queryFn: async () => {
      const res = await supabase
        .from('users_films')
        .select('state')
        .eq('user_id', userId)
        .eq('film_id', filmId)
        .limit(1)
        .single()

      if (res.error) throw new Error(res.error.message)
      return res.data
    },
  })
}

interface AddFilm {
  id: number
  userId: string
}

export function useAddFilm() {
  return useMutation({
    mutationFn: async ({ id, userId }: AddFilm) => {
      return await supabase
        .from('films')
        .insert([{ film_id: id, added_user_id: userId }])
        .select()
    },
  })
}

interface AddUsersFilms {
  userId: string
  filmId: number
  state: 'interested' | 'maybe'
}

export function useUpsertUsersFilms() {
  return useMutation({
    mutationFn: async ({ userId, filmId, state }: AddUsersFilms) => {
      return await supabase
        .from('users_films')
        .upsert([{ user_id: userId, film_id: filmId, state }])
        .select()
    },
  })
}

interface UpdateLoggedInUserName {
  id: string
  name: string
}

export function useUpdateName() {
  return useMutation({
    mutationFn: async ({ id, name }: UpdateLoggedInUserName) => {
      return await supabase.from('users').update({ name }).eq('id', id).select()
    },
  })
}
