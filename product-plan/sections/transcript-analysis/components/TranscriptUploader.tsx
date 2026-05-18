import { useState, useRef, useCallback } from 'react'
import { Upload, FileText, ClipboardPaste, X } from 'lucide-react'

interface TranscriptUploaderProps {
  status: 'idle' | 'processing'
  fileName?: string
  wordCount?: number
  duration?: string
  onUpload?: (file: File | string) => void
}

const processingSteps = [
  'Reading transcript...',
  'Identifying speakers...',
  'Extracting insights...',
  'Generating follow-up questions...',
]

export function TranscriptUploader({
  status,
  fileName,
  wordCount,
  duration,
  onUpload,
}: TranscriptUploaderProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload')
  const [pasteText, setPasteText] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cycle processing steps for animation
  useState(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setProcessingStep((prev) => (prev + 1) % processingSteps.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  })

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) onUpload?.(file)
    },
    [onUpload]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) onUpload?.(file)
    },
    [onUpload]
  )

  const handlePasteSubmit = useCallback(() => {
    if (pasteText.trim()) onUpload?.(pasteText)
  }, [pasteText, onUpload])

  // Processing state
  if (status === 'processing') {
    return (
      <div className="flex items-center justify-center min-h-[420px]">
        <div className="w-full max-w-md text-center">
          <div className="mb-6">
            <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-500 dark:text-blue-400" strokeWidth={1.5} />
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full animate-[progress_8s_ease-in-out_infinite]" style={{ width: '70%' }} />
            </div>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 transition-opacity duration-300">
              {processingSteps[processingStep]}
            </p>
          </div>

          {/* Metadata parsed so far */}
          {(fileName || wordCount || duration) && (
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
              {fileName && <span>{fileName}</span>}
              {wordCount && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span>{wordCount.toLocaleString()} words</span>
                </>
              )}
              {duration && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span>{duration}</span>
                </>
              )}
            </div>
          )}

          <button className="mt-6 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  // Empty / upload state
  return (
    <div className="flex items-center justify-center min-h-[420px]">
      <div className="w-full max-w-lg">
        {/* Tab toggle */}
        <div className="flex gap-1 mb-5">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'upload'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Upload className="w-3.5 h-3.5" strokeWidth={1.5} />
            Upload file
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'paste'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <ClipboardPaste className="w-3.5 h-3.5" strokeWidth={1.5} />
            Paste text
          </button>
        </div>

        {activeTab === 'upload' ? (
          <>
            {/* Drag-and-drop zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 px-8 py-16 text-center ${
                isDragOver
                  ? 'border-blue-400 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-900/10'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className={`w-11 h-11 mx-auto mb-4 rounded-lg flex items-center justify-center transition-colors ${
                isDragOver
                  ? 'bg-blue-100 dark:bg-blue-900/30'
                  : 'bg-slate-100 dark:bg-slate-700/50'
              }`}>
                <Upload
                  className={`w-5 h-5 transition-colors ${
                    isDragOver
                      ? 'text-blue-500 dark:text-blue-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                  strokeWidth={1.5}
                />
              </div>

              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {isDragOver ? 'Drop transcript file here' : 'Drag & drop transcript file'}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                or click to browse
              </p>
              <p className="text-[11px] text-slate-300 dark:text-slate-600 mt-3">
                Accepts .txt, .md, .docx
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Paste text area */}
            <div className="relative">
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste the interview transcript here..."
                className="w-full min-h-[300px] px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:focus:border-blue-500 font-[var(--font-mono,'IBM_Plex_Mono',monospace)] leading-relaxed"
              />
              {pasteText && (
                <button
                  onClick={() => setPasteText('')}
                  className="absolute top-3 right-3 p-1 rounded-md text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              )}
            </div>
            <button
              onClick={handlePasteSubmit}
              disabled={!pasteText.trim()}
              className="mt-3 w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Analyze Transcript
            </button>
          </>
        )}

        {/* Helper text */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-4 leading-relaxed">
          Supports interview transcripts with speaker labels. Vor will identify speakers and extract key moments.
        </p>
      </div>
    </div>
  )
}
