import {
  FileText,
  Linkedin,
  AlertCircle,
  Clock,
  CheckCircle2,
  Circle,
  ChevronRight,
} from 'lucide-react'
import type {
  PipelineCandidate,
  EnrichmentStatus,
  EvaluationProgress,
} from '@/../product/sections/candidate-pipeline/types'

interface CandidateRowProps {
  candidate: PipelineCandidate
  onSelect?: () => void
}

const enrichmentIcon: Record<
  EnrichmentStatus,
  { icon: typeof CheckCircle2; className: string; label: string }
> = {
  ingested: {
    icon: CheckCircle2,
    className: 'text-emerald-500 dark:text-emerald-400',
    label: 'Ingested',
  },
  pending: {
    icon: Clock,
    className: 'text-amber-500 dark:text-amber-400',
    label: 'Pending',
  },
  error: {
    icon: AlertCircle,
    className: 'text-red-500 dark:text-red-400',
    label: 'Error',
  },
  'not-available': {
    icon: Circle,
    className: 'text-slate-300 dark:text-slate-600',
    label: 'N/A',
  },
}

function EnrichmentBadge({
  status,
  icon: SourceIcon,
  label,
}: {
  status: EnrichmentStatus
  icon: typeof FileText
  label: string
}) {
  const config = enrichmentIcon[status]
  const StatusIcon = config.icon

  return (
    <span
      className="inline-flex items-center gap-1"
      title={`${label}: ${config.label}`}
    >
      <SourceIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
      <StatusIcon className={`w-3 h-3 ${config.className}`} strokeWidth={2} />
    </span>
  )
}

function evaluationStep(done: boolean) {
  return done
    ? 'bg-blue-500 dark:bg-blue-400'
    : 'bg-slate-200 dark:bg-slate-700'
}

function getEvalSteps(progress: EvaluationProgress) {
  return [
    progress.dataImported,
    progress.profileBuilt,
    progress.interviewPrepped,
    progress.interviews.hrTranscriptUploaded && progress.interviews.hrTranscriptAnalyzed,
    progress.interviews.technicalTranscriptUploaded && progress.interviews.technicalTranscriptAnalyzed,
    progress.scorecardGenerated,
  ]
}

function getEvalLabel(progress: EvaluationProgress): string {
  if (progress.scorecardGenerated) return 'Scorecard complete'
  if (progress.interviews.technicalTranscriptUploaded && progress.interviews.technicalTranscriptAnalyzed) return 'Technical interview done'
  if (progress.interviews.hrTranscriptUploaded && progress.interviews.hrTranscriptAnalyzed) return 'HR interview done'
  if (progress.interviewPrepped) return 'Interview prepped'
  if (progress.profileBuilt) return 'Profile built'
  if (progress.dataImported) return 'Data imported'
  return 'Not started'
}

export function CandidateRow({ candidate, onSelect }: CandidateRowProps) {
  const initials = candidate.name
    .split(' ')
    .map((n) => n[0])
    .join('')
  const steps = getEvalSteps(candidate.evaluationProgress)
  const evalLabel = getEvalLabel(candidate.evaluationProgress)
  const completedCount = steps.filter(Boolean).length

  return (
    <button
      type="button"
      onClick={() => onSelect?.()}
      className="group w-full text-left flex items-center gap-4 px-4 sm:px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0"
    >
      {/* Avatar */}
      <div className="shrink-0 w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-semibold tracking-wide">
        {initials}
      </div>

      {/* Name & email */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {candidate.name}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {candidate.email}
        </p>
      </div>

      {/* Enrichment indicators */}
      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <EnrichmentBadge
          status={candidate.enrichment.resume}
          icon={FileText}
          label="Resume"
        />
        <EnrichmentBadge
          status={candidate.enrichment.linkedIn}
          icon={Linkedin}
          label="LinkedIn"
        />
      </div>

      {/* Evaluation progress */}
      <div className="hidden md:flex flex-col items-end gap-1 shrink-0 w-28">
        <div className="flex gap-0.5">
          {steps.map((done, i) => (
            <div
              key={i}
              className={`h-1.5 w-4 rounded-full ${evaluationStep(done)}`}
            />
          ))}
        </div>
        <span className="text-[10px] leading-tight text-slate-400 dark:text-slate-500">
          {evalLabel} ({completedCount}/6)
        </span>
      </div>

      {/* Chevron */}
      <ChevronRight
        className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-400 dark:group-hover:text-blue-500 transition-colors shrink-0"
        strokeWidth={1.5}
      />
    </button>
  )
}
