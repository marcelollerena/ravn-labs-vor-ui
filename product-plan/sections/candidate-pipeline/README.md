# Candidate Pipeline

## Overview
Shows all candidates for a specific job requisition, organized by their pipeline stage. Recruiters, senior developers, and admins use this to see where each candidate stands in the evaluation process and to open individual candidate workspaces for deeper review.

## User Flows
- View all candidates for a job requisition grouped or filterable by stage
- See each candidate's name, current stage, data enrichment status (resume parsed, LinkedIn ingested), and evaluation progress
- Search candidates by name or email within the requisition
- Filter by pipeline stage (applied, screening, hr-interview, technical-interview, offer, hired, rejected)
- Understand interview progress at a glance: both meetings pending, HR completed and technical pending, or both completed
- Click a candidate to open their full workspace
- Navigate back to Job Requisitions

## Design Decisions
- Job requisition header at the top provides context (title, department, candidate count)
- Stage filter uses horizontal pills or tabs for quick stage switching
- Candidate rows show enrichment status as check/cross icons for resume and LinkedIn
- Evaluation progress uses a multi-step indicator reflecting the two-meeting workflow
- Breadcrumb navigation: Job Requisitions > [Job Title]

## Data Shapes
**Entities:** JobRequisition, PipelineStage, PipelineCandidate, CandidateEnrichment, DualInterviewProgress, EvaluationProgress, TeamAssignment
**From global entities:** JobRequisition, Candidate, ResumeDocument, LinkedInProfile, InterviewSession

## Components Provided
- `CandidatePipeline` — Root component rendering the requisition header, stage filter, search, and candidate list
- `CandidateRow` — Single row displaying a candidate's name, email, stage badge, enrichment icons, interview progress, and evaluation status

## Callback Props
| Callback | Triggered When |
|----------|---------------|
| `onSelectCandidate(candidateId)` | User clicks a candidate row to open their workspace |
| `onFilterByStage(stageId \| null)` | User clicks a stage pill to filter (null to show all) |
| `onSearch(query)` | User types in the candidate search input |
| `onBack()` | User clicks the back/breadcrumb link to return to Job Requisitions |
