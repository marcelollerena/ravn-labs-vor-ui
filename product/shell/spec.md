# Application Shell Specification

## Overview
Vor uses a sidebar navigation pattern with a fixed left rail and a full-width content area. The shell is designed for shared hiring workflows that span recruiters, senior developers, and admins. The sidebar provides persistent access to all top-level areas while the content area supports both list views and focused single-candidate work.

## Navigation Structure
- **Dashboard** → Overview of active requisitions, recent candidates, and pending scorecards
- **Job Requisitions** → Browse and manage imported job requisitions and their candidate pipelines
- **Candidates** → Search and filter all imported candidates across requisitions
- **Scorecards** → View all generated scorecards and their ATS push status
- **Team Capacity** → Admin-only view for interviewer availability, active load, and requisition staffing
- **ATS Connection** → Configure ATS provider, manage credentials, and monitor sync status

## Layout Pattern
Fixed sidebar (240px) on the left with a scrollable content area on the right. The sidebar contains the Vor logo at the top, primary navigation in the middle, and the user menu at the bottom. The content area has a top header bar with breadcrumbs, page title, and contextual actions.

## Header Bar
The content area header displays:
- **Breadcrumbs** showing navigation context (e.g., Job Requisitions → Senior Engineer → Maria Chen → Interview Prep)
- **Page title** for the current view
- **Contextual actions** aligned right (e.g., "Sync Now", "Push to ATS", "Export Scorecard")
- Header actions and visible navigation are role-aware, so users only see actions they are allowed to take

## Sidebar Behavior
- **Logo area** — Vor wordmark at the top of the sidebar
- **Primary navigation** — Icon + label for each top-level area, with active state highlight using blue-50 background and blue-700 text
- **Sync status indicator** — Small status line near the bottom showing last sync time and a re-sync button
- **User menu** — Avatar with initials, user name, and role at the bottom of the sidebar with a dropdown for Settings and Sign Out

## Candidate Workspace
When a recruiter or senior developer drills into a candidate, the shell adapts:
- Breadcrumbs update to show the full path (Job Req → Candidate)
- The content area renders a tabbed workspace with tabs for: **Profile**, **Interview Prep**, **Transcript**, **Scorecard**
- The sidebar remains visible for quick navigation back to lists
- Each tab corresponds to a stage in the evaluation workflow, but edit controls inside each tab are role-aware

## Responsive Behavior
- **Desktop (1024px+):** Full sidebar visible (240px), content area fills remaining width
- **Tablet (768–1023px):** Sidebar collapses to icon-only rail (64px) with tooltips on hover
- **Mobile (<768px):** Sidebar hidden, accessible via hamburger menu in the top header bar. Full-width content area. Slide-out overlay navigation.

## Design Tokens Applied
- **Primary color:** Blue (active states, accents, avatar backgrounds)
- **Secondary color:** Amber (badges, warning states)
- **Neutral color:** Slate (backgrounds, borders, text hierarchy)
- **Typography:** Inter for all navigation labels, headings, and body text
- **Icons:** lucide-react with 20px size and strokeWidth 1.5

## Design Notes
- Light mode is the primary theme — slate-50 content background, white sidebar and header
- Dark mode uses slate-950 content background, slate-900 sidebar and header
- The sidebar uses subtle border separation (slate-200 light / slate-800 dark), no heavy shadows
- User menu opens upward from the bottom of the sidebar
- Candidate count badge (amber) on the Candidates nav item for at-a-glance awareness
- "Last synced" timestamp kept passive and small near the bottom of the sidebar
- The shell does not include authentication screens — it assumes the user is logged in
- Notifications are not in MVP scope
