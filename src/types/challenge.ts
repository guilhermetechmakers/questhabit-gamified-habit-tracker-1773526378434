export type ChallengePrivacy = 'public' | 'private' | 'invite'

export interface Challenge {
  id: string
  creator_id: string
  name: string
  rules_json: Record<string, unknown>
  starts_at: string
  ends_at: string
  privacy: ChallengePrivacy
  created_at: string
}

export interface ChallengeParticipant {
  challenge_id: string
  user_id: string
  progress_json: Record<string, unknown>
  joined_at: string
}
