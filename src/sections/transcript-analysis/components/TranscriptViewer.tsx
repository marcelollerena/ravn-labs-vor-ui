import { useMemo, useRef, useEffect } from 'react'
import type { Transcript, TranscriptInsight, InsightCategory } from '@/../product/sections/transcript-analysis/types'

interface TranscriptViewerProps {
  transcript: Transcript
  insights: TranscriptInsight[]
  activeInsightId?: string | null
  onHighlightClick?: (insightId: string) => void
}

const highlightColors: Record<InsightCategory, { bg: string; activeBg: string; border: string }> = {
  strong: {
    bg: 'bg-emerald-50/60 dark:bg-emerald-900/10',
    activeBg: 'bg-blue-100/80 dark:bg-blue-900/20',
    border: 'border-l-emerald-300 dark:border-l-emerald-600',
  },
  notable: {
    bg: 'bg-amber-50/50 dark:bg-amber-900/10',
    activeBg: 'bg-blue-100/80 dark:bg-blue-900/20',
    border: 'border-l-amber-300 dark:border-l-amber-600',
  },
  weak: {
    bg: 'bg-slate-100/60 dark:bg-slate-700/20',
    activeBg: 'bg-blue-100/80 dark:bg-blue-900/20',
    border: 'border-l-slate-300 dark:border-l-slate-500',
  },
  red_flag: {
    bg: 'bg-red-50/50 dark:bg-red-900/10',
    activeBg: 'bg-blue-100/80 dark:bg-blue-900/20',
    border: 'border-l-red-300 dark:border-l-red-600',
  },
}


function parseTranscriptIntoBlocks(rawText: string) {
  // Split by speaker turns (double newline, then "SpeakerName:")
  const lines = rawText.split('\n\n')
  return lines
    .filter((line) => line.trim())
    .map((line) => {
      const colonIdx = line.indexOf(':')
      if (colonIdx > 0 && colonIdx < 40) {
        const speaker = line.slice(0, colonIdx).trim()
        const text = line.slice(colonIdx + 1).trim()
        return { speaker, text }
      }
      return { speaker: '', text: line.trim() }
    })
}

export function TranscriptViewer({
  transcript,
  insights,
  activeInsightId,
  onHighlightClick,
}: TranscriptViewerProps) {
  const activeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeInsightId && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeInsightId])

  const blocks = useMemo(() => parseTranscriptIntoBlocks(transcript.rawText), [transcript.rawText])

  // Map insights to their quote text for matching
  const insightsByQuote = useMemo(() => {
    return insights.map((ins) => ({
      ...ins,
      normalizedQuote: ins.quote.toLowerCase().replace(/\s+/g, ' ').trim(),
    }))
  }, [insights])

  // Check if a block's text contains any insight quote
  const findInsightsInBlock = (text: string) => {
    const normalizedText = text.toLowerCase().replace(/\s+/g, ' ').trim()
    return insightsByQuote.filter((ins) => normalizedText.includes(ins.normalizedQuote))
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-150 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Transcript
          </h3>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            {transcript.speakers.join(' & ')}
          </span>
        </div>
      </div>

      {/* Transcript body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {blocks.map((block, idx) => {
          const matchedInsights = findInsightsInBlock(block.text)
          const hasHighlight = matchedInsights.length > 0
          const activeInsight = matchedInsights.find((i) => i.id === activeInsightId)
          const primaryInsight = activeInsight || matchedInsights[0]
          const isActive = !!activeInsight

          const isRecruiter =
            block.speaker.toLowerCase() === 'recruiter' ||
            block.speaker.toLowerCase().includes('interviewer')

          return (
            <div
              key={idx}
              ref={isActive ? activeRef : undefined}
              onClick={hasHighlight && primaryInsight ? () => onHighlightClick?.(primaryInsight.id) : undefined}
              className={`relative rounded-md transition-all duration-200 ${
                hasHighlight ? 'cursor-pointer' : ''
              } ${
                isActive && primaryInsight
                  ? `${highlightColors[primaryInsight.category].activeBg} border-l-[3px] border-l-blue-400 dark:border-l-blue-500 pl-3.5 pr-3 py-2 -ml-1`
                  : hasHighlight && primaryInsight
                    ? `${highlightColors[primaryInsight.category].bg} ${highlightColors[primaryInsight.category].border} border-l-2 pl-3.5 pr-3 py-2 -ml-1 hover:opacity-80`
                    : 'pl-0'
              }`}
            >
              {block.speaker && (
                <p
                  className={`text-xs font-semibold mb-0.5 ${
                    isRecruiter
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {block.speaker}
                </p>
              )}
              <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-[var(--font-mono,'IBM_Plex_Mono',monospace)]">
                {block.text}
              </p>

              {/* Hover tooltip for highlighted passages */}
              {hasHighlight && primaryInsight && !isActive && (
                <div className="absolute -top-1 right-2 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <div className="px-2 py-1 rounded bg-slate-800 dark:bg-slate-200 text-[10px] text-white dark:text-slate-800 whitespace-nowrap shadow-lg">
                    {primaryInsight.summary}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
