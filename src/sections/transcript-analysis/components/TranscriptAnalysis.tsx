import { useState, useCallback } from 'react'
import { FileText, Clock, Hash, Users, RefreshCw } from 'lucide-react'
import type {
  TranscriptAnalysisProps,
  InsightCategory,
} from '@/../product/sections/transcript-analysis/types'
import { TranscriptUploader } from './TranscriptUploader'
import { InsightSummaryBar } from './InsightSummaryBar'
import { InsightGroup } from './InsightGroup'
import { RecallSection } from './RecallSection'
import { TranscriptViewer } from './TranscriptViewer'

const categoryOrder: InsightCategory[] = ['strong', 'notable', 'weak', 'red_flag']

export function TranscriptAnalysis({
  candidate: _candidate,
  jobRequisition: _jobRequisition,
  interviewType,
  transcript,
  transcriptInsights,
  recallQuestions,
  interviewerAnswers,
  onUploadTranscript,
  onReplaceTranscript,
  onInsightClick,
  onAnswerRecallQuestion,
}: TranscriptAnalysisProps) {
  const [activeInsightId, setActiveInsightId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<InsightCategory | null>(null)
  const [showTranscriptMobile, setShowTranscriptMobile] = useState(false)

  const handleInsightClick = useCallback(
    (insightId: string) => {
      setActiveInsightId((prev) => (prev === insightId ? null : insightId))
      onInsightClick?.(insightId)
    },
    [onInsightClick]
  )

  const handleCategoryClick = useCallback((category: InsightCategory) => {
    setActiveCategory((prev) => (prev === category ? null : category))
  }, [])

  const handleTranscriptHighlightClick = useCallback(
    (insightId: string) => {
      setActiveInsightId(insightId)
      onInsightClick?.(insightId)
    },
    [onInsightClick]
  )

  // Group insights by category in display order
  const groupedInsights = categoryOrder
    .map((cat) => ({
      category: cat,
      insights: transcriptInsights.filter((i) => i.category === cat),
    }))
    .filter((group) => group.insights.length > 0)

  // Empty / processing states
  if (!transcript || transcript.status === 'pending') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <TranscriptUploader
          status="idle"
          onUpload={onUploadTranscript}
        />
      </div>
    )
  }

  if (transcript.status === 'processing') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <TranscriptUploader
          status="processing"
          fileName={transcript.fileName}
          wordCount={transcript.wordCount}
          duration={transcript.duration}
          onUpload={onUploadTranscript}
        />
      </div>
    )
  }

  // Analyzed state — two-panel layout
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Two-panel layout */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Left panel — Insights + Recall */}
        <div className="w-full lg:w-[58%] xl:w-[55%] overflow-y-auto border-r-0 lg:border-r border-slate-150 dark:border-slate-800">
          <div className="px-5 py-5 sm:px-6 max-w-[680px]">
            {/* Interview type badge + Transcript metadata bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  interviewType === 'hr_screening'
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                    : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                }`}
              >
                {interviewType === 'hr_screening' ? 'HR Screening' : 'Technical Interview'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <FileText className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="truncate max-w-[200px]">{transcript.fileName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                <Clock className="w-3 h-3" strokeWidth={1.5} />
                {transcript.duration}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                <Hash className="w-3 h-3" strokeWidth={1.5} />
                {transcript.wordCount.toLocaleString()} words
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                <Users className="w-3 h-3" strokeWidth={1.5} />
                {transcript.speakers.length} speakers
              </div>
              <button
                onClick={onReplaceTranscript}
                className="ml-auto flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <RefreshCw className="w-3 h-3" strokeWidth={1.5} />
                Replace
              </button>
            </div>

            {/* Insight summary strip */}
            <div className="mb-5">
              <InsightSummaryBar
                insights={transcriptInsights}
                activeCategory={activeCategory}
                onCategoryClick={handleCategoryClick}
              />
            </div>

            {/* Insight groups */}
            <div className="space-y-5 mb-8">
              {groupedInsights.map(({ category, insights }) => (
                <InsightGroup
                  key={category}
                  category={category}
                  insights={
                    activeCategory && activeCategory !== category
                      ? [] // hide non-active categories when filtering
                      : insights
                  }
                  activeInsightId={activeInsightId}
                  onInsightClick={handleInsightClick}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 dark:border-slate-800 my-6" />

            {/* Recall questions */}
            <RecallSection
              questions={recallQuestions}
              answers={interviewerAnswers}
              onSubmitAnswer={onAnswerRecallQuestion}
            />
          </div>
        </div>

        {/* Right panel — Transcript Viewer */}
        {/* Desktop: always visible */}
        <div className="hidden lg:flex w-[42%] xl:w-[45%] flex-col bg-white dark:bg-slate-900/50">
          <TranscriptViewer
            transcript={transcript}
            insights={transcriptInsights}
            activeInsightId={activeInsightId}
            onHighlightClick={handleTranscriptHighlightClick}
          />
        </div>

        {/* Mobile: toggle */}
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setShowTranscriptMobile(!showTranscriptMobile)}
            className="w-full px-5 py-3 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span>{showTranscriptMobile ? 'Hide Full Transcript' : 'View Full Transcript'}</span>
            <svg
              className={`w-4 h-4 transition-transform ${showTranscriptMobile ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showTranscriptMobile && (
            <div className="h-[60vh] bg-white dark:bg-slate-900/50">
              <TranscriptViewer
                transcript={transcript}
                insights={transcriptInsights}
                activeInsightId={activeInsightId}
                onHighlightClick={handleTranscriptHighlightClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
