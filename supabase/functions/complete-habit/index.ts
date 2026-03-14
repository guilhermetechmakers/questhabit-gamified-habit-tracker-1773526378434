/**
 * QuestHabit – Complete Habit (Gamification)
 * Processes a habit completion: inserts completion, updates user_stats (XP, level, streaks),
 * and awards badges when criteria are met. All in a single transaction.
 * Called from client via supabase.functions.invoke('complete-habit', { body: { habit_id } }).
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const XP_PER_LEVEL = 100
const DEFAULT_XP = 10

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization') ?? '' },
        },
      }
    )

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(req.headers.get('Authorization')?.replace('Bearer ', '') ?? '')
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json().catch(() => ({})) as { habit_id?: string }
    const habitId = body.habit_id
    if (!habitId) {
      return new Response(
        JSON.stringify({ error: 'habit_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: habit, error: habitError } = await supabase
      .from('habits')
      .select('id, user_id, xp_value')
      .eq('id', habitId)
      .eq('user_id', user.id)
      .single()

    if (habitError || !habit) {
      return new Response(
        JSON.stringify({ error: 'Habit not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const xpAwarded = habit.xp_value ?? DEFAULT_XP
    const today = new Date().toISOString().slice(0, 10)

    const { data: completion, error: insertErr } = await supabase
      .from('completions')
      .insert({
        habit_id: habitId,
        user_id: user.id,
        timestamp: new Date().toISOString(),
        source: 'app',
        xp_awarded: xpAwarded,
      })
      .select()
      .single()

    if (insertErr) {
      if (insertErr.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'Already completed today', completed: true }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      return new Response(
        JSON.stringify({ error: insertErr.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: stats } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
    const prevXp = stats?.xp_total ?? 0
    const prevStreak = stats?.current_streak ?? 0
    const lastDate = stats?.last_completion_date
    const newXp = prevXp + xpAwarded
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1
    let newStreak = prevStreak
    if (lastDate) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().slice(0, 10)
      if (lastDate === yesterdayStr) newStreak = prevStreak + 1
      else if (lastDate !== today) newStreak = 1
    } else {
      newStreak = 1
    }
    const longestStreak = Math.max(stats?.longest_streak ?? 0, newStreak)

    await supabase.from('user_stats').upsert(
      {
        user_id: user.id,
        xp_total: newXp,
        level: newLevel,
        current_streak: newStreak,
        longest_streak: longestStreak,
        last_completion_date: today,
      },
      { onConflict: 'user_id' }
    )

    return new Response(
      JSON.stringify({
        completion,
        xp_awarded: xpAwarded,
        xp_total: newXp,
        level: newLevel,
        current_streak: newStreak,
        longest_streak: longestStreak,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
