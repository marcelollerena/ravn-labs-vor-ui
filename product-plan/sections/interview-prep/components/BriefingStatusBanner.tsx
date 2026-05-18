import { CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react'
import type { BriefingStatus, InterviewType } from '../types'

interface BriefingStatusBannerProps {
  status: BriefingStatus
  generatedAt: string
  interviewType?: InterviewType
  onRegenerate?: () => void
  onCopyBriefing?: () => void
}

function formatRelativeTime(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

const bannerStyles: Record<BriefingStatus, string> = {
  ready:
    'bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800/50',
  pending:
    'bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800/50',
  outdated:
    'bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800/50',
}

const textStyles: Record<BriefingStatus, string> = {
  ready: 'text-blue-700 dark:text-blue-300',
  pending: 'text-amber-700 dark:text-amber-300',
  outdated: 'text-amber-700 dark:text-amber-300',
}

const interviewTypeLabel: Record<InterviewType, string> = {
  hr_screening: 'HR screening',
  technical: 'Technical interview',
}

export function BriefingStatusBanner({
  status,
  generatedAt,
  interviewType,
  onRegenerate,
  onCopyBriefing,
}: BriefingStatusBannerProps) {
  const typeLabel = interviewType ? interviewTypeLabel[interviewType] : 'Briefing'
  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 py-3 rounded-lg border ${bannerStyles[status]}`}
    >
      <div className={`flex items-center gap-2 text-sm font-medium ${textStyles[status]}`}>
        {status === 'ready' && (
          <>
            <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span>
              {typeLabel} briefing ready{' '}
              <span className="font-normal opacity-75">
                · Generated {formatRelativeTime(generatedAt)}
              </span>
            </span>
          </>
        )}
        {status === 'pending' && (
          <>
            <AlertTriangle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span>Briefing unavailable — candidate profile is incomplete</span>
          </>
        )}
        {status === 'outdated' && (
          <>
            <AlertTriangle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span>Profile updated since this briefing was generated</span>
          </>
        )}
      </div>

      {status !== 'pending' && (
        <div className="flex items-center gap-2">
          {status === 'ready' && (
            <button
              onClick={() => onCopyBriefing?.()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Copy Full Briefing
            </button>
          )}
          <button
            onClick={() => onRegenerate?.()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
            {status === 'outdated' ? 'Regenerate' : 'Regenerate Briefing'}
          </button>
        </div>
      )}
    </div>
  )
}
