import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { InsightCategory, TranscriptInsight } from '../types'
import { InsightCard } from './InsightCard'

interface InsightGroupProps {
  category: InsightCategory
  insights: TranscriptInsight[]
  activeInsightId?: string | null
  onInsightClick?: (insightId: string) => void
}

const categoryConfig: Record<InsightCategory, { label: string; dot: string }> = {
  strong: {
    label: 'Strong Answers',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
  notable: {
    label: 'Notable Moments',
    dot: 'bg-amber-500 dark:bg-amber-400',
  },
  weak: {
    label: 'Weak Points',
    dot: 'bg-slate-400 dark:bg-slate-500',
  },
  red_flag: {
    label: 'Red Flags',
    dot: 'bg-red-500 dark:bg-red-400',
  },
}

export function InsightGroup({ category, insights, activeInsightId, onInsightClick }: InsightGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const config = categoryConfig[category]

  if (insights.length === 0) return null

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full py-1.5 group"
      >
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={2} />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={2} />
        )}
        <span className={`w-2 h-2 rounded-full ${config.dot}`} />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          {config.label}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          ({insights.length})
        </span>
      </button>

      {isExpanded && (
        <div className="space-y-2 mt-1.5 ml-1">
          {insights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              isActive={activeInsightId === insight.id}
              onClick={() => onInsightClick?.(insight.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
