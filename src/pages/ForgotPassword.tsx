import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/layout/Navbar'
import { AnimatedPage } from '@/components/AnimatedPage'

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--background))]">
      <Navbar showAuth={false} />
      <main className="container flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4">
        <AnimatedPage className="w-full max-w-md">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Reset password</CardTitle>
              <CardDescription>
                Password reset flow can be wired to Supabase Auth (e.g. resetPasswordForEmail). See docs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/login">Back to login</Link>
              </Button>
            </CardContent>
          </Card>
        </AnimatedPage>
      </main>
    </div>
  )
}
