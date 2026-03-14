import { supabase } from '@/lib/supabase'
import type { UserStats } from '@/types/user'

export const userStatsApi = {
  getCurrent: async (): Promise<UserStats | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single()
    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as UserStats
  },
}
