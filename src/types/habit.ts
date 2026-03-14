export interface Habit {
  id: string
  user_id: string
  title: string
  icon: string
  schedule_json: ScheduleJson
  xp_value: number
  privacy_flag: 'private' | 'public' | 'friends'
  archived: boolean
  created_at: string
  updated_at: string
}

export interface ScheduleJson {
  frequency: 'daily' | 'weekly' | 'monthly'
  days?: number[]
  times?: string[]
  timezone?: string
}

export interface CreateHabitInput {
  title: string
  icon?: string
  schedule_json: ScheduleJson
  xp_value?: number
  privacy_flag?: 'private' | 'public' | 'friends'
}

export interface UpdateHabitInput {
  title?: string
  icon?: string
  schedule_json?: ScheduleJson
  xp_value?: number
  privacy_flag?: 'private' | 'public' | 'friends'
  archived?: boolean
}
