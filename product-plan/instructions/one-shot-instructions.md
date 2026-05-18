# Vor — Complete Implementation Instructions

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

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

# Vor — Product Overview

## Summary

Vor is an AI-assisted hiring operations platform that connects to your ATS, triangulates candidate data from resumes, LinkedIn profiles, and interview transcripts, and supports a real-world two-interviewer workflow before generating a structured evaluation scorecard you can push back to the ATS. Each job requisition can be staffed by a recruiter and a senior developer who collaborate through separate interview steps, role-specific inputs, and a shared final recommendation.

## Planned Sections

1. **Dashboard** — Role-aware home screen showing a high-level summary of active work: open job requisitions, candidates awaiting action, pending scorecards, team assignments, and recent ATS sync status.
2. **ATS Connection** — Connect to an ATS provider, authenticate credentials, and configure the sync pipeline for importing job requisitions and candidates.
3. **Job Requisitions** — Browse, search, and manage imported job requisitions with their descriptions, requirements, assigned interview team, and associated candidate pipelines.
4. **Candidate Pipeline** — View all candidates for a job requisition, see their pipeline stage, dual-interview progress, and open individual candidate workspaces for evaluation.
5. **Candidate Workspace** — Unified view of a single candidate combining ATS data, parsed resume, and LinkedIn profile into one triangulated profile with highlighted discrepancies, role-specific responsibilities, and shared evaluation progress.
6. **Interview Prep** — AI-generated briefing document comparing candidate data against job requirements, surfacing gaps, and producing targeted interview questions for both the recruiter screening and the technical interview.
7. **Transcript Analysis** — Upload and analyze interview transcripts for the HR screening and the technical interview separately, then answer AI-generated active recall questions tailored to each interviewer.
8. **Scorecard** — Review the AI-generated structured evaluation scorecard with HR summary, technical summary, evidence quotes, and hiring recommendation, then push it back to the ATS.
9. **Team Capacity** — Admin-only view to review registered recruiters and senior developers, see their interview availability, understand how many active hiring processes they are supporting, and assign them to job requisitions.

## Product Entities

- **User** — An authenticated person using Vor with one of three roles: Admin, Recruiter, or Senior Developer
- **ATSConnection** — A configured link between Vor and an external ATS (e.g., Greenhouse, Lever)
- **SyncJob** — A record of a data sync operation between Vor and the connected ATS
- **JobRequisition** — An open role imported from the ATS, the organizing container for candidates
- **RequisitionAssignment** — The staffing configuration defining which recruiter and senior developer are assigned
- **Candidate** — A person being evaluated for a job requisition
- **ResumeDocument** — A parsed PDF resume attached to a candidate
- **LinkedInProfile** — Candidate profile data sourced from LinkedIn
- **CandidateProfile** — The merged, triangulated view combining ATS data, resume, and LinkedIn
- **InterviewBrief** — An AI-generated preparation document for a candidate-job pairing
- **InterviewSession** — A specific interview step (HR screening or technical interview)
- **Transcript** — An uploaded interview transcript for a specific session
- **TranscriptInsight** — An AI-generated observation extracted from a transcript
- **RecallQuestion** — An AI-generated follow-up question for the interviewer
- **InterviewAnswer** — The interviewer's response to a recall question
- **Scorecard** — The final structured evaluation document synthesizing all evidence
- **TeamMemberCapacity** — A rollup entity for interviewer availability and workload
- **ATSPushEvent** — A record of pushing a scorecard back to the ATS

## Design System

**Colors:**
- Primary: blue
- Secondary: amber
- Neutral: slate

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: IBM Plex Mono

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and application shell
2. **Dashboard** — Role-aware home screen with summary stats, attention list, and activity feed
3. **ATS Connection** — Provider selection, API key entry, import progress, and connected state
4. **Job Requisitions** — Searchable, filterable list of imported job requisitions
5. **Candidate Pipeline** — Candidate list for a job requisition with stage filters and evaluation progress
6. **Candidate Workspace** — Unified candidate profile with data source triangulation and workspace tabs
7. **Interview Prep** — AI-generated briefing with strengths, gaps, risks, and targeted questions
8. **Transcript Analysis** — Transcript upload, insight extraction, and active recall questions
9. **Scorecard** — AI-generated evaluation scorecard with inline editing and ATS push
10. **Team Capacity** — Admin view for interviewer directory, availability, and workload

Each milestone has a dedicated instruction document in `product-plan/instructions/`.

---

# Milestone 1: Shell

> **Prerequisites:** None

## Goal

Set up the design tokens and application shell — the persistent chrome that wraps all sections.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar, mobile overlay, and content area
- `MainNav.tsx` — Navigation component with icon + label items and active state
- `UserMenu.tsx` — User menu with avatar initials, role display, and dropdown

