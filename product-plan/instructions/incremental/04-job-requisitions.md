# Milestone 4: Job Requisitions

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 3 (ATS Connection) complete

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

Implement the Job Requisitions section — the searchable, filterable list of open roles imported from the ATS, serving as the entry point to each role's candidate pipeline.

## Overview

Job Requisitions is the primary navigation hub for recruiters. A summary stats bar at the top shows total, open, candidates, and urgent counts. Below, a compact table lists all requisitions with search and multi-filter controls. Each row shows the job title, department, status, assigned team (recruiter + senior dev), candidate pipeline count, and posted date. Clicking a row navigates to that requisition's candidate pipeline.

**Key Functionality:**
- Summary stats bar (total requisitions, open roles, total candidates, urgent roles)
- Search input filtering by job title
- Filter controls for status (Open/On Hold/Closed/Draft), department, and priority (Urgent/High/Normal)
- Compact table rows with title, department, status badge, assigned team, pipeline count, and posted date
- Clickable rows navigating to candidate pipeline
- Empty state when no requisitions exist

## Components Provided

Copy from `product-plan/sections/job-requisitions/components/`:

- `JobRequisitions` — Main component with stats bar, search, filters, and table
- `RequisitionRow` — Individual table row with status badge, team display, and pipeline count
- `StatCard` — Summary stat card used in the stats bar

## Props Reference

**Data props:**

- `SummaryStats` — `{ totalRequisitions, openRequisitions, totalCandidates, urgentRoles }`
- `JobRequisition[]` — `{ id, title, department, status, priority, candidateCount, postedDate, assignedTeam }`
- `departments: string[]` — List of unique departments for the filter dropdown

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onRequisitionClick` | User clicks a row to view the candidate pipeline |
| `onSearch` | User types in the search input |
| `onFilterChange` | User changes status, department, or priority filter |

## Expected User Flows

### Flow 1: Browse and Open a Requisition
1. User navigates to Job Requisitions
2. Summary stats display at the top
3. User scans the table of requisitions
4. User clicks a row (e.g., "Senior Frontend Engineer")
5. **Outcome:** Navigates to that requisition's candidate pipeline

### Flow 2: Search and Filter
1. User types "engineer" in the search input
2. Table filters to matching job titles
3. User selects "Open" status filter and "Engineering" department filter
4. Table narrows further
5. **Outcome:** User finds the specific requisition they need

### Flow 3: Review Urgent Roles
1. User sees the "Urgent" stat card showing a count
2. User clicks the priority filter and selects "Urgent"
3. Table shows only urgent requisitions
4. **Outcome:** User focuses on time-sensitive hiring

## Empty States

- **No requisitions imported:** Message with CTA directing to ATS Connection to sync data
- **No search/filter results:** "No requisitions match your filters" with option to clear filters

## Testing

See `product-plan/sections/job-requisitions/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/job-requisitions/README.md` — Feature overview
- `product-plan/sections/job-requisitions/tests.md` — UI behavior test specs
- `product-plan/sections/job-requisitions/components/` — React components
- `product-plan/sections/job-requisitions/types.ts` — TypeScript interfaces
- `product-plan/sections/job-requisitions/sample-data.json` — Test data

## Done When

- [ ] Summary stats bar renders with correct counts
- [ ] Requisition table displays all imported roles with correct columns
- [ ] Status badges show correct colors (Open = green, On Hold = amber, Closed = slate, Draft = blue)
- [ ] Assigned team shows recruiter and senior dev names
- [ ] Search filters requisitions by title in real time
- [ ] Status, department, and priority filters work independently and together
- [ ] Clicking a row navigates to the candidate pipeline for that requisition
- [ ] Empty state shows when no requisitions exist
- [ ] Responsive on mobile (cards or stacked layout instead of table)
