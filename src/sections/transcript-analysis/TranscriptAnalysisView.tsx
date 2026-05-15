import data from '@/../product/sections/transcript-analysis/data.json'
import { TranscriptAnalysis } from './components/TranscriptAnalysis'
import type {
  Candidate,
  JobRequisition,
  Transcript,
  TranscriptInsight,
  RecallQuestion,
  InterviewerAnswer,
} from '@/../product/sections/transcript-analysis/types'

export default function TranscriptAnalysisView() {
  return (
    <TranscriptAnalysis
      candidate={data.candidate as Candidate}
      jobRequisition={data.jobRequisition as JobRequisition}
      interviewType="hr_screening"
      transcript={data.transcript as Transcript}
      transcriptInsights={data.transcriptInsights as TranscriptInsight[]}
      recallQuestions={data.recallQuestions as RecallQuestion[]}
      interviewerAnswers={data.interviewerAnswers as InterviewerAnswer[]}
      onUploadTranscript={(file) =>
        console.log('Upload transcript:', typeof file === 'string' ? 'pasted text' : file.name)
      }
      onReplaceTranscript={() => console.log('Replace transcript')}
      onInsightClick={(insightId) => console.log('Insight clicked:', insightId)}
      onAnswerRecallQuestion={(questionId, answer) =>
        console.log('Answer submitted:', questionId, answer)
      }
    />
  )
}
