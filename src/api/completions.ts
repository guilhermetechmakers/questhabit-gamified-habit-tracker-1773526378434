import { supabase } from '@/lib/supabase'
import type { CompletionEventInput } from '@/types/completion'

export interface CompleteHabitResult {
  completion: { id: string; habit_id: string; xp_awarded: number }
  xp_awarded: number
  xp_total: number
  level: number
  current_streak: number
  longest_streak: number
}

export const completionsApi = {
  completeHabit: async (input: CompletionEventInput): Promise<CompleteHabitResult> => {
    const { data, error } = await supabase.functions.invoke('complete-habit', {
      body: { habit_id: input.habit_id, timestamp: input.timestamp, source: input.source ?? 'app' },
    })
    if (error) throw error
    if (data?.error && !data.completed) throw new Error(data.error)
    return data as CompleteHabitResult
  },
}
