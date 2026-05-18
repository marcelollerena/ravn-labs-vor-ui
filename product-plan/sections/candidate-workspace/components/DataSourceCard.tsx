import { Database, FileText, Linkedin, Clock, ExternalLink } from 'lucide-react'
import type {
  ATSRecord,
  ResumeDocument,
  LinkedInProfile,
  WorkHistoryEntry,
} from '../types'

// -------------------------------------------------------------------
// Shared helpers
// -------------------------------------------------------------------

function StatusChip({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ingested: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    pending: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'not-available': 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
  }

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${styles[status] || styles['not-available']}`}>
      {status.replace('-', ' ')}
    </span>
  )
}

function Timestamp({ iso }: { iso: string }) {
  const d = new Date(iso)
  const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
      <Clock className="w-3 h-3" strokeWidth={1.5} />
      {formatted}
    </span>
  )
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <span className="text-sm text-slate-700 dark:text-slate-200">{children}</span>
    </div>
  )
}

function SkillPill({ name, count }: { name: string; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
      {name}
      {count !== undefined && (
        <span className="text-[10px] text-slate-400 dark:text-slate-500">{count}</span>
      )}
    </span>
  )
}

function WorkTimeline({ entries }: { entries: WorkHistoryEntry[] }) {
  return (
    <div className="space-y-2.5">
      {entries.map((entry, i) => (
        <div key={i} className="flex gap-2.5">
          <div className="flex flex-col items-center pt-1.5">
            <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'}`} />
            {i < entries.length - 1 && <div className="flex-1 w-px bg-slate-200 dark:bg-slate-700 mt-1" />}
          </div>
          <div className="pb-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{entry.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {entry.company} · {entry.duration}
            </p>
            {entry.highlights && entry.highlights.length > 0 && (
              <ul className="mt-1.5 space-y-0.5">
                {entry.highlights.map((h, j) => (
                  <li key={j} className="text-xs text-slate-500 dark:text-slate-400 leading-snug flex gap-1.5">
                    <span className="text-slate-300 dark:text-slate-600 shrink-0 mt-0.5">·</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// -------------------------------------------------------------------
// ATS Record Card
// -------------------------------------------------------------------

interface ATSRecordCardProps {
  record: ATSRecord
}

export function ATSRecordCard({ record }: ATSRecordCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
      <div className="border-b border-slate-100 dark:border-slate-700/40 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <Database className="w-4 h-4 text-slate-500 dark:text-slate-400" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">ATS Record</h3>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 capitalize">{record.source}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusChip status={record.status} />
          <Timestamp iso={record.ingestedAt} />
        </div>
      </div>
      <div className="px-5 py-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <FieldRow label="Title">{record.fields.currentTitle}</FieldRow>
          <FieldRow label="Company">{record.fields.currentCompany}</FieldRow>
          <FieldRow label="Stage">{record.fields.stage}</FieldRow>
          <FieldRow label="Source">{record.fields.source}</FieldRow>
        </div>
        {record.fields.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {record.fields.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------------
// Resume Card
// -------------------------------------------------------------------

interface ResumeCardProps {
  resume: ResumeDocument
}

export function ResumeCard({ resume }: ResumeCardProps) {
  const { parsedData } = resume

  return (
    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
      <div className="border-b border-slate-100 dark:border-slate-700/40 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Resume</h3>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate max-w-[140px] inline-block">
              {resume.fileName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusChip status={resume.status} />
          <Timestamp iso={resume.uploadedAt} />
        </div>
      </div>
      <div className="px-5 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FieldRow label="Title">{parsedData.currentTitle}</FieldRow>
          <FieldRow label="Company">{parsedData.currentCompany}</FieldRow>
          <FieldRow label="Experience">{parsedData.yearsExperience} years</FieldRow>
          <FieldRow label="Education">{parsedData.education[0]?.degree}, {parsedData.education[0]?.institution}</FieldRow>
        </div>

        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
            Work History
          </span>
          <WorkTimeline entries={parsedData.workHistory} />
        </div>

        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
            Skills
          </span>
          <div className="flex flex-wrap gap-1.5">
            {parsedData.skills.map((s) => (
              <SkillPill key={s} name={s} />
            ))}
          </div>
        </div>

        {parsedData.certifications.length > 0 && (
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
              Certifications
            </span>
            {parsedData.certifications.map((c) => (
              <span key={c} className="text-xs text-slate-600 dark:text-slate-300">{c}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------------
// LinkedIn Card
// -------------------------------------------------------------------

interface LinkedInCardProps {
  profile: LinkedInProfile
}

export function LinkedInCard({ profile }: LinkedInCardProps) {
  const { parsedData } = profile

  return (
    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
      <div className="border-b border-slate-100 dark:border-slate-700/40 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <Linkedin className="w-4 h-4 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">LinkedIn</h3>
            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-blue-500 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
            >
              Profile <ExternalLink className="w-2.5 h-2.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusChip status={profile.status} />
          <Timestamp iso={profile.ingestedAt} />
        </div>
      </div>
      <div className="px-5 py-4 space-y-4">
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{parsedData.headline}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {parsedData.location} · {parsedData.connectionCount} connections
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FieldRow label="Title">{parsedData.currentTitle}</FieldRow>
          <FieldRow label="Company">{parsedData.currentCompany}</FieldRow>
        </div>

        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
            Work History
          </span>
          <WorkTimeline entries={parsedData.workHistory} />
        </div>

        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
            Skills &amp; Endorsements
          </span>
          <div className="flex flex-wrap gap-1.5">
            {parsedData.skills.map((s) => (
              <SkillPill
                key={s}
                name={s}
                count={parsedData.endorsements[s]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
