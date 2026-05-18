// =============================================================================
// UI Data Shapes — Combined Reference
//
// These types define the data that UI components expect to receive as props.
// They are a frontend contract, not a database schema. How you model, store,
// and fetch this data is an implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/dashboard
// -----------------------------------------------------------------------------

export type UserRole = 'admin' | 'recruiter' | 'senior_dev'

export interface DashboardSummary {
  activeRequisitions: number
  candidatesInProgress: number
  scorecardsPendingPush: number
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
  assignedTo?: string
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

// -----------------------------------------------------------------------------
// From: sections/ats-connection
// -----------------------------------------------------------------------------

export interface ATSProvider {
  id: string
  name: string
  icon: string
  description: string
}

export interface ATSConnection {
  id: string
  providerId: string
  providerName: string
  status: 'connected' | 'error' | 'disconnected'
  apiKeyMasked: string
  connectedAt: string
  lastSyncedAt: string | null
}

export interface SyncJob {
  id: string
  connectionId: string
  status: 'completed' | 'failed' | 'in_progress'
  startedAt: string
  completedAt: string | null
  jobRequisitionsImported: number
  candidatesImported: number
  error?: string
}

export interface ImportProgress {
  phase: 'job_requisitions' | 'candidates'
  phaseLabel: string
  percent: number
  jobRequisitionsImported: number
  candidatesImported: number
  candidatesTotal: number
}

// -----------------------------------------------------------------------------
// From: sections/job-requisitions
// -----------------------------------------------------------------------------

export type RequisitionStatus = 'Open' | 'On Hold' | 'Closed' | 'Draft'
export type RequisitionPriority = 'Urgent' | 'High' | 'Normal'

export interface TeamAssignment {
  recruiter?: { id: string; name: string }
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
  assignedTeam: TeamAssignment
}

export interface JobRequisitionSummaryStats {
  totalRequisitions: number
  openRequisitions: number
  totalCandidates: number
  urgentRoles: number
}

// -----------------------------------------------------------------------------
// From: sections/candidate-pipeline
// -----------------------------------------------------------------------------

export type PipelineStageId =
  | 'applied'
  | 'screening'
  | 'hr-interview'
  | 'technical-interview'
  | 'offer'
  | 'hired'
  | 'rejected'

export type EnrichmentStatus = 'pending' | 'ingested' | 'error' | 'not-available'

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

export interface PipelineEvaluationProgress {
  dataImported: boolean
  profileBuilt: boolean
  interviewPrepped: boolean
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
  evaluationProgress: PipelineEvaluationProgress
}

// -----------------------------------------------------------------------------
// From: sections/candidate-workspace
// -----------------------------------------------------------------------------

export type DiscrepancySeverity = 'low' | 'medium' | 'high'
export type TabStatus = 'not-started' | 'action-needed' | 'complete'

export interface WorkspaceEvaluationProgress {
  profileComplete: boolean
  interviewPrepReady: boolean
  interviews: { hrCompleted: boolean; technicalCompleted: boolean }
  scorecardGenerated: boolean
}

export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  currentStage: string
  appliedDate: string
  evaluationProgress: WorkspaceEvaluationProgress
}

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

export interface WorkspaceTab {
  id: 'profile' | 'interview-prep' | 'hr-interview' | 'technical-interview' | 'scorecard'
  label: string
  status: TabStatus
  isActive: boolean
}

// -----------------------------------------------------------------------------
// From: sections/interview-prep
// -----------------------------------------------------------------------------

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

export interface Briefing {
  id: string
  interviewType: InterviewType
  status: BriefingStatus
  generatedAt: string
  matchQuality: MatchQuality
  matchSummary: string
}

export interface InterviewStrength {
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

// -----------------------------------------------------------------------------
// From: sections/transcript-analysis
// -----------------------------------------------------------------------------

export interface Transcript {
  id: string
  candidateId: string
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
  answeredByRole: UserRole
}

// -----------------------------------------------------------------------------
// From: sections/scorecard
// -----------------------------------------------------------------------------

export interface ScorecardStrength {
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
  interviewSource: InterviewSource
}

export interface InterviewerImpression {
  id: string
  question: string
  answer: string
  sentiment: 'positive' | 'neutral' | 'negative'
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
  summary: string
  hrSummary: string
  technicalSummary: string
  recommendation: Recommendation | null
  confidenceLevel: ConfidenceLevel | null
  strengths: ScorecardStrength[]
  concerns: Concern[]
  evidenceQuotes: EvidenceQuote[]
  interviewerImpressions: InterviewerImpression[]
  atsPushEvents: ATSPushEvent[]
  atsConnectionName: string
}

// -----------------------------------------------------------------------------
// From: sections/team-capacity
// -----------------------------------------------------------------------------

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
  role: 'recruiter' | 'senior_dev'
  availabilityStatus: AvailabilityStatus
  activeRequisitions: number
  activeCandidates: number
  requisitions: ActiveRequisition[]
  lastAssignedAt: string | null
}

export interface TeamCapacitySummary {
  totalRecruiters: number
  totalSeniorDevs: number
  availableRecruiters: number
  availableSeniorDevs: number
}
