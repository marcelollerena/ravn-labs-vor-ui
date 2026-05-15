import { RefreshCw } from 'lucide-react'
import type { ATSSyncStatus } from '@/../product/sections/dashboard/types'

interface SyncBadgeProps {
  sync: ATSSyncStatus
}

function formatRelativeTime(iso: string): string {
  const now = new Date()
  const date = new Date(iso)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

const statusDot: Record<ATSSyncStatus['status'], string> = {
  success: 'bg-emerald-500',
  in_progress: 'bg-amber-500 animate-pulse',
  failed: 'bg-red-500',
}

export function SyncBadge({ sync }: SyncBadgeProps) {
  const isInProgress = sync.status === 'in_progress'

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
      <span className={`inline-block h-2 w-2 rounded-full ${statusDot[sync.status]}`} />
      <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
        {sync.provider}
        {sync.status === 'failed'
          ? ' — sync failed'
          : isInProgress
            ? ' — syncing…'
            : ` — ${formatRelativeTime(sync.lastSyncAt)}`}
      </span>
      {isInProgress && (
        <RefreshCw className="h-3 w-3 animate-spin text-amber-500" strokeWidth={2} />
      )}
    </div>
  )
}
