import type { InsightCategory, TranscriptInsight } from '../types'

interface InsightCardProps {
  insight: TranscriptInsight
  isActive?: boolean
  onClick?: () => void
}

const categoryBorder: Record<InsightCategory, string> = {
  strong: 'border-l-emerald-400 dark:border-l-emerald-500',
  notable: 'border-l-amber-400 dark:border-l-amber-500',
  weak: 'border-l-slate-300 dark:border-l-slate-500',
  red_flag: 'border-l-red-400 dark:border-l-red-500',
}

export function InsightCard({ insight, isActive, onClick }: InsightCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border border-l-[3px] transition-all duration-150 ${categoryBorder[insight.category]} ${
        isActive
          ? 'bg-blue-50/60 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/40 shadow-sm'
          : 'bg-white dark:bg-slate-800/40 border-slate-150 dark:border-slate-700/50 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 hover:border-slate-200 dark:hover:border-slate-700'
      }`}
    >
      <div className="px-3.5 py-3">
        {/* Topic tag */}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {insight.topic}
        </span>

        {/* Summary */}
        <p className="text-[13px] font-medium text-slate-800 dark:text-slate-100 mt-1 leading-snug">
          {insight.summary}
        </p>

        {/* Quote block */}
        <div className={`mt-2.5 pl-3 border-l-2 ${categoryBorder[insight.category].replace('border-l-', 'border-l-').replace(/dark:border-l-\S+/, '').trim()} dark:border-l-slate-600`}>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-[var(--font-mono,'IBM_Plex_Mono',monospace)] italic">
            &ldquo;{insight.quote}&rdquo;
          </p>
        </div>
      </div>
    </button>
  )
}