**Wire Up Navigation:**

Connect navigation to your routing:

- Dashboard → `/`
- Job Requisitions → `/requisitions`
- Candidates → `/candidates`
- Scorecards → `/scorecards`
- Team Capacity → `/team-capacity` (admin only)
- ATS Connection → `/ats-connection`

**User Menu:**

The user menu expects:
- User name
- Role (Admin, Recruiter, Senior Developer)
- Avatar URL (optional — shows initials if not provided)
- Logout callback
- Settings callback

**Sync Status:**

The shell sidebar includes a sync status indicator near the bottom:
- Last synced timestamp
- Syncing animation state
- Error state
- Re-sync button callback

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (blue primary, amber secondary, slate neutral, Inter font, IBM Plex Mono)
- [ ] Shell renders with sidebar navigation (desktop: 240px sidebar, tablet: 64px icon rail, mobile: hamburger + overlay)
- [ ] Navigation links to correct routes
- [ ] User menu shows user info with initials avatar
- [ ] Sync status indicator displays in sidebar
- [ ] Responsive on mobile

---

# Milestone 2: Dashboard

> **Prerequisites:** Milestone 1 (Shell) complete

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

---

# Milestone 3: ATS Connection

> **Prerequisites:** Milestone 1 (Shell) complete

## Goal

Implement the ATS Connection section — the integration point where users connect their Applicant Tracking System, import data, and manage sync operations.

## Overview

ATS Connection is the gateway to Vor. Before any candidates or requisitions appear, users must connect their ATS provider. The flow moves through three states: provider selection, import progress, and connected state with ongoing sync management. This section supports Greenhouse, Lever, Ashby, Workday, and a custom API option.

**Key Functionality:**
- Provider selection grid with supported ATS options
- API key input with masked display
- Connect and import flow with real-time progress tracking
- Import progress showing phases (job requisitions, then candidates)
- Connected state displaying connection details and sync history
- Re-sync trigger and disconnect option

## Components Provided

Copy from `product-plan/sections/ats-connection/components/`:

- `ATSConnection` — Main orchestrator component managing the three-state flow
- `ProviderCard` — Individual ATS provider tile with icon, name, and description
- `ImportProgress` — Progress display showing phase label, percent bar, and counts
- `ConnectedState` — Post-connection view with sync history table and action buttons

## Props Reference

**Data props:**

