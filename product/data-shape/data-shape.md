# Data Shape

## Entities

### User
An authenticated person using Vor. Users have one of three foundational roles: Admin, Recruiter, or Senior Developer. Recruiters manage candidate enrichment and HR interview inputs, senior developers manage technical interview inputs, and admins oversee the full platform including team assignment across job requisitions.

### ATSConnection
A configured link between Vor and an external Applicant Tracking System (e.g., Greenhouse, Lever). Stores provider type, authentication credentials, and sync status. A user can have multiple connections but typically works with one active ATS at a time.

### SyncJob
A record of a data sync operation between Vor and the connected ATS. Tracks when the sync ran, how many job requisitions and candidates were imported, and whether it succeeded or failed. Provides visibility into the import pipeline.

### JobRequisition
An open role imported from the ATS. Contains the job title, department, description, requirements, and hiring stage configuration. Serves as the organizing container for all candidates being evaluated for that role and for the assigned interview team responsible for advancing those candidates.

### RequisitionAssignment
The staffing configuration for a job requisition. Defines which recruiter and which senior developer are assigned to run the hiring process for that requisition. Either role can be optional, but the requisition must have at least one assigned owner.

### Candidate
A person being evaluated for a job requisition. Imported from the ATS with basic structured data (name, email, current stage). Acts as the central node connecting all enrichment sources, interview sessions, and evaluation artifacts. Also tracks dual-interview progress across HR and technical meetings.

### ResumeDocument
A parsed PDF resume attached to a candidate. Contains extracted text, work history, education, skills, and other structured data pulled from the uploaded file.

### LinkedInProfile
Candidate profile data sourced from LinkedIn, either via URL ingestion or PDF export upload. Captures work history, tenure, skills endorsements, and other public professional information.

### CandidateProfile
The merged, triangulated view of a candidate combining ATS data, resume, and LinkedIn into one unified profile. Highlights discrepancies across sources (e.g., conflicting tenure dates or missing skills) to surface areas worth probing in the interview.

### InterviewBrief
An AI-generated preparation document for a specific candidate-job pairing. Compares the candidate profile against the job requisition requirements, identifies gaps and strengths, and produces targeted interview questions adapted to the interview type and assigned interviewer role.

### InterviewSession
A specific interview step for a candidate within a job requisition. In the default workflow there are two sessions: an HR screening interview and a technical interview. Each session has an owner, status, transcript, AI analysis, and structured follow-up answers.

### Transcript
An uploaded interview transcript (raw text or recording-service export) for a specific interview session. Serves as the raw input for AI analysis of that conversation.

### TranscriptInsight
An AI-generated observation extracted from a transcript. Captures notable moments — hesitations, strong answers, topic gaps, or red flags — along with supporting quotes from the conversation.

### RecallQuestion
An AI-generated follow-up question presented to the assigned interviewer after transcript analysis. Designed to capture subjective impressions that can't be extracted from the transcript alone. Questions are oriented either to HR screening or to technical evaluation depending on the interview session.

### InterviewAnswer
The assigned interviewer's response to a recall question. Captures the subjective human judgment that complements the AI's objective transcript analysis. Answers can come from a recruiter or a senior developer depending on the interview session.

### Scorecard
The final structured evaluation document synthesizing the candidate profile, HR interview evidence, technical interview evidence, and interviewer answers into a formatted markdown report. Contains a summary, evidence with transcript quotes, strengths, concerns, role-specific insights, and a hiring recommendation.

### TeamMemberCapacity
A rollup entity used by admins to understand current interviewer availability. Tracks whether a recruiter or senior developer is available for new interviews and how many active hiring processes they are currently assigned to.

### ATSPushEvent
A record of pushing a scorecard back to the ATS. Tracks which scorecard was sent, when, the destination system, and whether the push succeeded or failed.

## Relationships

- User has many ATSConnection
- User may have many RequisitionAssignment
- ATSConnection has many SyncJob
- SyncJob imports many JobRequisition and Candidate
- JobRequisition has one RequisitionAssignment
- JobRequisition has many Candidate
- Candidate belongs to JobRequisition
- Candidate has one ResumeDocument
- Candidate has one LinkedInProfile
- Candidate has one CandidateProfile (triangulated from ATS data, ResumeDocument, and LinkedInProfile)
- Candidate has many InterviewSession
- InterviewSession has one InterviewBrief (generated from CandidateProfile, JobRequisition, and interview type)
- InterviewSession has one Transcript
- Transcript has many TranscriptInsight
- Transcript has many RecallQuestion
- RecallQuestion has one InterviewAnswer
- Candidate has one Scorecard (generated from CandidateProfile, InterviewSession, TranscriptInsight, and InterviewAnswer)
- Scorecard has many ATSPushEvent
- User has one TeamMemberCapacity snapshot in admin reporting contexts
