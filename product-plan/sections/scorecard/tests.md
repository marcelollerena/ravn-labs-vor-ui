# Scorecard — Test Specifications

## Sample Test Data

```typescript
const scorecard: Scorecard = {
  id: 'sc-1',
  candidateId: 'cand-101',
  candidateName: 'Sarah Chen',
  jobRequisitionId: 'req-1',
  jobTitle: 'Senior Frontend Engineer',
  department: 'Engineering',
  generatedAt: '2026-05-14T18:00:00Z',
  lastEditedAt: null,
  editedByRecruiter: false,
  status: 'draft',
  summary: 'Sarah Chen demonstrates strong React and TypeScript expertise with 7 years of relevant experience. Her technical depth is evident in frontend work, though system design and leadership experience remain unclear. Both interviewers noted positive communication but flagged timeline inconsistencies.',
  hrSummary: 'Candidate presented well with clear, fluent English. Motivation for the role appears genuine, citing interest in the product domain and team growth opportunity. Some hesitation around employment timeline at StartupXYZ.',
  technicalSummary: 'Strong React fundamentals and migration experience. Struggled with system design questions and could not articulate a full architecture decision. Solid on implementation details but gaps in senior-level scope.',
  recommendation: 'maybe',
  confidenceLevel: 'medium',
  strengths: [
    { id: 's-1', text: 'React migration leadership with measurable impact', evidence: '"I led the migration of our legacy jQuery codebase to React, which reduced page load times by 40%"' },
    { id: 's-2', text: 'TypeScript proficiency across multiple projects', evidence: 'Demonstrated type-safe patterns in code discussion and mentioned TypeScript adoption at two previous companies' },
    { id: 's-3', text: 'Strong communication and English fluency', evidence: 'Recruiter rated English 5/5; technical interviewer noted clear explanations of complex concepts' }
  ],
  concerns: [
    { id: 'c-1', text: 'System design experience gap', evidence: '"I have not really done full system design from scratch"' },
    { id: 'c-2', text: 'Employment timeline inconsistency', evidence: '"I joined StartupXYZ right after graduation in 2019... well actually it was early 2020"' }
  ],
  evidenceQuotes: [
    { id: 'eq-1', timestamp: '12:34', speaker: 'Sarah Chen', quote: 'I led the migration of our legacy jQuery codebase to React, which reduced page load times by 40% and improved developer velocity by 3x.', context: 'Discussing leadership at TechCorp', interviewSource: 'hr' },
    { id: 'eq-2', timestamp: '28:15', speaker: 'Sarah Chen', quote: 'I have not really done full system design from scratch, but I have worked on parts of systems.', context: 'Technical design question', interviewSource: 'technical' }
  ],
  interviewerImpressions: [
    { id: 'ii-1', question: 'Were there any moments where the candidate seemed evasive?', answer: 'She hesitated noticeably when asked about the StartupXYZ dates. Otherwise very open.', sentiment: 'neutral', interviewSource: 'hr' },
    { id: 'ii-2', question: 'How would you rate the candidate\'s problem-solving approach?', answer: 'Good at tactical problem solving, but did not demonstrate strategic thinking about system boundaries.', sentiment: 'negative', interviewSource: 'technical' }
  ],
  atsPushEvents: [],
  atsConnectionName: 'Greenhouse'
}

const pushedScorecard: Scorecard = {
  ...scorecard,
  status: 'pushed',
  atsPushEvents: [
    { id: 'push-1', scorecardId: 'sc-1', pushedAt: '2026-05-15T10:00:00Z', atsProvider: 'Greenhouse', status: 'success', externalUrl: 'https://greenhouse.io/scorecards/12345' }
  ]
}

const failedPushScorecard: Scorecard = {
  ...scorecard,
  status: 'push_failed',
  atsPushEvents: [
    { id: 'push-2', scorecardId: 'sc-1', pushedAt: '2026-05-15T10:00:00Z', atsProvider: 'Greenhouse', status: 'failed', errorMessage: 'Authentication token expired' }
  ]
}

const generatingScorecard: Scorecard = {
  ...scorecard,
  status: 'generating',
  summary: '',
  hrSummary: '',
  technicalSummary: '',
  recommendation: null,
  confidenceLevel: null,
  strengths: [],
  concerns: [],
  evidenceQuotes: [],
  interviewerImpressions: []
}
```

---

## User Flow Tests

### View completed scorecard
- Render ScorecardView with `scorecard` (draft status)
- Verify the summary section displays the full summary text
- Verify RecommendationBadge shows "Maybe" with "Medium" confidence
- Verify 3 strengths are listed with evidence quotes
- Verify 2 concerns are listed with evidence quotes
- Verify HR Interview Summary section shows the hrSummary text
- Verify Technical Interview Summary section shows the technicalSummary text
- Verify evidence quotes show speaker, timestamp, quote, and interview source badge (HR/Technical)
- Verify interviewer impressions show questions, answers, sentiment, and source attribution
- Verify StatusBanner shows "Not pushed"

