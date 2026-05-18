// =============================================================================
// UI Data Shapes — Interview Prep
// =============================================================================

export type BriefingStatus = 'ready' | 'pending' | 'outdated'

export type MatchQuality = 'strong' | 'moderate' | 'gaps-detected'

export type GapSeverity = 'low' | 'medium' | 'high'

export type InterviewType = 'hr_screening' | 'technical'

export type QuestionCategory =
  | 'Technical Depth'
  | 'Experience Gap'
  | 'Leadership'
  | 'Career Trajectory'
  | 'Culture Fit'
  | 'HR Screening'

// =============================================================================
// Candidate & Job Context
// =============================================================================

export interface CandidateContext {
  id: string
  name: string
  email: string
  currentStage: string
  currentTitle: string
  currentCompany: string
}

export interface JobRequisitionContext {
  id: string
  title: string
  department: string
  hiringManager: string
}

// =============================================================================
// Briefing Content
// =============================================================================

export interface Briefing {
  id: string
  /** Which interview this briefing is for */
  interviewType: InterviewType
  status: BriefingStatus
  generatedAt: string
  matchQuality: MatchQuality
  matchSummary: string
}

export interface Strength {
  id: string
  title: string
  detail: string
  requirementMatch: string
}

export interface Gap {
  id: string
  title: string
  detail: string
  severity: GapSeverity
  sourceNote: string
}

export interface RiskArea {
  id: string
  title: string
  detail: string
  severity: GapSeverity
  sources: string[]
  resumeValue: string
  linkedInValue: string
  atsValue: string
}

export interface InterviewQuestion {
  id: string
  category: QuestionCategory
  question: string
  context: string
  linkedGapId: string | null
}

// =============================================================================
// Component Props
// =============================================================================

export interface InterviewPrepProps {
  /** The candidate being prepared for */
  candidate: CandidateContext
  /** The job requisition this interview is for */
  jobRequisition: JobRequisitionContext
  /** The AI-generated briefing metadata and match assessment */
  briefing: Briefing
  /** Where the candidate meets or exceeds job requirements */
  strengths: Strength[]
  /** Missing or unclear qualifications to explore */
  gaps: Gap[]
  /** Discrepancies from the triangulated profile that warrant probing */
  riskAreas: RiskArea[]
  /** AI-generated interview questions linked to gaps and risks */
  interviewQuestions: InterviewQuestion[]
  /** Called when the interviewer copies a single question to clipboard */
  onCopyQuestion?: (questionId: string) => void
  /** Called when the interviewer copies the full briefing to clipboard */
  onCopyBriefing?: () => void
  /** Called when the interviewer requests briefing regeneration */
  onRegenerateBriefing?: () => void
  /** Called when the interviewer marks the briefing as reviewed */
  onMarkReviewed?: () => void
}