- `ATSProvider[]` — `{ id, name, icon, description }` — Available providers to display
- `ATSConnection` — `{ id, providerId, providerName, status, apiKeyMasked, connectedAt, lastSyncedAt }` — Current connection (null if none)
- `SyncJob[]` — `{ id, status, startedAt, completedAt, jobRequisitionsImported, candidatesImported, error }` — Past sync operations
- `ImportProgress` — `{ phase, phaseLabel, percent, jobRequisitionsImported, candidatesImported, candidatesTotal }` — Live import state (null when not importing)

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onConnect` | User selects a provider and submits API key (receives `providerId`, `apiKey`, optional `customProvider`) |
| `onSync` | User clicks "Re-sync" on the connected state |
| `onDisconnect` | User clicks "Disconnect" and confirms |

## Expected User Flows

### Flow 1: First-Time Connection
1. User navigates to ATS Connection (no existing connection)
2. User sees provider selection grid
3. User clicks a provider card (e.g., Greenhouse)
4. API key input appears with provider-specific instructions
5. User enters API key and clicks "Connect"
6. Import progress screen appears showing phases
7. **Outcome:** Connected state renders with sync summary

### Flow 2: Re-Sync Data
1. User visits ATS Connection with an active connection
2. Connected state displays with last sync time and history table
3. User clicks "Re-sync" button
4. Import progress appears for the sync operation
5. **Outcome:** Sync history updates with new entry

### Flow 3: Disconnect and Reconnect
1. User is on connected state
2. User clicks "Disconnect"
3. Confirmation dialog appears warning about data implications
4. User confirms
5. Provider selection grid reappears
6. **Outcome:** User can connect a different provider

### Flow 4: Custom ATS Provider
1. User clicks "Custom API" provider card
2. Additional fields appear: provider name and base URL
3. User fills in custom provider details and API key
4. **Outcome:** Connects with custom configuration

## Empty States

- **No connection:** Provider selection grid is the default view — no separate empty state needed
- **No sync history:** Connected state shows "No syncs yet" in the history area
- **Import error:** Error state with retry option and error message

## Testing

See `product-plan/sections/ats-connection/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/ats-connection/README.md` — Feature overview
- `product-plan/sections/ats-connection/tests.md` — UI behavior test specs
- `product-plan/sections/ats-connection/components/` — React components
- `product-plan/sections/ats-connection/types.ts` — TypeScript interfaces
- `product-plan/sections/ats-connection/sample-data.json` — Test data

## Done When

- [ ] Provider selection grid renders with all supported ATS options
- [ ] API key input validates and submits correctly
- [ ] Import progress animates through phases with live counts
- [ ] Connected state shows connection details and masked API key
- [ ] Sync history table displays past sync jobs with status
- [ ] Re-sync triggers a new import flow
- [ ] Disconnect returns to provider selection after confirmation
- [ ] Custom provider option accepts name and base URL
- [ ] Error states display with retry options
- [ ] Responsive on mobile

---

# Milestone 4: Job Requisitions

> **Prerequisites:** Milestone 3 (ATS Connection) complete

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

---

# Milestone 5: Candidate Pipeline

> **Prerequisites:** Milestone 4 (Job Requisitions) complete

## Goal

Implement the Candidate Pipeline — the per-requisition view showing all candidates organized by hiring stage, with enrichment status and evaluation progress at a glance.

## Overview

The candidate pipeline is the main working view for a recruiter managing a specific requisition. A header shows the job requisition details. Stage filter pills let users focus on a specific pipeline stage (Applied, Screening, HR Interview, Technical Interview, Offer, Hired, Rejected). A search bar filters by candidate name or email. Each candidate row shows enrichment badges (resume, LinkedIn), evaluation progress dots, current stage, and applied date. Clicking a row opens the candidate workspace.

**Key Functionality:**
- Job requisition header with title, department, hiring manager, team assignment, and status
- Stage filter pills with candidate counts per stage
- Search bar filtering by candidate name or email
- Candidate list with enrichment status badges (resume: pending/ingested/error/not-available, LinkedIn: same)
- Evaluation progress dots (data imported, profile built, interview prepped, HR interview, technical interview, scorecard generated)
- Clickable rows navigating to candidate workspace
- Back navigation to job requisitions list

## Components Provided

Copy from `product-plan/sections/candidate-pipeline/components/`:

- `CandidatePipeline` — Main component with requisition header, filters, search, and candidate list
- `CandidateRow` — Individual candidate row with enrichment badges and progress dots

## Props Reference

**Data props:**

- `JobRequisition` — `{ id, title, department, hiringManager, status, createdAt, location, assignedTeam }`
- `PipelineStage[]` — `{ id, label, candidateCount }` — Stage definitions with counts
- `PipelineCandidate[]` — `{ id, name, email, currentStage, appliedDate, enrichment, evaluationProgress }`

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onCandidateClick` | User clicks a candidate row |
| `onFilterByStage` | User clicks a stage filter pill (null to clear) |
| `onSearch` | User types in the search input |
| `onBack` | User clicks back to return to job requisitions |

## Expected User Flows

### Flow 1: Review Candidates for a Stage
1. User arrives from job requisitions list
2. Requisition header shows job details and team assignment
3. User clicks "HR Interview" stage pill
4. List filters to candidates in that stage
5. User reviews enrichment badges and progress dots
6. **Outcome:** User identifies which candidates need attention

### Flow 2: Open a Candidate Workspace
1. User scans the candidate list
2. User clicks a candidate row
3. **Outcome:** Navigates to the candidate workspace for evaluation

### Flow 3: Search for a Specific Candidate
1. User types a candidate name in the search bar
2. List filters to matching candidates across all stages
3. User clicks the matching candidate
4. **Outcome:** Navigates to the candidate workspace

## Empty States

- **No candidates in pipeline:** "No candidates have been imported for this requisition yet" with note about ATS sync
- **No candidates match filter/search:** "No candidates match your search" with option to clear filters
- **Stage with zero candidates:** Stage pill shows "0" count, clicking it shows empty list message

## Testing

See `product-plan/sections/candidate-pipeline/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/candidate-pipeline/README.md` — Feature overview
- `product-plan/sections/candidate-pipeline/tests.md` — UI behavior test specs
- `product-plan/sections/candidate-pipeline/components/` — React components
- `product-plan/sections/candidate-pipeline/types.ts` — TypeScript interfaces
- `product-plan/sections/candidate-pipeline/sample-data.json` — Test data

## Done When

- [ ] Requisition header displays job title, department, hiring manager, team, and status
- [ ] Stage filter pills render with candidate counts and highlight active filter
- [ ] Search filters candidates by name or email
- [ ] Candidate rows show enrichment badges (resume + LinkedIn status)
- [ ] Evaluation progress dots render correctly for each candidate
- [ ] Clicking a candidate row navigates to the candidate workspace
- [ ] Back button returns to job requisitions list
- [ ] Empty states display appropriately for no candidates and no search results
- [ ] Responsive on mobile

