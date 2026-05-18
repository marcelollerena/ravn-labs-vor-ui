# Scorecard

## Overview
Displays the AI-generated evaluation scorecard that synthesizes the candidate profile, HR interview insights, technical interview insights, and interviewer active recall answers into a structured markdown document. The final output reflects the real-world two-interviewer workflow while preserving a single consolidated scorecard for the ATS.

## User Flows
- View the auto-generated scorecard once active recall answers are submitted
- Read the structured scorecard: summary, hiring recommendation, strengths, concerns, evidence with transcript quotes, HR interview takeaways, and technical interview takeaways
- Edit any section of the scorecard inline according to role permissions
- Push the scorecard to the ATS with one click and confirmation dialog
- View push status: not pushed, pushed successfully, or failed with retry option
- Regenerate the scorecard if a fresh AI draft is needed (with warning that edits will be lost)
- Download the scorecard as a markdown file

## Design Decisions
- Scorecard rendered as a clean readable document with clear section headings
- Recommendation badge is prominently displayed (Hire/No Hire/Maybe with confidence level)
- Inline editing: each section has a subtle pencil icon; clicking opens a rich text area
- Status banner shows push state: "Not pushed", "Pushed to [ATS] on [date]", or "Push failed"
- Action bar at the top/bottom with "Push to ATS", "Download .md", and "Regenerate Scorecard" buttons
- Push confirmation dialog shows what will be sent
- Regenerate shows a destructive warning about losing edits
- Evidence quotes cite which interview track they came from (HR/Technical/Combined)
- Interviewer impressions are integrated naturally with sentiment and source attribution

## Data Shapes
**Entities:** Scorecard, Strength, Concern, EvidenceQuote, InterviewerImpression, ATSPushEvent, Recommendation, ConfidenceLevel, ScorecardStatus, InterviewSource
**From global entities:** Scorecard, ATSPushEvent, CandidateProfile, TranscriptInsight, InterviewAnswer, InterviewSession

## Components Provided
- `ScorecardView` — Root component rendering the full scorecard document with all sections and the action bar
- `StatusBanner` — Push status indicator showing current state (not pushed, pushed with date, push failed with retry)
- `RecommendationBadge` — Visual badge displaying the hiring recommendation (Hire/No Hire/Maybe) with confidence level
- `ConfirmDialog` — Reusable confirmation modal used for Push to ATS and Regenerate actions

## Callback Props
| Callback | Triggered When |
|----------|---------------|
| `onEditSection(scorecardId, section, value)` | User edits a section of the scorecard inline (summary, hrSummary, technicalSummary, strengths, concerns, evidenceQuotes, interviewerImpressions, recommendation) |
| `onPushToATS(scorecardId)` | User confirms the "Push to ATS" action |
| `onRetryPush(scorecardId)` | User clicks "Retry" on a failed push |
| `onRegenerate(scorecardId)` | User confirms scorecard regeneration |
| `onDownload(scorecardId)` | User clicks "Download .md" |
