import { MessageCircle, Copy } from 'lucide-react'
import type { InterviewQuestion } from '@/../product/sections/interview-prep/types'
import { QuestionCard } from './QuestionCard'

interface QuestionsListProps {
  questions: InterviewQuestion[]
  onCopyQuestion?: (questionId: string) => void
  onCopyBriefing?: () => void
}

export function QuestionsList({
  questions,
  onCopyQuestion,
  onCopyBriefing,
}: QuestionsListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <MessageCircle
              className="w-4 h-4 text-blue-600 dark:text-blue-400"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
            Suggested Questions
          </h3>
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            {questions.length}
          </span>
        </div>
        <button
          onClick={() => onCopyBriefing?.()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
          Copy All
        </button>
      </div>

      <div className="space-y-2.5">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            onCopy={onCopyQuestion}
          />
        ))}
      </div>
    </div>
  )
}
