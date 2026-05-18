# Milestone 6: Candidate Workspace

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 5 (Candidate Pipeline) complete

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
