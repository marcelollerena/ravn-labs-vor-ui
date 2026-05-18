# Vor — Product Overview

## Summary

Vor is an AI-assisted hiring operations platform that connects to your ATS, triangulates candidate data from resumes, LinkedIn profiles, and interview transcripts, and supports a real-world two-interviewer workflow before generating a structured evaluation scorecard you can push back to the ATS. Each job requisition can be staffed by a recruiter and a senior developer who collaborate through separate interview steps, role-specific inputs, and a shared final recommendation.

## Planned Sections

1. **Dashboard** — Role-aware home screen showing a high-level summary of active work: open job requisitions, candidates awaiting action, pending scorecards, team assignments, and recent ATS sync status.
2. **ATS Connection** — Connect to an ATS provider, authenticate credentials, and configure the sync pipeline for importing job requisitions and candidates.
3. **Job Requisitions** — Browse, search, and manage imported job requisitions with their descriptions, requirements, assigned interview team, and associated candidate pipelines.
4. **Candidate Pipeline** — View all candidates for a job requisition, see their pipeline stage, dual-interview progress, and open individual candidate workspaces for evaluation.
5. **Candidate Workspace** — Unified view of a single candidate combining ATS data, parsed resume, and LinkedIn profile into one triangulated profile with highlighted discrepancies, role-specific responsibilities, and shared evaluation progress.
6. **Interview Prep** — AI-generated briefing document comparing candidate data against job requirements, surfacing gaps, and producing targeted interview questions for both the recruiter screening and the technical interview.
7. **Transcript Analysis** — Upload and analyze interview transcripts for the HR screening and the technical interview separately, then answer AI-generated active recall questions tailored to each interviewer.
8. **Scorecard** — Review the AI-generated structured evaluation scorecard with HR summary, technical summary, evidence quotes, and hiring recommendation, then push it back to the ATS.
9. **Team Capacity** — Admin-only view to review registered recruiters and senior developers, see their interview availability, understand how many active hiring processes they are supporting, and assign them to job requisitions.

## Product Entities

- **User** — An authenticated person using Vor with one of three roles: Admin, Recruiter, or Senior Developer
- **ATSConnection** — A configured link between Vor and an external ATS (e.g., Greenhouse, Lever)
- **SyncJob** — A record of a data sync operation between Vor and the connected ATS
- **JobRequisition** — An open role imported from the ATS, the organizing container for candidates
- **RequisitionAssignment** — The staffing configuration defining which recruiter and senior developer are assigned
- **Candidate** — A person being evaluated for a job requisition
- **ResumeDocument** — A parsed PDF resume attached to a candidate
- **LinkedInProfile** — Candidate profile data sourced from LinkedIn
- **CandidateProfile** — The merged, triangulated view combining ATS data, resume, and LinkedIn
- **InterviewBrief** — An AI-generated preparation document for a candidate-job pairing
- **InterviewSession** — A specific interview step (HR screening or technical interview)
- **Transcript** — An uploaded interview transcript for a specific session
- **TranscriptInsight** — An AI-generated observation extracted from a transcript
- **RecallQuestion** — An AI-generated follow-up question for the interviewer
- **InterviewAnswer** — The interviewer's response to a recall question
- **Scorecard** — The final structured evaluation document synthesizing all evidence
- **TeamMemberCapacity** — A rollup entity for interviewer availability and workload
- **ATSPushEvent** — A record of pushing a scorecard back to the ATS

## Design System

**Colors:**
- Primary: blue
- Secondary: amber
- Neutral: slate

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: IBM Plex Mono

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and application shell
2. **Dashboard** — Role-aware home screen with summary stats, attention list, and activity feed
3. **ATS Connection** — Provider selection, API key entry, import progress, and connected state
4. **Job Requisitions** — Searchable, filterable list of imported job requisitions
5. **Candidate Pipeline** — Candidate list for a job requisition with stage filters and evaluation progress
6. **Candidate Workspace** — Unified candidate profile with data source triangulation and workspace tabs
7. **Interview Prep** — AI-generated briefing with strengths, gaps, risks, and targeted questions
8. **Transcript Analysis** — Transcript upload, insight extraction, and active recall questions
9. **Scorecard** — AI-generated evaluation scorecard with inline editing and ATS push
10. **Team Capacity** — Admin view for interviewer directory, availability, and workload

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
