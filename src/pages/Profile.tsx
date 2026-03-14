import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BottomNav } from '@/components/layout/BottomNav'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useAuth } from '@/hooks/use-auth'
import { User, LogOut } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--background))] pb-20">
      <AnimatedPage className="container px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Account and settings</p>
        </header>

        {user && (
          <Card className="mb-6 shadow-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{user.email}</CardTitle>
                  <p className="text-sm text-muted-foreground">Signed in</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </CardContent>
          </Card>
        )}
      </AnimatedPage>
      <BottomNav />
    </div>
  )
}
