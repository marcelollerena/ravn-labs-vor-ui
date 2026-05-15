---
title: "Vor"
status: ready
created: 2026-01-01
updated: 2026-03-23
author: "@ravn-labs"
cycles: ["2026-01"]
---

# Labs PRD: Vor (The All-Seeing Recruiter CoPilot)

:::info
**Target Application:** New Application (SaaS Platform)
**Sprint Cycle:** January 2026
:::

## The Deal (Roster & Budget)

_Before reading the specs, understand the commitment. This is a heavy lift._

- **Roster Size:** 2 Developers
- **Green Light Goal:** A fully integrated pipeline that ingests candidates from an ATS, enriches them with LinkedIn/PDF data, digests interview transcripts, and auto-writes the final scorecard in Markdown.

---

### The Problem

Recruiters and Hiring Managers are drowning in disconnected data. The resume is a PDF, the work history is on LinkedIn, the job requirements are in the ATS, and the actual interview happens on Zoom. Post-interview, the Hiring Manager has to mentally synthesize all of this and write manual notes. This leads to burnout and poor data quality.

### The Solution (The "One-Liner")

**Vor** is an end-to-end intelligence layer that syncs with your ATS, combines candidate data from multiple sources (Resume + LinkedIn), listens to the interview via transcript, and automatically writes the final evaluation notes for you.

---

## Scope of Work (The Ambitious MVP)

_The architecture must handle multi-modal data ingestion (Text, API, Web). Integrations are key._

### Must-Have Features (The "Green Light" Requirements)

- **ATS Sync (The Backbone):** Ability to connect to an ATS (e.g., Greenhouse, Lever, or a high-fidelity mock API) to **bulk import** a list of candidates and their associated Job Requisitions.
- **The "Triangulation" Engine (Data Ingestion):** For every candidate, the system must ingest and merge data from three sources:
  1.  **The API:** Structured data from the ATS (Name, Stage, Email).
  2.  **The File:** Parsing the attached PDF Resume.
  3.  **The Web:** Ingesting the candidate's LinkedIn profile (via URL scraping or PDF export).
- **Smart Briefing Generator:** Compare the "Triangulated Data" against the Job Description to generate a dynamic Interview Script with specific questions probing gaps found between the Resume and LinkedIn.
- **Transcript Processing:** Ability to upload an interview recording via a raw text transcript or a link to a recording assistant like Grain. The system must analyze the conversation.
- **The "Active Recall" Interrogator:** After the interview, Vor must ask the user 3-5 pointed, AI-generated questions to extract subjective feedback (e.g., _"The candidate mentioned scaling Postgres; did you feel their answer was technically deep enough?"_).
- **Markdown Note Generation:** Synthesize the _Transcript_, the _Resume Analysis_, and the _User's Answers_ into a structured Markdown document (The Scorecard) ready for upload back to the ATS.

---

## Bonus Features (Stretch Goals)

- **Chrome Extension:** A browser extension to "Clip" a LinkedIn profile directly into Vor.
- **Live Audio:** Real-time transcription and coaching during the interview (vs. post-upload).
- **Bias Detector:** Analyze the transcript to flag if the _Interviewer_ asked biased or illegal questions.
- **Candidate Comparison Matrix:** A view that compares multiple candidates for the same Job Req side-by-side based on the extracted data.

---

## Technical Constraints & Assets

- **Integrations:** You will likely need to use a Unified API tool (like Merge.dev or similar) or build a direct connector for Greenhouse/Lever.
- **LinkedIn Data:** Scraping LinkedIn is difficult. You may need to use a proxy service (like Proxycurl) or a "Save Profile to PDF" ingestion method to ensure reliability during the demo.
- **AI Models:**
  - **Parsing/Reasoning:** GPT-4o or Claude 3.5 Sonnet.
  - **Transcription:** OpenAI Whisper (API or local).
- **Security:** PII (Personally Identifiable Information) handling is critical. Data must be sandboxed.

---

## Definition of Done (Demo Day Criteria)

_To receive the "Green Light," the demo must show the full "Import-to-Export" lifecycle:_

1.  **The Sync:** User clicks "Sync with Greenhouse." The dashboard populates with 10 live candidates and their Job Reqs.
2.  **The Enrichment:** User selects "Candidate A." System pulls their PDF Resume AND crawls their LinkedIn URL.
3.  **The Prep:** System highlights a discrepancy: _"Resume says 5 years Python, LinkedIn says 2. Ask about this."_
4.  **The Interview:** User uploads a transcript file of the interview.
5.  **The Interrogation:** Vor asks the user: _"The candidate hesitated when asked about System Design. Do you think they are Senior level?"_ User answers: _"No, they seemed junior there."_
6.  **The Output:** Vor generates a formatted Markdown file:
    - _Summary:_ "Strong Cultural Fit, Weak Technical Fit."
    - _Evidence:_ Quotes from the transcript.
    - _Decision:_ "No Hire."
7.  **The Close:** User clicks "Push to ATS," and the note is saved to the external system.
