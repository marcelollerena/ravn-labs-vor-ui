import { Link2 } from 'lucide-react'

interface EmptyStateProps {
  onConnectATS?: () => void
}

export function EmptyState({ onConnectATS }: EmptyStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
          <Link2
            className="h-7 w-7 text-blue-600 dark:text-blue-400"
            strokeWidth={1.5}
          />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Connect your ATS to get started
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
          Import your job requisitions and candidates to start building
          evaluation scorecards with AI-powered insights.
        </p>
        <button
          type="button"
          onClick={onConnectATS}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Connect ATS
        </button>
        <p className="mt-4 text-[12px] text-slate-400 dark:text-slate-500">
          Supports Greenhouse, Lever, and more
        </p>
      </div>
    </div>
  )
}
