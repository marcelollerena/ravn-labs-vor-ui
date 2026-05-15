import { ChevronRight } from 'lucide-react'
import type { NeedsAttentionItem, Urgency } from '@/../product/sections/dashboard/types'

interface AttentionRowProps {
  item: NeedsAttentionItem
  onCandidateClick?: (candidateId: string) => void
}

const urgencyBar: Record<Urgency, string> = {
  high: 'bg-amber-500',
  medium: 'bg-blue-400',
  low: 'bg-slate-300 dark:bg-slate-600',
}

function formatTimeContext(interviewDate: string): string {
  const now = new Date()
  const date = new Date(interviewDate)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    const abs = Math.abs(diffDays)
    return abs === 1 ? 'Interview tomorrow' : `Interview in ${abs} days`
  }
  if (diffDays === 0) return 'Interviewed today'
  if (diffDays === 1) return '1 day ago'
  return `${diffDays} days ago`
}

export function AttentionRow({ item, onCandidateClick }: AttentionRowProps) {
  return (
    <button
      type="button"
      onClick={() => onCandidateClick?.(item.candidateId)}
      className="group flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
    >
      {/* Urgency indicator */}
      <div className="flex shrink-0 pt-1.5">
        <span className={`block h-6 w-1 rounded-full ${urgencyBar[item.urgency]}`} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-medium text-slate-900 dark:text-slate-100">
            {item.candidateName}
          </span>
          <span className="text-[12px] text-slate-400 dark:text-slate-500">
            {formatTimeContext(item.interviewDate)}
          </span>
        </div>
        <p className="mt-0.5 text-[13px] text-slate-500 dark:text-slate-400">
          {item.jobTitle}
        </p>
        <p className="mt-1 text-[13px] text-slate-600 dark:text-slate-300">
          {item.pendingActionLabel}
        </p>
        {item.assignedTo && (
          <p className="mt-0.5 text-[12px] text-slate-400 dark:text-slate-500">
            Assigned to: {item.assignedTo}
          </p>
        )}
      </div>

      {/* Arrow */}
      <div className="flex shrink-0 pt-2">
        <ChevronRight
          className="h-4 w-4 text-slate-300 transition-colors group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-400"
          strokeWidth={1.5}
        />
      </div>
    </button>
  )
}
