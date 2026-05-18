# Candidate Workspace — Test Specifications

## Sample Test Data

```typescript
const candidate: Candidate = {
  id: 'cand-101',
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  phone: '+1-555-0142',
  location: 'San Francisco, CA',
  currentStage: 'hr-interview',
  appliedDate: '2026-04-22',
  evaluationProgress: {
    profileComplete: true,
    interviewPrepReady: true,
    interviews: { hrCompleted: true, technicalCompleted: false },
    scorecardGenerated: false
  }
}

const jobRequisition: JobRequisition = {
  id: 'req-1',
  title: 'Senior Frontend Engineer',
  department: 'Engineering',
  hiringManager: 'David Wilson',
  status: 'open',
  assignedTeam: {
    recruiter: { id: 'u-1', name: 'Maria Lopez' },
    seniorDev: { id: 'u-2', name: 'Alex Kim' }
  }
}

const atsRecord: ATSRecord = {
  source: 'Greenhouse',
  status: 'ingested',
  ingestedAt: '2026-04-22T10:00:00Z',
  fields: {
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '+1-555-0142',
    location: 'San Francisco, CA',
    currentTitle: 'Frontend Developer',
    currentCompany: 'TechCorp',
    stage: 'HR Interview',
    source: 'LinkedIn Job Posting',
    appliedDate: '2026-04-22',
    tags: ['react', 'typescript', 'senior']
  }
}

const resumeDocument: ResumeDocument = {
  id: 'res-1',
  fileName: 'sarah_chen_resume.pdf',
  uploadedAt: '2026-04-23T14:00:00Z',
  status: 'ingested',
  parsedData: {
    currentTitle: 'Senior Frontend Engineer',
    currentCompany: 'TechCorp',
    yearsExperience: 7,
    workHistory: [
      { title: 'Senior Frontend Engineer', company: 'TechCorp', startDate: '2023-01', endDate: null, duration: '3 years', highlights: ['Led React migration'] },
      { title: 'Frontend Developer', company: 'StartupXYZ', startDate: '2019-06', endDate: '2022-12', duration: '3.5 years' }
    ],
    education: [{ degree: 'B.S. Computer Science', institution: 'UC Berkeley', graduationYear: 2019 }],
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    certifications: ['AWS Certified Developer']
  }
}

const linkedInProfile: LinkedInProfile = {
  id: 'li-1',
  profileUrl: 'https://linkedin.com/in/sarahchen',
  status: 'ingested',
  ingestedAt: '2026-04-24T09:00:00Z',
  parsedData: {
    headline: 'Frontend Engineer at TechCorp',
    location: 'San Francisco Bay Area',
    connectionCount: 500,
    currentTitle: 'Frontend Engineer',
    currentCompany: 'TechCorp',
    workHistory: [
      { title: 'Frontend Engineer', company: 'TechCorp', startDate: '2023-01', endDate: null, duration: '3 years' },
      { title: 'Junior Developer', company: 'StartupXYZ', startDate: '2020-01', endDate: '2022-12', duration: '3 years' }
    ],
    education: [{ degree: 'B.S. Computer Science', institution: 'UC Berkeley', graduationYear: 2019 }],
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js'],
    endorsements: { React: 45, JavaScript: 38, CSS: 22 }
  }
}

const candidateProfile: CandidateProfile = {
  id: 'cp-1',
  generatedAt: '2026-04-24T10:00:00Z',
  status: 'complete',
  summary: 'Experienced frontend engineer with 7 years of experience, currently at TechCorp. Strong React and TypeScript skills with leadership indicators.',
  mergedFields: {
    name: 'Sarah Chen',
    currentTitle: 'Senior Frontend Engineer',
    currentCompany: 'TechCorp',
    location: 'San Francisco, CA',
    yearsExperience: 7,
    topSkills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    education: 'B.S. Computer Science, UC Berkeley (2019)'
  }
}

const discrepancies: Discrepancy[] = [
  {
    id: 'disc-1',
    field: 'Current Title',
    severity: 'medium',
    resumeValue: 'Senior Frontend Engineer',
    linkedInValue: 'Frontend Engineer',
    atsValue: 'Frontend Developer',
    summary: 'Title differs across all three sources. Resume shows "Senior" while LinkedIn and ATS do not.',
    suggestedQuestion: 'Can you clarify your current title and when you were promoted to a senior role?'
  },
  {
    id: 'disc-2',
    field: 'StartupXYZ Start Date',
    severity: 'low',
    resumeValue: '2019-06',
    linkedInValue: '2020-01',
    atsValue: '',
    summary: 'Resume indicates June 2019 start at StartupXYZ, LinkedIn shows January 2020.',
    suggestedQuestion: null
  }
]

const workspaceTabs: WorkspaceTab[] = [
  { id: 'profile', label: 'Profile', status: 'complete', isActive: true },
  { id: 'interview-prep', label: 'Interview Prep', status: 'complete', isActive: false },
  { id: 'hr-interview', label: 'HR Interview', status: 'complete', isActive: false },
  { id: 'technical-interview', label: 'Technical Interview', status: 'action-needed', isActive: false },
  { id: 'scorecard', label: 'Scorecard', status: 'not-started', isActive: false }
]
```

