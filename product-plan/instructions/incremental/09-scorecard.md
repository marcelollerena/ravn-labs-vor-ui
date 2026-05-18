# Milestone 9: Scorecard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 8 (Transcript Analysis) complete

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
