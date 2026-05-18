import type { ReactNode } from 'react'

interface SummaryCardProps {
  value: number
  label: string
  icon: ReactNode
  accentColor?: 'blue' | 'amber' | 'slate'
  onClick?: () => void
}

const accentStyles = {
  blue: {
    icon: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
    value: 'text-blue-600 dark:text-blue-400',
    ring: 'group-hover:ring-blue-200 dark:group-hover:ring-blue-900/40',
  },
  amber: {
    icon: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
    value: 'text-amber-600 dark:text-amber-400',
    ring: 'group-hover:ring-amber-200 dark:group-hover:ring-amber-900/40',
  },
  slate: {
    icon: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    value: 'text-slate-700 dark:text-slate-300',
    ring: 'group-hover:ring-slate-200 dark:group-hover:ring-slate-700',
  },
}

export function SummaryCard({
  value,
  label,
  icon,
  accentColor = 'blue',
  onClick,
}: SummaryCardProps) {
  const styles = accentStyles[accentColor]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-xl border border-slate-200/80 bg-white px-5 py-5 text-left ring-2 ring-transparent transition-all hover:shadow-sm dark:border-slate-700/80 dark:bg-slate-900 ${styles.ring}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p
          className={`text-[28px] font-semibold leading-tight tracking-tight ${styles.value}`}
        >
          {value}
        </p>
        <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>
      </div>
    </button>
  )
}
