import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { BottomNav } from '@/components/layout/BottomNav'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useHabits } from '@/hooks/use-habits'
import { Plus, Search, Target, ChevronRight } from 'lucide-react'
import type { Habit } from '@/types/habit'

export default function HabitList() {
  const [search, setSearch] = useState('')
  const { data: habits, isLoading } = useHabits()

  const filtered = habits?.filter((h) =>
    (h as Habit).title.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--background))] pb-20">
      <AnimatedPage className="container px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Habits</h1>
          <p className="text-muted-foreground">Manage your quests</p>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search habits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : !filtered.length ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center mb-4">
                {search ? 'No habits match your search.' : 'No habits yet.'}
              </p>
              {!search && (
                <Button asChild>
                  <Link to="/habits/new">Create habit</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {filtered.map((habit) => (
              <Card key={habit.id} className="transition-all hover:shadow-lg">
                <Link to={`/habits/${habit.id}`}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Target className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">{habit.title}</p>
                      <p className="text-sm text-muted-foreground">+{habit.xp_value} XP</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Link>
              </Card>
            ))}
          </ul>
        )}

        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild>
            <Link to="/habits/new">
              <Plus className="h-5 w-5 mr-2" />
              New habit
            </Link>
          </Button>
        </div>
      </AnimatedPage>
      <BottomNav />
    </div>
  )
}
