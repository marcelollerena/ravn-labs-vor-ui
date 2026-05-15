import data from '@/../product/sections/dashboard/data.json'
import { Dashboard } from './components/Dashboard'

export default function DashboardViewPreview() {
  return (
    <Dashboard
      currentUserRole={data.currentUserRole as any}
      summary={data.summary}
      atsSyncStatus={data.atsSyncStatus as any}
      needsAttention={data.needsAttention as any}
      recentActivity={data.recentActivity as any}
      onCandidateClick={(id) => console.log('View candidate:', id)}
      onRequisitionClick={(id) => console.log('View requisition:', id)}
      onConnectATS={() => console.log('Connect ATS')}
      onActivityClick={(activityId, entityType, entityId) =>
        console.log('View activity:', activityId, entityType, entityId)
      }
      onTeamCapacityClick={() => console.log('View team capacity')}
    />
  )
}
