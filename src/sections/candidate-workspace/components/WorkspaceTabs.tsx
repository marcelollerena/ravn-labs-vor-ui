import { Check, AlertCircle, Circle } from 'lucide-react'
import type { WorkspaceTab } from '@/../product/sections/candidate-workspace/types'

interface WorkspaceTabsProps {
  tabs: WorkspaceTab[]
  onTabChange?: (tabId: WorkspaceTab['id']) => void
}

function StatusIcon({ status }: { status: WorkspaceTab['status'] }) {
  switch (status) {
    case 'complete':
      return <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" strokeWidth={2.5} />
    case 'action-needed':
      return <AlertCircle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" strokeWidth={2} />
    case 'not-started':
      return <Circle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" strokeWidth={2} />
  }
}

export function WorkspaceTabs({ tabs, onTabChange }: WorkspaceTabsProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 px-5 sm:px-8">
      <div className="flex gap-0 -mb-px overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`
              relative flex items-center gap-1.5 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors
              ${tab.isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }
            `}
          >
            <StatusIcon status={tab.status} />
            {tab.label}
            {tab.isActive && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
