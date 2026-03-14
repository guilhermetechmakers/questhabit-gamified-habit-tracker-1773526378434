export interface Notification {
  id: string
  user_id: string
  type: string
  payload_json: Record<string, unknown>
  read: boolean
  created_at: string
}
