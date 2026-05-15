// =============================================================================
// UI Data Shapes — Candidate Workspace
// =============================================================================

export type PipelineStage =
  | 'applied'
  | 'screening'
  | 'hr-interview'
  | 'technical-interview'
  | 'offer'
  | 'hired'
  | 'rejected'

export type EnrichmentStatus = 'pending' | 'ingested' | 'error' | 'not-available'

export type DiscrepancySeverity = 'low' | 'medium' | 'high'

export type TabStatus = 'not-started' | 'action-needed' | 'complete'

export type RequisitionStatus = 'open' | 'closed' | 'on-hold'

export type UserRole = 'admin' | 'recruiter' | 'senior_dev'

// =============================================================================
// Core Entities
// =============================================================================

export interface TeamAssignment {
  recruiter?: { id: string; name: string }
  seniorDev?: { id: string; name: string }
}

export interface DualInterviewProgress {
  hrCompleted: boolean
  technicalCompleted: boolean
}

export interface EvaluationProgress {
  profileComplete: boolean
  interviewPrepReady: boolean
  interviews: DualInterviewProgress
  scorecardGenerated: boolean
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  currentStage: PipelineStage
  appliedDate: string
  evaluationProgress: EvaluationProgress
}

export interface JobRequisition {
  id: string
  title: string
  department: string
  hiringManager: string
  status: RequisitionStatus
  /** Interview team assigned to this requisition */
  assignedTeam: TeamAssignment
}

// =============================================================================
// Data Sources
// =============================================================================

export interface ATSRecordFields {
  name: string
  email: string
  phone: string
  location: string
  currentTitle: string
  currentCompany: string
  stage: string
  source: string
  appliedDate: string
  tags: string[]
}

export interface ATSRecord {
  source: string
  status: EnrichmentStatus
  ingestedAt: string
  fields: ATSRecordFields
}

export interface WorkHistoryEntry {
  title: string
  company: string
  startDate: string
  endDate: string | null
  duration: string
  highlights?: string[]
}

export interface EducationEntry {
  degree: string
  institution: string
  graduationYear: number
}

export interface ResumeParsedData {
  currentTitle: string
  currentCompany: string
  yearsExperience: number
  workHistory: WorkHistoryEntry[]
  education: EducationEntry[]
  skills: string[]
  certifications: string[]
}

export interface ResumeDocument {
  id: string
  fileName: string
  uploadedAt: string
  status: EnrichmentStatus
  parsedData: ResumeParsedData
}

export interface LinkedInParsedData {
  headline: string
  location: string
  connectionCount: number
  currentTitle: string
  currentCompany: string
  workHistory: WorkHistoryEntry[]
  education: EducationEntry[]
  skills: string[]
  endorsements: Record<string, number>
}

export interface LinkedInProfile {
  id: string
  profileUrl: string
  status: EnrichmentStatus
  ingestedAt: string
  parsedData: LinkedInParsedData
}

// =============================================================================
// Triangulated Profile
// =============================================================================

export interface MergedFields {
  name: string
  currentTitle: string
  currentCompany: string
  location: string
  yearsExperience: number
  topSkills: string[]
  education: string
}

export interface CandidateProfile {
  id: string
  generatedAt: string
  status: 'pending' | 'complete' | 'error'
  summary: string
  mergedFields: MergedFields
}

export interface Discrepancy {
  id: string
  field: string
  severity: DiscrepancySeverity
  resumeValue: string
  linkedInValue: string
  atsValue: string
  summary: string
  suggestedQuestion: string | null
}

// =============================================================================
// Workspace Navigation
// =============================================================================

export interface WorkspaceTab {
  id: 'profile' | 'interview-prep' | 'hr-interview' | 'technical-interview' | 'scorecard'
  label: string
  status: TabStatus
  isActive: boolean
}

// =============================================================================
// Component Props
// =============================================================================

export interface CandidateWorkspaceProps {
  /** Current user's role — determines edit permissions */
  currentUserRole: UserRole
  /** The candidate being evaluated */
  candidate: Candidate
  /** The job requisition this candidate is being evaluated for */
  jobRequisition: JobRequisition
  /** Structured data imported from the ATS */
  atsRecord: ATSRecord
  /** Parsed resume document data */
  resumeDocument: ResumeDocument
  /** LinkedIn profile data */
  linkedInProfile: LinkedInProfile
  /** The merged, triangulated candidate profile */
  candidateProfile: CandidateProfile
  /** Conflicts detected between data sources */
  discrepancies: Discrepancy[]
  /** Workspace tab configuration and status */
  workspaceTabs: WorkspaceTab[]
  /** Called when the user switches workspace tabs */
  onTabChange?: (tabId: WorkspaceTab['id']) => void
  /** Called when the recruiter uploads a resume PDF */
  onUploadResume?: (file: File) => void
  /** Called when the recruiter provides a LinkedIn URL */
  onAddLinkedIn?: (url: string) => void
  /** Called when the recruiter uploads a LinkedIn PDF export */
  onUploadLinkedInPdf?: (file: File) => void
  /** Called when the user navigates back to the candidate pipeline */
  onBack?: () => void
}
