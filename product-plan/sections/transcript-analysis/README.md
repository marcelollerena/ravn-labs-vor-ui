# Transcript Analysis

## Overview
The assigned interviewer uploads an interview transcript (raw text paste or file upload), and the system analyzes the conversation to extract key insights. Vor supports at least two interview tracks for each candidate: HR screening and technical interview. Each track has its own transcript, analysis, and role-specific follow-up prompts.

## User Flows
- Upload a transcript via file upload (.txt, .md, .docx) or paste raw text into a text area
- See a processing state while the AI analyzes the transcript
- View extracted insights organized by category: strong answers, weak answers, red flags, notable moments
- Each insight includes a supporting quote pulled directly from the transcript
- Click an insight to scroll to the corresponding passage in the transcript viewer
- Filter insights by category
- Re-upload or replace a transcript if the wrong file was uploaded
- Answer active recall questions tailored to the current interview type and interviewer role

## Design Decisions
- Upload area uses drag-and-drop with a "Paste transcript" alternative tab
- Interview type context is always visible (HR screening vs. technical)
- Processing state shows animated progress with descriptive status text
- Insights are displayed as cards grouped by category with count badges in headers
- Each insight card shows summary, category badge, and a blockquote excerpt
- Transcript viewer shows full text with highlighted passages linked to insights
- Recall questions adapt by role: recruiter sees communication/fit prompts, senior dev sees technical depth prompts
- This is a tab within the Candidate Workspace

## Data Shapes
**Entities:** Transcript, TranscriptInsight, RecallQuestion, InterviewerAnswer, Candidate, JobRequisition, InterviewType, InsightCategory, UserRole
**From global entities:** Transcript, TranscriptInsight, RecallQuestion, InterviewAnswer, InterviewSession, Candidate, JobRequisition

## Components Provided
- `TranscriptAnalysis` — Root component composing the uploader, insights, recall questions, and transcript viewer
- `TranscriptUploader` — Drag-and-drop file upload zone with paste-text alternative
- `InsightSummaryBar` — Summary bar showing insight counts by category (strong, weak, red flag, notable)
- `InsightCard` — Single insight displaying summary, category badge, and quoted transcript excerpt
- `InsightGroup` — Group of InsightCards under a category heading with count
- `RecallQuestionCard` — Single recall question with text area for the interviewer's answer and submit action
- `RecallSection` — Container for all recall questions with role context
- `TranscriptViewer` — Scrollable full transcript text with highlighted passages corresponding to insights

## Callback Props
| Callback | Triggered When |
|----------|---------------|
| `onUploadTranscript(file \| string)` | User uploads a file or pastes transcript text |
| `onReplaceTranscript()` | User clicks "Replace Transcript" to upload a new one |
| `onInsightClick(insightId)` | User clicks an insight card to scroll to the passage in the transcript |
| `onAnswerRecallQuestion(questionId, answer)` | User submits an answer to a recall question |
