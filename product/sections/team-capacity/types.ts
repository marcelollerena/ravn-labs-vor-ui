// =============================================================================
// UI Data Shapes — Team Capacity
// =============================================================================

export type UserRole = 'recruiter' | 'senior_dev'

export type AvailabilityStatus = 'available' | 'busy' | 'overloaded'

export interface ActiveRequisition {
  id: string
  title: string
  department: string
  candidateCount: number
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: UserRole
  availabilityStatus: AvailabilityStatus
  activeRequisitions: number
  activeCandidates: number
  /** List of requisitions this person is currently assigned to */
  requisitions: ActiveRequisition[]
  lastAssignedAt: string | null
}

export interface TeamCapacitySummary {
  totalRecruiters: number
  totalSeniorDevs: number
  availableRecruiters: number
  availableSeniorDevs: number
}

export interface TeamCapacityProps {
  summary: TeamCapacitySummary
  members: TeamMember[]
  /** Called when admin clicks a team member to see detail */
  onMemberClick?: (memberId: string) => void
  /** Called when admin assigns a member to a requisition */
  onAssignToRequisition?: (memberId: string, requisitionId: string) => void
  /** Called when search input changes */
  onSearch?: (query: string) => void
  /** Called when filter changes */
  onFilterChange?: (filters: {
    role?: UserRole | null
    availability?: AvailabilityStatus | null
  }) => void
}
