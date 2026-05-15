# Dashboard Specification

## Overview
Role-aware home screen showing a high-level summary of active work: open job requisitions, candidates awaiting action, pending scorecards, team assignments, and recent ATS sync status. Designed to orient the current user and surface what needs attention right now.

## User Flows
- View summary counts for active requisitions, candidates in progress, and scorecards pending review
- See role-specific workload cues, such as candidates waiting for HR screening or candidates waiting for technical interview
- See a list of candidates requiring action (e.g., transcript not uploaded, scorecard not pushed)
- Click a candidate to jump directly into their workspace
- Click a job requisition to view its candidate pipeline
- See last ATS sync timestamp and status at a glance

## UI Requirements
- Summary stat cards at the top: active reqs, candidates in progress, scorecards pending push
- Summary labels and supporting lists adapt by role:
  - Recruiter sees HR-screening work and candidate enrichment tasks
  - Senior Developer sees technical interview work and pending technical feedback
  - Admin sees organization-wide workload, assignment gaps, and staffing health
- "Needs Attention" list showing candidates with incomplete workflows, sorted by urgency
- Recent activity feed showing latest sync events, scorecard generations, and ATS pushes
- Each list item is clickable, navigating to the relevant workspace or detail view
- Empty state for new users who haven't connected an ATS yet, with a CTA to ATS Connection

## Configuration
- shell: true
