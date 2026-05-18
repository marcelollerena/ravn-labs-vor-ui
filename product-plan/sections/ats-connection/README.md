# ATS Connection

## Overview
A minimal setup screen where recruiters connect their Applicant Tracking System to Vor. The user selects a provider (or enters a custom one), provides an API key, and imports all job requisitions and candidates in one click. Subsequent visits show the connection status, last sync timestamp, and a re-sync button.

## User Flows
- Select an ATS provider from a fixed list (Greenhouse, Lever, Ashby) or choose "Other" to enter a custom provider name and API base URL
- Enter the API key for the selected provider
- Click "Connect & Import" to authenticate and pull in all job requisitions and candidates
- See a progress indicator during the import process showing what is being synced
- See a success state with import counts (e.g., "12 job requisitions, 47 candidates imported")
- On return visits, see the connected provider, connection status, and "Last synced" timestamp
- Click "Re-sync" to pull in new data from the ATS
- Disconnect the current ATS connection to connect a different provider

## Design Decisions
- Provider selection uses a grid of cards with icons rather than a dropdown for visual clarity
- "Other" card allows custom provider name and API base URL entry
- API key input is masked by default with a show/hide toggle for security
- Import progress shows distinct phases (importing requisitions, then candidates) with percentage
- Connected state prominently displays provider name, status badge, and last sync timestamp
- Disconnect is a secondary/destructive action requiring intentional click

## Data Shapes
**Entities:** ATSProvider, ATSConnection, SyncJob, ImportProgress
**From global entities:** ATSConnection, SyncJob

## Components Provided
- `ATSConnection` — Root component managing the full connection flow: provider selection, API key entry, import progress, and connected state
- `ProviderCard` — Selectable card for an ATS provider showing icon, name, and description
- `ImportProgress` — Progress indicator showing current import phase, percentage bar, and counts of imported items
- `ConnectedState` — Displays the active connection with provider name, status badge, last sync time, "Re-sync" button, and "Disconnect" option

## Callback Props
| Callback | Triggered When |
|----------|---------------|
| `onConnect(providerId, apiKey, customProvider?)` | User selects a provider, enters API key, and clicks "Connect & Import" |
| `onSync()` | User clicks "Re-sync" on the connected state |
| `onDisconnect()` | User clicks "Disconnect" to remove the current connection |