---

## User Flow Tests

### View unified profile (recruiter)
- Render CandidateWorkspace with `currentUserRole: 'recruiter'` and all sample data
- Verify CandidateHeader shows "Sarah Chen", email, stage badge "HR Interview", job title "Senior Frontend Engineer"
- Verify assigned team shows "Maria Lopez" (recruiter) and "Alex Kim" (senior dev)
- Verify EvaluationProgressBar shows profile and interview prep complete, HR interview complete, technical interview incomplete, scorecard not started
- Verify 5 workspace tabs are rendered with correct labels
- Verify Profile tab is active by default
- Verify MergedProfileSummary shows "Senior Frontend Engineer" at "TechCorp", 7 years experience
- Verify three DataSourceCards are displayed: ATS Record, Resume, LinkedIn

### View discrepancies
- Verify DiscrepancyPanel shows 2 discrepancies
- Verify first discrepancy shows field "Current Title" with severity "medium"
- Verify it displays all three values: resume "Senior Frontend Engineer", LinkedIn "Frontend Engineer", ATS "Frontend Developer"
- Verify the suggested question is visible for the first discrepancy
- Verify second discrepancy shows field "StartupXYZ Start Date" with severity "low"

### Upload resume (recruiter)
- Render with `currentUserRole: 'recruiter'`
- Verify "Upload Resume PDF" button is visible
- Simulate file selection with a PDF file
- Verify `onUploadResume` is called with the file object

### Add LinkedIn (recruiter)
- Render with `currentUserRole: 'recruiter'`
- Verify "Add LinkedIn" input/button is visible
- Enter URL "https://linkedin.com/in/newprofile"
- Submit the URL
- Verify `onAddLinkedIn` is called with `'https://linkedin.com/in/newprofile'`

### Upload controls hidden for non-recruiters
- Render with `currentUserRole: 'senior_dev'`
- Verify "Upload Resume PDF" button is NOT visible
- Verify "Add LinkedIn" input is NOT visible

### Switch tabs
- Click the "Interview Prep" tab
- Verify `onTabChange` is called with `'interview-prep'`

### Navigate back
- Click the back button or breadcrumb
- Verify `onBack` is called

---

## Empty State Tests

### Resume not yet uploaded
- Render with `resumeDocument.status: 'pending'` and empty parsed data
- Verify Resume DataSourceCard shows "pending" status
- Verify upload prompt is visible (for recruiter role)

### LinkedIn not yet ingested
- Render with `linkedInProfile.status: 'not-available'`
- Verify LinkedIn DataSourceCard shows "not available" status
- Verify "Add LinkedIn" prompt is visible (for recruiter role)

### Profile not yet generated
- Render with `candidateProfile.status: 'pending'`
- Verify MergedProfileSummary shows a loading/pending state
- Verify DiscrepancyPanel is not shown or shows a "waiting for profile" message

### No discrepancies found
- Render with `discrepancies: []`
- Verify DiscrepancyPanel shows a positive message (e.g., "No discrepancies detected")

---

## Component Interaction Tests

### WorkspaceTabs status badges
- Render tabs with `status: 'complete'` — verify checkmark badge
- Render tabs with `status: 'action-needed'` — verify dot/attention badge
- Render tabs with `status: 'not-started'` — verify no badge or neutral indicator

### DataSourceCard enrichment states
- Render with `status: 'ingested'` — verify green status with timestamp
- Render with `status: 'pending'` — verify yellow/neutral pending indicator
- Render with `status: 'error'` — verify red error indicator
- Render with `status: 'not-available'` — verify gray not-available state

### EvaluationProgressBar steps
- Render with all steps false — verify empty progress bar
- Render with `profileComplete: true` only — verify first step highlighted
- Render with full progress — verify all steps highlighted

### DiscrepancyPanel severity levels
- Render discrepancy with `severity: 'high'` — verify red/urgent visual treatment
- Render discrepancy with `severity: 'medium'` — verify amber visual treatment
- Render discrepancy with `severity: 'low'` — verify subtle visual treatment

---

## Edge Cases

### Candidate with all data sources in error state
- Render with all three sources having `status: 'error'`
- Verify each card shows error state
- Verify MergedProfileSummary shows appropriate error or unavailable state

### Very long candidate summary
- Render with a 500-character `candidateProfile.summary`
- Verify the summary renders fully without breaking layout

### Many discrepancies (10+)
- Render with 10 discrepancy objects
- Verify the panel scrolls and all discrepancies are accessible

### All tabs complete
- Render with all workspace tabs having `status: 'complete'`
- Verify all tabs show checkmark badges

---

## Accessibility

- Verify CandidateHeader fields have accessible labels
- Verify WorkspaceTabs use appropriate tab/tabpanel ARIA roles
- Verify the active tab has aria-selected="true"
- Verify DataSourceCards have descriptive headings
- Verify DiscrepancyPanel severity is communicated beyond color (text labels)
- Verify upload controls have accessible labels and accept appropriate file types
- Verify EvaluationProgressBar steps are labeled for screen readers
- Verify the back button has a descriptive accessible label
