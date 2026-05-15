import data from '@/../product/sections/job-requisitions/data.json'
import { JobRequisitions } from './components/JobRequisitions'

export default function JobRequisitionsViewPreview() {
  return (
    <JobRequisitions
      summaryStats={data.summaryStats}
      requisitions={data.requisitions as any}
      departments={data.departments}
      onRequisitionClick={(id) => console.log('Navigate to candidate pipeline:', id)}
      onSearch={(query) => console.log('Search:', query)}
      onFilterChange={(filters) => console.log('Filters changed:', filters)}
    />
  )
}
