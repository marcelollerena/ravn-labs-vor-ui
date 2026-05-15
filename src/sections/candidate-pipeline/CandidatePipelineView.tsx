import data from '@/../product/sections/candidate-pipeline/data.json'
import { CandidatePipeline } from './components/CandidatePipeline'
import type {
  JobRequisition,
  PipelineStage,
  PipelineCandidate,
} from '@/../product/sections/candidate-pipeline/types'

export default function CandidatePipelineView() {
  return (
    <CandidatePipeline
      jobRequisition={data.jobRequisition as JobRequisition}
      pipelineStages={data.pipelineStages as PipelineStage[]}
      candidates={data.candidates as PipelineCandidate[]}
      onSelectCandidate={(id) => console.log('Open candidate workspace:', id)}
      onFilterByStage={(stageId) => console.log('Filter by stage:', stageId)}
      onSearch={(query) => console.log('Search:', query)}
      onBack={() => console.log('Navigate back to job requisitions')}
    />
  )
}
