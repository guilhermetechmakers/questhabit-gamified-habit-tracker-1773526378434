import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/Navbar'
import { AnimatedPage } from '@/components/AnimatedPage'
import { Flame, Zap, Shield, Trophy } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--background))]">
      <Navbar />
      <main className="container px-4 py-12 md:py-20">
        <AnimatedPage>
          <section className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Turn habits into{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                quests
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Quick setup, instant rewards. Build lasting habits with XP, streaks, and badges.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="rounded-xl">
                <Link to="/signup">Get started free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-xl">
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </section>

          <section className="mx-auto mt-24 grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h2 className="font-semibold text-foreground">30-second setup</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Create a habit in seconds. One tap to complete. No friction.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <Trophy className="h-6 w-6" />
              </div>
              <h2 className="font-semibold text-foreground">XP & levels</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Earn XP every time you complete a habit. Level up and unlock badges.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="font-semibold text-foreground">Privacy first</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your data stays yours. Opt-in social features. Export anytime.
              </p>
            </div>
          </section>

          <section className="mx-auto mt-24 text-center">
            <p className="text-sm text-muted-foreground">
              Join thousands building better habits one quest at a time.
            </p>
            <Button variant="link" asChild className="mt-2">
              <Link to="/signup">
                <Flame className="mr-1 inline h-4 w-4" />
                Start your first quest
              </Link>
            </Button>
          </section>
        </AnimatedPage>
      </main>
    </div>
  )
}
