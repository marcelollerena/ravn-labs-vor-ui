import data from '@/../product/sections/scorecard/data.json'
import { ScorecardView } from './components/ScorecardView'
import type { Scorecard } from '@/../product/sections/scorecard/types'
import { useState } from 'react'

const scorecards = data.scorecards as Scorecard[]

export default function ScorecardPreview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeScorecard = scorecards[activeIndex]

  return (
    <div>
      {/* Scorecard switcher — for previewing different states */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 px-5 sm:px-8">
        <div className="flex gap-0 -mb-px overflow-x-auto">
          {scorecards.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => setActiveIndex(i)}
              className={`
                relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${i === activeIndex
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }
              `}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  sc.status === 'generating'
                    ? 'bg-blue-400 animate-pulse'
                    : sc.status === 'draft'
                    ? 'bg-amber-400'
                    : sc.status === 'pushed'
                    ? 'bg-emerald-400'
                    : 'bg-red-400'
                }`}
              />
              {sc.candidateName || 'Generating...'}
              {i === activeIndex && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <ScorecardView
        scorecard={activeScorecard}
        onEditSection={(id, section, value) =>
          console.log('Edit section:', { id, section, value })
        }
        onPushToATS={(id) => console.log('Push to ATS:', id)}
        onRetryPush={(id) => console.log('Retry push:', id)}
        onRegenerate={(id) => console.log('Regenerate:', id)}
        onDownload={(id) => console.log('Download:', id)}
      />
    </div>
  )
}
