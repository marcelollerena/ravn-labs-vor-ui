import { useState, useMemo, useCallback } from 'react'
import { Search, Users, UserCheck, Code2, X, ChevronRight, ChevronDown, Briefcase } from 'lucide-react'
import type {
  TeamCapacityProps,
  TeamMember,
  UserRole,
  AvailabilityStatus,
} from '../types'

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'recruiter', label: 'Recruiter' },
  { value: 'senior_dev', label: 'Senior Dev' },
]

const AVAILABILITY_OPTIONS: { value: AvailabilityStatus; label: string }[] = [
  { value: 'available', label: 'Available' },
  { value: 'busy', label: 'Busy' },
  { value: 'overloaded', label: 'Overloaded' },
]

const availabilityStyles: Record<AvailabilityStatus, { dot: string; label: string; bg: string }> = {
  available: {
    dot: 'bg-emerald-500',
    label: 'Available',
    bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
  },
  busy: {
    dot: 'bg-amber-500',
    label: 'Busy',
    bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
  },
  overloaded: {
    dot: 'bg-red-500',
    label: 'Overloaded',
    bg: 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400',
  },
}

const roleStyles: Record<UserRole, { label: string; icon: typeof Users }> = {
  recruiter: { label: 'Recruiter', icon: UserCheck },
  senior_dev: { label: 'Senior Dev', icon: Code2 },
}

function formatRelativeTime(iso: string): string {
  const now = new Date()
  const date = new Date(iso)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function MemberCard({
  member,
  onMemberClick: _onMemberClick,
}: {
  member: TeamMember
  onMemberClick?: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const avail = availabilityStyles[member.availabilityStatus]
  const role = roleStyles[member.role]
  const RoleIcon = role.icon

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-b-0">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            {initials}
          </div>
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${avail.dot}`}
          />
        </div>

        {/* Name + role */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
              {member.name}
            </p>
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <RoleIcon className="h-3 w-3" strokeWidth={1.5} />
              {role.label}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {member.email}
          </p>
        </div>

        {/* Workload */}
        <div className="hidden items-center gap-6 sm:flex">
          <div className="text-right">
            <p className="text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-300">
              {member.activeRequisitions}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Requisitions</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-300">
              {member.activeCandidates}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Candidates</p>
          </div>
        </div>

        {/* Availability badge */}
        <span
          className={`hidden shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:inline-block ${avail.bg}`}
        >
          {avail.label}
        </span>

        {/* Expand arrow */}
        {member.requisitions.length > 0 ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500" strokeWidth={1.5} />
          )
        ) : (
          <div className="w-4 shrink-0" />
        )}
      </button>

      {/* Expanded requisitions */}
      {expanded && member.requisitions.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/20">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Active Assignments
          </p>
          <div className="space-y-1.5">
            {member.requisitions.map((req) => (
              <div
                key={req.id}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <Briefcase className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
                <span className="min-w-0 flex-1 truncate text-slate-700 dark:text-slate-300">
                  {req.title}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {req.department}
                </span>
                <span className="flex items-center gap-1 text-xs tabular-nums text-slate-400 dark:text-slate-500">
                  <Users className="h-3 w-3" strokeWidth={1.5} />
                  {req.candidateCount}
                </span>
              </div>
            ))}
          </div>
          {member.lastAssignedAt && (
            <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">
              Last assigned: {formatRelativeTime(member.lastAssignedAt)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function TeamCapacity({
  summary,
  members,
  onMemberClick,
  onAssignToRequisition: _onAssign,
  onSearch,
  onFilterChange,
}: TeamCapacityProps) {
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | null>(null)
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityStatus | null>(null)

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value)
      onSearch?.(value)
    },
    [onSearch],
  )

  const clearFilters = useCallback(() => {
    setQuery('')
    setRoleFilter(null)
    setAvailabilityFilter(null)
    onSearch?.('')
    onFilterChange?.({ role: null, availability: null })
  }, [onSearch, onFilterChange])

  const filtered = useMemo(() => {
    let result = members
    if (query) {
      const lower = query.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(lower) ||
          m.email.toLowerCase().includes(lower),
      )
    }
    if (roleFilter) {
      result = result.filter((m) => m.role === roleFilter)
    }
    if (availabilityFilter) {
      result = result.filter((m) => m.availabilityStatus === availabilityFilter)
    }
    return result
  }, [members, query, roleFilter, availabilityFilter])

  const hasActiveFilters = query || roleFilter || availabilityFilter

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Team Capacity
      </h1>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white px-5 py-5 dark:border-slate-700/80 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <UserCheck className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[28px] font-semibold leading-tight tracking-tight text-blue-600 dark:text-blue-400">
              {summary.totalRecruiters}
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">
              Recruiters
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white px-5 py-5 dark:border-slate-700/80 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <Code2 className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[28px] font-semibold leading-tight tracking-tight text-slate-700 dark:text-slate-300">
              {summary.totalSeniorDevs}
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">
              Senior Devs
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white px-5 py-5 dark:border-slate-700/80 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <UserCheck className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[28px] font-semibold leading-tight tracking-tight text-emerald-600 dark:text-emerald-400">
              {summary.availableRecruiters}
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">
              Available Recruiters
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white px-5 py-5 dark:border-slate-700/80 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <Code2 className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[28px] font-semibold leading-tight tracking-tight text-emerald-600 dark:text-emerald-400">
              {summary.availableSeniorDevs}
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">
              Available Senior Devs
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search team members..."
            className="w-full rounded-lg border border-slate-200/80 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-700 dark:focus:ring-blue-900/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={roleFilter ?? ''}
            onChange={(e) => {
              const val = (e.target.value || null) as UserRole | null
              setRoleFilter(val)
              onFilterChange?.({ role: val, availability: availabilityFilter })
            }}
            className="rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:border-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="">Role</option>
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={availabilityFilter ?? ''}
            onChange={(e) => {
              const val = (e.target.value || null) as AvailabilityStatus | null
              setAvailabilityFilter(val)
              onFilterChange?.({ role: roleFilter, availability: val })
            }}
            className="rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:border-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="">Availability</option>
            {AVAILABILITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Member list */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900">
        {filtered.length > 0 ? (
          filtered.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onMemberClick={onMemberClick}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="h-8 w-8 text-slate-300 dark:text-slate-600" strokeWidth={1.5} />
            <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              No team members found
            </p>
            <p className="mt-1 text-[13px] text-slate-400 dark:text-slate-500">
              {hasActiveFilters
                ? 'Try adjusting your search or filters'
                : 'No recruiters or senior developers have been registered yet'}
            </p>
          </div>
        )}
      </div>

      {/* Result count */}
      {hasActiveFilters && filtered.length > 0 && (
        <p className="text-[13px] text-slate-400 dark:text-slate-500">
          Showing {filtered.length} of {members.length} team members
        </p>
      )}
    </div>
  )
}
