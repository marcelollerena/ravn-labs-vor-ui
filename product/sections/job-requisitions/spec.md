# Job Requisitions Specification

## Overview
A searchable, filterable list of job requisitions imported from the connected ATS. Users can browse open roles, see key metadata at a glance, and click through to the candidate pipeline for any requisition. The same view also communicates who is assigned to run the process for each requisition. Admins can assign or update the responsible recruiter and senior developer from this area.

## User Flows
- View summary metrics (total reqs, open reqs, total candidates, urgent roles) at the top of the page
- Search job requisitions by title or keyword
- Filter the list by status (Open, On Hold, Closed, Draft), department, and priority (Urgent, High, Normal)
- Scan compact table rows showing title, department, status badge, assigned team, candidate count, and posted date
- Click a job requisition row to navigate to the Candidate Pipeline section filtered for that role
- As an admin, assign a recruiter and senior developer to a requisition
- As an admin, leave one of the two roles empty if needed, but never save a requisition with no owner at all

## UI Requirements
- Summary stats bar at the top with key metrics displayed as cards or counters
- Search input above the list for keyword/title search
- Filter controls for status, department, and priority (dropdowns or pill toggles)
- Compact table/list layout with columns: job title, department, status badge, assigned recruiter, assigned senior developer, candidate count, posted date
- Status displayed as color-coded badges (e.g., green for Open, amber for On Hold, gray for Closed, blue for Draft)
- Priority indicator visible in each row (e.g., icon or label for Urgent/High)
- Team assignment control available to admins from the row or detail header, with validation requiring at least one assigned owner
- Team assignment fields are optional individually but enforced collectively
- Rows are clickable, navigating to the Candidate Pipeline for the selected requisition
- Empty state for when no requisitions match filters or search
- Responsive layout that stacks or scrolls horizontally on smaller screens

## Configuration
- shell: true
