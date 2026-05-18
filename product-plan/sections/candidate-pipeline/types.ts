// =============================================================================
// UI Data Shapes — Candidate Pipeline
// =============================================================================

export type PipelineStageId =
  | 'applied'
  | 'screening'
  | 'hr-interview'
  | 'technical-interview'
  | 'offer'
  | 'hired'
  | 'rejected'

export type EnrichmentStatus = 'pending' | 'ingested' | 'error' | 'not-available'

export type RequisitionStatus = 'open' | 'closed' | 'on-hold'

// =============================================================================
// Core Entities
// =============================================================================

export interface TeamAssignment {
  recruiter?: { id: string; name: string }
  seniorDev?: { id: string; name: string }
}

export interface JobRequisition {
  id: string
  title: string
  department: string
  hiringManager: string
  status: RequisitionStatus
  createdAt: string
  location: string
  /** Interview team assigned to this requisition */
  assignedTeam: TeamAssignment
}

export interface PipelineStage {
  id: PipelineStageId
  label: string
  candidateCount: number
}

export interface CandidateEnrichment {
  resume: EnrichmentStatus
  linkedIn: EnrichmentStatus
}

export interface DualInterviewProgress {
  hrTranscriptUploaded: boolean
  hrTranscriptAnalyzed: boolean
  technicalTranscriptUploaded: boolean
  technicalTranscriptAnalyzed: boolean
}

export interface EvaluationProgress {
  dataImported: boolean
  profileBuilt: boolean
  interviewPrepped: boolean
  /** Dual interview tracking */
  interviews: DualInterviewProgress
  scorecardGenerated: boolean
}

export interface PipelineCandidate {
  id: string
  name: string
  email: string
  currentStage: PipelineStageId
  appliedDate: string
  enrichment: CandidateEnrichment
  evaluationProgress: EvaluationProgress
}

// =============================================================================
// Component Props
// =============================================================================

export interface CandidatePipelineProps {
  /** The job requisition whose pipeline is being viewed */
  jobRequisition: JobRequisition
  /** Available pipeline stages with candidate counts */
  pipelineStages: PipelineStage[]
  /** All candidates in this requisition's pipeline */
  candidates: PipelineCandidate[]
  /** Called when the user clicks a candidate to open their workspace */
  onSelectCandidate?: (candidateId: string) => void
  /** Called when filtering by a pipeline stage (null = show all) */
  onFilterByStage?: (stageId: PipelineStageId | null) => void
  /** Called when searching candidates by name or email */
  onSearch?: (query: string) => void
  /** Called when navigating back to job requisitions */
  onBack?: () => void
}
