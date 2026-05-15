import { ChevronRight, Flame, ArrowUp, Users } from 'lucide-react'
import type { JobRequisition, RequisitionStatus, RequisitionPriority, TeamAssignment } from '@/../product/sections/job-requisitions/types'

interface RequisitionRowProps {
  requisition: JobRequisition
  onClick?: () => void
}

const statusStyles: Record<RequisitionStatus, string> = {
  Open: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
  'On Hold': 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  Closed: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  Draft: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
}

function PriorityBadge({ priority }: { priority: RequisitionPriority }) {
  if (priority === 'Normal') return null

  if (priority === 'Urgent') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-red-600 dark:bg-red-950/40 dark:text-red-400">
        <Flame className="h-3 w-3" />
        Urgent
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
      <ArrowUp className="h-3 w-3" />
      High
    </span>
  )
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function TeamAvatars({ team }: { team: TeamAssignment }) {
  const members = [
    team.recruiter ? { id: team.recruiter.id, initials: getInitials(team.recruiter.name), label: team.recruiter.name } : null,
    team.seniorDev ? { id: team.seniorDev.id, initials: getInitials(team.seniorDev.name), label: team.seniorDev.name } : null,
  ].filter(Boolean) as { id: string; initials: string; label: string }[]

  if (members.length === 0) return null

  return (
    <div className="flex -space-x-1.5">
      {members.map((m) => (
        <div
          key={m.id}
          title={m.label}
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[10px] font-semibold leading-none text-slate-600 dark:border-slate-900 dark:bg-slate-700 dark:text-slate-300"
        >
          {m.initials}
        </div>
      ))}
    </div>
  )
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function RequisitionRow({ requisition, onClick }: RequisitionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 last:border-b-0 dark:border-slate-800 dark:hover:bg-slate-800/50 sm:gap-4 sm:px-5"
    >
      {/* Title + Priority */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
            {requisition.title}
          </p>
          <PriorityBadge priority={requisition.priority} />
        </div>
        <div className="mt-0.5 flex items-center gap-2 sm:hidden">
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            {requisition.department}
          </p>
          <TeamAvatars team={requisition.assignedTeam} />
        </div>
      </div>

      {/* Department — hidden on mobile, shown inline above */}
      <div className="hidden w-36 shrink-0 sm:block">
        <p className="text-[13px] text-slate-500 dark:text-slate-400">{requisition.department}</p>
      </div>

      {/* Team — hidden on mobile */}
      <div className="hidden w-24 shrink-0 sm:block">
        <TeamAvatars team={requisition.assignedTeam} />
      </div>

      {/* Status */}
      <div className="hidden w-20 shrink-0 sm:block">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[requisition.status]}`}
        >
          {requisition.status}
        </span>
      </div>

      {/* Candidate count */}
      <div className="flex w-14 shrink-0 items-center justify-end gap-1 text-right sm:w-16">
        <Users className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
        <span className="text-[13px] font-medium tabular-nums text-slate-600 dark:text-slate-300">
          {requisition.candidateCount}
        </span>
      </div>

      {/* Posted date — hidden on mobile */}
      <div className="hidden w-28 shrink-0 text-right lg:block">
        <p className="text-[13px] text-slate-400 dark:text-slate-500">
          {formatDate(requisition.postedDate)}
        </p>
      </div>

      {/* Chevron */}
      <ChevronRight
        className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500"
        strokeWidth={1.5}
      />
    </button>
  )
}
