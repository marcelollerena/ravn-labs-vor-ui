# Interview Prep

## Overview
Displays the AI-generated interview briefing for a candidate. Compares the candidate's triangulated profile against the job requisition to surface strengths, gaps, and specific areas to probe. Produces targeted question sets for the HR screening and the technical interview without requiring separate page layouts.

## User Flows
- View the auto-generated interview briefing once the candidate profile is complete
- Read a structured comparison: candidate strengths vs. job requirements, identified gaps, risk areas
- Review AI-generated interview questions, each linked to a specific gap or area of interest and labeled by interview type
- Regenerate the briefing if the candidate profile has been updated with new data
- Copy individual questions or the full briefing to clipboard for use during the interview
- Mark the briefing as reviewed to progress the candidate's evaluation status
- See a pending state when the candidate profile is not yet complete

## Design Decisions
- Briefing status banner at the top communicates readiness: "Ready", "Pending", or "Outdated"
- Match header shows overall match quality (strong/moderate/gaps-detected) with a summary sentence
- Strengths section uses bullet points with requirement match context
- Gaps section uses bullet points with severity indicators (high/medium/low)
- Risk areas are sourced from profile discrepancies with cross-source values shown
- Interview questions are split into two role-aware groups: HR screening and Technical
- Copy-to-clipboard buttons are provided on individual questions and the full briefing
- This is a tab within the Candidate Workspace

## Data Shapes
**Entities:** Briefing, Strength, Gap, RiskArea, InterviewQuestion, CandidateContext, JobRequisitionContext, BriefingStatus, MatchQuality, GapSeverity, InterviewType, QuestionCategory
**From global entities:** CandidateProfile, JobRequisition, InterviewBrief, Candidate

## Components Provided
- `InterviewPrep` — Root component composing the status banner, match header, strengths, gaps, risk areas, and questions
- `BriefingStatusBanner` — Banner indicating briefing readiness: Ready (green), Pending (amber), Outdated (blue)
- `MatchHeader` — Displays overall match quality badge, match summary text, and candidate/job context
- `StrengthsList` — List of candidate strengths with titles, details, and matched requirement references
- `GapsPanel` — List of identified gaps with severity indicators, details, and source notes
- `QuestionCard` — Single interview question with category badge, context, and copy-to-clipboard button
- `QuestionsList` — Grouped list of questions split by interview type (HR Screening / Technical)

## Callback Props
| Callback | Triggered When |
|----------|---------------|
| `onCopyQuestion(questionId)` | User clicks the copy button on an individual question |
| `onCopyBriefing()` | User clicks "Copy Full Briefing" |
| `onRegenerateBriefing()` | User clicks "Regenerate Briefing" and confirms |
| `onMarkReviewed()` | User clicks "Mark as Reviewed" |
