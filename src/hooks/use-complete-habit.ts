import { useMutation, useQueryClient } from '@tanstack/react-query'
import { completionsApi } from '@/api/completions'
import { toast } from 'sonner'
import { habitKeys } from './use-habits'

const statsKey = ['user-stats'] as const

export function useCompleteHabit() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: completionsApi.completeHabit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() })
      queryClient.invalidateQueries({ queryKey: statsKey })
      toast.success(`+${data.xp_awarded} XP! Level ${data.level}`)
    },
    onError: (e: Error) => toast.error(e.message),
  })
}
