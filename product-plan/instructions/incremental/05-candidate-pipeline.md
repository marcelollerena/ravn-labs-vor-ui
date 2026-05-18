# Milestone 5: Candidate Pipeline

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 4 (Job Requisitions) complete

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
