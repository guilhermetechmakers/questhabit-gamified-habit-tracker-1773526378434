import { useQuery } from '@tanstack/react-query'
import { userStatsApi } from '@/api/user-stats'

const statsKey = ['user-stats'] as const

export function useUserStats() {
  return useQuery({
    queryKey: statsKey,
    queryFn: userStatsApi.getCurrent,
    staleTime: 1000 * 60,
  })
}
