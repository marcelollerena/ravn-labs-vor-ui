# Candidate Workspace

## Overview
The central hub for evaluating a single candidate. Combines ATS data, parsed resume, and LinkedIn profile into a unified triangulated view. Highlights discrepancies between data sources and shows the candidate's evaluation progress across both the HR screening and the technical interview. This is the shared workspace where recruiters and senior developers collaborate, each with role-specific edit permissions.

## User Flows
- View the candidate's unified profile combining ATS record, resume, and LinkedIn data side by side
- See discrepancies flagged automatically (e.g., "Resume says 5 years Python, LinkedIn says 2")
- As a recruiter, upload or re-upload a resume PDF for parsing
- As a recruiter, provide a LinkedIn URL or upload a LinkedIn PDF export for ingestion
- Monitor enrichment status: which sources have been ingested, which are pending
- Navigate between workspace tabs: Profile, Interview Prep, HR Interview, Technical Interview, Scorecard
- View the candidate's current ATS stage and job requisition context
- See which recruiter and senior developer are assigned to this requisition
- Track interview progress for two separate meetings

## Design Decisions
- Candidate header is always visible with name, email, stage badge, job title, assigned team, and evaluation progress bar
- Tabbed navigation below the header provides access to all workspace areas
- Profile tab is the default, showing three data source cards side by side
- Each data source card shows ingestion status and timestamp
- Discrepancy panel highlights field-level conflicts with severity indicators
- Upload controls are visible only to recruiters (role-gated)
- Merged profile summary at the top of the Profile tab shows the reconciled view
- Tab badges indicate completion status (checkmark) or required action (dot)

## Data Shapes
**Entities:** Candidate, JobRequisition, ATSRecord, ResumeDocument, LinkedInProfile, CandidateProfile, Discrepancy, WorkspaceTab, TeamAssignment, EvaluationProgress, DualInterviewProgress, UserRole
**From global entities:** Candidate, JobRequisition, ResumeDocument, LinkedInProfile, CandidateProfile, RequisitionAssignment, User

## Components Provided
- `CandidateWorkspace` — Root component composing the header, tabs, and active tab content
- `CandidateHeader` — Displays candidate name, email, stage badge, job title, assigned team, and evaluation progress
- `WorkspaceTabs` — Tab navigation bar with badges showing completion/action-needed status per tab
- `DataSourceCard` (ATSRecordCard / ResumeCard / LinkedInCard) — Card displaying data from a single source with ingestion status, timestamp, and structured fields
- `DiscrepancyPanel` — Panel listing all field-level conflicts between data sources with severity badges and suggested interview questions
- `MergedProfileSummary` — Compact summary of the reconciled candidate profile (name, title, skills, experience)
- `EvaluationProgressBar` — Multi-step progress indicator reflecting the two-meeting workflow stages

## Callback Props
| Callback | Triggered When |
|----------|---------------|
| `onTabChange(tabId)` | User clicks a workspace tab (profile, interview-prep, hr-interview, technical-interview, scorecard) |
| `onUploadResume(file)` | Recruiter uploads a resume PDF file |
| `onAddLinkedIn(url)` | Recruiter provides a LinkedIn profile URL |
| `onUploadLinkedInPdf(file)` | Recruiter uploads a LinkedIn PDF export |
| `onBack()` | User clicks back to return to the candidate pipeline |
