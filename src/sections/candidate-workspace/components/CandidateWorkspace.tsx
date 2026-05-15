import type { CandidateWorkspaceProps } from '@/../product/sections/candidate-workspace/types'
import { CandidateHeader } from './CandidateHeader'
import { WorkspaceTabs } from './WorkspaceTabs'
import { ATSRecordCard, ResumeCard, LinkedInCard } from './DataSourceCard'
import { DiscrepancyPanel } from './DiscrepancyPanel'
import { MergedProfileSummary } from './MergedProfileSummary'

export function CandidateWorkspace({
  candidate,
  jobRequisition,
  atsRecord,
  resumeDocument,
  linkedInProfile,
  candidateProfile,
  discrepancies,
  workspaceTabs,
  onTabChange,
  onUploadResume,
  onAddLinkedIn,
  onBack,
}: CandidateWorkspaceProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <CandidateHeader
        candidate={candidate}
        jobRequisition={jobRequisition}
        onUploadResume={onUploadResume}
        onAddLinkedIn={onAddLinkedIn}
        onBack={onBack}
      />

      {/* Tabs */}
      <WorkspaceTabs tabs={workspaceTabs} onTabChange={onTabChange} />

      {/* Profile tab content */}
      <div className="px-5 py-6 sm:px-8 sm:py-8 max-w-[1400px] mx-auto">
        {/* Merged Profile — hero position */}
        <div className="mb-8">
          <MergedProfileSummary profile={candidateProfile} />
        </div>

        {/* Discrepancies */}
        <div className="mb-8">
          <DiscrepancyPanel discrepancies={discrepancies} />
        </div>

        {/* Data Source Cards */}
        <div className="mb-2">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
            Data Sources
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ATSRecordCard record={atsRecord} />
          <ResumeCard resume={resumeDocument} />
          <LinkedInCard profile={linkedInProfile} />
        </div>
      </div>
    </div>
  )
}
