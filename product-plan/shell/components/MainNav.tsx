import type { ComponentType, SVGProps } from 'react'
import {
  LayoutDashboard,
  Link2,
  Briefcase,
  Users,
  UserCircle,
  MessageSquareText,
  FileText,
  ClipboardCheck,
  UsersRound,
} from 'lucide-react'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>

export type NavEntry =
  | { type: 'item'; item: NavItem }
  | { type: 'separator' }

export interface NavItem {
  label: string
  href: string
  icon: IconComponent
  isActive?: boolean
  badge?: string
}

interface MainNavProps {
  items: NavEntry[]
  collapsed?: boolean
  onNavigate?: (href: string) => void
}

const sectionIcons: Record<string, IconComponent> = {
  dashboard: LayoutDashboard,
  'ats-connection': Link2,
  'job-requisitions': Briefcase,
  'candidate-pipeline': Users,
  'candidate-workspace': UserCircle,
  'interview-prep': MessageSquareText,
  'transcript-analysis': FileText,
  scorecard: ClipboardCheck,
  'team-capacity': UsersRound,
}

export function getIconForSection(sectionId: string): IconComponent {
  return sectionIcons[sectionId] || Briefcase
}

export function MainNav({ items, collapsed = false, onNavigate }: MainNavProps) {
  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {items.map((entry, index) => {
        if (entry.type === 'separator') {
          return (
            <div
              key={`sep-${index}`}
              className="my-1.5 h-px bg-slate-200 dark:bg-slate-800 mx-2"
            />
          )
        }

        const item = entry.item
        const Icon = item.icon
        return (
          <button
            key={item.href}
            onClick={() => onNavigate?.(item.href)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              item.isActive
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Icon
              className={`w-5 h-5 shrink-0 ${
                item.isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
              strokeWidth={1.5}
            />
            {!collapsed && (
              <>
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        )
      })}
    </nav>
  )
}
