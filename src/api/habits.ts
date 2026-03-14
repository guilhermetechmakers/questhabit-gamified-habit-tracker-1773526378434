import { supabase } from '@/lib/supabase'
import type { Habit, CreateHabitInput, UpdateHabitInput } from '@/types/habit'

export const habitsApi = {
  getAll: async (): Promise<Habit[]> => {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('archived', false)
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data ?? []) as Habit[]
  },

  getById: async (id: string): Promise<Habit | null> => {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as Habit
  },

  create: async (input: CreateHabitInput): Promise<Habit> => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')
    const { data, error } = await supabase
      .from('habits')
      .insert({
        user_id: user.id,
        title: input.title,
        icon: input.icon ?? 'target',
        schedule_json: input.schedule_json,
        xp_value: input.xp_value ?? 10,
        privacy_flag: input.privacy_flag ?? 'private',
      })
      .select()
      .single()
    if (error) throw error
    return data as Habit
  },

  update: async (id: string, updates: UpdateHabitInput): Promise<Habit> => {
    const { data, error } = await supabase
      .from('habits')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data as Habit
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('habits').delete().eq('id', id)
    if (error) throw error
  },
}
