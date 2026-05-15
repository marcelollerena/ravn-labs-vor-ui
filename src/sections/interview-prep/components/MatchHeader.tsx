import { User, Briefcase } from 'lucide-react'
import type {
  CandidateContext,
  JobRequisitionContext,
  MatchQuality,
} from '@/../product/sections/interview-prep/types'

interface MatchHeaderProps {
  candidate: CandidateContext
  jobRequisition: JobRequisitionContext
  matchQuality: MatchQuality
  matchSummary: string
}

const qualityConfig: Record<
  MatchQuality,
  { label: string; dotColor: string; textColor: string }
> = {
  strong: {
    label: 'Strong Match',
    dotColor: 'bg-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
  moderate: {
    label: 'Moderate Match',
    dotColor: 'bg-amber-500',
    textColor: 'text-amber-700 dark:text-amber-400',
  },
  'gaps-detected': {
    label: 'Gaps Detected',
    dotColor: 'bg-red-500',
    textColor: 'text-red-700 dark:text-red-400',
  },
}

export function MatchHeader({
  candidate,
  jobRequisition,
  matchQuality,
  matchSummary,
}: MatchHeaderProps) {
  const quality = qualityConfig[matchQuality]

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3 min-w-0">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-white">
              {candidate.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
              {candidate.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1">
                <User className="w-3.5 h-3.5" strokeWidth={1.5} />
                {candidate.currentTitle} at {candidate.currentCompany}
              </span>
              <span className="inline-flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" strokeWidth={1.5} />
                {jobRequisition.title} · {jobRequisition.department}
              </span>
            </div>
          </div>
        </div>

        {/* Match quality badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${quality.textColor}`}>
            <span className={`w-2 h-2 rounded-full ${quality.dotColor}`} />
            {quality.label}
          </span>
        </div>
      </div>

      {/* Summary */}
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {matchSummary}
      </p>
    </div>
  )
}
