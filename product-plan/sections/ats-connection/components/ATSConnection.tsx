import { useState } from 'react'
import { Eye, EyeOff, ArrowRight, Cable } from 'lucide-react'
import type { ATSConnectionProps } from '../types'
import { ProviderCard } from './ProviderCard'
import { ImportProgress } from './ImportProgress'
import { ConnectedState } from './ConnectedState'

export function ATSConnection({
  providers,
  connection,
  syncJobs,
  importProgress,
  onConnect,
  onSync,
  onDisconnect,
}: ATSConnectionProps) {
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null)
  const [isCustom, setIsCustom] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customUrl, setCustomUrl] = useState('')

  // If importing, show progress
  if (importProgress) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <ImportProgress progress={importProgress} />
      </div>
    )
  }

  // If connected, show connected state
  if (connection) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            ATS Connection
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your applicant tracking system integration.
          </p>
        </div>
        <ConnectedState
          connection={connection}
          syncJobs={syncJobs}
          onSync={onSync}
          onDisconnect={onDisconnect}
        />
      </div>
    )
  }

  // Setup state
  const canSubmit = apiKey.trim().length > 0 && (selectedProviderId || (isCustom && customName.trim() && customUrl.trim()))

  function handleSubmit() {
    if (!canSubmit) return
    if (isCustom) {
      onConnect?.('custom', apiKey, { name: customName, baseUrl: customUrl })
    } else if (selectedProviderId) {
      onConnect?.(selectedProviderId, apiKey)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
          <Cable className="h-7 w-7 text-blue-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Connect your ATS
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Import your job requisitions and candidates to get started.
        </p>
      </div>

      {/* Provider selection */}
      <div className="mb-8">
        <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Select Provider
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              selected={selectedProviderId === provider.id && !isCustom}
              onSelect={() => {
                setSelectedProviderId(provider.id)
                setIsCustom(false)
              }}
            />
          ))}
          <ProviderCard
            isCustom
            selected={isCustom}
            onSelect={() => {
              setSelectedProviderId(null)
              setIsCustom(true)
            }}
          />
        </div>
      </div>

      {/* Custom provider fields */}
      {isCustom && (
        <div className="mb-6 space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/30">
          <div>
            <label
              htmlFor="custom-name"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Provider Name
            </label>
            <input
              id="custom-name"
              type="text"
              placeholder="e.g., Workday"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="custom-url"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              API Base URL
            </label>
            <input
              id="custom-url"
              type="url"
              placeholder="https://api.example.com/v1"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>
        </div>
      )}

      {/* API key input */}
      {(selectedProviderId || isCustom) && (
        <div className="mb-8">
          <label
            htmlFor="api-key"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            API Key
          </label>
          <div className="relative">
            <input
              id="api-key"
              type={showApiKey ? 'text' : 'password'}
              placeholder="Paste your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
          <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
            Your API key is encrypted and stored securely.
          </p>
        </div>
      )}

      {/* Submit */}
      {(selectedProviderId || isCustom) && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Connect & Import
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
      )}
    </div>
  )
}
