# Candidate Workspace Specification

## Overview
The central hub for evaluating a single candidate. Combines ATS data, parsed resume, and LinkedIn profile into a unified triangulated view. Highlights discrepancies between data sources and shows the candidate's evaluation progress across both the HR screening and the technical interview. This is the shared workspace where recruiters and senior developers collaborate, each with role-specific edit permissions.

## User Flows
- View the candidate's unified profile combining ATS record, resume, and LinkedIn data side by side
- See discrepancies flagged automatically (e.g., "Resume says 5 years Python, LinkedIn says 2")
- As a recruiter, upload or re-upload a resume PDF for parsing
- As a recruiter, provide a LinkedIn URL or upload a LinkedIn PDF export for ingestion
- Monitor enrichment status: which sources have been ingested, which are pending
- Navigate between workspace tabs: Profile, Interview Prep, Transcript, Scorecard
- View the candidate's current ATS stage and job requisition context
- See which recruiter and senior developer are assigned to this requisition
- Track interview progress for two separate meetings

## UI Requirements
- Candidate header: name, email, current ATS stage badge, job requisition title, assigned team, and evaluation progress bar
- Tabbed navigation below the header with four tabs: Profile, Interview Prep, Transcript, Scorecard
- Profile tab (default):
  - Three-column or card-based layout showing data from each source: ATS Record, Resume, LinkedIn
  - Each source card shows ingestion status (ingested/pending/not available) and timestamp
  - Discrepancy panel highlighting conflicts between sources with specific field-level callouts
  - Upload controls: "Upload Resume PDF" and "Add LinkedIn" (URL input or PDF upload) are editable only by recruiters
  - Merged profile summary at the top showing the reconciled view
- Tab badges showing status: checkmark if that stage is complete, dot if action needed
- Workspace sections show role ownership clearly:
  - Recruiter can edit candidate enrichment and HR interview artifacts
  - Senior Developer can edit technical interview artifacts
  - Admin can review everything and manage assignment context
- Transcript and scorecard areas reflect two interview tracks without changing the overall page structure
- Breadcrumb: Job Requisitions → [Job Title] → [Candidate Name]
- Loading/processing states for when AI is parsing documents or building the profile

## Configuration
- shell: true
