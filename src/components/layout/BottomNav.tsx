import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ListTodo, PlusCircle, Trophy, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Today' },
  { to: '/habits', icon: ListTodo, label: 'Habits' },
  { to: '/habits/new', icon: PlusCircle, label: 'Add', primary: true },
  { to: '/leaderboard', icon: Trophy, label: 'Rank' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-16 items-center justify-around px-2 safe-area-pb">
        {items.map(({ to, icon: Icon, label, primary }) => {
          const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to))
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 rounded-xl px-4 py-2 transition-colors min-w-[64px]',
                primary
                  ? 'bg-primary text-primary-foreground shadow-lg hover:opacity-90'
                  : isActive
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
