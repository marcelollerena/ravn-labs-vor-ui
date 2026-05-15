import { AlertTriangle, ArrowRightLeft } from 'lucide-react'
import type { Gap, RiskArea, GapSeverity } from '@/../product/sections/interview-prep/types'

interface GapsPanelProps {
  gaps: Gap[]
  riskAreas: RiskArea[]
}

const severityStyles: Record<GapSeverity, { pill: string; dot: string }> = {
  high: {
    pill: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    dot: 'bg-red-500',
  },
  medium: {
    pill: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  low: {
    pill: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
    dot: 'bg-slate-400',
  },
}

function SeverityPill({ severity }: { severity: GapSeverity }) {
  const style = severityStyles[severity]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${style.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {severity}
    </span>
  )
}

export function GapsPanel({ gaps, riskAreas }: GapsPanelProps) {
  const totalCount = gaps.length + riskAreas.length

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-2 px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
        <div className="w-6 h-6 rounded-md bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
          <AlertTriangle
            className="w-4 h-4 text-amber-600 dark:text-amber-400"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
          Gaps &amp; Risks
        </h3>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {totalCount}
        </span>
      </div>

      <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-2">
        {/* Gaps */}
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="rounded-md border border-slate-150 dark:border-slate-700/40 bg-slate-50/50 dark:bg-slate-800/50 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {gap.title}
              </p>
              <SeverityPill severity={gap.severity} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              {gap.detail}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 italic">
              {gap.sourceNote}
            </p>
          </div>
        ))}

        {/* Risk areas */}
        {riskAreas.map((risk) => (
          <div
            key={risk.id}
            className="rounded-md border border-slate-150 dark:border-slate-700/40 bg-slate-50/50 dark:bg-slate-800/50 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <ArrowRightLeft
                  className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0"
                  strokeWidth={1.5}
                />
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {risk.title}
                </p>
              </div>
              <SeverityPill severity={risk.severity} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              {risk.detail}
            </p>
            {/* Source comparison */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {risk.sources.map((source) => {
                const value =
                  source === 'Resume'
                    ? risk.resumeValue
                    : source === 'LinkedIn'
                      ? risk.linkedInValue
                      : risk.atsValue
                return (
                  <span
                    key={source}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    <span className="font-medium">{source}:</span>
                    <span className="truncate max-w-[120px]">{value}</span>
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
