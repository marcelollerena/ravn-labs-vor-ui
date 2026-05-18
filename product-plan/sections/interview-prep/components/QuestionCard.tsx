import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import type { InterviewQuestion, QuestionCategory } from '../types'

interface QuestionCardProps {
  question: InterviewQuestion
  index: number
  onCopy?: (questionId: string) => void
}

const categoryStyles: Record<QuestionCategory, string> = {
  'Technical Depth':
    'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Experience Gap':
    'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Leadership:
    'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'Career Trajectory':
    'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  'Culture Fit':
    'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'HR Screening':
    'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
}

export function QuestionCard({ question, index, onCopy }: QuestionCardProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    onCopy?.(question.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 p-4 sm:p-5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          {/* Question number */}
          <span className="mt-0.5 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {index + 1}
          </span>
          <div className="min-w-0">
            {/* Category tag */}
            <span
              className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${
                categoryStyles[question.category]
              }`}
            >
              {question.category}
            </span>

            {/* Question text */}
            <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              {question.question}
            </p>

            {/* Context */}
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
              {question.context}
            </p>
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-all ${
            copied
              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100'
          }`}
          title="Copy question"
        >
          {copied ? (
            <Check className="w-4 h-4" strokeWidth={2} />
          ) : (
            <Copy className="w-4 h-4" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  )
}
