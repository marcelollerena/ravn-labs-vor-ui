import { Briefcase, Users, FileCheck, Users2 } from 'lucide-react'
import type { DashboardProps } from '@/../product/sections/dashboard/types'
import { SummaryCard } from './SummaryCard'
import { SyncBadge } from './SyncBadge'
import { AttentionList } from './AttentionList'
import { ActivityFeed } from './ActivityFeed'
import { EmptyState } from './EmptyState'

export function Dashboard({
  currentUserRole,
  summary,
  atsSyncStatus,
  needsAttention,
  recentActivity,
  onCandidateClick,
  onRequisitionClick,
  onConnectATS,
  onActivityClick,
  onTeamCapacityClick,
}: DashboardProps) {
  const hasData =
    summary.activeRequisitions > 0 ||
    summary.candidatesInProgress > 0 ||
    needsAttention.length > 0

  if (!hasData) {
    return <EmptyState onConnectATS={onConnectATS} />
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <SyncBadge sync={atsSyncStatus} />
      </div>

      {/* Summary stats */}
      <div className={`grid grid-cols-1 gap-3 ${currentUserRole === 'admin' ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
        <SummaryCard
          value={summary.activeRequisitions}
          label="Active Requisitions"
          icon={<Briefcase className="h-5 w-5" strokeWidth={1.5} />}
          accentColor="blue"
          onClick={() => onRequisitionClick?.('all')}
        />
        <SummaryCard
          value={summary.candidatesInProgress}
          label="Candidates in Progress"
          icon={<Users className="h-5 w-5" strokeWidth={1.5} />}
          accentColor="slate"
          onClick={() => onCandidateClick?.('all')}
        />
        <SummaryCard
          value={summary.scorecardsPendingPush}
          label="Scorecards Pending Push"
          icon={<FileCheck className="h-5 w-5" strokeWidth={1.5} />}
          accentColor="amber"
          onClick={() => onRequisitionClick?.('scorecards')}
        />
        {currentUserRole === 'admin' && (
          <SummaryCard
            value={summary.teamAssignments}
            label="Team Assignments"
            icon={<Users2 className="h-5 w-5" strokeWidth={1.5} />}
            accentColor="slate"
            onClick={() => onTeamCapacityClick?.()}
          />
        )}
      </div>

      {/* Needs attention */}
      <AttentionList
        items={needsAttention}
        onCandidateClick={onCandidateClick}
      />

      {/* Recent activity */}
      <ActivityFeed items={recentActivity} onActivityClick={onActivityClick} />
    </div>
  )
}
