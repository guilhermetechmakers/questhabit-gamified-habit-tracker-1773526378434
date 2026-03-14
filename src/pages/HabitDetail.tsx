import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { BottomNav } from '@/components/layout/BottomNav'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useHabit } from '@/hooks/use-habits'
import { useCompleteHabit } from '@/hooks/use-complete-habit'
import { Target, ArrowLeft, Check } from 'lucide-react'

export default function HabitDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: habit, isLoading, error } = useHabit(id ?? '')
  const completeHabit = useCompleteHabit()

  if (error || (id && !isLoading && !habit)) {
    return (
      <div className="container px-4 py-8">
        <p className="text-muted-foreground">Habit not found.</p>
        <Button variant="link" asChild className="mt-2">
          <Link to="/habits">Back to habits</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--background))] pb-20">
      <AnimatedPage className="container px-4 py-6">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/habits">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-foreground">Habit</h1>
        </div>

        {isLoading ? (
          <Skeleton className="h-40 rounded-2xl" />
        ) : habit ? (
          <>
            <Card className="mb-6 shadow-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <Target className="h-7 w-7" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{habit.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">+{habit.xp_value} XP per completion</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => completeHabit.mutate({ habit_id: habit.id })}
                  disabled={completeHabit.isPending}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {completeHabit.isPending ? '…' : 'Mark complete'}
                </Button>
              </CardContent>
            </Card>
          </>
        ) : null}
      </AnimatedPage>
      <BottomNav />
    </div>
  )
}
