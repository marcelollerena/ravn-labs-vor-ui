import { Check } from 'lucide-react'
import type { EvaluationProgress } from '@/../product/sections/candidate-workspace/types'

interface EvaluationProgressBarProps {
  progress: EvaluationProgress
}

interface Step {
  label: string
  isDone: (progress: EvaluationProgress) => boolean
}

const steps: Step[] = [
  { label: 'Profile', isDone: (p) => p.profileComplete },
  { label: 'Interview Prep', isDone: (p) => p.interviewPrepReady },
  { label: 'HR Interview', isDone: (p) => p.interviews?.hrCompleted ?? false },
  { label: 'Technical Interview', isDone: (p) => p.interviews?.technicalCompleted ?? false },
  { label: 'Scorecard', isDone: (p) => p.scorecardGenerated },
]

export function EvaluationProgressBar({ progress }: EvaluationProgressBarProps) {
  const completedCount = steps.filter((s) => s.isDone(progress)).length

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-slate-500 dark:text-slate-400 mr-1.5 hidden sm:inline">
        {completedCount}/{steps.length}
      </span>
      <div className="flex items-center gap-0.5">
        {steps.map((step, i) => {
          const done = step.isDone(progress)
          return (
            <div key={step.label} className="flex items-center gap-0.5">
              <div
                className={`
                  flex items-center justify-center rounded-full transition-colors
                  ${done
                    ? 'w-5 h-5 bg-blue-600 dark:bg-blue-500'
                    : 'w-5 h-5 border-2 border-slate-200 dark:border-slate-600'
                  }
                `}
                title={step.label}
              >
                {done && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-3 h-0.5 ${
                    done && steps[i + 1].isDone(progress)
                      ? 'bg-blue-600 dark:bg-blue-500'
                      : 'bg-slate-200 dark:bg-slate-600'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
