import { Loader2, FileText, CheckCircle2, AlertTriangle } from 'lucide-react'
import type { ScorecardStatus } from '../types'

interface StatusBannerProps {
  status: ScorecardStatus
  candidateName: string
  atsConnectionName: string
  editedByRecruiter: boolean
  pushedAt?: string
  externalUrl?: string
  errorMessage?: string
  onRetryPush?: () => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const config: Record<
  ScorecardStatus,
  {
    bg: string
    icon: typeof Loader2
    iconColor: string
    iconAnimate?: string
  }
> = {
  generating: {
    bg: 'bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/40',
    icon: Loader2,
    iconColor: 'text-blue-500 dark:text-blue-400',
    iconAnimate: 'animate-spin',
  },
  draft: {
    bg: 'bg-amber-50 border-amber-100 dark:bg-amber-950/30 dark:border-amber-900/30',
    icon: FileText,
    iconColor: 'text-amber-500 dark:text-amber-400',
  },
  pushed: {
    bg: 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/30',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500 dark:text-emerald-400',
  },
  push_failed: {
    bg: 'bg-red-50 border-red-100 dark:bg-red-950/30 dark:border-red-900/30',
    icon: AlertTriangle,
    iconColor: 'text-red-500 dark:text-red-400',
  },
}

export function StatusBanner({
  status,
  candidateName,
  atsConnectionName,
  editedByRecruiter,
  pushedAt,
  externalUrl,
  errorMessage,
  onRetryPush,
}: StatusBannerProps) {
  const c = config[status]
  const Icon = c.icon

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${c.bg}`}>
      <Icon
        className={`w-4.5 h-4.5 shrink-0 ${c.iconColor} ${c.iconAnimate ?? ''}`}
        strokeWidth={1.75}
      />

      <div className="flex-1 min-w-0 text-sm">
        {status === 'generating' && (
          <span className="text-blue-700 dark:text-blue-300">
            Generating scorecard for {candidateName}...
          </span>
        )}

        {status === 'draft' && (
          <span className="text-amber-700 dark:text-amber-300">
            Draft — not yet pushed to {atsConnectionName}
            {editedByRecruiter && (
              <span className="ml-2 text-amber-600/70 dark:text-amber-400/60">· Edited by you</span>
            )}
          </span>
        )}

        {status === 'pushed' && (
          <span className="text-emerald-700 dark:text-emerald-300">
            Pushed to {atsConnectionName}
            {pushedAt && <> on {formatDate(pushedAt)}</>}
            {externalUrl && (
              <>
                {' '}·{' '}
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors"
                >
                  View in {atsConnectionName}
                </a>
              </>
            )}
          </span>
        )}

        {status === 'push_failed' && (
          <span className="text-red-700 dark:text-red-300">
            Push to {atsConnectionName} failed
            {errorMessage && <> — {errorMessage}</>}
          </span>
        )}
      </div>

      {status === 'push_failed' && onRetryPush && (
        <button
          onClick={onRetryPush}
          className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-900/60 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}
