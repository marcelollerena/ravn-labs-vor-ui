import { useState, useMemo } from 'react'
import { ChevronLeft, Search, Users, MapPin, Briefcase, UserCheck, Code2 } from 'lucide-react'
import type {
  CandidatePipelineProps,
  PipelineStageId,
} from '@/../product/sections/candidate-pipeline/types'
import { CandidateRow } from './CandidateRow'

const stageColors: Record<PipelineStageId, string> = {
  applied:
    'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  screening:
    'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  'hr-interview':
    'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  'technical-interview':
    'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  offer:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  hired:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  rejected:
    'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

const stageRing: Record<PipelineStageId, string> = {
  applied: 'ring-slate-400 dark:ring-slate-400',
  screening: 'ring-amber-500 dark:ring-amber-400',
  'hr-interview': 'ring-indigo-500 dark:ring-indigo-400',
  'technical-interview': 'ring-blue-500 dark:ring-blue-400',
  offer: 'ring-emerald-500 dark:ring-emerald-400',
  hired: 'ring-emerald-600 dark:ring-emerald-300',
  rejected: 'ring-red-500 dark:ring-red-400',
}

export function CandidatePipeline({
  jobRequisition,
  pipelineStages,
  candidates,
  onSelectCandidate,
  onFilterByStage,
  onSearch,
  onBack,
}: CandidatePipelineProps) {
  const [activeStage, setActiveStage] = useState<PipelineStageId | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCandidates = useMemo(() => {
    let result = candidates
    if (activeStage) {
      result = result.filter((c) => c.currentStage === activeStage)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q),
      )
    }
    return result
  }, [candidates, activeStage, searchQuery])

  const totalCandidates = candidates.length

  function handleStageFilter(stageId: PipelineStageId) {
    const next = activeStage === stageId ? null : stageId
    setActiveStage(next)
    onFilterByStage?.(next)
  }

  function handleSearch(value: string) {
    setSearchQuery(value)
    onSearch?.(value)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Breadcrumb */}
      <button
        type="button"
        onClick={() => onBack?.()}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-5"
      >
        <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
        Job Requisitions
      </button>

      {/* Requisition header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
              {jobRequisition.title}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" strokeWidth={1.5} />
                {jobRequisition.department}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                {jobRequisition.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                {totalCandidates} candidate{totalCandidates !== 1 ? 's' : ''}
              </span>
            </div>
            {(jobRequisition.assignedTeam.recruiter || jobRequisition.assignedTeam.seniorDev) && (
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 dark:text-slate-500">
                {jobRequisition.assignedTeam.recruiter && (
                  <span className="inline-flex items-center gap-1">
                    <UserCheck className="w-3 h-3" strokeWidth={1.5} />
                    {jobRequisition.assignedTeam.recruiter.name} (Recruiter)
                  </span>
                )}
                {jobRequisition.assignedTeam.recruiter && jobRequisition.assignedTeam.seniorDev && (
                  <span className="text-slate-300 dark:text-slate-600">&middot;</span>
                )}
                {jobRequisition.assignedTeam.seniorDev && (
                  <span className="inline-flex items-center gap-1">
                    <Code2 className="w-3 h-3" strokeWidth={1.5} />
                    {jobRequisition.assignedTeam.seniorDev.name} (Senior Dev)
                  </span>
                )}
              </div>
            )}
          </div>
          <span
            className={`shrink-0 mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
              jobRequisition.status === 'open'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                : jobRequisition.status === 'on-hold'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
            }`}
          >
            {jobRequisition.status}
          </span>
        </div>
      </div>

      {/* Stage filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {pipelineStages.map((stage) => {
          const isActive = activeStage === stage.id
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => handleStageFilter(stage.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                isActive
                  ? `${stageColors[stage.id]} ring-1.5 ring-inset ${stageRing[stage.id]}`
                  : `${stageColors[stage.id]} opacity-80 hover:opacity-100`
              }`}
            >
              {stage.label}
              <span
                className={`inline-flex items-center justify-center rounded-full text-[10px] font-semibold min-w-[18px] h-[18px] px-1 ${
                  isActive
                    ? 'bg-white/60 dark:bg-black/20'
                    : 'bg-black/5 dark:bg-white/10'
                }`}
              >
                {stage.candidateCount}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none"
          strokeWidth={1.5}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Candidate list */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        {/* Column headers — desktop */}
        <div className="hidden sm:flex items-center gap-4 px-4 sm:px-5 py-2 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
          <span className="w-9 shrink-0" />
          <span className="flex-1">Candidate</span>
          <span className="hidden sm:block shrink-0 w-[76px]">Sources</span>
          <span className="hidden md:block shrink-0 w-28 text-right">
            Progress
          </span>
          <span className="w-4 shrink-0" />
        </div>

        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <CandidateRow
              key={candidate.id}
              candidate={candidate}
              onSelect={() => onSelectCandidate?.(candidate.id)}
            />
          ))
        ) : (
          <div className="py-12 text-center">
            <Users
              className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2"
              strokeWidth={1.5}
            />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {searchQuery || activeStage
                ? 'No candidates match your filters'
                : 'No candidates in this pipeline yet'}
            </p>
          </div>
        )}
      </div>

      {/* Result count footer */}
      {(searchQuery || activeStage) && filteredCandidates.length > 0 && (
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 text-right">
          Showing {filteredCandidates.length} of {totalCandidates} candidate
          {totalCandidates !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