---

# Milestone 6: Candidate Workspace

> **Prerequisites:** Milestone 5 (Candidate Pipeline) complete

## Goal

Implement the Candidate Workspace — the central evaluation hub for a single candidate, combining data from three sources (ATS, Resume, LinkedIn), displaying the triangulated profile, and providing tabbed access to interview prep, transcript analysis, and scorecard.

## Overview

The candidate workspace is the deepest working screen in Vor. A header shows the candidate's name, contact info, current pipeline stage, and overall evaluation progress bar. Below the header, five workspace tabs organize the evaluation workflow: Profile, Interview Prep, HR Interview, Technical Interview, and Scorecard. Each tab shows a status indicator (not started, action needed, complete).

The Profile tab (default) displays the merged profile summary from triangulated data, a discrepancy panel highlighting conflicts between sources, and three data source cards (ATS Record, Resume, LinkedIn) showing raw imported data. Recruiters can upload resumes and add LinkedIn profiles from this tab.

**Key Functionality:**
- Candidate header with breadcrumb (Requisition > Candidate), avatar with initials, contact details, stage badge, and evaluation progress bar
- Five workspace tabs with status indicators
- Profile tab: merged profile summary, discrepancy panel, three data source cards
- Discrepancy panel showing field conflicts with severity levels and suggested interview questions
- Data source cards with enrichment status badges and expandable field details
- Resume upload (PDF) and LinkedIn URL/PDF input for recruiters
- Role-based permissions (recruiters can upload, senior devs view only)

## Components Provided

Copy from `product-plan/sections/candidate-workspace/components/`:

- `CandidateWorkspace` — Main orchestrator with header and tab navigation
- `CandidateHeader` — Breadcrumb, avatar, name, contact, stage badge, progress bar
- `WorkspaceTabs` — Tab bar with status indicators for each evaluation step
- `MergedProfileSummary` — AI-generated summary of the triangulated candidate profile
- `DiscrepancyPanel` — List of field conflicts between data sources with severity
- `DataSourceCard` — Individual data source card (ATS, Resume, or LinkedIn) with fields
- `EvaluationProgressBar` — Visual progress indicator across evaluation steps

## Props Reference

**Data props:**

