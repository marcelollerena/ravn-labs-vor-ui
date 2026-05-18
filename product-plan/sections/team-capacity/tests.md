# Team Capacity — Test Specifications

## Sample Test Data

```typescript
const summary: TeamCapacitySummary = {
  totalRecruiters: 4,
  totalSeniorDevs: 3,
  availableRecruiters: 2,
  availableSeniorDevs: 1
}

const emptySummary: TeamCapacitySummary = {
  totalRecruiters: 0,
  totalSeniorDevs: 0,
  availableRecruiters: 0,
  availableSeniorDevs: 0
}

const members: TeamMember[] = [
  {
    id: 'u-1',
    name: 'Maria Lopez',
    email: 'maria.lopez@vor.io',
    role: 'recruiter',
    availabilityStatus: 'available',
    activeRequisitions: 2,
    activeCandidates: 5,
    requisitions: [
      { id: 'req-1', title: 'Senior Frontend Engineer', department: 'Engineering', candidateCount: 3 },
      { id: 'req-2', title: 'Product Designer', department: 'Design', candidateCount: 2 }
    ],
    lastAssignedAt: '2026-05-10T14:00:00Z'
  },
  {
    id: 'u-2',
    name: 'Alex Kim',
    email: 'alex.kim@vor.io',
    role: 'senior_dev',
    availabilityStatus: 'busy',
    activeRequisitions: 4,
    activeCandidates: 12,
    requisitions: [
      { id: 'req-1', title: 'Senior Frontend Engineer', department: 'Engineering', candidateCount: 3 },
      { id: 'req-3', title: 'Backend Engineer', department: 'Engineering', candidateCount: 5 },
      { id: 'req-5', title: 'DevOps Lead', department: 'Engineering', candidateCount: 2 },
      { id: 'req-6', title: 'Mobile Developer', department: 'Engineering', candidateCount: 2 }
    ],
    lastAssignedAt: '2026-05-14T09:00:00Z'
  },
  {
    id: 'u-3',
    name: 'Jordan Lee',
    email: 'jordan.lee@vor.io',
    role: 'senior_dev',
    availabilityStatus: 'overloaded',
    activeRequisitions: 6,
    activeCandidates: 18,
    requisitions: [
      { id: 'req-7', title: 'Staff Engineer', department: 'Engineering', candidateCount: 4 },
      { id: 'req-8', title: 'Platform Engineer', department: 'Engineering', candidateCount: 3 },
      { id: 'req-9', title: 'Security Engineer', department: 'Engineering', candidateCount: 3 },
      { id: 'req-10', title: 'Data Engineer', department: 'Data', candidateCount: 3 },
      { id: 'req-11', title: 'ML Engineer', department: 'Data', candidateCount: 3 },
      { id: 'req-12', title: 'SRE', department: 'Engineering', candidateCount: 2 }
    ],
    lastAssignedAt: '2026-05-15T08:00:00Z'
  },
  {
    id: 'u-4',
    name: 'Priya Sharma',
    email: 'priya.sharma@vor.io',
    role: 'recruiter',
    availabilityStatus: 'available',
    activeRequisitions: 1,
    activeCandidates: 3,
    requisitions: [
      { id: 'req-4', title: 'Marketing Coordinator', department: 'Marketing', candidateCount: 3 }
    ],
    lastAssignedAt: '2026-05-08T11:00:00Z'
  }
]
```

---

## User Flow Tests

### View team directory with data
- Render TeamCapacity with populated `summary` and `members`
- Verify summary bar shows: "4 Recruiters (2 available)" and "3 Senior Devs (1 available)"
- Verify 4 member entries are rendered
- Verify "Maria Lopez" shows role "Recruiter", status "Available" (green badge), "2 active requisitions", "5 active candidates"
- Verify "Alex Kim" shows role "Senior Dev", status "Busy" (amber badge), "4 active requisitions", "12 active candidates"
- Verify "Jordan Lee" shows status "Overloaded" (red badge), "6 active requisitions", "18 active candidates"

### Search members
- Type "Maria" into the search input
- Verify `onSearch` is called with `'Maria'`

### Filter by role
- Select "Recruiter" from the role filter
- Verify `onFilterChange` is called with `{ role: 'recruiter', availability: null }`

### Filter by availability
- Select "Available" from the availability filter
- Verify `onFilterChange` is called with `{ role: null, availability: 'available' }`

### Expand member to see assignments
- Click on "Alex Kim" row
- Verify `onMemberClick` is called with `'u-2'`
- When detail is shown, verify 4 requisitions are listed: "Senior Frontend Engineer (3 candidates)", "Backend Engineer (5 candidates)", "DevOps Lead (2 candidates)", "Mobile Developer (2 candidates)"

### Assign member to requisition
- Trigger the assign action for member "Maria Lopez" to requisition "req-5"
- Verify `onAssignToRequisition` is called with `('u-1', 'req-5')`

---

## Empty State Tests

### No team members registered
- Render with `emptySummary` and `members: []`
- Verify summary shows "0 Recruiters (0 available)" and "0 Senior Devs (0 available)"
- Verify an empty state message is displayed (e.g., "No interviewers registered yet")

### No members matching search
- Render with populated members, then pass empty `members` to simulate no search results
- Verify empty state text indicates no matches

### No members matching filter
- Filter by availability "available" when no members are available
- Verify empty state text for no matching members

---

## Component Interaction Tests

### Availability status badges
- Render member with `availabilityStatus: 'available'` — verify green "Available" badge
- Render member with `availabilityStatus: 'busy'` — verify amber "Busy" badge
- Render member with `availabilityStatus: 'overloaded'` — verify red "Overloaded" badge

### Role display
- Render member with `role: 'recruiter'` — verify "Recruiter" label
- Render member with `role: 'senior_dev'` — verify "Senior Dev" or "Senior Developer" label

### Summary bar counts
- Verify totalRecruiters and availableRecruiters are correctly displayed
- Verify totalSeniorDevs and availableSeniorDevs are correctly displayed

### Member detail panel requisition list
- Expand a member with 6 requisitions
- Verify all 6 are listed with titles, departments, and candidate counts

### Last assigned date
- Render member with `lastAssignedAt: '2026-05-15T08:00:00Z'` — verify a relative or formatted date is shown
- Render member with `lastAssignedAt: null` — verify "No assignments yet" or similar

---

## Edge Cases

### Member with zero active requisitions
- Render a member with `activeRequisitions: 0`, `activeCandidates: 0`, `requisitions: []`
- Verify counts show "0" and detail panel shows no requisitions

### Many team members (30+)
- Render with 30 member objects
- Verify the list scrolls and performance is acceptable

### Very long member name
- Render member with `name: 'Alexandra Konstantinidou-Papadopoulos'`
- Verify the name does not overflow the row layout

### All members overloaded
- Render with all members having `availabilityStatus: 'overloaded'`
- Verify summary shows 0 available for both roles
- Verify all badges show red "Overloaded"

### Assign to requisition when overloaded
- Trigger assign action for an overloaded member
- Verify the callback still fires (assignment is allowed, not blocked by UI)

---

## Accessibility

- Verify search input has a label or accessible placeholder ("Search team members...")
- Verify filter controls have accessible labels
- Verify availability badges convey meaning beyond color (text label present)
- Verify member rows are keyboard-navigable and expandable with Enter/Space
- Verify the expanded detail panel is reachable by keyboard
- Verify the assign action button has a descriptive accessible label
- Verify summary bar statistics are labeled for screen readers
- Verify role labels are readable and not abbreviated without context
