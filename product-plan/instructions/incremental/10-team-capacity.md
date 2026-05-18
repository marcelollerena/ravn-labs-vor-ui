# Milestone 10: Team Capacity

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

Implement the Team Capacity section — an admin-only view showing recruiter and senior developer workload, availability, and requisition assignments to support balanced team allocation.

## Overview

Team Capacity is an admin-only section (hidden from non-admin roles in the navigation). It provides visibility into the hiring team's workload. A summary stats bar shows total recruiters, total senior devs, and how many of each are available. Search and filter controls let admins narrow the view by role or availability status. Member cards display each team member's avatar, name, role, active workload counts, availability status (available, busy, overloaded), and an expandable list of their current requisition assignments with candidate counts.

**Key Functionality:**
- Summary stats (total recruiters, total senior devs, available recruiters, available senior devs)
- Search by team member name
- Filter by role (Recruiter, Senior Dev) and availability (Available, Busy, Overloaded)
- Member cards with avatar, name, role, workload counts (active requisitions, active candidates)
- Availability status badge with color coding (available = green, busy = amber, overloaded = red)
- Expandable requisition assignments within each member card showing title, department, and candidate count
- Admin-only access control (not visible to non-admin users)

## Components Provided

Copy from `product-plan/sections/team-capacity/components/`:

- `TeamCapacity` — Main component with summary stats, filters, and member card grid

## Props Reference

**Data props:**

- `TeamCapacitySummary` — `{ totalRecruiters, totalSeniorDevs, availableRecruiters, availableSeniorDevs }`
- `TeamMember[]` — `{ id, name, email, role, availabilityStatus, activeRequisitions, activeCandidates, requisitions, lastAssignedAt }`
- `ActiveRequisition` — `{ id, title, department, candidateCount }` — Nested within each team member

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onMemberClick` | Admin clicks a team member card for detail |
| `onAssignToRequisition` | Admin assigns a member to a requisition |
| `onSearch` | Admin types in the search input |
| `onFilterChange` | Admin changes role or availability filter |

## Expected User Flows

### Flow 1: Check Team Availability
1. Admin navigates to Team Capacity
2. Summary stats show total and available counts for each role
3. Admin scans member cards to see who has capacity
4. Admin identifies a recruiter marked "Available" with low workload
5. **Outcome:** Admin knows which team members can take new assignments

### Flow 2: Review Workload Distribution
1. Admin filters by role "Senior Dev"
2. Member cards show only senior developers
3. Admin expands a member's requisition assignments
4. Admin sees the member is assigned to 4 requisitions with 12 total candidates
5. Admin filters by availability "Overloaded"
6. **Outcome:** Admin identifies team members who may need reassignment

### Flow 3: Search for a Specific Member
1. Admin types a team member's name in the search bar
2. Member card grid filters to the matching member
3. Admin reviews their current assignments and availability
4. **Outcome:** Admin quickly finds a specific team member's status

## Empty States

- **No team members:** "No team members have been added yet" — this state implies the organization setup is incomplete
- **No search/filter results:** "No team members match your filters" with option to clear filters
- **Member with no assignments:** Requisition assignment area shows "No active assignments" within the member card

## Testing

See `product-plan/sections/team-capacity/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/team-capacity/README.md` — Feature overview
- `product-plan/sections/team-capacity/tests.md` — UI behavior test specs
- `product-plan/sections/team-capacity/components/` — React components
- `product-plan/sections/team-capacity/types.ts` — TypeScript interfaces
- `product-plan/sections/team-capacity/sample-data.json` — Test data

## Done When

- [ ] Section is only accessible to admin-role users
- [ ] Summary stats bar shows recruiter and senior dev totals with available counts
- [ ] Search filters member cards by name
- [ ] Role and availability filters work independently and together
- [ ] Member cards display avatar, name, role, workload counts, and availability badge
- [ ] Availability badges use correct color coding (available = green, busy = amber, overloaded = red)
- [ ] Requisition assignments expand within each member card showing title, department, and candidate count
- [ ] Empty states display for no members, no results, and no assignments
- [ ] Responsive on mobile (single-column card layout)
