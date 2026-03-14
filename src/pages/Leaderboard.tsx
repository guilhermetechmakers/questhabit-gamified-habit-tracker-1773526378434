import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { BottomNav } from '@/components/layout/BottomNav'
import { AnimatedPage } from '@/components/AnimatedPage'
import { Trophy } from 'lucide-react'

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--background))] pb-20">
      <AnimatedPage className="container px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">Friendly competition — coming soon</p>
        </header>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="mb-2">Coming soon</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Compete with friends and climb the ranks. Enable in settings when ready.
            </p>
          </CardContent>
        </Card>
      </AnimatedPage>
      <BottomNav />
    </div>
  )
}
