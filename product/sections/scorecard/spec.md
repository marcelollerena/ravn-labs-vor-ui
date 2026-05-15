# Scorecard Specification

## Overview
Displays the AI-generated evaluation scorecard that synthesizes the candidate profile, HR interview insights, technical interview insights, and interviewer active recall answers into a structured markdown document. The final output reflects the real-world two-interviewer workflow while preserving a single consolidated scorecard for the ATS.

## User Flows
- View the auto-generated scorecard once active recall answers are submitted
- Read the structured scorecard: summary, hiring recommendation, strengths, concerns, evidence with transcript quotes, HR interview takeaways, and technical interview takeaways
- Edit any section of the scorecard inline according to role permissions
- Preview the scorecard as it will appear when pushed to the ATS
- Push the scorecard to the ATS with one click
- View push status: pending, pushed successfully, or failed with retry option
- Regenerate the scorecard if the recruiter wants a fresh AI draft after editing
- Download the scorecard as a markdown file

## UI Requirements
- Scorecard rendered as a clean, readable markdown document with clear section headings:
  - **Summary**: 2-3 sentence overall assessment
  - **Recommendation**: Hire / No Hire / Maybe with confidence level
  - **Strengths**: Bullet points with supporting evidence
  - **Concerns**: Bullet points with supporting evidence
  - **HR Interview Summary**: Recruiter-oriented synthesis of communication, English level, and requirement validation
  - **Technical Interview Summary**: Senior developer-oriented synthesis of technical depth, execution, and seniority
  - **Evidence**: Key transcript quotes with context from both interview tracks
  - **Interviewer Impressions**: Human follow-up answers from both the recruiter and the senior developer integrated naturally
- Inline editing: each section is editable in-place with a subtle edit affordance (pencil icon or click-to-edit)
- Edit mode shows a rich text area; view mode shows formatted markdown
- "Push to ATS" button prominently placed, with a confirmation dialog showing what will be sent
- Push status banner: "Not pushed", "Pushed to [ATS Name] on [date]", or "Push failed — retry?"
- Action bar: "Push to ATS", "Download .md", "Regenerate Scorecard"
- Regenerate shows a warning that edits will be lost
- This is a tab within the Candidate Workspace (Scorecard tab)
- Breadcrumb: Job Requisitions → [Job Title] → [Candidate Name] → Scorecard

## Configuration
- shell: true
