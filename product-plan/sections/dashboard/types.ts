// =============================================================================
// UI Data Shapes — Dashboard
// =============================================================================

export type UserRole = 'admin' | 'recruiter' | 'senior_dev'

export interface DashboardSummary {
  activeRequisitions: number
  candidatesInProgress: number
  scorecardsPendingPush: number
  /** Number of team assignments across all requisitions (admin context) */
  teamAssignments: number
}

export type ATSSyncStatusValue = 'success' | 'failed' | 'in_progress'

export interface ATSSyncStatus {
  provider: string
  lastSyncAt: string
  status: ATSSyncStatusValue
  requisitionsImported: number
  candidatesImported: number
}

export type PendingAction =
  | 'hr_transcript_not_uploaded'
  | 'technical_transcript_not_uploaded'
  | 'scorecard_not_pushed'
  | 'recall_questions_pending'
  | 'linkedin_not_linked'
  | 'resume_not_parsed'

export type Urgency = 'high' | 'medium' | 'low'

export interface NeedsAttentionItem {
  id: string
  candidateId: string
  candidateName: string
  jobTitle: string
  requisitionId: string
  pendingAction: PendingAction
  pendingActionLabel: string
  interviewDate: string
  urgency: Urgency
  /** Who this action item is assigned to */
  assignedTo?: string
  /** Role of the person this action belongs to */
  assignedRole?: UserRole
}

export type ActivityType =
  | 'ats_sync'
  | 'scorecard_generated'
  | 'ats_push'
  | 'transcript_analyzed'
  | 'team_assigned'

export type RelatedEntityType = 'SyncJob' | 'Candidate' | 'JobRequisition'

export interface RecentActivityItem {
  id: string
  type: ActivityType
  description: string
  timestamp: string
  relatedEntityId: string
  relatedEntityType: RelatedEntityType
}

export interface DashboardProps {
  /** Current user's role — determines what is shown */
  currentUserRole: UserRole
  summary: DashboardSummary
  atsSyncStatus: ATSSyncStatus
  needsAttention: NeedsAttentionItem[]
  recentActivity: RecentActivityItem[]

  /** Navigate to a candidate's workspace */
  onCandidateClick?: (candidateId: string) => void
  /** Navigate to a job requisition's candidate pipeline */
  onRequisitionClick?: (requisitionId: string) => void
  /** Navigate to the ATS Connection section */
  onConnectATS?: () => void
  /** View details of a specific activity event */
  onActivityClick?: (activityId: string, entityType: RelatedEntityType, entityId: string) => void
  /** Navigate to team capacity (admin only) */
  onTeamCapacityClick?: () => void
}
