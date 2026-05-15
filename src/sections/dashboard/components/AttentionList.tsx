import { CheckCircle2 } from 'lucide-react'
import type { NeedsAttentionItem } from '@/../product/sections/dashboard/types'
import { AttentionRow } from './AttentionRow'

interface AttentionListProps {
  items: NeedsAttentionItem[]
  onCandidateClick?: (candidateId: string) => void
}

export function AttentionList({ items, onCandidateClick }: AttentionListProps) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 px-1">
        <h2 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">
          Needs Your Attention
        </h2>
        {items.length > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
            {items.length}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-10 dark:border-slate-700">
          <CheckCircle2
            className="h-8 w-8 text-emerald-400 dark:text-emerald-500"
            strokeWidth={1.5}
          />
          <p className="mt-3 text-[14px] font-medium text-slate-500 dark:text-slate-400">
            You're all caught up
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white dark:divide-slate-800 dark:border-slate-700/80 dark:bg-slate-900">
          {items.map((item) => (
            <AttentionRow
              key={item.id}
              item={item}
              onCandidateClick={onCandidateClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