- `Candidate` — `{ id, name, email, phone, location, currentStage, appliedDate, evaluationProgress }`
- `JobRequisition` — `{ id, title, department, hiringManager, status, assignedTeam }`
- `ATSRecord` — `{ source, status, ingestedAt, fields }` — Raw ATS data
- `ResumeDocument` — `{ id, fileName, uploadedAt, status, parsedData }` — Parsed resume with work history, education, skills
- `LinkedInProfile` — `{ id, profileUrl, status, ingestedAt, parsedData }` — LinkedIn data with endorsements
- `CandidateProfile` — `{ id, generatedAt, status, summary, mergedFields }` — Triangulated profile
- `Discrepancy[]` — `{ id, field, severity, resumeValue, linkedInValue, atsValue, summary, suggestedQuestion }`
- `WorkspaceTab[]` — `{ id, label, status, isActive }` — Tab configuration

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onTabChange` | User clicks a workspace tab |
| `onUploadResume` | Recruiter uploads a resume PDF |
| `onAddLinkedIn` | Recruiter provides a LinkedIn URL |
| `onUploadLinkedInPdf` | Recruiter uploads a LinkedIn PDF export |
| `onBack` | User clicks back to return to candidate pipeline |

## Expected User Flows

### Flow 1: Review Triangulated Profile
1. User arrives from candidate pipeline
2. Header shows candidate name, contact, and evaluation progress
3. Profile tab is active by default
4. User reads the merged profile summary
5. User checks the discrepancy panel for conflicts
6. User expands data source cards to compare raw data
7. **Outcome:** User understands the candidate's background and any data conflicts

### Flow 2: Upload Missing Data (Recruiter)
1. Recruiter opens a candidate workspace
2. Resume data source card shows "Not Available" status
3. Recruiter clicks "Upload Resume" and selects a PDF
4. Resume card updates to "Pending" then "Ingested"
5. Merged profile refreshes with new data
6. **Outcome:** Candidate profile is enriched with resume data

### Flow 3: Navigate Evaluation Workflow
1. User reviews Profile tab
2. User clicks "Interview Prep" tab (status: "action needed")
3. Interview prep briefing loads
4. User returns and clicks "HR Interview" tab
5. **Outcome:** User moves through the evaluation workflow via tabs

### Flow 4: Identify Discrepancies
1. User notices discrepancy panel shows 2 conflicts
2. A "high" severity discrepancy flags mismatched job titles between resume and LinkedIn
3. User reads the suggested interview question
4. **Outcome:** User knows what to probe during the interview

## Empty States

- **No profile generated yet:** Profile summary shows "Waiting for data" with progress indicator
- **Resume not uploaded:** Resume data source card shows upload CTA (recruiter) or "Not available" (senior dev)
- **LinkedIn not linked:** LinkedIn card shows "Add LinkedIn URL" input (recruiter) or "Not available" (senior dev)
- **No discrepancies:** Panel shows "No conflicts detected between data sources"

## Testing

See `product-plan/sections/candidate-workspace/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/candidate-workspace/README.md` — Feature overview
- `product-plan/sections/candidate-workspace/tests.md` — UI behavior test specs
- `product-plan/sections/candidate-workspace/components/` — React components
- `product-plan/sections/candidate-workspace/types.ts` — TypeScript interfaces
- `product-plan/sections/candidate-workspace/sample-data.json` — Test data

## Done When

- [ ] Candidate header renders with breadcrumb, avatar initials, contact info, and stage badge
- [ ] Evaluation progress bar accurately reflects completion state
- [ ] Five workspace tabs render with correct status indicators (not started, action needed, complete)
- [ ] Profile tab shows merged profile summary with triangulated fields
- [ ] Discrepancy panel lists conflicts with severity levels and suggested questions
- [ ] Three data source cards display raw data from ATS, Resume, and LinkedIn
- [ ] Resume upload works for recruiters (senior devs see read-only view)
- [ ] LinkedIn URL input and PDF upload work for recruiters
- [ ] Tab switching works and persists active state
- [ ] Back navigation returns to candidate pipeline
- [ ] Responsive on mobile

---

# Milestone 7: Interview Prep

> **Prerequisites:** Milestone 6 (Candidate Workspace) complete

## Goal

Implement the Interview Prep section — an AI-generated briefing that prepares interviewers with match analysis, strengths, gaps, risk areas, and tailored questions before meeting a candidate.

## Overview

Interview Prep is accessed from the candidate workspace tabs and generates a role-specific briefing (HR Screening or Technical). The briefing shows an interview type pill, a status banner (ready/pending/outdated), a match header with quality badge, categorized strengths, a gaps and risks panel highlighting discrepancies worth probing, and a list of suggested interview questions with copy-to-clipboard buttons. Interviewers can mark the briefing as reviewed to signal readiness.

**Key Functionality:**
- Interview type pill (HR Screening or Technical) indicating which briefing is shown
- Briefing status banner (ready, pending generation, outdated after data changes)
- Match header with quality badge (Strong/Moderate/Gaps Detected) and summary
- Strengths list showing where the candidate meets or exceeds requirements
- Gaps and risks panel with severity indicators, source comparison, and probing notes
- Suggested questions list organized by category with individual copy buttons
- Copy full briefing to clipboard
- Regenerate briefing after data updates
- Mark as reviewed action to signal readiness

## Components Provided

Copy from `product-plan/sections/interview-prep/components/`:

- `InterviewPrep` — Main orchestrator component
- `BriefingStatusBanner` — Status indicator (ready/pending/outdated) with regenerate action
- `MatchHeader` — Match quality badge with summary text
- `StrengthsList` — Categorized strengths with requirement match labels
- `GapsPanel` — Gaps and risk areas with severity levels and source comparisons
- `QuestionsList` — Question list organized by category
- `QuestionCard` — Individual question with context and copy button

## Props Reference

**Data props:**

- `CandidateContext` — `{ id, name, email, currentStage, currentTitle, currentCompany }`
- `JobRequisitionContext` — `{ id, title, department, hiringManager }`
- `Briefing` — `{ id, interviewType, status, generatedAt, matchQuality, matchSummary }`
- `Strength[]` — `{ id, title, detail, requirementMatch }`
- `Gap[]` — `{ id, title, detail, severity, sourceNote }`
- `RiskArea[]` — `{ id, title, detail, severity, sources, resumeValue, linkedInValue, atsValue }`
- `InterviewQuestion[]` — `{ id, category, question, context, linkedGapId }`

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onCopyQuestion` | Interviewer clicks copy on a single question |
| `onCopyBriefing` | Interviewer clicks "Copy Full Briefing" |
| `onRegenerateBriefing` | Interviewer requests a fresh briefing after data changes |
| `onMarkReviewed` | Interviewer marks the briefing as reviewed |

## Expected User Flows

### Flow 1: Prepare for an Interview
1. User opens the Interview Prep tab from candidate workspace
2. Interview type pill shows "HR Screening" or "Technical"
3. Status banner shows "Ready" with generation timestamp
4. User reads match quality (e.g., "Moderate") and summary
5. User reviews strengths list
6. User scans gaps and risk areas, noting severity levels
7. User reads suggested questions
8. User clicks "Mark as Reviewed"
9. **Outcome:** Tab status updates to "Complete" in the workspace

