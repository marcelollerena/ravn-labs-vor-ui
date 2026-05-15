import data from '@/../product/sections/team-capacity/data.json'
import { TeamCapacity } from './components/TeamCapacity'

export default function TeamCapacityView() {
  return (
    <TeamCapacity
      summary={data.summary}
      members={data.members as any}
      onMemberClick={(id) => console.log('View member:', id)}
      onAssignToRequisition={(memberId, reqId) =>
        console.log('Assign:', memberId, 'to', reqId)
      }
      onSearch={(query) => console.log('Search:', query)}
      onFilterChange={(filters) => console.log('Filters:', filters)}
    />
  )
}
