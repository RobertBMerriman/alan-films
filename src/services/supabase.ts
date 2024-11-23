import { createClient } from '@supabase/supabase-js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Database } from '../../database.types'

const supabaseUrl = 'https://xhifbxvkghdfimmdvqjf.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export function useSignIn() {
  return useQuery({
    queryKey: ['supabase-sign-in'],
    queryFn: async () => {
      return await supabase.auth.signInWithPassword({
        // email: 'robertbmerriman@gmail.com',
        // email: 'therobz12@gmail.com',
        email: 'robert@alteam.io',
        password: import.meta.env.VITE_TEMP_PW,
      })
    },
  })
}

export function useAuthedUser() {
  return useQuery({
    queryKey: ['supabase-authed-user'],
    queryFn: async () => {
      return await supabase.auth.getUser()
    },
  })
}

export function usePublicUser(id: string) {
  return useQuery({
    queryKey: ['supabase-public-user', id],
    queryFn: async () => {
      return await supabase.from('users').select().eq('id', id).limit(1)
    },
  })
}

export function useGetFilms() {
  return useQuery({
    queryKey: ['supabase-get-films'],
    queryFn: async () => {
      return await supabase.from('films').select('*').order('created_at', { ascending: false })
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
