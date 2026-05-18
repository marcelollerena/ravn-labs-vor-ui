# Interview Prep — Test Specifications

## Sample Test Data

```typescript
const candidate: CandidateContext = {
  id: 'cand-101',
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  currentStage: 'hr-interview',
  currentTitle: 'Senior Frontend Engineer',
  currentCompany: 'TechCorp'
}

const jobRequisition: JobRequisitionContext = {
  id: 'req-1',
  title: 'Senior Frontend Engineer',
  department: 'Engineering',
  hiringManager: 'David Wilson'
}

const readyBriefing: Briefing = {
  id: 'brief-1',
  interviewType: 'hr_screening',
  status: 'ready',
  generatedAt: '2026-05-14T16:00:00Z',
  matchQuality: 'moderate',
  matchSummary: 'Candidate has strong React experience but gaps in system design and team leadership. Title discrepancy across sources warrants clarification.'
}

const pendingBriefing: Briefing = {
  id: 'brief-2',
  interviewType: 'hr_screening',
  status: 'pending',
  generatedAt: '',
  matchQuality: 'gaps-detected',
  matchSummary: ''
}

const outdatedBriefing: Briefing = {
  ...readyBriefing,
  status: 'outdated'
}

const strengths: Strength[] = [
  { id: 'str-1', title: 'React Expertise', detail: '7 years of React experience including migration leadership', requirementMatch: 'Requires 5+ years React' },
  { id: 'str-2', title: 'TypeScript Proficiency', detail: 'Active TypeScript usage in current and previous roles', requirementMatch: 'Requires TypeScript experience' },
  { id: 'str-3', title: 'AWS Certification', detail: 'Holds AWS Certified Developer credential', requirementMatch: 'Cloud experience preferred' }
]

const gaps: Gap[] = [
  { id: 'gap-1', title: 'System Design Experience', detail: 'No evidence of architecture-level work in resume or LinkedIn', severity: 'high', sourceNote: 'Resume mentions individual contributor work only' },
  { id: 'gap-2', title: 'Team Leadership', detail: 'No direct reports or mentoring experience documented', severity: 'medium', sourceNote: 'LinkedIn shows no management titles' }
]

const riskAreas: RiskArea[] = [
  {
    id: 'risk-1',
    title: 'Title Discrepancy',
    detail: 'Current title varies across all three data sources',
    severity: 'medium',
    sources: ['resume', 'linkedin', 'ats'],
    resumeValue: 'Senior Frontend Engineer',
    linkedInValue: 'Frontend Engineer',
    atsValue: 'Frontend Developer'
  }
]

const interviewQuestions: InterviewQuestion[] = [
  { id: 'q-1', category: 'HR Screening', question: 'Can you walk me through your current role and responsibilities at TechCorp?', context: 'Clarify actual seniority level given title discrepancy', linkedGapId: null },
  { id: 'q-2', category: 'HR Screening', question: 'What motivated you to apply for this position?', context: 'Assess career trajectory and motivation', linkedGapId: null },
  { id: 'q-3', category: 'Technical Depth', question: 'Describe a system you designed from scratch. What were the key architecture decisions?', context: 'Probe system design gap', linkedGapId: 'gap-1' },
  { id: 'q-4', category: 'Leadership', question: 'Have you mentored junior developers? How did you structure the mentoring?', context: 'Probe team leadership gap', linkedGapId: 'gap-2' },
  { id: 'q-5', category: 'Experience Gap', question: 'Your resume lists a start date at StartupXYZ of June 2019, but LinkedIn shows January 2020. Can you clarify?', context: 'Address date discrepancy', linkedGapId: null }
]
```

---

## User Flow Tests

### View ready briefing
- Render InterviewPrep with `readyBriefing`, populated strengths, gaps, riskAreas, and questions
- Verify BriefingStatusBanner shows "Ready" with a green indicator
- Verify MatchHeader shows match quality "Moderate" and the match summary text
- Verify candidate context shows "Sarah Chen" and job "Senior Frontend Engineer"
- Verify StrengthsList renders 3 strengths with titles and requirement matches
- Verify GapsPanel renders 2 gaps with severity indicators
- Verify risk areas section shows 1 risk with cross-source values
- Verify QuestionsList renders 5 questions split into HR Screening and Technical groups

