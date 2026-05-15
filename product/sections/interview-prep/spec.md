# Interview Prep Specification

## Overview
Displays the AI-generated interview briefing for a candidate. Compares the candidate's triangulated profile against the job requisition to surface strengths, gaps, and specific areas to probe. Produces targeted question sets for the HR screening and the technical interview without requiring separate page layouts.

## User Flows
- View the auto-generated interview briefing once the candidate profile is complete
- Read a structured comparison: candidate strengths vs. job requirements, identified gaps, risk areas
- Review AI-generated interview questions, each linked to a specific gap or area of interest and labeled by interview type
- Regenerate the briefing if the candidate profile has been updated with new data
- Copy individual questions or the full briefing to clipboard for use during the interview
- Mark the briefing as reviewed to progress the candidate's evaluation status

## UI Requirements
- Briefing status banner: "Ready" (briefing generated), "Pending" (waiting for profile data), "Outdated" (profile updated since last generation)
- Structured briefing layout:
  - Strengths section: bullet points of where the candidate matches or exceeds requirements
  - Gaps section: bullet points of missing or unclear qualifications, each with a severity indicator
  - Risk areas: discrepancies from the profile that warrant probing
- Interview questions list split into two role-aware groups:
  - HR screening questions focused on English level, communication, motivation, and requirement validation
  - Technical interview questions focused on implementation depth, architecture, tradeoffs, and seniority signals
- Copy-to-clipboard buttons on individual questions and on the full briefing
- "Regenerate Briefing" button with confirmation
- This is a tab within the Candidate Workspace (Interview Prep tab)
- Breadcrumb: Job Requisitions → [Job Title] → [Candidate Name] → Interview Prep

## Configuration
- shell: true
