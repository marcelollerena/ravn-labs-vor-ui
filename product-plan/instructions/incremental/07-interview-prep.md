# Milestone 7: Interview Prep

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 6 (Candidate Workspace) complete

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
