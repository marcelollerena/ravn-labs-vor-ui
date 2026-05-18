# Milestone 2: Dashboard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Goal

Implement the Dashboard — a role-aware home screen showing active work summary, attention items, and recent activity.

## Overview

The dashboard orients the current user by surfacing what needs attention right now. Summary stat cards show active requisitions, candidates in progress, and pending scorecards. A "Needs Attention" list highlights candidates with incomplete workflows. A recent activity feed shows latest sync events, scorecard generations, and ATS pushes.

**Key Functionality:**
- View summary counts (active requisitions, candidates in progress, scorecards pending push)
- Role-specific workload cues (admin sees team assignments card)
- "Needs Attention" list with urgency indicators and clickable candidate rows
- Recent activity feed with timeline-style event display
- ATS sync status badge
- Empty state for new users with CTA to connect ATS

## Components Provided

Copy from `product-plan/sections/dashboard/components/`:

- `Dashboard` — Main orchestrator component
- `SummaryCard` — Stat card with icon, value, label, and accent color
- `SyncBadge` — ATS sync status pill with provider name and relative time
- `AttentionList` — "Needs Attention" section with count badge
- `AttentionRow` — Individual attention item with urgency bar and action label
- `ActivityFeed` — Timeline-style recent activity list
- `EmptyState` — Empty state with CTA to connect ATS

## Props Reference

**Data props:**

- `DashboardSummary` — `{ activeRequisitions, candidatesInProgress, scorecardsPendingPush, teamAssignments }`
- `ATSSyncStatus` — `{ provider, lastSyncAt, status, requisitionsImported, candidatesImported }`
- `NeedsAttentionItem[]` — Candidate items needing action with urgency level
- `RecentActivityItem[]` — Recent events with type, description, timestamp

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onCandidateClick` | User clicks a candidate in the attention list |
| `onRequisitionClick` | User clicks a summary card to view requisitions |
| `onConnectATS` | User clicks "Connect ATS" in the empty state |
| `onActivityClick` | User clicks an activity event |
| `onTeamCapacityClick` | Admin clicks the team assignments card |

## Expected User Flows

### Flow 1: Review Attention Items
1. User opens Dashboard
2. User sees summary stat cards at the top
3. User scans the "Needs Attention" list sorted by urgency
4. User clicks a candidate row
5. **Outcome:** Navigates to that candidate's workspace

### Flow 2: First-Time Experience (No ATS Connected)
1. User opens Dashboard with no data
2. User sees empty state with "Connect your ATS to get started" message
3. User clicks "Connect ATS" button
4. **Outcome:** Navigates to ATS Connection section

## Empty States

- **No data (fresh account):** Shows EmptyState component with CTA to ATS Connection
- **All caught up:** AttentionList shows "You're all caught up" with checkmark

## Testing

See `product-plan/sections/dashboard/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/dashboard/README.md` — Feature overview
- `product-plan/sections/dashboard/tests.md` — UI behavior test specs
- `product-plan/sections/dashboard/components/` — React components
- `product-plan/sections/dashboard/types.ts` — TypeScript interfaces
- `product-plan/sections/dashboard/sample-data.json` — Test data

## Done When

- [ ] Dashboard renders with real data and summary stat cards
- [ ] Empty state displays when no ATS is connected
- [ ] "Needs Attention" list shows candidates with urgency indicators
- [ ] Activity feed displays recent events with timeline
- [ ] Admin role sees team assignments card (4th stat card)
- [ ] All clickable items navigate to correct destinations
- [ ] Responsive on mobile
