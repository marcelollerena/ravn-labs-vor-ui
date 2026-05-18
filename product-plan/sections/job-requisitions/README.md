# Job Requisitions

## Overview
A searchable, filterable list of job requisitions imported from the connected ATS. Users can browse open roles, see key metadata at a glance, and click through to the candidate pipeline for any requisition. The view also communicates who is assigned to run the process for each requisition. Admins can assign or update the responsible recruiter and senior developer.

## User Flows
- View summary metrics (total reqs, open reqs, total candidates, urgent roles) at the top of the page
- Search job requisitions by title or keyword
- Filter the list by status (Open, On Hold, Closed, Draft), department, and priority (Urgent, High, Normal)
- Scan compact table rows showing title, department, status badge, assigned team, candidate count, and posted date
- Click a job requisition row to navigate to the Candidate Pipeline section filtered for that role
- Empty state when no requisitions match filters or search

## Design Decisions
- Summary stats displayed as cards at the top for quick orientation
- Status uses color-coded badges: green for Open, amber for On Hold, gray for Closed, blue for Draft
- Priority is indicated with an icon or label per row (Urgent/High)
- Team assignment columns show recruiter and senior developer names; admins can edit inline
- Filter controls use dropdowns or pill toggles for status, department, and priority
- Responsive layout stacks or scrolls horizontally on smaller screens

## Data Shapes
**Entities:** SummaryStats, JobRequisition, TeamAssignment, RequisitionStatus, RequisitionPriority
**From global entities:** JobRequisition, RequisitionAssignment, User

## Components Provided
- `JobRequisitions` — Root component composing the stat bar, search, filters, and requisition list
- `StatCard` — Individual metric card (e.g., "Open Requisitions: 5") used in the summary row
- `RequisitionRow` — Single table row displaying a job requisition with title, department, status badge, assigned team, candidate count, and posted date

## Callback Props
| Callback | Triggered When |
|----------|---------------|
| `onRequisitionClick(requisitionId)` | User clicks a requisition row to view its candidate pipeline |
| `onSearch(query)` | User types in the search input |
| `onFilterChange(filters)` | User changes status, department, or priority filter |
