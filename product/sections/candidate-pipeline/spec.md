# Candidate Pipeline Specification

## Overview
Shows all candidates for a specific job requisition, organized by their pipeline stage. Recruiters, senior developers, and admins use this to see where each candidate stands in the evaluation process and to open individual candidate workspaces for deeper review.

## User Flows
- View all candidates for a job requisition grouped or filterable by stage
- See each candidate's name, current stage, data enrichment status (resume parsed, LinkedIn ingested), team assignment context, and evaluation progress
- Search candidates by name or email within the requisition
- Filter by stage (e.g., applied, screening, interview, offer) or evaluation completeness
- Understand interview progress at a glance: both meetings pending, HR completed and technical pending, technical completed and HR pending, or both meetings completed
- Click a candidate to open their full workspace
- See at a glance which candidates have completed scorecards vs. those still in progress

## UI Requirements
- Job requisition header showing title, department, and total candidate count
- Candidate list with rows showing: candidate name, email, current ATS stage, enrichment status icons (resume ✓/✗, LinkedIn ✓/✗), interview progress, and evaluation status
- Stage filter as horizontal pills or tabs across the top of the list
- Search bar scoped to this requisition's candidates
- Evaluation status uses a simple progress indicator: data imported → profile built → HR interview tracked → technical interview tracked → scorecard generated
- Interview progress state explicitly shows the two-meeting workflow
- Each candidate row is clickable, navigating to Candidate Workspace
- Breadcrumb: Job Requisitions → [Job Title]

## Configuration
- shell: true
