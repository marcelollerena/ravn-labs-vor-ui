import { useState, useMemo, useCallback } from 'react'
import { Search, Briefcase, Users, FolderOpen, Flame, X } from 'lucide-react'
import type {
  JobRequisitionsProps,
  JobRequisition,
  RequisitionStatus,
  RequisitionPriority,
} from '@/../product/sections/job-requisitions/types'
import { StatCard } from './StatCard'
import { RequisitionRow } from './RequisitionRow'

const STATUS_OPTIONS: RequisitionStatus[] = ['Open', 'On Hold', 'Closed', 'Draft']
const PRIORITY_OPTIONS: RequisitionPriority[] = ['Urgent', 'High', 'Normal']

export function JobRequisitions({
  summaryStats,
  requisitions,
  departments,
  onRequisitionClick,
  onSearch,
  onFilterChange,
}: JobRequisitionsProps) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<RequisitionStatus | null>(null)
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<RequisitionPriority | null>(null)

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value)
      onSearch?.(value)
    },
    [onSearch],
  )

  const handleStatusFilter = useCallback(
    (status: RequisitionStatus | null) => {
      setStatusFilter(status)
      onFilterChange?.({ status, department: departmentFilter, priority: priorityFilter })
    },
    [onFilterChange, departmentFilter, priorityFilter],
  )

  const handleDepartmentFilter = useCallback(
    (department: string | null) => {
      setDepartmentFilter(department)
      onFilterChange?.({ status: statusFilter, department, priority: priorityFilter })
    },
    [onFilterChange, statusFilter, priorityFilter],
  )

  const handlePriorityFilter = useCallback(
    (priority: RequisitionPriority | null) => {
      setPriorityFilter(priority)
      onFilterChange?.({ status: statusFilter, department: departmentFilter, priority })
    },
    [onFilterChange, statusFilter, departmentFilter],
  )

  const clearFilters = useCallback(() => {
    setQuery('')
    setStatusFilter(null)
    setDepartmentFilter(null)
    setPriorityFilter(null)
    onSearch?.('')
    onFilterChange?.({ status: null, department: null, priority: null })
  }, [onSearch, onFilterChange])

  const filtered = useMemo(() => {
    let result: JobRequisition[] = requisitions

    if (query) {
      const lower = query.toLowerCase()
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(lower) || r.department.toLowerCase().includes(lower),
      )
    }
    if (statusFilter) {
      result = result.filter((r) => r.status === statusFilter)
    }
    if (departmentFilter) {
      result = result.filter((r) => r.department === departmentFilter)
    }
    if (priorityFilter) {
      result = result.filter((r) => r.priority === priorityFilter)
    }

    return result
  }, [requisitions, query, statusFilter, departmentFilter, priorityFilter])

  const hasActiveFilters = query || statusFilter || departmentFilter || priorityFilter

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Job Requisitions
      </h1>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          value={summaryStats.totalRequisitions}
          label="Total Requisitions"
          icon={<Briefcase className="h-5 w-5" strokeWidth={1.5} />}
          accentColor="slate"
        />
        <StatCard
          value={summaryStats.openRequisitions}
          label="Open Roles"
          icon={<FolderOpen className="h-5 w-5" strokeWidth={1.5} />}
          accentColor="blue"
        />
        <StatCard
          value={summaryStats.totalCandidates}
          label="Total Candidates"
          icon={<Users className="h-5 w-5" strokeWidth={1.5} />}
          accentColor="amber"
        />
        <StatCard
          value={summaryStats.urgentRoles}
          label="Urgent Roles"
          icon={<Flame className="h-5 w-5" strokeWidth={1.5} />}
          accentColor="red"
        />
      </div>

      {/* Search + Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search requisitions..."
            className="w-full rounded-lg border border-slate-200/80 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-700 dark:focus:ring-blue-900/30"
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status */}
          <FilterSelect
            label="Status"
            value={statusFilter}
            options={STATUS_OPTIONS}
            onChange={handleStatusFilter}
          />

          {/* Department */}
          <FilterSelect
            label="Department"
            value={departmentFilter}
            options={departments}
            onChange={handleDepartmentFilter}
          />

          {/* Priority */}
          <FilterSelect
            label="Priority"
            value={priorityFilter}
            options={PRIORITY_OPTIONS}
            onChange={handlePriorityFilter}
          />

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

      {/* Requisition list */}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900">
        {/* Column headers — hidden on mobile */}
        <div className="hidden items-center gap-4 border-b border-slate-100 px-5 py-2.5 sm:flex dark:border-slate-800">
          <p className="min-w-0 flex-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Role
          </p>
          <p className="w-36 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Department
          </p>
          <p className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Team
          </p>
          <p className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Status
          </p>
          <p className="w-16 shrink-0 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Pipeline
          </p>
          <p className="hidden w-28 shrink-0 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400 lg:block dark:text-slate-500">
            Posted
          </p>
          <div className="w-4 shrink-0" />
        </div>

        {filtered.length > 0 ? (
          filtered.map((req) => (
            <RequisitionRow
              key={req.id}
              requisition={req}
              onClick={() => onRequisitionClick?.(req.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="h-8 w-8 text-slate-300 dark:text-slate-600" strokeWidth={1.5} />
            <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              No requisitions found
            </p>
            <p className="mt-1 text-[13px] text-slate-400 dark:text-slate-500">
              {hasActiveFilters
                ? 'Try adjusting your search or filters'
                : 'No job requisitions have been imported yet'}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-lg bg-blue-50 px-3.5 py-1.5 text-[13px] font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950/60"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Result count */}
      {hasActiveFilters && filtered.length > 0 && (
        <p className="text-[13px] text-slate-400 dark:text-slate-500">
          Showing {filtered.length} of {requisitions.length} requisitions
        </p>
      )}
    </div>
  )
}

/* ── Inline filter select ── */

interface FilterSelectProps<T extends string> {
  label: string
  value: T | null
  options: T[]
  onChange: (value: T | null) => void
}

function FilterSelect<T extends string>({ label, value, options, onChange }: FilterSelectProps<T>) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange((e.target.value || null) as T | null)}
      className="rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:border-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:focus:border-blue-700 dark:focus:ring-blue-900/30"
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}