### Flow 2: Copy Questions Before Interview
1. User reviews the suggested questions list
2. User clicks copy on specific questions they want to ask
3. User clicks "Copy Full Briefing" for the complete package
4. **Outcome:** Questions are in clipboard, ready for the interview

### Flow 3: Regenerate After New Data
1. User returns to Interview Prep after new resume was uploaded
2. Status banner shows "Outdated" with warning
3. User clicks "Regenerate"
4. Briefing regenerates with updated analysis
5. **Outcome:** Fresh briefing incorporating new data

## Empty States

- **Pending generation:** Status banner shows "Generating briefing..." with loading indicator; strengths, gaps, and questions areas show skeleton placeholders
- **Insufficient data:** Message explaining that more data sources are needed (e.g., resume not uploaded) before a briefing can be generated
- **No gaps detected:** Gaps panel shows "No significant gaps identified" with positive indicator

## Testing

See `product-plan/sections/interview-prep/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/interview-prep/README.md` — Feature overview
- `product-plan/sections/interview-prep/tests.md` — UI behavior test specs
- `product-plan/sections/interview-prep/components/` — React components
- `product-plan/sections/interview-prep/types.ts` — TypeScript interfaces
- `product-plan/sections/interview-prep/sample-data.json` — Test data

## Done When

- [ ] Interview type pill displays correctly (HR Screening or Technical)
- [ ] Status banner reflects briefing state (ready, pending, outdated) with timestamps
- [ ] Match header shows quality badge with appropriate color and summary
- [ ] Strengths list renders with requirement match labels
- [ ] Gaps panel shows severity indicators and source comparison values
- [ ] Risk areas display with resume/LinkedIn/ATS value comparison
- [ ] Suggested questions render by category with copy buttons
- [ ] Copy individual question and copy full briefing work correctly
- [ ] Regenerate triggers new briefing generation
- [ ] Mark as reviewed updates the workspace tab status
- [ ] Responsive on mobile

---

# Milestone 8: Transcript Analysis

> **Prerequisites:** Milestone 7 (Interview Prep) complete

## Goal

Implement the Transcript Analysis section — the post-interview workspace where interviewers upload transcripts, review AI-extracted insights, answer recall questions, and browse highlighted transcript passages.

## Overview

Transcript Analysis is accessed from the HR Interview and Technical Interview tabs in the candidate workspace. It supports the dual-interviewer workflow: HR uploads their transcript, and the senior dev uploads theirs independently. The flow starts with an upload area (drag-drop file or paste text), transitions through a processing state, then reveals a two-panel layout. The left panel shows an insight summary bar, insight groups organized by category, insight cards with supporting quotes, and a recall questions section. The right panel is a transcript viewer with highlighted passages that link to insights.

**Key Functionality:**
- Upload area supporting drag-and-drop file upload or text paste
- Processing state with progress animation while AI analyzes the transcript
- Two-panel layout (insights + recall on left, transcript viewer on right)
- Insight summary bar showing counts by category (strong, weak, red flag, notable)
- Insight groups organized by category with expandable cards
- Insight cards showing summary, supporting quote, and topic label
- Recall questions section with AI-generated questions for the interviewer to answer
- Interviewer answer input for each recall question
- Transcript viewer with highlighted passages linked to insights
- Click-to-scroll between insight cards and transcript passages
- Replace transcript option for re-upload

## Components Provided

Copy from `product-plan/sections/transcript-analysis/components/`:

- `TranscriptAnalysis` — Main orchestrator managing upload, processing, and analysis states
- `TranscriptUploader` — Drag-drop upload area and text paste input
- `InsightSummaryBar` — Category count pills (strong, weak, red flag, notable)
- `InsightGroup` — Category section containing insight cards
- `InsightCard` — Individual insight with summary, quote, and topic
- `RecallSection` — Recall questions area with answer inputs
- `RecallQuestionCard` — Individual recall question with answer input field
- `TranscriptViewer` — Full transcript text with highlighted passages

## Props Reference

**Data props:**

