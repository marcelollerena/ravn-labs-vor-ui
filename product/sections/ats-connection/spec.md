# ATS Connection Specification

## Overview
A minimal setup screen where recruiters connect their Applicant Tracking System to Vor. The user selects a provider (or enters a custom one), provides an API key, and imports all job requisitions and candidates in one click. Subsequent visits show the connection status, last sync timestamp, and a re-sync button.

## User Flows
- Select an ATS provider from a fixed list (Greenhouse, Lever, Ashby) or choose "Other" to enter a custom provider name and API base URL
- Enter the API key for the selected provider
- Click "Connect & Import" to authenticate and pull in all job requisitions and candidates
- See a progress indicator during the import process showing what's being synced
- See a success state with import counts (e.g., "12 job requisitions, 47 candidates imported")
- On return visits, see the connected provider, connection status, and "Last synced" timestamp
- Click "Re-sync" to pull in new data from the ATS
- Disconnect the current ATS connection to connect a different provider

## UI Requirements
- Provider selection as a grid of cards with provider logos/icons, plus an "Other" card for custom entry
- Single API key text input (masked by default with show/hide toggle)
- "Connect & Import" primary action button
- Progress state: animated progress bar or spinner with status text (e.g., "Importing job requisitions...", "Importing candidates...")
- Success state: summary card showing imported counts with a checkmark icon
- Connected state (return visits): card showing provider name, connection status badge (connected/error), last synced timestamp, and "Re-sync" button
- "Disconnect" secondary action for switching providers
- Error states for invalid API key or failed connection with plain-language messages

## Configuration
- shell: true
