# Milestone 8: Transcript Analysis

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 7 (Interview Prep) complete

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
