import data from '@/../product/sections/interview-prep/data.json'
import { InterviewPrep } from './components/InterviewPrep'
import type {
  CandidateContext,
  JobRequisitionContext,
  Briefing,
  Strength,
  Gap,
  RiskArea,
  InterviewQuestion,
} from '@/../product/sections/interview-prep/types'

export default function InterviewPrepView() {
  return (
    <InterviewPrep
      candidate={data.candidate as CandidateContext}
      jobRequisition={data.jobRequisition as JobRequisitionContext}
      briefing={data.briefing as Briefing}
      strengths={data.strengths as Strength[]}
      gaps={data.gaps as Gap[]}
      riskAreas={data.riskAreas as RiskArea[]}
      interviewQuestions={data.interviewQuestions as InterviewQuestion[]}
      onCopyQuestion={(id) => console.log('Copy question:', id)}
      onCopyBriefing={() => console.log('Copy full briefing')}
      onRegenerateBriefing={() => console.log('Regenerate briefing')}
      onMarkReviewed={() => console.log('Mark as reviewed')}
    />
  )
}
