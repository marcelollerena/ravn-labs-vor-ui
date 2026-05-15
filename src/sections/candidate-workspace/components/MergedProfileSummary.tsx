import { Sparkles, Clock } from 'lucide-react'
import type { CandidateProfile } from '@/../product/sections/candidate-workspace/types'

interface MergedProfileSummaryProps {
  profile: CandidateProfile
}

function MergedField({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-0.5">
        {label}
      </span>
      <span className="text-sm text-slate-800 dark:text-slate-100">{value}</span>
    </div>
  )
}

export function MergedProfileSummary({ profile }: MergedProfileSummaryProps) {
  const generated = new Date(profile.generatedAt)
  const formattedDate = generated.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="bg-gradient-to-b from-blue-50/60 to-white dark:from-blue-900/10 dark:to-slate-800/50 border border-blue-200/60 dark:border-blue-800/30 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-blue-100/60 dark:border-blue-800/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Merged Profile</h2>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">AI-generated</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
          <Clock className="w-3 h-3" strokeWidth={1.5} />
          {formattedDate}
        </span>
      </div>

      {/* Summary */}
      <div className="px-5 py-4">
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
          {profile.summary}
        </p>
      </div>

      {/* Merged fields grid */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 p-4 bg-white/70 dark:bg-slate-800/40 rounded-lg border border-blue-100/40 dark:border-blue-800/20">
          <MergedField label="Title" value={profile.mergedFields.currentTitle} />
          <MergedField label="Company" value={profile.mergedFields.currentCompany} />
          <MergedField label="Location" value={profile.mergedFields.location} />
          <MergedField label="Experience" value={`${profile.mergedFields.yearsExperience} years`} />
          <MergedField label="Education" value={profile.mergedFields.education} />
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Top Skills
            </span>
            <div className="flex flex-wrap gap-1">
              {profile.mergedFields.topSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
