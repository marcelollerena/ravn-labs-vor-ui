import {
  RefreshCw,
  FileCheck,
  Upload,
  FileText,
  Users,
} from 'lucide-react'
import type {
  RecentActivityItem,
  ActivityType,
  RelatedEntityType,
} from '../types'

interface ActivityFeedProps {
  items: RecentActivityItem[]
  onActivityClick?: (
    activityId: string,
    entityType: RelatedEntityType,
    entityId: string,
  ) => void
}

const iconMap: Record<ActivityType, typeof RefreshCw> = {
  ats_sync: RefreshCw,
  scorecard_generated: FileCheck,
  ats_push: Upload,
  transcript_analyzed: FileText,
  team_assigned: Users,
}

const iconStyles: Record<ActivityType, string> = {
  ats_sync:
    'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
  scorecard_generated:
    'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
  ats_push:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  transcript_analyzed:
    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  team_assigned:
    'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
}

function formatTimestamp(iso: string): string {
  const now = new Date()
  const date = new Date(iso)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function ActivityFeed({ items, onActivityClick }: ActivityFeedProps) {
  return (
    <div>
      <h2 className="mb-3 px-1 text-[15px] font-semibold text-slate-900 dark:text-slate-100">
        Recent Activity
      </h2>
      <div className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 dark:border-slate-700/80 dark:bg-slate-900">
        {items.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-slate-400 dark:text-slate-500">
            No recent activity
          </p>
        ) : (
          items.map((item, index) => {
            const Icon = iconMap[item.type]
            const isLast = index === items.length - 1
            const isClickable = !!onActivityClick

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onActivityClick?.(
                    item.id,
                    item.relatedEntityType,
                    item.relatedEntityId,
                  )
                }
                className={`group relative flex w-full gap-3 px-1 py-2.5 text-left ${
                  isClickable
                    ? 'cursor-pointer rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    : ''
                }`}
              >
                {/* Timeline connector */}
                <div className="relative flex shrink-0 flex-col items-center">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconStyles[item.type]}`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                  {!isLast && (
                    <div className="mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-700" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[13px] font-medium text-slate-800 dark:text-slate-200">
                      {item.description}
                    </p>
                    <span className="shrink-0 text-[12px] text-slate-400 dark:text-slate-500">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
