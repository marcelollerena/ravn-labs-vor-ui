# Candidate Pipeline — Test Specifications

## Sample Test Data

```typescript
const jobRequisition: JobRequisition = {
  id: 'req-1',
  title: 'Senior Frontend Engineer',
  department: 'Engineering',
  hiringManager: 'David Wilson',
  status: 'open',
  createdAt: '2026-04-20T00:00:00Z',
  location: 'Remote — US',
  assignedTeam: {
    recruiter: { id: 'u-1', name: 'Maria Lopez' },
    seniorDev: { id: 'u-2', name: 'Alex Kim' }
  }
}

const pipelineStages: PipelineStage[] = [
  { id: 'applied', label: 'Applied', candidateCount: 5 },
  { id: 'screening', label: 'Screening', candidateCount: 3 },
  { id: 'hr-interview', label: 'HR Interview', candidateCount: 2 },
  { id: 'technical-interview', label: 'Technical Interview', candidateCount: 1 },
  { id: 'offer', label: 'Offer', candidateCount: 1 },
  { id: 'hired', label: 'Hired', candidateCount: 0 },
  { id: 'rejected', label: 'Rejected', candidateCount: 0 }
]

const candidates: PipelineCandidate[] = [
  {
    id: 'cand-101',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    currentStage: 'hr-interview',
    appliedDate: '2026-04-22',
    enrichment: { resume: 'ingested', linkedIn: 'ingested' },
    evaluationProgress: {
      dataImported: true,
      profileBuilt: true,
      interviewPrepped: true,
      interviews: {
        hrTranscriptUploaded: true,
        hrTranscriptAnalyzed: true,
        technicalTranscriptUploaded: false,
        technicalTranscriptAnalyzed: false
      },
      scorecardGenerated: false
    }
  },
  {
    id: 'cand-102',
    name: 'James Park',
    email: 'james.park@example.com',
    currentStage: 'applied',
    appliedDate: '2026-05-01',
    enrichment: { resume: 'pending', linkedIn: 'not-available' },
    evaluationProgress: {
      dataImported: true,
      profileBuilt: false,
      interviewPrepped: false,
      interviews: {
        hrTranscriptUploaded: false,
        hrTranscriptAnalyzed: false,
        technicalTranscriptUploaded: false,
        technicalTranscriptAnalyzed: false
      },
      scorecardGenerated: false
    }
  },
  {
    id: 'cand-103',
    name: 'Amira Hassan',
    email: 'amira.h@example.com',
    currentStage: 'offer',
    appliedDate: '2026-04-15',
    enrichment: { resume: 'ingested', linkedIn: 'ingested' },
    evaluationProgress: {
      dataImported: true,
      profileBuilt: true,
      interviewPrepped: true,
      interviews: {
        hrTranscriptUploaded: true,
        hrTranscriptAnalyzed: true,
        technicalTranscriptUploaded: true,
        technicalTranscriptAnalyzed: true
      },
      scorecardGenerated: true
    }
  }
]
```

---

## User Flow Tests

### View pipeline with candidates
- Render CandidatePipeline with populated `jobRequisition`, `pipelineStages`, and `candidates`
- Verify the header shows "Senior Frontend Engineer", department "Engineering", and location "Remote — US"
- Verify stage pills are rendered with counts: "Applied (5)", "Screening (3)", "HR Interview (2)", etc.
- Verify 3 candidate rows are displayed
- Verify "Sarah Chen" row shows stage "HR Interview", resume check icon, LinkedIn check icon
- Verify "James Park" row shows stage "Applied", resume pending icon, LinkedIn not-available icon

### Filter by stage
- Click the "HR Interview" stage pill
- Verify `onFilterByStage` is called with `'hr-interview'`

### Clear stage filter
- Click the currently active stage pill again (or an "All" option)
- Verify `onFilterByStage` is called with `null`

### Search candidates
- Type "Sarah" into the search input
- Verify `onSearch` is called with `'Sarah'`

### Click candidate to open workspace
- Click the "Sarah Chen" row
- Verify `onSelectCandidate` is called with `'cand-101'`

### Navigate back to requisitions
- Click the back button or "Job Requisitions" breadcrumb
- Verify `onBack` is called

---

## Empty State Tests

### No candidates in requisition
- Render with `candidates: []` and all `pipelineStages` with `candidateCount: 0`
- Verify an empty state message is displayed (e.g., "No candidates yet for this requisition")
- Verify the requisition header still shows correctly

### No candidates matching search
- Render with candidates, then pass empty `candidates` to simulate no search matches
- Verify empty state text indicates no matches

### No candidates in selected stage
- Filter by a stage that has zero candidates
- Verify empty state shows for that specific stage

---

## Component Interaction Tests

### CandidateRow enrichment status icons
- Render CandidateRow with `enrichment: { resume: 'ingested', linkedIn: 'ingested' }` — verify two check icons
- Render CandidateRow with `enrichment: { resume: 'pending', linkedIn: 'not-available' }` — verify pending icon and not-available icon
- Render CandidateRow with `enrichment: { resume: 'error', linkedIn: 'ingested' }` — verify error icon for resume, check for LinkedIn

### CandidateRow evaluation progress
- Render with all evaluation steps complete (`scorecardGenerated: true`) — verify full progress indicator
- Render with only `dataImported: true` — verify minimal progress
- Render with HR interview done but technical pending — verify partial progress showing the two-meeting split

### CandidateRow interview progress display
- Render with `hrTranscriptUploaded: true, technicalTranscriptUploaded: false` — verify "HR done, Technical pending" visual state
- Render with both transcripts analyzed — verify "Both complete" visual state
- Render with neither uploaded — verify "Both pending" visual state

---

## Edge Cases

### Many candidates (100+)
- Render with 100 candidate objects
- Verify the list scrolls and performance is acceptable

### Candidate with very long email
- Render with `email: 'alexandra.konstantinidou-papadopoulos@extremely-long-company-name.example.com'`
- Verify the email truncates or wraps without breaking layout

### All candidates in one stage
- Render with 12 candidates all in `'applied'` stage
- Verify stage pills show "12" for Applied and "0" for all others
- Verify filtering to Applied shows all 12

### Requisition with on-hold status
- Render with `jobRequisition.status: 'on-hold'`
- Verify the header reflects the on-hold status visually

---

## Accessibility

- Verify stage pills are keyboard-navigable and activatable with Enter/Space
- Verify the active stage pill has an aria-selected or aria-current attribute
- Verify candidate rows are keyboard-navigable and activatable with Enter
- Verify enrichment icons have accessible labels (e.g., "Resume: ingested", "LinkedIn: not available")
- Verify the search input has a label or accessible placeholder
- Verify the back/breadcrumb link is focusable and has descriptive text
- Verify evaluation progress indicators convey meaning to screen readers
