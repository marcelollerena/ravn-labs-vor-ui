import { useState } from 'react'
import { AppShell } from './components/AppShell'
import { getIconForSection } from './components/MainNav'
import {
  Briefcase,
  Users,
  Clock,
  ClipboardCheck,
  TrendingUp,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

/** Navigation structure with separator groups:
 *  Dashboard | Job Requisitions, Candidates, Scorecards | Team Capacity | ATS Connection
 */
const navStructure: Array<{ id: string; label: string; href: string } | 'separator'> = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  'separator',
  { id: 'job-requisitions', label: 'Job Requisitions', href: '/job-requisitions' },
  { id: 'candidate-pipeline', label: 'Candidates', href: '/candidates' },
  { id: 'scorecard', label: 'Scorecards', href: '/scorecards' },
  'separator',
  { id: 'team-capacity', label: 'Team Capacity', href: '/team-capacity' },
  'separator',
  { id: 'ats-connection', label: 'ATS Connection', href: '/ats-connection' },
]

const user = {
  name: 'Sarah Mitchell',
  role: 'Recruiter',
}

/** Sample dashboard content to show realistic shell usage */
function DashboardContent() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Good morning, Sarah
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Here's what needs your attention today.
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
          Recruiter
        </span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          icon={Briefcase}
          label="Open Requisitions"
          value="12"
          change="+2 this week"
          color="blue"
        />
        <SummaryCard
          icon={Users}
          label="Active Candidates"
          value="47"
          change="8 new today"
          color="emerald"
        />
        <SummaryCard
          icon={Clock}
          label="Pending Reviews"
          value="5"
          change="3 due today"
          color="amber"
        />
        <SummaryCard
          icon={ClipboardCheck}
          label="Scorecards Sent"
          value="23"
          change="this month"
          color="slate"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidates needing action */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Candidates Needing Action
            </h2>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <CandidateRow
              name="Maria Chen"
              role="Senior Frontend Engineer"
              action="Technical interview prep needed"
              actionType="warning"
            />
            <CandidateRow
              name="James Wilson"
              role="Product Designer"
              action="Scorecard ready to review"
              actionType="info"
            />
            <CandidateRow
              name="Priya Sharma"
              role="Engineering Manager"
              action="HR transcript uploaded — awaiting analysis"
              actionType="info"
            />
            <CandidateRow
              name="Alex Nguyen"
              role="Senior Backend Engineer"
              action="Technical interview tomorrow"
              actionType="urgent"
            />
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h2>
          </div>
          <div className="px-5 py-3 space-y-4">
            <ActivityItem
              text="Scorecard for Maria Chen pushed to Greenhouse"
              time="2 hours ago"
            />
            <ActivityItem
              text="Interview prep generated for Alex Nguyen"
              time="4 hours ago"
            />
            <ActivityItem
              text="3 new candidates synced from ATS"
              time="Yesterday"
            />
            <ActivityItem
              text="Transcript analysis complete for James Wilson"
              time="Yesterday"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  change,
  color,
}: {
  icon: typeof Briefcase
  label: string
  value: string
  change: string
  color: 'blue' | 'emerald' | 'amber' | 'slate'
}) {
  const iconColors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconColors[color]}`}>
          <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
        <TrendingUp className="w-3 h-3" />
        {change}
      </p>
    </div>
  )
}

function CandidateRow({
  name,
  role,
  action,
  actionType,
}: {
  name: string
  role: string
  action: string
  actionType: 'info' | 'warning' | 'urgent'
}) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  const actionColors = {
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-amber-600 dark:text-amber-400',
    urgent: 'text-red-600 dark:text-red-400',
  }

  return (
    <div className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-semibold shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{role}</p>
      </div>
      <div className={`flex items-center gap-1.5 text-xs font-medium ${actionColors[actionType]}`}>
        {actionType === 'urgent' && <AlertCircle className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{action}</span>
      </div>
    </div>
  )
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mt-1.5 shrink-0" />
      <div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{text}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{time}</p>
      </div>
    </div>
  )
}

export default function ShellPreview() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const navigationItems = navStructure.map((entry) => {
    if (entry === 'separator') {
      return { type: 'separator' as const }
    }
    return {
      type: 'item' as const,
      item: {
        label: entry.label,
        href: entry.href,
        icon: getIconForSection(entry.id),
        isActive: entry.id === activeSection,
        badge: entry.id === 'candidate-pipeline' ? '47' : undefined,
      },
    }
  })

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      breadcrumbs={[{ label: 'Dashboard' }]}
      syncStatus={{ lastSynced: '10 min ago', status: 'idle' }}
      onNavigate={(href) => {
        const section = navStructure.find((s) => s !== 'separator' && s.href === href)
        if (section && section !== 'separator') setActiveSection(section.id)
      }}
      onLogout={() => console.log('Logout')}
      onSettings={() => console.log('Settings')}
      onSync={() => console.log('Sync')}
    >
      <DashboardContent />
    </AppShell>
  )
}
