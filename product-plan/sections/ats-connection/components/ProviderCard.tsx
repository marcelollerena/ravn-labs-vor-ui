import { Sprout, Gem, Hexagon, Plus } from 'lucide-react'
import type { ATSProvider } from '../types'

interface ProviderCardProps {
  provider?: ATSProvider
  isCustom?: boolean
  selected: boolean
  onSelect: () => void
}

const providerIcons: Record<string, typeof Sprout> = {
  greenhouse: Sprout,
  lever: Gem,
  ashby: Hexagon,
}

export function ProviderCard({ provider, isCustom, selected, onSelect }: ProviderCardProps) {
  const Icon = isCustom ? Plus : providerIcons[provider?.icon ?? ''] ?? Hexagon

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col items-center gap-3 rounded-xl border-2 px-4 py-6 transition-all duration-150 ${
        selected
          ? 'border-blue-500 bg-blue-50/60 shadow-sm dark:border-blue-400 dark:bg-blue-950/30'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600'
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
          selected
            ? 'bg-blue-500 text-white dark:bg-blue-500'
            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:group-hover:bg-slate-600'
        }`}
      >
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <span
        className={`text-sm font-medium ${
          selected
            ? 'text-blue-700 dark:text-blue-300'
            : 'text-slate-700 dark:text-slate-300'
        }`}
      >
        {isCustom ? 'Other' : provider?.name}
      </span>
      {!isCustom && provider?.description && (
        <span className="text-center text-xs leading-tight text-slate-400 dark:text-slate-500">
          {provider.description}
        </span>
      )}
      {isCustom && (
        <span className="text-center text-xs leading-tight text-slate-400 dark:text-slate-500">
          Custom ATS provider
        </span>
      )}

      {/* Selection indicator */}
      {selected && (
        <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400" />
      )}
    </button>
  )
}
