// =============================================================================
// UI Data Shapes — Job Requisitions
// =============================================================================

export type RequisitionStatus = 'Open' | 'On Hold' | 'Closed' | 'Draft'

export type RequisitionPriority = 'Urgent' | 'High' | 'Normal'

export interface TeamAssignment {
  /** Assigned recruiter (optional — but at least one of recruiter or seniorDev must exist) */
  recruiter?: { id: string; name: string }
  /** Assigned senior developer (optional — but at least one must exist) */
  seniorDev?: { id: string; name: string }
}

export interface JobRequisition {
  id: string
  title: string
  department: string
  status: RequisitionStatus
  priority: RequisitionPriority
  candidateCount: number
  postedDate: string
  /** Interview team assigned to this requisition */
  assignedTeam: TeamAssignment
}

export interface SummaryStats {
  totalRequisitions: number
  openRequisitions: number
  totalCandidates: number
  urgentRoles: number
}

export interface JobRequisitionsProps {
  summaryStats: SummaryStats
  requisitions: JobRequisition[]
  departments: string[]

  /** Called when a user clicks a requisition row to view its candidate pipeline */
  onRequisitionClick?: (requisitionId: string) => void

  /** Called when search input value changes */
  onSearch?: (query: string) => void

  /** Called when any filter value changes */
  onFilterChange?: (filters: {
    status?: RequisitionStatus | null
    department?: string | null
    priority?: RequisitionPriority | null
  }) => void
}
