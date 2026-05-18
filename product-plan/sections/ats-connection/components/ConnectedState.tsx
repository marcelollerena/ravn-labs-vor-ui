import { CheckCircle2, RefreshCw, Unplug, AlertCircle } from 'lucide-react'
import type { ATSConnection, SyncJob } from '../types'

interface ConnectedStateProps {
  connection: ATSConnection
  syncJobs: SyncJob[]
  onSync?: () => void
  onDisconnect?: () => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatRelative(iso: string): string {
  const now = new Date()
  const date = new Date(iso)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

export function ConnectedState({ connection, syncJobs, onSync, onDisconnect }: ConnectedStateProps) {
  const isConnected = connection.status === 'connected'
  const lastSync = connection.lastSyncedAt
  const latestJob = syncJobs[0]

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4">
      {/* Connection card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                isConnected
                  ? 'bg-emerald-50 dark:bg-emerald-950/40'
                  : 'bg-red-50 dark:bg-red-950/40'
              }`}
            >
              {isConnected ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" strokeWidth={1.5} />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" strokeWidth={1.5} />
              )}
            </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">
                {connection.providerName}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                  }`}
                >
                  {isConnected ? 'Connected' : 'Error'}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {connection.apiKeyMasked}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Last synced + actions */}
        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700/60">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {lastSync ? (
              <>Last synced {formatRelative(lastSync)}</>
            ) : (
              'Never synced'
            )}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSync}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
              Re-sync
            </button>
            <button
              type="button"
              onClick={onDisconnect}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-red-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-red-400"
            >
              <Unplug className="h-3.5 w-3.5" strokeWidth={2} />
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* Sync history */}
      {syncJobs.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Sync History
          </h3>
          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white dark:divide-slate-700/60 dark:border-slate-700 dark:bg-slate-800/50">
            {syncJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      job.status === 'completed'
                        ? 'bg-emerald-500'
                        : job.status === 'failed'
                          ? 'bg-red-500'
                          : 'bg-amber-500 animate-pulse'
                    }`}
                  />
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-200">
                      {job.status === 'failed'
                        ? job.error ?? 'Sync failed'
                        : `${job.jobRequisitionsImported} requisitions, ${job.candidatesImported} candidates`}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {formatDate(job.startedAt)}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium ${
                    job.status === 'completed'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : job.status === 'failed'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {job.status === 'completed'
                    ? 'Success'
                    : job.status === 'failed'
                      ? 'Failed'
                      : 'In progress'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest import summary */}
      {latestJob?.status === 'completed' && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-800/40 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={2} />
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              Latest import: {latestJob.jobRequisitionsImported} job requisitions, {latestJob.candidatesImported} candidates
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
