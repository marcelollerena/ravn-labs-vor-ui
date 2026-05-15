import { CheckCircle2 } from 'lucide-react'
import type { Strength } from '@/../product/sections/interview-prep/types'

interface StrengthsListProps {
  strengths: Strength[]
}

export function StrengthsList({ strengths }: StrengthsListProps) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-2 px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
        <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
          <CheckCircle2
            className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
          Strengths
        </h3>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {strengths.length}
        </span>
      </div>
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <ul className="space-y-3">
          {strengths.map((strength) => (
            <li key={strength.id} className="flex gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {strength.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {strength.detail}
                </p>
                <span className="inline-block mt-1 text-[10px] font-medium text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                  Matches: {strength.requirementMatch}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
