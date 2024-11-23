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
        email: 'robertbmerriman@gmail.com',
        password: import.meta.env.VITE_TEMP_PW,
      })
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

export function useAddFilm() {
  return useMutation({
    mutationFn: async (id: number) => {
      return await supabase
        .from('films')
        .insert([{ film_id: id }])
        .select()
    },
  })
}
