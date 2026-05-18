# Transcript Analysis — Test Specifications

## Sample Test Data

```typescript
const candidate: Candidate = {
  id: 'cand-101',
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  currentStage: 'hr-interview'
}

const jobRequisition: JobRequisition = {
  id: 'req-1',
  title: 'Senior Frontend Engineer',
  department: 'Engineering'
}

const analyzedTranscript: Transcript = {
  id: 'tr-1',
  candidateId: 'cand-101',
  interviewType: 'hr_screening',
  fileName: 'sarah_chen_hr_interview.txt',
  uploadedAt: '2026-05-13T14:00:00Z',
  status: 'analyzed',
  wordCount: 4250,
  duration: '45 min',
  speakers: ['Maria Lopez (Interviewer)', 'Sarah Chen (Candidate)'],
  rawText: 'Maria: Thank you for joining us today, Sarah. Can you start by telling me about your current role?\n\nSarah: Sure! I am currently a Senior Frontend Engineer at TechCorp where I lead the React migration project...\n\n[...transcript continues...]'
}

const processingTranscript: Transcript = {
  ...analyzedTranscript,
  status: 'processing'
}

const transcriptInsights: TranscriptInsight[] = [
  {
    id: 'ins-1',
    transcriptId: 'tr-1',
    category: 'strong',
    summary: 'Detailed explanation of React migration leadership with concrete metrics',
    quote: 'I led the migration of our legacy jQuery codebase to React, which reduced page load times by 40% and improved developer velocity by 3x.',
    quoteStartIndex: 245,
    quoteEndIndex: 389,
    topic: 'Technical Leadership'
  },
  {
    id: 'ins-2',
    transcriptId: 'tr-1',
    category: 'weak',
    summary: 'Vague response about system design experience',
    quote: 'I have not really done full system design from scratch, but I have worked on parts of systems.',
    quoteStartIndex: 1200,
    quoteEndIndex: 1310,
    topic: 'System Design'
  },
  {
    id: 'ins-3',
    transcriptId: 'tr-1',
    category: 'red_flag',
    summary: 'Conflicting timeline about StartupXYZ tenure',
    quote: 'I joined StartupXYZ right after graduation in 2019... well actually it was early 2020, I took some time off first.',
    quoteStartIndex: 2100,
    quoteEndIndex: 2230,
    topic: 'Employment History'
  },
  {
    id: 'ins-4',
    transcriptId: 'tr-1',
    category: 'notable',
    summary: 'Strong English communication with natural fluency',
    quote: 'The candidate articulated complex technical concepts clearly and responded to follow-up questions without hesitation.',
    quoteStartIndex: 3000,
    quoteEndIndex: 3150,
    topic: 'Communication'
  }
]

const recallQuestions: RecallQuestion[] = [
  { id: 'rq-1', transcriptId: 'tr-1', question: 'How would you rate the candidate\'s English fluency on a scale of 1-5, and what stood out?', topic: 'English Level', order: 1, answeredAt: null },
  { id: 'rq-2', transcriptId: 'tr-1', question: 'Did the candidate seem genuinely motivated by this role, or were there signs of passive job searching?', topic: 'Motivation', order: 2, answeredAt: null },
  { id: 'rq-3', transcriptId: 'tr-1', question: 'Were there any moments where the candidate seemed evasive or uncomfortable?', topic: 'Red Flags', order: 3, answeredAt: '2026-05-13T15:30:00Z' }
]

const interviewerAnswers: InterviewerAnswer[] = [
  { id: 'ia-1', recallQuestionId: 'rq-3', answer: 'She hesitated noticeably when asked about the StartupXYZ dates. Otherwise very open and forthcoming.', answeredAt: '2026-05-13T15:30:00Z', answeredByRole: 'recruiter' }
]
```

---

## User Flow Tests

### Upload transcript via file
- Render TranscriptAnalysis with `transcript: null`
- Verify the TranscriptUploader is displayed with drag-and-drop zone
- Verify text says "Drag & drop a file" or "Upload transcript"
- Simulate dropping a .txt file
- Verify `onUploadTranscript` is called with the File object

### Upload transcript via paste
- Render with `transcript: null`
- Click the "Paste transcript" tab in the uploader
- Verify a large text area appears
- Paste text into the area and submit
- Verify `onUploadTranscript` is called with the pasted string

