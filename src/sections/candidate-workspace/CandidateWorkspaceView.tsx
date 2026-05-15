import data from '@/../product/sections/candidate-workspace/data.json'
import { CandidateWorkspace } from './components/CandidateWorkspace'
import type {
  Candidate,
  JobRequisition,
  ATSRecord,
  ResumeDocument,
  LinkedInProfile,
  CandidateProfile,
  Discrepancy,
  WorkspaceTab,
  UserRole,
} from '@/../product/sections/candidate-workspace/types'

export default function CandidateWorkspaceView() {
  return (
    <CandidateWorkspace
      currentUserRole={(data.currentUserRole as UserRole) ?? 'recruiter'}
      candidate={data.candidate as Candidate}
      jobRequisition={data.jobRequisition as JobRequisition}
      atsRecord={data.atsRecord as ATSRecord}
      resumeDocument={data.resumeDocument as ResumeDocument}
      linkedInProfile={data.linkedInProfile as LinkedInProfile}
      candidateProfile={data.candidateProfile as CandidateProfile}
      discrepancies={data.discrepancies as Discrepancy[]}
      workspaceTabs={data.workspaceTabs as WorkspaceTab[]}
      onTabChange={(tabId) => console.log('Tab changed:', tabId)}
      onUploadResume={(file) => console.log('Upload resume:', file.name)}
      onAddLinkedIn={(url) => console.log('Add LinkedIn:', url)}
      onUploadLinkedInPdf={(file) => console.log('Upload LinkedIn PDF:', file.name)}
      onBack={() => console.log('Navigate back to pipeline')}
    />
  )
}
