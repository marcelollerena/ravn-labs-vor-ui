# Active Recall Specification

## Overview
After transcript analysis, Vor presents 3-5 AI-generated questions to the recruiter designed to capture subjective impressions that can't be extracted from the transcript alone. This guided reflection step ensures the scorecard includes the recruiter's human judgment alongside AI-extracted evidence.

## User Flows
- View 3-5 AI-generated questions based on transcript analysis and candidate profile
- Read each question with context explaining why it's being asked (e.g., "The candidate discussed scaling Postgres — we want your impression of their depth")
- Type a free-text answer for each question
- Navigate between questions (next/previous) or answer them in any order
- Submit all answers to trigger scorecard generation
- Edit answers before final submission if the recruiter changes their mind

## UI Requirements
- Sequential question flow: one question displayed prominently at a time with a progress indicator (e.g., "Question 2 of 4")
- Each question shows:
  - The question text in a large, readable format
  - Context line explaining what transcript moment or profile data prompted this question
  - A relevant transcript quote as supporting evidence
  - A text area for the recruiter's free-text response
- Navigation: "Previous" and "Next" buttons, plus a question dot indicator to jump between questions
- All questions visible in a sidebar summary showing answered/unanswered status
- "Submit Answers" button enabled only when all questions have responses
- Confirmation before submission: "Once submitted, your answers will be used to generate the scorecard"
- This view appears within the Transcript tab of the Candidate Workspace, after analysis is complete
- Calm, focused UI — this is a reflection moment, not a data-entry form

## Configuration
- shell: true
