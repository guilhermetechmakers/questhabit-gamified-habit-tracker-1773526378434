import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { BottomNav } from '@/components/layout/BottomNav'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useHabits } from '@/hooks/use-habits'
import { useUserStats } from '@/hooks/use-user-stats'
import { useCompleteHabit } from '@/hooks/use-complete-habit'
import { Flame, Plus, Target, ChevronRight } from 'lucide-react'
import type { Habit } from '@/types/habit'

const XP_PER_LEVEL = 100

export default function Dashboard() {
  const { data: habits, isLoading: habitsLoading } = useHabits()
  const { data: stats, isLoading: statsLoading } = useUserStats()
  const completeHabit = useCompleteHabit()

  const xpForNext = stats ? (Math.floor(stats.xp_total / XP_PER_LEVEL) + 1) * XP_PER_LEVEL : XP_PER_LEVEL
  const xpInLevel = stats ? stats.xp_total % XP_PER_LEVEL : 0
  const progressPct = xpForNext ? (xpInLevel / XP_PER_LEVEL) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--background))] pb-20">
      <AnimatedPage className="container px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Today</h1>
          <p className="text-muted-foreground">Complete your daily quests</p>
        </header>

        {statsLoading ? (
          <Skeleton className="mb-6 h-28 rounded-2xl" />
        ) : (
          <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flame className="h-5 w-5 text-primary" />
                Level {stats?.level ?? 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{stats?.xp_total ?? 0} XP total</span>
                <span className="font-medium text-foreground">{xpInLevel} / {XP_PER_LEVEL} to next</span>
              </div>
              <Progress value={progressPct} className="h-2" />
              <div className="flex gap-4 text-sm">
                <span className="text-muted-foreground">Streak: <strong className="text-foreground">{stats?.current_streak ?? 0}</strong> days</span>
                <span className="text-muted-foreground">Best: <strong className="text-foreground">{stats?.longest_streak ?? 0}</strong></span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Your habits</h2>
          <Button size="sm" asChild>
            <Link to="/habits/new">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Link>
          </Button>
        </div>

        {habitsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : !habits?.length ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center mb-4">No habits yet. Create your first quest!</p>
              <Button asChild>
                <Link to="/habits/new">Create habit</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {(habits as Habit[]).map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onComplete={() => completeHabit.mutate({ habit_id: habit.id })}
                isCompleting={completeHabit.isPending}
              />
            ))}
          </ul>
        )}
      </AnimatedPage>
      <BottomNav />
    </div>
  )
}

function HabitCard({
  habit,
  onComplete,
  isCompleting,
}: {
  habit: Habit
  onComplete: () => void
  isCompleting: boolean
}) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Target className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground truncate">{habit.title}</p>
          <p className="text-sm text-muted-foreground">+{habit.xp_value} XP</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={onComplete}
            disabled={isCompleting}
          >
            {isCompleting ? '…' : 'Done'}
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/habits/${habit.id}`}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