### Edit section inline
- Click the edit icon on the summary section
- Verify the section enters edit mode with a text area pre-filled with the summary
- Modify the text
- Save the edit
- Verify `onEditSection` is called with `('sc-1', 'summary', <new text>)`

### Push to ATS with confirmation
- Click "Push to ATS" button
- Verify ConfirmDialog appears with text explaining what will be sent to Greenhouse
- Confirm the dialog
- Verify `onPushToATS` is called with `'sc-1'`

### Retry failed push
- Render with `failedPushScorecard`
- Verify StatusBanner shows "Push failed" with error message "Authentication token expired"
- Verify a "Retry" button is visible
- Click "Retry"
- Verify `onRetryPush` is called with `'sc-1'`

### Regenerate scorecard with warning
- Click "Regenerate Scorecard" button
- Verify ConfirmDialog appears with a warning that edits will be lost
- Confirm the dialog
- Verify `onRegenerate` is called with `'sc-1'`

### Download markdown
- Click "Download .md" button
- Verify `onDownload` is called with `'sc-1'`

---

## Empty State Tests

### Scorecard generating
- Render with `generatingScorecard` (status 'generating')
- Verify a loading/generating state is displayed
- Verify the scorecard content sections are hidden or show placeholders
- Verify action buttons (Push, Download) are disabled

### Scorecard with no strengths
- Render with `strengths: []`
- Verify the strengths section shows "No strengths identified" or is empty

### Scorecard with no concerns
- Render with `concerns: []`
- Verify the concerns section shows "No concerns identified" or is empty

---

## Component Interaction Tests

### StatusBanner variants
- Render with `status: 'draft'` — verify shows "Not pushed" with neutral styling
- Render with `status: 'pushed'` — verify shows "Pushed to Greenhouse on [date]" with success styling and link
- Render with `status: 'push_failed'` — verify shows "Push failed" with error styling and retry option
- Render with `status: 'generating'` — verify shows "Generating..." with loading indicator

### RecommendationBadge variants
- Render with `recommendation: 'hire'` — verify green "Hire" badge
- Render with `recommendation: 'no_hire'` — verify red "No Hire" badge
- Render with `recommendation: 'maybe'` — verify amber "Maybe" badge
- Render with `recommendation: null` — verify no badge or "Pending" state

### RecommendationBadge confidence levels
- Render with `confidenceLevel: 'high'` — verify "High Confidence" label
- Render with `confidenceLevel: 'medium'` — verify "Medium Confidence" label
- Render with `confidenceLevel: 'low'` — verify "Low Confidence" label

### ConfirmDialog for Push to ATS
- Open dialog — verify it shows scorecard destination (Greenhouse) and candidate name
- Click cancel — verify dialog closes and no callback fires
- Click confirm — verify `onPushToATS` is called

### ConfirmDialog for Regenerate
- Open dialog — verify destructive warning text about losing edits
- Click cancel — verify dialog closes
- Click confirm — verify `onRegenerate` is called

### Evidence quotes interview source badges
- Render quote with `interviewSource: 'hr'` — verify "HR" source badge
- Render quote with `interviewSource: 'technical'` — verify "Technical" source badge
- Render quote with `interviewSource: 'combined'` — verify "Combined" source badge

### Interviewer impression sentiments
- Render with `sentiment: 'positive'` — verify positive visual treatment
- Render with `sentiment: 'neutral'` — verify neutral visual treatment
- Render with `sentiment: 'negative'` — verify negative visual treatment

---

## Edge Cases

### Very long summary text
- Render with a 2000-character summary
- Verify the text renders fully without layout issues

### Scorecard already pushed, then edited
- Render with `pushedScorecard` but `lastEditedAt` set after push date
- Verify the status banner reflects that edits have been made since push

### Multiple push events (retry history)
- Render with 3 atsPushEvents (2 failed, 1 success)
- Verify the latest push status is displayed

### Edit mode cancellation
- Enter edit mode on a section
- Click cancel without saving
- Verify the original text is restored
- Verify no callback fires

### All sections edited
- Render with `editedByRecruiter: true` and `lastEditedAt` set
- Verify an indicator shows the scorecard has been manually edited

---

## Accessibility

- Verify all scorecard sections have proper heading hierarchy (h2/h3)
- Verify edit buttons have accessible labels ("Edit summary", "Edit strengths", etc.)
- Verify RecommendationBadge conveys meaning beyond color (text label)
- Verify StatusBanner conveys status to screen readers
- Verify ConfirmDialog traps focus and is dismissible with Escape
- Verify evidence quotes use proper blockquote semantics
- Verify action buttons (Push, Download, Regenerate) have descriptive labels
- Verify sentiment indicators on impressions have accessible text
- Verify interview source badges have accessible labels
