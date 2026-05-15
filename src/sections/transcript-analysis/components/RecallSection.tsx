import { MessageCircleQuestion } from 'lucide-react'
import type { RecallQuestion, InterviewerAnswer } from '@/../product/sections/transcript-analysis/types'
import { RecallQuestionCard } from './RecallQuestionCard'

interface RecallSectionProps {
  questions: RecallQuestion[]
  answers: InterviewerAnswer[]
  onSubmitAnswer?: (questionId: string, answer: string) => void
}

export function RecallSection({ questions, answers, onSubmitAnswer }: RecallSectionProps) {
  const sortedQuestions = [...questions].sort((a, b) => a.order - b.order)
  const answeredCount = answers.length

  const getAnswerForQuestion = (questionId: string) =>
    answers.find((a) => a.recallQuestionId === questionId)

  return (
    <div>
      {/* Section header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/15 flex items-center justify-center shrink-0 mt-0.5">
          <MessageCircleQuestion className="w-4 h-4 text-blue-500 dark:text-blue-400" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Interviewer Impressions
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
            Vor has questions only you can answer — your subjective take on the interview.
          </p>
        </div>
      </div>

      {/* Progress */}
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">
        {answeredCount} of {questions.length} answered
      </p>

      {/* Question cards */}
      <div className="space-y-3">
        {sortedQuestions.map((question) => (
          <RecallQuestionCard
            key={question.id}
            question={question}
            answer={getAnswerForQuestion(question.id)}
            onSubmitAnswer={onSubmitAnswer}
          />
        ))}
      </div>
    </div>
  )
}
