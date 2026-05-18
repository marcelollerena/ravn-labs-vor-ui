# Dashboard

## Overview
Role-aware home screen showing a high-level summary of active work: open job requisitions, candidates awaiting action, pending scorecards, team assignments, and recent ATS sync status. Designed to orient the current user and surface what needs attention right now.

## User Flows
- View summary counts for active requisitions, candidates in progress, and scorecards pending review
- See role-specific workload cues (HR screening tasks for recruiters, technical interview tasks for senior developers, organization-wide metrics for admins)
- See a list of candidates requiring action (e.g., transcript not uploaded, scorecard not pushed)
- Click a candidate to jump directly into their workspace
- Click a job requisition to view its candidate pipeline
- See last ATS sync timestamp and status at a glance
- Empty state for new users who have not connected an ATS yet, with a CTA to ATS Connection

## Design Decisions
- Summary stat cards at the top adapt labels and counts by user role
- Needs Attention list is sorted by urgency (high/medium/low) with color-coded indicators
- Activity feed shows latest sync events, scorecard generations, and ATS pushes with timestamps
- Empty state encourages ATS connection with a prominent call-to-action button
- Admin users see a team assignments card that links to the Team Capacity section

## Data Shapes
**Entities:** DashboardSummary, ATSSyncStatus, NeedsAttentionItem, RecentActivityItem, UserRole, PendingAction, Urgency, ActivityType
**From global entities:** User, ATSConnection, SyncJob, JobRequisition, Candidate, Scorecard

## Components Provided
- `Dashboard` — Root layout component that composes all dashboard sub-components and manages role-based rendering
- `SummaryCard` — Individual stat card displaying a metric label, count, and optional trend indicator
- `SyncBadge` — Compact status indicator showing ATS provider name, last sync time, and sync status (success/failed/in_progress)
- `AttentionList` — Container for the "Needs Attention" section, rendering a list of AttentionRow items
- `AttentionRow` — Single row showing a candidate requiring action, with urgency badge, pending action label, and click target
- `ActivityFeed` — Chronological list of recent platform events with type icons and timestamps
- `EmptyState` — Shown when no ATS is connected; displays illustration and "Connect ATS" button

## Callback Props
| Callback | Triggered When |
|----------|---------------|
| `onCandidateClick(candidateId)` | User clicks a candidate name in the Needs Attention list or Activity Feed |
| `onRequisitionClick(requisitionId)` | User clicks a job requisition reference in summary or activity |
| `onConnectATS()` | User clicks the "Connect ATS" button in the empty state |
| `onActivityClick(activityId, entityType, entityId)` | User clicks a specific activity event to view details |
| `onTeamCapacityClick()` | Admin clicks the team assignments card to navigate to Team Capacity |
