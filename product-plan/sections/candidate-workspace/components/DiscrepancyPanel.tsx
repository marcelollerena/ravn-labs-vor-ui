import { useState } from 'react'
import { AlertTriangle, ChevronDown, ChevronRight, MessageCircleQuestion } from 'lucide-react'
import type { Discrepancy } from '../types'

interface DiscrepancyPanelProps {
  discrepancies: Discrepancy[]
}

const severityStyles: Record<string, { border: string; badge: string; icon: string }> = {
  high: {
    border: 'border-l-red-500 dark:border-l-red-400',
    badge: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    icon: 'text-red-500 dark:text-red-400',
  },
  medium: {
    border: 'border-l-amber-500 dark:border-l-amber-400',
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    icon: 'text-amber-500 dark:text-amber-400',
  },
  low: {
    border: 'border-l-slate-300 dark:border-l-slate-500',
    badge: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    icon: 'text-slate-400 dark:text-slate-500',
  },
}

function formatFieldName(field: string): string {
  return field.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
}

function SourceValue({ source, value }: { source: string; value: string }) {
  if (value === 'N/A') {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 w-14 shrink-0">{source}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500 italic">Not available</span>
      </div>
    )
  }
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 w-14 shrink-0">{source}</span>
      <span className="text-xs text-slate-700 dark:text-slate-200">{value}</span>
    </div>
  )
}

function DiscrepancyRow({ discrepancy }: { discrepancy: Discrepancy }) {
  const [expanded, setExpanded] = useState(false)
  const style = severityStyles[discrepancy.severity] || severityStyles.low

  return (
    <div className={`border border-slate-200 dark:border-slate-700/60 border-l-[3px] ${style.border} rounded-lg bg-white dark:bg-slate-800/50 overflow-hidden`}>
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${style.icon}`} strokeWidth={1.5} />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {formatFieldName(discrepancy.field)}
                </h4>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${style.badge}`}>
                  {discrepancy.severity}
                </span>
              </div>

              {/* Source comparison */}
              <div className="space-y-1 mt-2">
                <SourceValue source="Resume" value={discrepancy.resumeValue} />
                <SourceValue source="LinkedIn" value={discrepancy.linkedInValue} />
                <SourceValue source="ATS" value={discrepancy.atsValue} />
              </div>

              {/* AI note */}
              <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-2 leading-relaxed">
                {discrepancy.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Suggested question toggle */}
        {discrepancy.suggestedQuestion && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 mt-3 ml-6.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {expanded ? (
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
            )}
            <MessageCircleQuestion className="w-3.5 h-3.5" strokeWidth={1.5} />
            Suggested interview question
          </button>
        )}
      </div>

      {expanded && discrepancy.suggestedQuestion && (
        <div className="px-4 pb-3">
          <div className="ml-6.5 px-3 py-2.5 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-md">
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              &ldquo;{discrepancy.suggestedQuestion}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export function DiscrepancyPanel({ discrepancies }: DiscrepancyPanelProps) {
  if (discrepancies.length === 0) {
    return (
      <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-xl px-5 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">No discrepancies found</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">All data sources are consistent</p>
        </div>
      </div>
    )
  }

  // Sort medium/high first
  const sorted = [...discrepancies].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return (order[a.severity] ?? 2) - (order[b.severity] ?? 2)
  })

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Discrepancies
        </h2>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
          {discrepancies.length}
        </span>
      </div>
      <div className="space-y-2.5">
        {sorted.map((d) => (
          <DiscrepancyRow key={d.id} discrepancy={d} />
        ))}
      </div>
    </div>
  )
}
