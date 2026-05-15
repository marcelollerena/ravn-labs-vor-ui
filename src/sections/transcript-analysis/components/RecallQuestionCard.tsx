import { useState } from 'react'
import { Check, Pencil } from 'lucide-react'
import type { RecallQuestion, InterviewerAnswer } from '@/../product/sections/transcript-analysis/types'

interface RecallQuestionCardProps {
  question: RecallQuestion
  answer?: InterviewerAnswer
  onSubmitAnswer?: (questionId: string, answer: string) => void
}

export function RecallQuestionCard({ question, answer, onSubmitAnswer }: RecallQuestionCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftAnswer, setDraftAnswer] = useState(answer?.answer ?? '')
  const isAnswered = !!answer && !isEditing

  const handleSubmit = () => {
    if (draftAnswer.trim()) {
      onSubmitAnswer?.(question.id, draftAnswer.trim())
      setIsEditing(false)
    }
  }

  const handleEdit = () => {
    setDraftAnswer(answer?.answer ?? '')
    setIsEditing(true)
  }

  return (
    <div className="rounded-lg border border-slate-150 dark:border-slate-700/50 bg-white dark:bg-slate-800/30 overflow-hidden">
      <div className="px-4 py-3">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400">
            Q{question.order}
          </span>
          <span className="w-0.5 h-0.5 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {question.topic}
          </span>
        </div>

        {/* Question */}
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
          {question.question}
        </p>

        {/* Answer area */}
        <div className="mt-3">
          {isAnswered ? (
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 mt-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-emerald-500 dark:text-emerald-400" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {answer.answer}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    {new Date(answer.answeredAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    <Pencil className="w-2.5 h-2.5" strokeWidth={2} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <textarea
                value={draftAnswer}
                onChange={(e) => setDraftAnswer(e.target.value)}
                placeholder="Share your impression..."
                rows={2}
                className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:focus:border-blue-500 leading-relaxed"
                onFocus={(e) => {
                  e.target.rows = 4
                }}
              />
              <div className="flex justify-end mt-2">
                {isEditing && (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="mr-2 px-3 py-1.5 rounded-md text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={!draftAnswer.trim()}
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
