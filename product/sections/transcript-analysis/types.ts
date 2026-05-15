// =============================================================================
// UI Data Shapes — Transcript Analysis
// =============================================================================

export type InterviewType = 'hr_screening' | 'technical'

export type UserRole = 'admin' | 'recruiter' | 'senior_dev'

export interface Candidate {
  id: string
  name: string
  email: string
  currentStage: string
}

export interface JobRequisition {
  id: string
  title: string
  department: string
}

export interface Transcript {
  id: string
  candidateId: string
  /** Which interview session this transcript belongs to */
  interviewType: InterviewType
  fileName: string
  uploadedAt: string
  status: 'pending' | 'processing' | 'analyzed' | 'error'
  wordCount: number
  duration: string
  speakers: string[]
  rawText: string
}

export type InsightCategory = 'strong' | 'weak' | 'red_flag' | 'notable'

export interface TranscriptInsight {
  id: string
  transcriptId: string
  category: InsightCategory
  summary: string
  quote: string
  quoteStartIndex: number
  quoteEndIndex: number
  topic: string
}

export interface RecallQuestion {
  id: string
  transcriptId: string
  question: string
  topic: string
  order: number
  answeredAt: string | null
}

export interface InterviewerAnswer {
  id: string
  recallQuestionId: string
  answer: string
  answeredAt: string
  /** Who provided this answer */
  answeredByRole: UserRole
}

// =============================================================================
// Component Props
// =============================================================================

export interface TranscriptAnalysisProps {
  /** Candidate context for breadcrumb and header */
  candidate: Candidate
  /** Job requisition context for breadcrumb */
  jobRequisition: JobRequisition
  /** Which interview type is being analyzed */
  interviewType: InterviewType
  /** The uploaded transcript (null before upload) */
  transcript: Transcript | null
  /** AI-extracted insights from the transcript */
  transcriptInsights: TranscriptInsight[]
  /** AI-generated recall questions for the interviewer */
  recallQuestions: RecallQuestion[]
  /** Interviewer's answers to recall questions */
  interviewerAnswers: InterviewerAnswer[]
  /** Called when the interviewer uploads or pastes a transcript */
  onUploadTranscript?: (file: File | string) => void
  /** Called when the interviewer wants to replace the current transcript */
  onReplaceTranscript?: () => void
  /** Called when the interviewer clicks an insight to scroll to it in the transcript */
  onInsightClick?: (insightId: string) => void
  /** Called when the interviewer submits an answer to a recall question */
  onAnswerRecallQuestion?: (questionId: string, answer: string) => void
}