### Processing state
- Render with `transcript: processingTranscript` (status 'processing')
- Verify a progress indicator is displayed
- Verify status text shows "Analyzing conversation..." or similar
- Verify insights, recall questions, and transcript viewer are not yet shown

### View insights after analysis
- Render with `transcript: analyzedTranscript` and populated `transcriptInsights`
- Verify InsightSummaryBar shows counts: 1 strong, 1 weak, 1 red flag, 1 notable
- Verify 4 InsightCards are rendered
- Verify the "strong" insight shows summary "Detailed explanation of React migration leadership..." and the quoted excerpt in blockquote style
- Verify the "red_flag" insight shows a red flag badge

### Click insight to scroll transcript
- Click the first insight card (ins-1)
- Verify `onInsightClick` is called with `'ins-1'`

### Filter insights by category
- Click the "Red Flag" category header or filter
- Verify only red flag insights are displayed

### Answer recall questions
- Verify RecallSection shows 3 recall questions
- Verify rq-3 shows as already answered with the existing answer text
- Verify rq-1 and rq-2 show empty answer text areas
- Type "5/5 fluency, very natural English" into the rq-1 answer area
- Click submit
- Verify `onAnswerRecallQuestion` is called with `('rq-1', '5/5 fluency, very natural English')`

### Replace transcript
- Render with an analyzed transcript
- Click "Replace Transcript"
- Verify a confirmation prompt appears
- Confirm the replacement
- Verify `onReplaceTranscript` is called

---

## Empty State Tests

### No transcript uploaded
- Render with `transcript: null`, empty insights, empty recall questions
- Verify TranscriptUploader is prominently displayed
- Verify instructions explain what to upload
- Verify no insights or recall sections are visible

### Transcript analyzed but no insights
- Render with analyzed transcript but `transcriptInsights: []`
- Verify InsightSummaryBar shows all zeros
- Verify an empty state message in the insights area

### No recall questions generated
- Render with `recallQuestions: []`
- Verify RecallSection shows empty state or is hidden

---

## Component Interaction Tests

### TranscriptUploader modes
- Verify file upload tab shows drag-and-drop zone with accepted file types (.txt, .md, .docx)
- Verify paste tab shows a text area with a submit button
- Switch between tabs and verify correct UI is shown

### InsightCard category badges
- Render with `category: 'strong'` — verify green "Strong" badge
- Render with `category: 'weak'` — verify amber "Weak" badge
- Render with `category: 'red_flag'` — verify red "Red Flag" badge
- Render with `category: 'notable'` — verify blue "Notable" badge

### InsightSummaryBar counts
- Render with 3 strong, 1 weak, 2 red_flag, 0 notable insights
- Verify bar shows "3", "1", "2", "0" respectively

### RecallQuestionCard states
- Render unanswered question — verify empty text area and enabled submit button
- Render answered question — verify answer text is displayed, submit button is hidden or shows "Edit"

### TranscriptViewer highlights
- Render with transcript and insights
- Verify highlighted passages appear at the correct positions in the text
- Verify clicking a highlight scrolls the insight panel to the corresponding card

---

## Edge Cases

### Very long transcript (10,000+ words)
- Render with a very large rawText
- Verify TranscriptViewer scrolls smoothly
- Verify highlights render at correct positions

### Many insights (20+)
- Render with 20 insight objects across categories
- Verify all groups render and are scrollable

### Recall question with very long answer
- Enter a 1000-character answer into a recall question
- Verify the text area accommodates the text and submit works

### Transcript with error status
- Render with `transcript.status: 'error'`
- Verify an error message is displayed
- Verify a "Retry" or "Replace Transcript" option is available

### Multiple speakers with long names
- Render transcript with speakers including very long names
- Verify speaker labels in the transcript viewer do not break layout

---

## Accessibility

- Verify TranscriptUploader drag-and-drop zone is keyboard-accessible
- Verify file type restrictions are communicated (not just in the file picker)
- Verify InsightCards are keyboard-navigable and activatable
- Verify category badges have accessible text labels
- Verify quoted excerpts use proper blockquote semantics
- Verify recall question text areas have associated labels
- Verify submit buttons for recall answers have descriptive labels
- Verify TranscriptViewer highlighted passages are navigable by keyboard
- Verify the processing state has an accessible progress indicator (aria-busy or aria-live)