### View pending state (no profile yet)
- Render InterviewPrep with `pendingBriefing`, empty strengths, gaps, riskAreas, and questions
- Verify BriefingStatusBanner shows "Pending" with an amber indicator
- Verify a message explains the briefing is waiting for profile data
- Verify strengths, gaps, and questions sections are hidden or show empty states
- Verify "Regenerate Briefing" and "Mark as Reviewed" buttons are disabled

### Copy individual question
- Render with populated questions
- Click the copy button on the first question ("Can you walk me through your current role...")
- Verify `onCopyQuestion` is called with `'q-1'`

### Copy full briefing
- Click "Copy Full Briefing" button
- Verify `onCopyBriefing` is called

### Regenerate briefing
- Click "Regenerate Briefing" button
- Verify a confirmation dialog or prompt appears
- Confirm the action
- Verify `onRegenerateBriefing` is called

### Mark as reviewed
- Click "Mark as Reviewed" button
- Verify `onMarkReviewed` is called

---

## Empty State Tests

### Briefing pending — no data
- Render with `pendingBriefing`
- Verify the main content area shows an informational empty state
- Verify text communicates that the candidate profile needs to be completed first

### No gaps detected
- Render with `gaps: []`
- Verify GapsPanel shows a positive message (e.g., "No qualification gaps detected")

### No risk areas
- Render with `riskAreas: []`
- Verify risk areas section is hidden or shows "No discrepancies to probe"

### No questions generated
- Render with `interviewQuestions: []`
- Verify QuestionsList shows empty state

---

## Component Interaction Tests

### BriefingStatusBanner variants
- Render with `status: 'ready'` — verify green "Ready" banner
- Render with `status: 'pending'` — verify amber "Pending" banner
- Render with `status: 'outdated'` — verify blue "Outdated" banner with regenerate prompt

### MatchHeader quality badges
- Render with `matchQuality: 'strong'` — verify positive visual treatment (green badge)
- Render with `matchQuality: 'moderate'` — verify neutral visual treatment (amber badge)
- Render with `matchQuality: 'gaps-detected'` — verify cautionary visual treatment (red/orange badge)

### GapsPanel severity indicators
- Render gap with `severity: 'high'` — verify high-severity visual (red indicator)
- Render gap with `severity: 'medium'` — verify medium-severity visual (amber indicator)
- Render gap with `severity: 'low'` — verify low-severity visual (gray indicator)

### QuestionCard category badges
- Render question with `category: 'HR Screening'` — verify HR-labeled badge
- Render question with `category: 'Technical Depth'` — verify Technical-labeled badge
- Render question with `category: 'Leadership'` — verify Leadership-labeled badge

### QuestionCard with linked gap
- Render question with `linkedGapId: 'gap-1'` — verify a visual link or reference to the gap is shown
- Render question with `linkedGapId: null` — verify no gap reference

---

## Edge Cases

### Very long question text
- Render a QuestionCard with a 300-character question
- Verify the text wraps correctly without overflow

### Many questions (20+)
- Render with 20 interview questions
- Verify the list is scrollable and maintains grouping by type

### Briefing with outdated status
- Render with `outdatedBriefing`
- Verify the banner communicates the profile has been updated since generation
- Verify "Regenerate Briefing" button is prominently highlighted

### All severity high
- Render with all gaps having `severity: 'high'`
- Verify all gaps display high-severity treatment

---

## Accessibility

- Verify BriefingStatusBanner conveys status beyond color (text label)
- Verify MatchHeader badge has accessible text
- Verify GapsPanel severity levels have text labels, not just color
- Verify copy buttons have accessible labels ("Copy question", "Copy full briefing")
- Verify questions are keyboard-navigable
- Verify "Regenerate Briefing" confirmation is keyboard-accessible
- Verify "Mark as Reviewed" button has a descriptive label
- Verify RiskArea cross-source values are structured for screen readers (labeled per source)