- `Candidate` — `{ id, name, email, currentStage }` — Candidate context
- `JobRequisition` — `{ id, title, department }` — Requisition context
- `interviewType` — `'hr_screening' | 'technical'` — Which interview session
- `Transcript` — `{ id, candidateId, interviewType, fileName, uploadedAt, status, wordCount, duration, speakers, rawText }` — null before upload
- `TranscriptInsight[]` — `{ id, transcriptId, category, summary, quote, quoteStartIndex, quoteEndIndex, topic }`
- `RecallQuestion[]` — `{ id, transcriptId, question, topic, order, answeredAt }`
- `InterviewerAnswer[]` — `{ id, recallQuestionId, answer, answeredAt, answeredByRole }`

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onUploadTranscript` | Interviewer uploads a file or pastes transcript text |
| `onReplaceTranscript` | Interviewer wants to replace the current transcript |
| `onInsightClick` | User clicks an insight card to scroll to transcript passage |
| `onAnswerRecallQuestion` | Interviewer submits an answer to a recall question |

## Expected User Flows

### Flow 1: Upload and Analyze Transcript
1. Interviewer opens the HR Interview or Technical Interview tab
2. Upload area appears (no transcript yet)
3. Interviewer drags and drops a transcript file (or pastes text)
4. Processing state shows with animation
5. Analysis completes — two-panel layout appears
6. **Outcome:** Insights, recall questions, and highlighted transcript are ready for review

### Flow 2: Review Insights and Navigate Transcript
1. Interviewer sees the insight summary bar with category counts
2. Interviewer expands a "Red Flag" insight group
3. Interviewer clicks an insight card
4. Transcript viewer scrolls to the highlighted passage
5. Interviewer reads the full context around the quote
6. **Outcome:** Interviewer validates AI-identified concerns in context

### Flow 3: Answer Recall Questions
1. After reviewing insights, interviewer scrolls to the recall section
2. AI-generated questions appear (e.g., "What was your impression of the candidate's leadership examples?")
3. Interviewer types their answer for each question
4. Answers are saved with timestamp
5. **Outcome:** Interviewer's impressions are captured before scorecard generation

### Flow 4: Replace Transcript
1. Interviewer notices the wrong transcript was uploaded
2. Interviewer clicks "Replace Transcript"
3. Upload area reappears
4. Interviewer uploads the correct file
5. **Outcome:** Analysis reruns on the new transcript

## Empty States

- **No transcript uploaded:** Upload area is the default view with drag-drop zone and paste option
- **Processing:** Skeleton placeholders with processing animation; progress message
- **Processing error:** Error message with retry option
- **No insights extracted:** "No significant insights were extracted from this transcript" with suggestion to check transcript quality

## Testing

See `product-plan/sections/transcript-analysis/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/transcript-analysis/README.md` — Feature overview
- `product-plan/sections/transcript-analysis/tests.md` — UI behavior test specs
- `product-plan/sections/transcript-analysis/components/` — React components
- `product-plan/sections/transcript-analysis/types.ts` — TypeScript interfaces
- `product-plan/sections/transcript-analysis/sample-data.json` — Test data

## Done When

- [ ] Upload area supports drag-and-drop file and text paste
- [ ] Processing state displays with animation and progress messaging
- [ ] Two-panel layout renders after analysis completes
- [ ] Insight summary bar shows correct category counts
- [ ] Insight groups organized by category with expandable cards
- [ ] Insight cards display summary, quote, and topic
- [ ] Clicking an insight scrolls the transcript viewer to the highlighted passage
- [ ] Recall questions render with answer input fields
- [ ] Interviewer answers are submitted and saved with timestamps
- [ ] Replace transcript option returns to upload state
- [ ] Transcript viewer highlights passages linked to insights
- [ ] Responsive on mobile (panels stack vertically)

---

# Milestone 9: Scorecard

> **Prerequisites:** Milestone 8 (Transcript Analysis) complete

## Goal

Implement the Scorecard section — the AI-generated candidate evaluation that synthesizes both interviews into a structured, editable document that can be pushed back to the ATS.

## Overview

The Scorecard is the final output of the Vor evaluation workflow. It lives in the Scorecard tab of the candidate workspace and synthesizes data from both HR and Technical interviews into a unified assessment. A status banner shows the current state (generating, draft, pushed, push failed). The recommendation badge prominently displays Hire/No Hire/Maybe with a confidence level. The body contains summary sections (overall, HR-specific, technical-specific), strengths and concerns lists with supporting evidence, evidence quotes from both interviews, and interviewer impressions. Recruiters can inline-edit all sections before pushing the scorecard to the ATS.

**Key Functionality:**
- Status banner showing scorecard state (generating, draft, pushed, push failed)
- Recommendation badge (Hire/No Hire/Maybe) with confidence level (High/Medium/Low)
- Overall summary section synthesizing both interviews
- HR interview summary section
- Technical interview summary section
- Strengths list with evidence citations
- Concerns list with evidence citations
- Evidence quotes panel with speaker, timestamp, interview source, and context
- Interviewer impressions with sentiment indicators (positive/neutral/negative) and interview source
- Inline editing for all text sections (summary, strengths, concerns, recommendation)
- Push to ATS with confirmation dialog
- Retry push after failure
- Regenerate scorecard with warning dialog (edits will be lost)
- Download as markdown

## Components Provided

Copy from `product-plan/sections/scorecard/components/`:

- `ScorecardView` — Main orchestrator component with all sections
- `StatusBanner` — Scorecard status indicator with action buttons
- `RecommendationBadge` — Hire/No Hire/Maybe badge with confidence level
- `ConfirmDialog` — Reusable confirmation dialog for push and regenerate actions

## Props Reference

**Data props:**

- `Scorecard` — Full scorecard object containing:
  - `{ id, candidateId, candidateName, jobRequisitionId, jobTitle, department }`
  - `{ generatedAt, lastEditedAt, editedByRecruiter, status }`
  - `{ summary, hrSummary, technicalSummary }` — Three summary sections
  - `{ recommendation, confidenceLevel }` — Hire decision
  - `{ strengths: Strength[], concerns: Concern[] }` — Each with `{ id, text, evidence }`
  - `{ evidenceQuotes: EvidenceQuote[] }` — `{ id, timestamp, speaker, quote, context, interviewSource }`
  - `{ interviewerImpressions: InterviewerImpression[] }` — `{ id, question, answer, sentiment, interviewSource }`
  - `{ atsPushEvents: ATSPushEvent[], atsConnectionName }` — Push history

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onEditSection` | Recruiter edits any scorecard section (receives section name and new value) |
| `onPushToATS` | Recruiter clicks "Push to ATS" and confirms |
| `onRetryPush` | Recruiter retries a failed push |
| `onRegenerate` | Recruiter regenerates the scorecard and confirms warning |
| `onDownload` | Recruiter downloads the scorecard as markdown |

