# Job Requisitions — Test Specifications

## Sample Test Data

```typescript
const summaryStats: SummaryStats = {
  totalRequisitions: 15,
  openRequisitions: 8,
  totalCandidates: 47,
  urgentRoles: 2
}

const emptySummaryStats: SummaryStats = {
  totalRequisitions: 0,
  openRequisitions: 0,
  totalCandidates: 0,
  urgentRoles: 0
}

const departments: string[] = ['Engineering', 'Design', 'Product', 'Marketing']

const requisitions: JobRequisition[] = [
  {
    id: 'req-1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    status: 'Open',
    priority: 'Urgent',
    candidateCount: 12,
    postedDate: '2026-04-20',
    assignedTeam: {
      recruiter: { id: 'u-1', name: 'Maria Lopez' },
      seniorDev: { id: 'u-2', name: 'Alex Kim' }
    }
  },
  {
    id: 'req-2',
    title: 'Product Designer',
    department: 'Design',
    status: 'Open',
    priority: 'High',
    candidateCount: 8,
    postedDate: '2026-04-25',
    assignedTeam: {
      recruiter: { id: 'u-1', name: 'Maria Lopez' }
    }
  },
  {
    id: 'req-3',
    title: 'Marketing Coordinator',
    department: 'Marketing',
    status: 'On Hold',
    priority: 'Normal',
    candidateCount: 3,
    postedDate: '2026-03-15',
    assignedTeam: {
      seniorDev: { id: 'u-3', name: 'Jordan Lee' }
    }
  },
  {
    id: 'req-4',
    title: 'Backend Engineer',
    department: 'Engineering',
    status: 'Closed',
    priority: 'Normal',
    candidateCount: 20,
    postedDate: '2026-02-01',
    assignedTeam: {
      recruiter: { id: 'u-4', name: 'Priya Sharma' },
      seniorDev: { id: 'u-2', name: 'Alex Kim' }
    }
  }
]
```

---

## User Flow Tests

### View requisitions list with data
- Render JobRequisitions with populated `summaryStats`, `requisitions`, and `departments`
- Verify summary stat cards show: "15" total, "8" open, "47" candidates, "2" urgent
- Verify 4 requisition rows are rendered
- Verify "Senior Frontend Engineer" row shows: department "Engineering", status badge "Open" (green), priority "Urgent", candidate count "12", and posted date
- Verify "Marketing Coordinator" row shows status badge "On Hold" (amber)
- Verify "Backend Engineer" row shows status badge "Closed" (gray)

### Search requisitions
- Render with all requisitions
- Type "Frontend" into the search input
- Verify `onSearch` is called with `'Frontend'`

### Filter by status
- Click the status filter and select "Open"
- Verify `onFilterChange` is called with `{ status: 'Open', department: null, priority: null }`

### Filter by department
- Click the department filter and select "Engineering"
- Verify `onFilterChange` is called with `{ status: null, department: 'Engineering', priority: null }`

### Filter by priority
- Click the priority filter and select "Urgent"
- Verify `onFilterChange` is called with `{ status: null, department: null, priority: 'Urgent' }`

### Click requisition row
- Click the "Senior Frontend Engineer" row
- Verify `onRequisitionClick` is called with `'req-1'`

### Empty filter results
- Render with an empty `requisitions` array (simulating no matches)
- Verify an empty state message is displayed (e.g., "No requisitions match your filters")
- Verify summary stats still display at the top

---

## Empty State Tests

### No requisitions at all
- Render with `emptySummaryStats` and empty `requisitions`
- Verify all stat cards show "0"
- Verify an empty state message is shown in the list area

### Filters applied, no matches
- Render with populated data then pass empty `requisitions` to simulate server-filtered result
- Verify empty state text indicates no matches rather than no data

---

## Component Interaction Tests

### StatCard rendering
- Render StatCard with label "Open Requisitions" and value 8
- Verify label and count are visible

### RequisitionRow status badge colors
- Render row with `status: 'Open'` — verify green badge
- Render row with `status: 'On Hold'` — verify amber badge
- Render row with `status: 'Closed'` — verify gray badge
- Render row with `status: 'Draft'` — verify blue badge

### RequisitionRow priority indicator
- Render row with `priority: 'Urgent'` — verify urgent indicator is visible
- Render row with `priority: 'High'` — verify high indicator is visible
- Render row with `priority: 'Normal'` — verify no special indicator or a subtle one

### RequisitionRow team assignment display
- Render row with both recruiter and seniorDev assigned — verify both names appear
- Render row with only recruiter — verify recruiter name shown, seniorDev area shows empty or placeholder
- Render row with only seniorDev — verify seniorDev name shown

---

## Edge Cases

### Very long job title
- Render a row with `title: 'Senior Staff Principal Full-Stack Software Engineer — Platform Infrastructure'`
- Verify the title truncates or wraps without breaking layout

### Many requisitions (50+)
- Render with 50 requisition objects
- Verify list is scrollable and performance is acceptable

### Search with no input
- Render and verify all requisitions are visible
- Clear the search input and verify `onSearch` is called with `''`

### All requisitions closed
- Render with all requisitions having `status: 'Closed'`
- Verify `openRequisitions` stat shows "0"
- Verify all rows show gray "Closed" badges

---

## Accessibility

- Verify search input has a label or placeholder text ("Search requisitions...")
- Verify filter dropdowns have accessible labels
- Verify each RequisitionRow is keyboard-navigable and activatable with Enter
- Verify status badges have accessible text (not relying on color alone)
- Verify priority indicators convey meaning to screen readers
- Verify stat cards have accessible labels associating the count with the metric name
- Verify the table/list has appropriate semantic structure (table roles or list roles)
