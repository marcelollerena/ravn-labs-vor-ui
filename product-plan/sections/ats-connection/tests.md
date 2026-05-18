# ATS Connection — Test Specifications

## Sample Test Data

```typescript
const providers: ATSProvider[] = [
  { id: 'greenhouse', name: 'Greenhouse', icon: 'greenhouse-icon', description: 'Connect to Greenhouse ATS' },
  { id: 'lever', name: 'Lever', icon: 'lever-icon', description: 'Connect to Lever ATS' },
  { id: 'ashby', name: 'Ashby', icon: 'ashby-icon', description: 'Connect to Ashby ATS' },
  { id: 'other', name: 'Other', icon: 'custom-icon', description: 'Connect a custom ATS provider' }
]

const activeConnection: ATSConnection = {
  id: 'conn-1',
  providerId: 'greenhouse',
  providerName: 'Greenhouse',
  status: 'connected',
  apiKeyMasked: '••••••••sk-4f2a',
  connectedAt: '2026-05-10T14:00:00Z',
  lastSyncedAt: '2026-05-15T09:30:00Z'
}

const errorConnection: ATSConnection = {
  id: 'conn-2',
  providerId: 'lever',
  providerName: 'Lever',
  status: 'error',
  apiKeyMasked: '••••••••lv-9x1b',
  connectedAt: '2026-05-08T10:00:00Z',
  lastSyncedAt: '2026-05-14T18:00:00Z'
}

const syncJobs: SyncJob[] = [
  {
    id: 'sync-1',
    connectionId: 'conn-1',
    status: 'completed',
    startedAt: '2026-05-15T09:30:00Z',
    completedAt: '2026-05-15T09:32:00Z',
    jobRequisitionsImported: 12,
    candidatesImported: 47
  }
]

const importProgressData: ImportProgress = {
  phase: 'candidates',
  phaseLabel: 'Importing candidates...',
  percent: 65,
  jobRequisitionsImported: 12,
  candidatesImported: 31,
  candidatesTotal: 47
}
```

---

## User Flow Tests

### Select provider and connect (success path)
- Render ATSConnection with `connection: null`, populated `providers`, no `importProgress`
- Verify 4 provider cards are displayed: "Greenhouse", "Lever", "Ashby", "Other"
- Click the "Greenhouse" card — verify it becomes selected (visual highlight)
- Verify an API key input field appears
- Enter API key "sk-test-key-123" into the input
- Verify the "Connect & Import" button is enabled
- Click "Connect & Import"
- Verify `onConnect` is called with `('greenhouse', 'sk-test-key-123')`

### Select "Other" provider with custom details
- Click the "Other" card
- Verify additional fields appear: "Provider Name" and "API Base URL"
- Enter provider name "BambooHR" and base URL "https://api.bamboohr.com"
- Enter API key "bhr-key-456"
- Click "Connect & Import"
- Verify `onConnect` is called with `('other', 'bhr-key-456', { name: 'BambooHR', baseUrl: 'https://api.bamboohr.com' })`

### Import progress display
- Render with `importProgress` set to `importProgressData`
- Verify the progress bar shows approximately 65%
- Verify the phase label reads "Importing candidates..."
- Verify counts display "12 job requisitions" and "31 of 47 candidates"

### Connected state on return visit
- Render with `connection: activeConnection`, no `importProgress`
- Verify the ConnectedState shows "Greenhouse" as provider name
- Verify a "connected" status badge is visible (green)
- Verify "Last synced" timestamp is displayed
- Verify a "Re-sync" button is visible
- Verify a "Disconnect" option is visible

### Re-sync from connected state
- Render with `connection: activeConnection`
- Click the "Re-sync" button
- Verify `onSync` is called

### Disconnect from connected state
- Render with `connection: activeConnection`
- Click the "Disconnect" button
- Verify `onDisconnect` is called

---

## Empty State Tests

### No connection, initial view
- Render with `connection: null`, `importProgress: null`, `syncJobs: []`
- Verify provider cards are displayed for selection
- Verify no API key input is shown before a provider is selected
- Verify "Connect & Import" button is not visible or disabled

---

## Component Interaction Tests

### ProviderCard selection states
- Render all 4 ProviderCards
- Verify only one card can be selected at a time
- Click "Lever" then click "Ashby" — verify "Ashby" is selected and "Lever" is deselected

### API key show/hide toggle
- Select a provider and verify the API key input appears with masked text (type="password")
- Click the show/hide toggle — verify input changes to visible text (type="text")
- Click again — verify input returns to masked

### ConnectedState status badge variants
- Render ConnectedState with `status: 'connected'` — verify green badge text "Connected"
- Render ConnectedState with `status: 'error'` — verify red badge text "Error" or similar

### ImportProgress phases
- Render ImportProgress with `phase: 'job_requisitions'` — verify label shows "Importing job requisitions..."
- Render ImportProgress with `phase: 'candidates'` — verify label shows "Importing candidates..."

---

## Edge Cases

### Connect button disabled without API key
- Select a provider but leave the API key input empty
- Verify the "Connect & Import" button is disabled

### Connection with error status
- Render with `connection: errorConnection`
- Verify the status badge shows an error state
- Verify "Re-sync" is still available for retry

### Sync job with failure
- Render with a `syncJobs` entry that has `status: 'failed'` and `error: 'Authentication failed'`
- Verify the error message is displayed to the user

### Import progress at 0%
- Render with `importProgress` at `percent: 0`, `phase: 'job_requisitions'`
- Verify the progress bar is visible but empty
- Verify the phase label is displayed

### Import progress at 100%
- Render with `importProgress` at `percent: 100`
- Verify the progress bar is full

---

## Accessibility

- Verify ProviderCards are keyboard-navigable and can be selected with Enter/Space
- Verify API key input has an associated label
- Verify the show/hide toggle has an accessible label ("Show API key" / "Hide API key")
- Verify the progress bar has an aria-valuenow matching the percentage
- Verify status badges convey meaning beyond color (text content visible)
- Verify "Connect & Import" button disabled state is communicated to assistive technology
- Verify "Disconnect" action has a clear label indicating it is destructive
