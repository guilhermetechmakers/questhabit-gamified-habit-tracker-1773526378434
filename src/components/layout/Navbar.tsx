import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  className?: string
  showAuth?: boolean
}

export function Navbar({ className, showAuth = true }: NavbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
        className
      )}
    >
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Flame className="h-4 w-4" />
          </span>
          QuestHabit
        </Link>
        <nav className="flex items-center gap-2">
          {showAuth && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
