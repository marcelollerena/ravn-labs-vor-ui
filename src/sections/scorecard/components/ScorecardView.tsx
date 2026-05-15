import { useState } from 'react'
import {
  ArrowUpFromLine,
  Download,
  RefreshCw,
  Sparkles,
  Pencil,
  Plus,
  Trash2,
  MoreHorizontal,
} from 'lucide-react'
import type {
  ScorecardProps,
  Scorecard,
  Strength,
  Concern,
  EvidenceQuote,
  InterviewerImpression,
  InterviewSource,
  Recommendation,
  ConfidenceLevel,
} from '@/../product/sections/scorecard/types'
import { StatusBanner } from './StatusBanner'
import { RecommendationBadge } from './RecommendationBadge'
import { ConfirmDialog } from './ConfirmDialog'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function getLatestPush(scorecard: Scorecard) {
  if (scorecard.atsPushEvents.length === 0) return undefined
  return scorecard.atsPushEvents[scorecard.atsPushEvents.length - 1]
}

// ─── Skeleton (Generating State) ──────────────────────────────────────────────

function ScorecardSkeleton() {
  const shimmer =
    'animate-pulse rounded bg-slate-200/70 dark:bg-slate-700/50'

  return (
    <div className="space-y-8">
      {/* Recommendation skeleton */}
      <div className="flex flex-col items-center gap-2 py-5">
        <div className={`${shimmer} h-11 w-36 rounded-full`} />
        <div className={`${shimmer} h-3 w-28`} />
      </div>

      {/* Summary skeleton */}
      <div className="space-y-2.5">
        <div className={`${shimmer} h-5 w-24`} />
        <div className={`${shimmer} h-4 w-full`} />
        <div className={`${shimmer} h-4 w-full`} />
        <div className={`${shimmer} h-4 w-3/4`} />
      </div>

      {/* Strengths skeleton */}
      <div className="space-y-3">
        <div className={`${shimmer} h-5 w-28`} />
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className={`${shimmer} h-4 w-full`} />
            <div className={`${shimmer} h-3 w-2/3`} />
          </div>
        ))}
      </div>

      {/* Concerns skeleton */}
      <div className="space-y-3">
        <div className={`${shimmer} h-5 w-24`} />
        {[1, 2].map((i) => (
          <div key={i} className="space-y-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className={`${shimmer} h-4 w-full`} />
            <div className={`${shimmer} h-3 w-1/2`} />
          </div>
        ))}
      </div>

      {/* Evidence skeleton */}
      <div className="space-y-3">
        <div className={`${shimmer} h-5 w-48`} />
        {[1, 2].map((i) => (
          <div
            key={i}
            className="border-l-[3px] border-slate-200 dark:border-slate-700 pl-4 py-2 space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <div className={`${shimmer} h-5 w-12 rounded-full`} />
              <div className={`${shimmer} h-3 w-32`} />
            </div>
            <div className={`${shimmer} h-4 w-full`} />
            <div className={`${shimmer} h-4 w-4/5`} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Section Edit Affordance ──────────────────────────────────────────────────

function SectionHeader({
  title,
  accentColor,
  onEdit,
  editing,
}: {
  title: string
  accentColor?: string
  onEdit?: () => void
  editing?: boolean
}) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-2.5">
        {accentColor && (
          <div className={`w-1 h-5 rounded-full ${accentColor}`} />
        )}
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </h3>
      </div>
      {onEdit && !editing && (
        <button
          onClick={onEdit}
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-950/30 transition-all"
          title={`Edit ${title.toLowerCase()}`}
        >
          <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
        </button>
      )}
    </div>
  )
}

// ─── Inline Editors ───────────────────────────────────────────────────────────

function SummaryEditor({
  value,
  onSave,
  onCancel,
}: {
  value: string
  onSave: (val: string) => void
  onCancel: () => void
}) {
  const [text, setText] = useState(value)

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none resize-y transition-colors"
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(text)}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

function RecommendationEditor({
  recommendation,
  confidenceLevel,
  onSave,
  onCancel,
}: {
  recommendation: Recommendation
  confidenceLevel: ConfidenceLevel
  onSave: (rec: Recommendation, conf: ConfidenceLevel) => void
  onCancel: () => void
}) {
  const [rec, setRec] = useState(recommendation)
  const [conf, setConf] = useState(confidenceLevel)

  const recOptions: { value: Recommendation; label: string }[] = [
    { value: 'hire', label: 'Hire' },
    { value: 'maybe', label: 'Maybe' },
    { value: 'no_hire', label: 'No Hire' },
  ]

  const confOptions: { value: ConfidenceLevel; label: string }[] = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ]

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
        {recOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setRec(opt.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              rec === opt.value
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
        {confOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setConf(opt.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              conf === opt.value
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(rec, conf)}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

// ─── List Editor (Strengths / Concerns) ───────────────────────────────────────

function ListItemEditor<T extends Strength | Concern>({
  items,
  onSave,
  onCancel,
}: {
  items: T[]
  onSave: (items: T[]) => void
  onCancel: () => void
}) {
  const [list, setList] = useState<T[]>(items)

  const updateItem = (index: number, field: 'text' | 'evidence', value: string) => {
    setList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const removeItem = (index: number) => {
    setList((prev) => prev.filter((_, i) => i !== index))
  }

  const addItem = () => {
    setList((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, text: '', evidence: '' } as T,
    ])
  }

  return (
    <div className="space-y-3">
      {list.map((item, index) => (
        <div
          key={item.id}
          className="flex gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30"
        >
          <div className="flex-1 space-y-2">
            <input
              value={item.text}
              onChange={(e) => updateItem(index, 'text', e.target.value)}
              placeholder="Description..."
              className="w-full px-3 py-1.5 text-sm rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
            <input
              value={item.evidence}
              onChange={(e) => updateItem(index, 'evidence', e.target.value)}
              placeholder="Supporting evidence..."
              className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>
          <button
            onClick={() => removeItem(index)}
            className="shrink-0 self-start p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
          </button>
        </div>
      ))}

      <button
        onClick={addItem}
        className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
        Add item
      </button>

      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(list)}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

// ─── Sentiment Indicator ──────────────────────────────────────────────────────

function InterviewSourceBadge({ source }: { source: InterviewSource }) {
  if (source === 'combined') return null
  const styles = source === 'hr'
    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300'
    : 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300'
  const label = source === 'hr' ? 'HR' : 'Technical'
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium leading-none ${styles}`}>
      {label}
    </span>
  )
}

function SentimentDot({ sentiment }: { sentiment: InterviewerImpression['sentiment'] }) {
  const colors = {
    positive: 'bg-emerald-400 dark:bg-emerald-500',
    neutral: 'bg-slate-300 dark:bg-slate-500',
    negative: 'bg-red-400 dark:bg-red-500',
  }
  return <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${colors[sentiment]}`} />
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ScorecardView({
  scorecard,
  onEditSection,
  onPushToATS,
  onRetryPush,
  onRegenerate,
  onDownload,
}: ScorecardProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [showPushDialog, setShowPushDialog] = useState(false)
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false)
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false)

  const latestPush = getLatestPush(scorecard)
  const isGenerating = scorecard.status === 'generating'
  const isPushed = scorecard.status === 'pushed'

  const handleEditSave = (
    section: 'summary' | 'hrSummary' | 'technicalSummary' | 'strengths' | 'concerns' | 'recommendation',
    value: unknown
  ) => {
    onEditSection?.(scorecard.id, section, value)
    setEditingSection(null)
  }

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
        {/* ── Status Banner ─────────────────────────────────────────── */}
        <StatusBanner
          status={scorecard.status}
          candidateName={scorecard.candidateName}
          atsConnectionName={scorecard.atsConnectionName}
          editedByRecruiter={scorecard.editedByRecruiter}
          pushedAt={latestPush?.status === 'success' ? latestPush.pushedAt : undefined}
          externalUrl={latestPush?.externalUrl}
          errorMessage={latestPush?.status === 'failed' ? latestPush.errorMessage : undefined}
          onRetryPush={() => onRetryPush?.(scorecard.id)}
        />

        {/* ── Action Bar ────────────────────────────────────────────── */}
        {!isGenerating && (
          <>
            {/* Desktop actions */}
            <div className="hidden sm:flex items-center justify-end gap-2">
              <button
                onClick={() => onDownload?.(scorecard.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Download className="w-4 h-4" strokeWidth={1.75} />
                Download .md
              </button>
              <button
                onClick={() => setShowRegenerateDialog(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
                Regenerate
              </button>
              <button
                onClick={() => setShowPushDialog(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors shadow-sm"
              >
                <ArrowUpFromLine className="w-4 h-4" strokeWidth={1.75} />
                {isPushed ? 'Re-push to ATS' : 'Push to ATS'}
              </button>
            </div>

            {/* Mobile sticky bottom bar */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center gap-2">
              <button
                onClick={() => setShowPushDialog(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors shadow-sm"
              >
                <ArrowUpFromLine className="w-4 h-4" strokeWidth={1.75} />
                {isPushed ? 'Re-push to ATS' : 'Push to ATS'}
              </button>
              <div className="relative">
                <button
                  onClick={() => setMobileActionsOpen(!mobileActionsOpen)}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5" strokeWidth={1.75} />
                </button>
                {mobileActionsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMobileActionsOpen(false)}
                    />
                    <div className="absolute bottom-full right-0 mb-2 z-50 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1">
                      <button
                        onClick={() => {
                          onDownload?.(scorecard.id)
                          setMobileActionsOpen(false)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      >
                        <Download className="w-4 h-4" strokeWidth={1.75} />
                        Download .md
                      </button>
                      <button
                        onClick={() => {
                          setShowRegenerateDialog(true)
                          setMobileActionsOpen(false)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      >
                        <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
                        Regenerate
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── Scorecard Document Card ───────────────────────────────── */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm sm:pb-0 pb-24">
          <div className="px-6 py-6 sm:px-8 sm:py-8 space-y-8">
            {/* Header block */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
                  {scorecard.candidateName}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {scorecard.jobTitle}
                  {scorecard.department && (
                    <span className="text-slate-300 dark:text-slate-600 mx-1.5">·</span>
                  )}
                  {scorecard.department}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                  <Sparkles className="w-3 h-3" strokeWidth={1.75} />
                  AI-generated
                </span>
                <span className="text-slate-200 dark:text-slate-700">·</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {scorecard.lastEditedAt
                    ? `Edited ${formatDate(scorecard.lastEditedAt)}`
                    : `Generated ${formatDate(scorecard.generatedAt)}`}
                </span>
              </div>
            </div>

            {/* ── Generating State ──────────────────────────────────── */}
            {isGenerating && <ScorecardSkeleton />}

            {/* ── Full Scorecard ─────────────────────────────────────── */}
            {!isGenerating && (
              <>
                {/* Recommendation */}
                {scorecard.recommendation && scorecard.confidenceLevel && (
                  editingSection === 'recommendation' ? (
                    <RecommendationEditor
                      recommendation={scorecard.recommendation}
                      confidenceLevel={scorecard.confidenceLevel}
                      onSave={(rec, conf) =>
                        handleEditSave('recommendation', { recommendation: rec, confidenceLevel: conf })
                      }
                      onCancel={() => setEditingSection(null)}
                    />
                  ) : (
                    <div
                      className="group cursor-pointer"
                      onClick={() => onEditSection && setEditingSection('recommendation')}
                    >
                      <RecommendationBadge
                        recommendation={scorecard.recommendation}
                        confidenceLevel={scorecard.confidenceLevel}
                      />
                    </div>
                  )
                )}

                {/* Divider */}
                <hr className="border-slate-100 dark:border-slate-800" />

                {/* Summary */}
                <div className="space-y-3">
                  <SectionHeader
                    title="Summary"
                    onEdit={onEditSection ? () => setEditingSection('summary') : undefined}
                    editing={editingSection === 'summary'}
                  />
                  {editingSection === 'summary' ? (
                    <SummaryEditor
                      value={scorecard.summary}
                      onSave={(val) => handleEditSave('summary', val)}
                      onCancel={() => setEditingSection(null)}
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      {scorecard.summary}
                    </p>
                  )}
                </div>

                {/* HR Screening Summary */}
                {scorecard.hrSummary && (
                  <div className="space-y-3">
                    <SectionHeader
                      title="HR Screening Summary"
                      accentColor="bg-indigo-500"
                      onEdit={onEditSection ? () => setEditingSection('hrSummary') : undefined}
                      editing={editingSection === 'hrSummary'}
                    />
                    {editingSection === 'hrSummary' ? (
                      <SummaryEditor
                        value={scorecard.hrSummary}
                        onSave={(val) => handleEditSave('hrSummary', val)}
                        onCancel={() => setEditingSection(null)}
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        {scorecard.hrSummary}
                      </p>
                    )}
                  </div>
                )}

                {/* Technical Interview Summary */}
                {scorecard.technicalSummary && (
                  <div className="space-y-3">
                    <SectionHeader
                      title="Technical Interview Summary"
                      accentColor="bg-blue-500"
                      onEdit={onEditSection ? () => setEditingSection('technicalSummary') : undefined}
                      editing={editingSection === 'technicalSummary'}
                    />
                    {editingSection === 'technicalSummary' ? (
                      <SummaryEditor
                        value={scorecard.technicalSummary}
                        onSave={(val) => handleEditSave('technicalSummary', val)}
                        onCancel={() => setEditingSection(null)}
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        {scorecard.technicalSummary}
                      </p>
                    )}
                  </div>
                )}

                {/* Strengths */}
                {scorecard.strengths.length > 0 && (
                  <div className="space-y-3">
                    <SectionHeader
                      title="Strengths"
                      accentColor="bg-emerald-500"
                      onEdit={onEditSection ? () => setEditingSection('strengths') : undefined}
                      editing={editingSection === 'strengths'}
                    />
                    {editingSection === 'strengths' ? (
                      <ListItemEditor
                        items={scorecard.strengths}
                        onSave={(items) => handleEditSave('strengths', items)}
                        onCancel={() => setEditingSection(null)}
                      />
                    ) : (
                      <div className="space-y-0">
                        {scorecard.strengths.map((strength, i) => (
                          <StrengthConcernItem
                            key={strength.id}
                            text={strength.text}
                            evidence={strength.evidence}
                            isLast={i === scorecard.strengths.length - 1}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Concerns */}
                {scorecard.concerns.length > 0 && (
                  <div className="space-y-3">
                    <SectionHeader
                      title="Concerns"
                      accentColor="bg-red-500"
                      onEdit={onEditSection ? () => setEditingSection('concerns') : undefined}
                      editing={editingSection === 'concerns'}
                    />
                    {editingSection === 'concerns' ? (
                      <ListItemEditor
                        items={scorecard.concerns}
                        onSave={(items) => handleEditSave('concerns', items)}
                        onCancel={() => setEditingSection(null)}
                      />
                    ) : (
                      <div className="space-y-0">
                        {scorecard.concerns.map((concern, i) => (
                          <StrengthConcernItem
                            key={concern.id}
                            text={concern.text}
                            evidence={concern.evidence}
                            isLast={i === scorecard.concerns.length - 1}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Evidence Quotes */}
                {scorecard.evidenceQuotes.length > 0 && (
                  <div className="space-y-4">
                    <SectionHeader title="Key Moments from Interview" />
                    <div className="space-y-3">
                      {scorecard.evidenceQuotes.map((eq) => (
                        <EvidenceQuoteBlock key={eq.id} quote={eq} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Interviewer Impressions */}
                {scorecard.interviewerImpressions.length > 0 && (
                  <div className="space-y-4">
                    <SectionHeader
                      title="Interviewer Impressions"
                      accentColor="bg-blue-500"
                    />
                    <div className="space-y-4">
                      {scorecard.interviewerImpressions.map((ri) => (
                        <InterviewerImpressionBlock key={ri.id} impression={ri} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Dialogs ────────────────────────────────────────────────── */}
      <ConfirmDialog
        open={showPushDialog}
        title={`Push scorecard to ${scorecard.atsConnectionName}?`}
        description={
          isPushed
            ? `This will replace the previously pushed scorecard for ${scorecard.candidateName} (${scorecard.jobTitle}).`
            : `The scorecard for ${scorecard.candidateName} — ${scorecard.jobTitle} — will be sent to ${scorecard.atsConnectionName}. Recommendation: ${scorecard.recommendation === 'no_hire' ? 'No Hire' : scorecard.recommendation === 'hire' ? 'Hire' : 'Maybe'}.`
        }
        confirmLabel="Push Now"
        onConfirm={() => {
          onPushToATS?.(scorecard.id)
          setShowPushDialog(false)
        }}
        onCancel={() => setShowPushDialog(false)}
      />

      <ConfirmDialog
        open={showRegenerateDialog}
        title="Regenerate this scorecard?"
        description="This will create a fresh AI-generated scorecard. Any edits you've made will be lost."
        confirmLabel="Regenerate"
        cancelLabel="Keep Current"
        destructive
        onConfirm={() => {
          onRegenerate?.(scorecard.id)
          setShowRegenerateDialog(false)
        }}
        onCancel={() => setShowRegenerateDialog(false)}
      />
    </div>
  )
}

// ─── Sub-pieces rendered inline ───────────────────────────────────────────────

function StrengthConcernItem({
  text,
  evidence,
  isLast,
}: {
  text: string
  evidence: string
  isLast: boolean
}) {
  return (
    <div
      className={`py-3 ${
        !isLast ? 'border-b border-slate-100 dark:border-slate-800/60' : ''
      }`}
    >
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
        {text}
      </p>
      {evidence && (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic pl-3 border-l-2 border-slate-200 dark:border-slate-700">
          {evidence}
        </p>
      )}
    </div>
  )
}

function EvidenceQuoteBlock({ quote }: { quote: EvidenceQuote }) {
  return (
    <div className="border-l-[3px] border-blue-200 dark:border-blue-800/60 pl-4 py-1">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          {quote.timestamp}
        </span>
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
          {quote.speaker}
        </span>
        <InterviewSourceBadge source={quote.interviewSource} />
      </div>
      <blockquote className="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
        "{quote.quote}"
      </blockquote>
      {quote.context && (
        <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">{quote.context}</p>
      )}
    </div>
  )
}

function InterviewerImpressionBlock({ impression }: { impression: InterviewerImpression }) {
  return (
    <div className="flex gap-2.5">
      <SentimentDot sentiment={impression.sentiment} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
            {impression.question}
          </p>
          <InterviewSourceBadge source={impression.interviewSource} />
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {impression.answer}
        </p>
      </div>
    </div>
  )
}