## Expected User Flows

### Flow 1: Review and Push Scorecard
1. User opens the Scorecard tab
2. Status banner shows "Draft" — ready for review
3. User reads the recommendation badge (e.g., "Hire — High Confidence")
4. User reads overall, HR, and technical summaries
5. User reviews strengths and concerns with evidence
6. User makes minor edits to the overall summary
7. User clicks "Push to ATS"
8. Confirmation dialog appears with ATS provider name
9. User confirms
10. **Outcome:** Status updates to "Pushed" with external link to ATS

### Flow 2: Edit Before Pushing
1. User reviews the draft scorecard
2. User disagrees with a concern — clicks to edit it
3. User modifies the text inline
4. User changes the recommendation from "Maybe" to "Hire"
5. User pushes the edited scorecard
6. **Outcome:** Edited scorecard is pushed, `editedByRecruiter` flag is set

### Flow 3: Handle Push Failure
1. User pushes scorecard to ATS
2. Push fails (API error)
3. Status banner shows "Push Failed" with error message
4. User clicks "Retry"
5. Push succeeds
6. **Outcome:** Status updates to "Pushed"

### Flow 4: Regenerate Scorecard
1. User decides the scorecard needs a full refresh (e.g., after new transcript)
2. User clicks "Regenerate"
3. Warning dialog appears: "This will replace all edits with a fresh AI-generated scorecard"
4. User confirms
5. Status shows "Generating" with loading state
6. **Outcome:** Fresh scorecard appears as a new draft

## Empty States

- **Generating:** Status banner shows "Generating scorecard..." with skeleton placeholders for all sections
- **Missing interviews:** Message explaining that both HR and Technical transcripts must be analyzed before scorecard generation
- **No evidence quotes:** Evidence section shows "No quotes extracted" (unusual but handled)

## Testing

See `product-plan/sections/scorecard/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/scorecard/README.md` — Feature overview
- `product-plan/sections/scorecard/tests.md` — UI behavior test specs
- `product-plan/sections/scorecard/components/` — React components
- `product-plan/sections/scorecard/types.ts` — TypeScript interfaces
- `product-plan/sections/scorecard/sample-data.json` — Test data

## Done When

- [ ] Status banner reflects scorecard state (generating, draft, pushed, push failed) with correct styling
- [ ] Recommendation badge displays Hire/No Hire/Maybe with confidence level and appropriate colors
- [ ] Overall, HR, and Technical summary sections render correctly
- [ ] Strengths list displays with evidence citations
- [ ] Concerns list displays with evidence citations
- [ ] Evidence quotes show speaker, timestamp, quote text, and interview source (HR/Technical)
- [ ] Interviewer impressions show with sentiment indicators and interview source
- [ ] Inline editing works for all text sections
- [ ] Push to ATS triggers confirmation dialog and submits
- [ ] Push failure state shows error with retry option
- [ ] Regenerate shows warning dialog and refreshes scorecard
- [ ] Download generates markdown file
- [ ] Responsive on mobile

---

# Milestone 10: Team Capacity

> **Prerequisites:** Milestone 1 (Shell) complete

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
