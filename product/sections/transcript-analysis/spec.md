# Transcript Analysis Specification

## Overview
The assigned interviewer uploads an interview transcript (raw text paste or file upload), and the system analyzes the conversation to extract key insights. Vor supports at least two interview tracks for each candidate: HR screening and technical interview. Each track has its own transcript, analysis, and role-specific follow-up prompts.

## User Flows
- Upload a transcript via file upload (.txt, .md, .docx) or paste raw text into a text area
- See a processing state while the AI analyzes the transcript
- View extracted insights organized by category: strong answers, weak answers, red flags, notable moments
- Each insight includes a supporting quote pulled directly from the transcript
- Scroll through the full transcript with insight annotations highlighted inline
- Re-upload or replace a transcript if the wrong file was uploaded
- Answer active recall questions tailored to the current interview type

## UI Requirements
- Upload area: drag-and-drop zone with file picker, or a "Paste transcript" tab with a large text area
- Interview type context is always visible so the user knows whether they are working on the HR interview or the technical interview
- Processing state: progress indicator with status text ("Analyzing conversation...", "Extracting insights...")
- Analysis results panel:
  - Insight cards grouped by category (strong, weak, red flag, notable)
  - Each card shows: insight summary, category badge, and a quoted excerpt from the transcript in a blockquote style
  - Insight count per category shown in the section headers
- Active recall section adapts by role:
  - Recruiter prompts focus on English level, communication quality, and requirement fit
  - Senior developer prompts focus on technical depth, problem solving, architecture, and code reasoning
- Full transcript viewer: scrollable text with highlighted passages that correspond to insights, clickable to jump to the related insight card
- "Replace Transcript" option with confirmation
- This is a tab within the Candidate Workspace (Transcript tab)
- Empty state before upload with clear instructions
- Breadcrumb: Job Requisitions → [Job Title] → [Candidate Name] → Transcript

## Configuration
- shell: true
