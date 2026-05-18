import { Check, X, Minus } from 'lucide-react'
import type { Recommendation, ConfidenceLevel } from '../types'

interface RecommendationBadgeProps {
  recommendation: Recommendation
  confidenceLevel: ConfidenceLevel
}

const badgeConfig: Record<
  Recommendation,
  { label: string; icon: typeof Check; bg: string; text: string; ring: string }
> = {
  hire: {
    label: 'Hire',
    icon: Check,
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    ring: 'ring-emerald-200 dark:ring-emerald-800/50',
  },
  no_hire: {
    label: 'No Hire',
    icon: X,
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    ring: 'ring-red-200 dark:ring-red-800/50',
  },
  maybe: {
    label: 'Maybe',
    icon: Minus,
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    ring: 'ring-amber-200 dark:ring-amber-800/50',
  },
}

const confidenceLabels: Record<ConfidenceLevel, string> = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence',
}

export function RecommendationBadge({ recommendation, confidenceLevel }: RecommendationBadgeProps) {
  const c = badgeConfig[recommendation]
  const Icon = c.icon

  return (
    <div className="flex flex-col items-center gap-2 py-5">
      <div
        className={`inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full ring-1 ${c.bg} ${c.text} ${c.ring}`}
      >
        <Icon className="w-5 h-5" strokeWidth={2} />
        <span className="text-lg font-semibold tracking-tight">{c.label}</span>
      </div>
      <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        {confidenceLabels[confidenceLevel]}
      </span>
    </div>
  )
}
