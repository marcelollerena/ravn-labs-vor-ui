// =============================================================================
// UI Data Shapes — Scorecard
// =============================================================================

export interface Strength {
  id: string
  text: string
  evidence: string
}

export interface Concern {
  id: string
  text: string
  evidence: string
}

export type InterviewSource = 'hr' | 'technical' | 'combined'

export interface EvidenceQuote {
  id: string
  timestamp: string
  speaker: string
  quote: string
  context: string
  /** Which interview this quote came from */
  interviewSource: InterviewSource
}

export interface InterviewerImpression {
  id: string
  question: string
  answer: string
  sentiment: 'positive' | 'neutral' | 'negative'
  /** Which interviewer provided this impression */
  interviewSource: InterviewSource
}

export interface ATSPushEvent {
  id: string
  scorecardId: string
  pushedAt: string
  atsProvider: string
  status: 'success' | 'failed'
  externalUrl?: string
  errorMessage?: string
}

export type Recommendation = 'hire' | 'no_hire' | 'maybe'
export type ConfidenceLevel = 'high' | 'medium' | 'low'
export type ScorecardStatus = 'generating' | 'draft' | 'pushed' | 'push_failed'

export interface Scorecard {
  id: string
  candidateId: string
  candidateName: string
  jobRequisitionId: string
  jobTitle: string
  department: string
  generatedAt: string
  lastEditedAt: string | null
  editedByRecruiter: boolean
  status: ScorecardStatus
  /** Overall summary synthesizing both interviews */
  summary: string
  /** HR interview summary */
  hrSummary: string
  /** Technical interview summary */
  technicalSummary: string
  recommendation: Recommendation | null
  confidenceLevel: ConfidenceLevel | null
  strengths: Strength[]
  concerns: Concern[]
  evidenceQuotes: EvidenceQuote[]
  /** Impressions from both interviewers */
  interviewerImpressions: InterviewerImpression[]
  atsPushEvents: ATSPushEvent[]
  atsConnectionName: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ScorecardProps {
  /** The scorecard to display */
  scorecard: Scorecard
  /** Called when a section of the scorecard is edited */
  onEditSection?: (scorecardId: string, section: 'summary' | 'hrSummary' | 'technicalSummary' | 'strengths' | 'concerns' | 'evidenceQuotes' | 'interviewerImpressions' | 'recommendation', value: unknown) => void
  /** Called when the scorecard is pushed to the ATS */
  onPushToATS?: (scorecardId: string) => void
  /** Called when a failed push is retried */
  onRetryPush?: (scorecardId: string) => void
  /** Called when the AI scorecard is regenerated */
  onRegenerate?: (scorecardId: string) => void
  /** Called when the scorecard is downloaded as markdown */
  onDownload?: (scorecardId: string) => void
}
