import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BottomNav } from '@/components/layout/BottomNav'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useCreateHabit } from '@/hooks/use-habits'
import { Target } from 'lucide-react'

const schema = z.object({
  title: z.string().min(1, 'Name your habit'),
  xp_value: z.coerce.number().min(1).max(100).default(10),
})

type FormData = z.infer<typeof schema>

export default function CreateHabit() {
  const navigate = useNavigate()
  const createHabit = useCreateHabit()
  const [step, setStep] = useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', xp_value: 10 },
  })

  const title = watch('title')
  const xpValue = watch('xp_value')

  const onSubmit = async (data: FormData) => {
    try {
      const habit = await createHabit.mutateAsync({
        title: data.title,
        icon: 'target',
        schedule_json: { frequency: 'daily' },
        xp_value: data.xp_value,
      })
      navigate(`/habits/${habit.id}`, { replace: true })
    } catch {
      // toast handled in hook
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--background))] pb-20">
      <AnimatedPage className="container px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">New habit</h1>
          <p className="text-muted-foreground">Quick setup — under 30 seconds</p>
        </header>

        {step === 1 && (
          <Card className="mb-6 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Name & reward
              </CardTitle>
              <CardDescription>Give your habit a name and set the XP reward.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(() => setStep(2))} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Habit name</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Morning run"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="xp_value">XP per completion</Label>
                  <Input
                    id="xp_value"
                    type="number"
                    min={1}
                    max={100}
                    {...register('xp_value')}
                  />
                  {errors.xp_value && (
                    <p className="text-sm text-destructive">{errors.xp_value.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">Next</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="mb-6 shadow-card">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Review and create your habit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{title || 'Your habit'}</p>
                    <p className="text-sm text-muted-foreground">+{xpValue ?? 10} XP · Daily</p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={createHabit.isPending}>
                  {createHabit.isPending ? 'Creating…' : 'Create'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </AnimatedPage>
      <BottomNav />
    </div>
  )
}
