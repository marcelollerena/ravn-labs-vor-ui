import type { InsightCategory, TranscriptInsight } from '../types'

interface InsightSummaryBarProps {
  insights: TranscriptInsight[]
  activeCategory?: InsightCategory | null
  onCategoryClick?: (category: InsightCategory) => void
}

const categoryConfig: Record<InsightCategory, { label: string; bg: string; text: string; activeBg: string; activeText: string; dot: string }> = {
  strong: {
    label: 'Strong',
    bg: 'bg-emerald-50 dark:bg-emerald-900/15',
    text: 'text-emerald-700 dark:text-emerald-400',
    activeBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    activeText: 'text-emerald-800 dark:text-emerald-300',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
  notable: {
    label: 'Notable',
    bg: 'bg-amber-50 dark:bg-amber-900/15',
    text: 'text-amber-700 dark:text-amber-400',
    activeBg: 'bg-amber-100 dark:bg-amber-900/30',
    activeText: 'text-amber-800 dark:text-amber-300',
    dot: 'bg-amber-500 dark:bg-amber-400',
  },
  weak: {
    label: 'Weak',
    bg: 'bg-slate-100 dark:bg-slate-700/40',
    text: 'text-slate-600 dark:text-slate-400',
    activeBg: 'bg-slate-200 dark:bg-slate-700/60',
    activeText: 'text-slate-700 dark:text-slate-300',
    dot: 'bg-slate-400 dark:bg-slate-500',
  },
  red_flag: {
    label: 'Red Flag',
    bg: 'bg-red-50 dark:bg-red-900/15',
    text: 'text-red-700 dark:text-red-400',
    activeBg: 'bg-red-100 dark:bg-red-900/30',
    activeText: 'text-red-800 dark:text-red-300',
    dot: 'bg-red-500 dark:bg-red-400',
  },
}

const categoryOrder: InsightCategory[] = ['strong', 'notable', 'weak', 'red_flag']

export function InsightSummaryBar({ insights, activeCategory, onCategoryClick }: InsightSummaryBarProps) {
  const counts = categoryOrder.reduce(
    (acc, cat) => {
      acc[cat] = insights.filter((i) => i.category === cat).length
      return acc
    },
    {} as Record<InsightCategory, number>
  )

  return (
    <div className="flex flex-wrap gap-2">
      {categoryOrder.map((category) => {
        const count = counts[category]
        if (count === 0) return null
        const config = categoryConfig[category]
        const isActive = activeCategory === category

        return (
          <button
            key={category}
            onClick={() => onCategoryClick?.(category)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              isActive
                ? `${config.activeBg} ${config.activeText} ring-1 ring-current/15`
                : `${config.bg} ${config.text} hover:opacity-80`
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {count} {config.label}
          </button>
        )
      })}
    </div>
  )
}
