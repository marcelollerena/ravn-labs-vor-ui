# Team Capacity

## Overview
Admin-only view for reviewing the active recruiter and senior developer roster, understanding interview availability, and assigning people to job requisitions based on current workload. This view gives staffing visibility without changing the rest of the hiring workflow screens.

## User Flows
- View all registered recruiters and senior developers in one place
- See whether each person is currently available for new interview work
- See how many active hiring processes each person is currently assigned to
- Search members by name or email
- Filter the directory by role (recruiter/senior developer) and availability (available/busy/overloaded)
- Expand a member to see which job requisitions and candidates contribute to their current load
- Assign a team member to a job requisition

## Design Decisions
- Directory layout with rows or cards for each team member
- Summary bar at the top shows total counts and available counts per role
- Each member entry shows name, role, availability status badge, active requisition count, active candidate count, and latest assignment date
- Workload indicator uses simple visual states: available (green), busy (amber), overloaded (red)
- Quick assignment action lets admin attach a person to a requisition
- Drill-in panel shows current requisitions with candidate counts
- Empty state when no interviewers have been registered

## Data Shapes
**Entities:** TeamCapacitySummary, TeamMember, ActiveRequisition, UserRole, AvailabilityStatus
**From global entities:** User, TeamMemberCapacity, RequisitionAssignment, JobRequisition

## Components Provided
- `TeamCapacity` — Root component composing the summary bar, search, filters, and member directory

## Callback Props
| Callback | Triggered When |
|----------|---------------|
| `onMemberClick(memberId)` | Admin clicks a team member to see their detail/assignments |
| `onAssignToRequisition(memberId, requisitionId)` | Admin assigns a member to a specific job requisition |
| `onSearch(query)` | Admin types in the search input |
| `onFilterChange(filters)` | Admin changes role or availability filter |
