import { Loader2 } from 'lucide-react'
import type { ImportProgress as ImportProgressType } from '../types'

interface ImportProgressProps {
  progress: ImportProgressType
}

export function ImportProgress({ progress }: ImportProgressProps) {
  return (
    <div className="mx-auto max-w-md space-y-6 py-8 text-center">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/40">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" strokeWidth={1.5} />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {progress.phaseLabel}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {progress.jobRequisitionsImported} requisitions
          {progress.phase === 'candidates' && `, ${progress.candidatesImported} of ${progress.candidatesTotal} candidates`}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mx-auto max-w-xs">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs tabular-nums text-slate-400 dark:text-slate-500">
          {progress.percent}%
        </p>
      </div>
    </div>
  )
}
