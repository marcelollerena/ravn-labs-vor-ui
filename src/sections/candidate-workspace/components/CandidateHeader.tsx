import { Mail, Phone, MapPin, Upload, Link as LinkIcon, Briefcase, UserCheck, Code2 } from 'lucide-react'
import type { Candidate, JobRequisition } from '@/../product/sections/candidate-workspace/types'
import { EvaluationProgressBar } from './EvaluationProgressBar'

interface CandidateHeaderProps {
  candidate: Candidate
  jobRequisition: JobRequisition
  onUploadResume?: (file: File) => void
  onAddLinkedIn?: (url: string) => void
  onBack?: () => void
}

const stageColors: Record<string, string> = {
  applied: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  screening: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  interview: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  offer: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  hired: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  rejected: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

function formatStage(stage: string) {
  return stage.charAt(0).toUpperCase() + stage.slice(1)
}

export function CandidateHeader({
  candidate,
  jobRequisition,
  onUploadResume,
  onAddLinkedIn,
  onBack,
}: CandidateHeaderProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60">
      {/* Breadcrumb */}
      <div className="px-5 pt-4 pb-0 sm:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <button
            onClick={() => onBack?.()}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Job Requisitions
          </button>
          <span>/</span>
          <button
            onClick={() => onBack?.()}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {jobRequisition.title}
          </button>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300">{candidate.name}</span>
        </nav>
      </div>

      <div className="px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: Identity */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              {/* Avatar initial */}
              <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-white">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="min-w-0">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight truncate">
                  {candidate.name}
                </h1>
                <div className="flex items-center gap-3 mt-0.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      stageColors[candidate.currentStage] || stageColors.applied
                    }`}
                  >
                    {formatStage(candidate.currentStage)}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Briefcase className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span className="truncate">{jobRequisition.title}</span>
                  </div>
                  {jobRequisition.assignedTeam && (
                    <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                      {jobRequisition.assignedTeam.recruiter && (
                        <span className="inline-flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
                          {jobRequisition.assignedTeam.recruiter.name}
                        </span>
                      )}
                      {jobRequisition.assignedTeam.recruiter && jobRequisition.assignedTeam.seniorDev && (
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                      )}
                      {jobRequisition.assignedTeam.seniorDev && (
                        <span className="inline-flex items-center gap-1">
                          <Code2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
                          {jobRequisition.assignedTeam.seniorDev.name}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                {candidate.email}
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                {candidate.phone}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                {candidate.location}
              </span>
            </div>
          </div>

          {/* Right: Progress + actions */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            <EvaluationProgressBar progress={candidate.evaluationProgress} />

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = '.pdf'
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) onUploadResume?.(file)
                  }
                  input.click()
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" strokeWidth={1.5} />
                Update Resume
              </button>
              <button
                onClick={() => {
                  const url = prompt('Enter LinkedIn profile URL')
                  if (url) onAddLinkedIn?.(url)
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <LinkIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                Update LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
