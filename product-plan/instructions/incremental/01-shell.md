# Milestone 1: Shell

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

Set up the design tokens and application shell — the persistent chrome that wraps all sections.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar, mobile overlay, and content area
- `MainNav.tsx` — Navigation component with icon + label items and active state
- `UserMenu.tsx` — User menu with avatar initials, role display, and dropdown

**Wire Up Navigation:**

Connect navigation to your routing:

- Dashboard → `/`
- Job Requisitions → `/requisitions`
- Candidates → `/candidates`
- Scorecards → `/scorecards`
- Team Capacity → `/team-capacity` (admin only)
- ATS Connection → `/ats-connection`

**User Menu:**

The user menu expects:
- User name
- Role (Admin, Recruiter, Senior Developer)
- Avatar URL (optional — shows initials if not provided)
- Logout callback
- Settings callback

**Sync Status:**

The shell sidebar includes a sync status indicator near the bottom:
- Last synced timestamp
- Syncing animation state
- Error state
- Re-sync button callback

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (blue primary, amber secondary, slate neutral, Inter font, IBM Plex Mono)
- [ ] Shell renders with sidebar navigation (desktop: 240px sidebar, tablet: 64px icon rail, mobile: hamburger + overlay)
- [ ] Navigation links to correct routes
- [ ] User menu shows user info with initials avatar
- [ ] Sync status indicator displays in sidebar
- [ ] Responsive on mobile
