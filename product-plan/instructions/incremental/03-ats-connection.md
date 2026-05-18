# Milestone 3: ATS Connection

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

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

Implement the ATS Connection section — the integration point where users connect their Applicant Tracking System, import data, and manage sync operations.

## Overview

ATS Connection is the gateway to Vor. Before any candidates or requisitions appear, users must connect their ATS provider. The flow moves through three states: provider selection, import progress, and connected state with ongoing sync management. This section supports Greenhouse, Lever, Ashby, Workday, and a custom API option.

**Key Functionality:**
- Provider selection grid with supported ATS options
- API key input with masked display
- Connect and import flow with real-time progress tracking
- Import progress showing phases (job requisitions, then candidates)
- Connected state displaying connection details and sync history
- Re-sync trigger and disconnect option

## Components Provided

Copy from `product-plan/sections/ats-connection/components/`:

- `ATSConnection` — Main orchestrator component managing the three-state flow
- `ProviderCard` — Individual ATS provider tile with icon, name, and description
- `ImportProgress` — Progress display showing phase label, percent bar, and counts
- `ConnectedState` — Post-connection view with sync history table and action buttons

## Props Reference

**Data props:**

- `ATSProvider[]` — `{ id, name, icon, description }` — Available providers to display
- `ATSConnection` — `{ id, providerId, providerName, status, apiKeyMasked, connectedAt, lastSyncedAt }` — Current connection (null if none)
- `SyncJob[]` — `{ id, status, startedAt, completedAt, jobRequisitionsImported, candidatesImported, error }` — Past sync operations
- `ImportProgress` — `{ phase, phaseLabel, percent, jobRequisitionsImported, candidatesImported, candidatesTotal }` — Live import state (null when not importing)

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onConnect` | User selects a provider and submits API key (receives `providerId`, `apiKey`, optional `customProvider`) |
| `onSync` | User clicks "Re-sync" on the connected state |
| `onDisconnect` | User clicks "Disconnect" and confirms |

## Expected User Flows

### Flow 1: First-Time Connection
1. User navigates to ATS Connection (no existing connection)
2. User sees provider selection grid
3. User clicks a provider card (e.g., Greenhouse)
4. API key input appears with provider-specific instructions
5. User enters API key and clicks "Connect"
6. Import progress screen appears showing phases
7. **Outcome:** Connected state renders with sync summary

### Flow 2: Re-Sync Data
1. User visits ATS Connection with an active connection
2. Connected state displays with last sync time and history table
3. User clicks "Re-sync" button
4. Import progress appears for the sync operation
5. **Outcome:** Sync history updates with new entry

### Flow 3: Disconnect and Reconnect
1. User is on connected state
2. User clicks "Disconnect"
3. Confirmation dialog appears warning about data implications
4. User confirms
5. Provider selection grid reappears
6. **Outcome:** User can connect a different provider

### Flow 4: Custom ATS Provider
1. User clicks "Custom API" provider card
2. Additional fields appear: provider name and base URL
3. User fills in custom provider details and API key
4. **Outcome:** Connects with custom configuration

## Empty States

- **No connection:** Provider selection grid is the default view — no separate empty state needed
- **No sync history:** Connected state shows "No syncs yet" in the history area
- **Import error:** Error state with retry option and error message

## Testing

See `product-plan/sections/ats-connection/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/ats-connection/README.md` — Feature overview
- `product-plan/sections/ats-connection/tests.md` — UI behavior test specs
- `product-plan/sections/ats-connection/components/` — React components
- `product-plan/sections/ats-connection/types.ts` — TypeScript interfaces
- `product-plan/sections/ats-connection/sample-data.json` — Test data

## Done When

- [ ] Provider selection grid renders with all supported ATS options
- [ ] API key input validates and submits correctly
- [ ] Import progress animates through phases with live counts
- [ ] Connected state shows connection details and masked API key
- [ ] Sync history table displays past sync jobs with status
- [ ] Re-sync triggers a new import flow
- [ ] Disconnect returns to provider selection after confirmation
- [ ] Custom provider option accepts name and base URL
- [ ] Error states display with retry options
- [ ] Responsive on mobile
