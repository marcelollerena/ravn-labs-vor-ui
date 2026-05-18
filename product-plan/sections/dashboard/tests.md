# Dashboard — Test Specifications

## Sample Test Data

```typescript
const recruiterRole: UserRole = 'recruiter'
const adminRole: UserRole = 'admin'
const seniorDevRole: UserRole = 'senior_dev'

const summary: DashboardSummary = {
  activeRequisitions: 8,
  candidatesInProgress: 23,
  scorecardsPendingPush: 3,
  teamAssignments: 12
}

const emptySummary: DashboardSummary = {
  activeRequisitions: 0,
  candidatesInProgress: 0,
  scorecardsPendingPush: 0,
  teamAssignments: 0
}

const atsSyncStatus: ATSSyncStatus = {
  provider: 'Greenhouse',
  lastSyncAt: '2026-05-15T09:30:00Z',
  status: 'success',
  requisitionsImported: 12,
  candidatesImported: 47
}

const failedSync: ATSSyncStatus = {
  provider: 'Lever',
  lastSyncAt: '2026-05-14T18:00:00Z',
  status: 'failed',
  requisitionsImported: 0,
  candidatesImported: 0
}

const needsAttention: NeedsAttentionItem[] = [
  {
    id: 'attn-1',
    candidateId: 'cand-101',
    candidateName: 'Sarah Chen',
    jobTitle: 'Senior Frontend Engineer',
    requisitionId: 'req-1',
    pendingAction: 'hr_transcript_not_uploaded',
    pendingActionLabel: 'HR transcript not uploaded',
    interviewDate: '2026-05-12T14:00:00Z',
    urgency: 'high',
    assignedTo: 'Maria Lopez',
    assignedRole: 'recruiter'
  },
  {
    id: 'attn-2',
    candidateId: 'cand-102',
    candidateName: 'James Park',
    jobTitle: 'Backend Engineer',
    requisitionId: 'req-2',
    pendingAction: 'scorecard_not_pushed',
    pendingActionLabel: 'Scorecard not pushed to ATS',
    interviewDate: '2026-05-10T10:00:00Z',
    urgency: 'medium'
  }
]

const recentActivity: RecentActivityItem[] = [
  {
    id: 'act-1',
    type: 'scorecard_generated',
    description: 'Scorecard generated for Sarah Chen — Senior Frontend Engineer',
    timestamp: '2026-05-15T08:45:00Z',
    relatedEntityId: 'cand-101',
    relatedEntityType: 'Candidate'
  },
  {
    id: 'act-2',
    type: 'ats_sync',
    description: 'Greenhouse sync completed: 2 new candidates imported',
    timestamp: '2026-05-15T09:30:00Z',
    relatedEntityId: 'sync-5',
    relatedEntityType: 'SyncJob'
  }
]
```

---

## User Flow Tests

### View dashboard with populated data (recruiter)
- Render Dashboard with `currentUserRole: 'recruiter'`, populated summary, sync status, attention items, and activity
- Verify summary cards display: "8" for active requisitions, "23" for candidates in progress, "3" for scorecards pending push
- Verify SyncBadge shows "Greenhouse" with a green success indicator and "Last synced" timestamp
- Verify Needs Attention list renders 2 items
- Verify "Sarah Chen" row shows urgency badge "high" and label "HR transcript not uploaded"
- Verify "James Park" row shows urgency badge "medium" and label "Scorecard not pushed to ATS"
- Verify activity feed shows both events with timestamps

### View dashboard with populated data (admin)
- Render Dashboard with `currentUserRole: 'admin'`
- Verify a team assignments card is visible showing "12" team assignments
- Verify the team assignments card is clickable
- Click the team assignments card and verify `onTeamCapacityClick` is called

### View dashboard with populated data (senior developer)
- Render Dashboard with `currentUserRole: 'senior_dev'`
- Verify team assignments card is NOT visible (admin only)
- Verify summary cards still render with correct counts

### Empty state — no ATS connected
- Render Dashboard with `emptySummary`, no sync status, empty `needsAttention`, empty `recentActivity`
- Verify EmptyState component is displayed
- Verify text includes "Connect your ATS" or similar call-to-action
- Verify a "Connect ATS" button is visible
- Click the button and verify `onConnectATS` is called

### Click candidate in Needs Attention list
- Render Dashboard with populated `needsAttention`
- Click the "Sarah Chen" row
- Verify `onCandidateClick` is called with `'cand-101'`

### Click requisition reference
- Render Dashboard with populated data
- Click a job requisition link
- Verify `onRequisitionClick` is called with the correct requisition ID

### Click activity feed item
- Render Dashboard with populated `recentActivity`
- Click the "Scorecard generated for Sarah Chen" activity item
- Verify `onActivityClick` is called with `('act-1', 'Candidate', 'cand-101')`

---

## Empty State Tests

### All zeros, ATS connected
- Render with `emptySummary` but valid `atsSyncStatus`
- Verify summary cards show "0" for all metrics
- Verify Needs Attention list shows an empty message like "No items need attention"
- Verify activity feed shows an empty message like "No recent activity"
- Verify EmptyState (connect ATS) is NOT shown since ATS is connected

### No ATS connection at all
- Render with null or missing `atsSyncStatus`
- Verify the EmptyState component with CTA is displayed prominently

---

## Component Interaction Tests

### SyncBadge displays correct status variants
- Render SyncBadge with `status: 'success'` — verify green indicator
- Render SyncBadge with `status: 'failed'` — verify red indicator and error styling
- Render SyncBadge with `status: 'in_progress'` — verify animated/spinning indicator

### AttentionRow urgency levels
- Render AttentionRow with `urgency: 'high'` — verify high-priority visual treatment (red or similar)
- Render AttentionRow with `urgency: 'medium'` — verify medium-priority visual treatment (amber or similar)
- Render AttentionRow with `urgency: 'low'` — verify low-priority visual treatment (gray or subtle)

### SummaryCard renders metric correctly
- Render SummaryCard with label "Active Requisitions" and value 8
- Verify the label text and count are visible

---

## Edge Cases

### Very long candidate names
- Render an AttentionRow with `candidateName: 'Alexandra Konstantinidou-Papadopoulos'`
- Verify the name does not overflow or break the row layout

### Large numbers in summary
- Render summary with `activeRequisitions: 1250`, `candidatesInProgress: 9999`
- Verify numbers display correctly (formatted or truncated as needed)

### Failed ATS sync
- Render with `failedSync` as `atsSyncStatus`
- Verify SyncBadge shows "Lever" with a failed/error status indicator
- Verify last sync timestamp still displays

### Attention list with many items
- Render with 50+ NeedsAttentionItem entries
- Verify the list is scrollable and does not break layout
- Verify items remain sorted by urgency

---

## Accessibility

- Verify all summary cards have accessible labels (aria-label or heading association)
- Verify AttentionRow items are keyboard-navigable and can be activated with Enter/Space
- Verify urgency badges convey meaning beyond color (text label or aria-label)
- Verify SyncBadge status is announced to screen readers (not just color)
- Verify activity feed items are keyboard-navigable
- Verify EmptyState CTA button is focusable and has a descriptive label
