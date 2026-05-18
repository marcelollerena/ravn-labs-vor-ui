# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Entities

- **DashboardSummary, ATSSyncStatus, NeedsAttentionItem, RecentActivityItem** — Summary stats and activity data (used in: dashboard)
- **ATSProvider, ATSConnection, SyncJob, ImportProgress** — ATS integration data (used in: ats-connection)
- **JobRequisition, TeamAssignment, SummaryStats** — Job requisition data (used in: job-requisitions, candidate-pipeline)
- **PipelineCandidate, PipelineStage, CandidateEnrichment, EvaluationProgress** — Pipeline data (used in: candidate-pipeline)
- **Candidate, ATSRecord, ResumeDocument, LinkedInProfile, CandidateProfile, Discrepancy** — Candidate workspace data (used in: candidate-workspace)
- **Briefing, Strength, Gap, RiskArea, InterviewQuestion** — Interview prep data (used in: interview-prep)
- **Transcript, TranscriptInsight, RecallQuestion, InterviewerAnswer** — Transcript analysis data (used in: transcript-analysis)
- **Scorecard, EvidenceQuote, InterviewerImpression, ATSPushEvent** — Scorecard data (used in: scorecard)
- **TeamMember, TeamCapacitySummary** — Team capacity data (used in: team-capacity)

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/dashboard/types.ts`
- `sections/ats-connection/types.ts`
- `sections/job-requisitions/types.ts`
- `sections/candidate-pipeline/types.ts`
- `sections/candidate-workspace/types.ts`
- `sections/interview-prep/types.ts`
- `sections/transcript-analysis/types.ts`
- `sections/scorecard/types.ts`
- `sections/team-capacity/types.ts`

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
