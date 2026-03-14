export interface Completion {
  id: string
  habit_id: string
  user_id: string
  timestamp: string
  source: 'app' | 'offline_sync' | 'manual'
  xp_awarded: number
  created_at: string
}

export interface CompletionEventInput {
  habit_id: string
  timestamp?: string
  source?: 'app' | 'offline_sync' | 'manual'
}
