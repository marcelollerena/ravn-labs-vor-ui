import { LogOut, Settings, ChevronUp } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface UserMenuProps {
  user: {
    name: string
    role?: string
    avatarUrl?: string
  }
  collapsed?: boolean
  onLogout?: () => void
  onSettings?: () => void
}

export function UserMenu({ user, collapsed = false, onLogout, onSettings }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div ref={menuRef} className="relative px-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-semibold shrink-0">
            {initials}
          </div>
        )}
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                {user.name}
              </p>
              {user.role && (
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user.role}
                </p>
              )}
            </div>
            <ChevronUp
              className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform ${
                open ? '' : 'rotate-180'
              }`}
              strokeWidth={1.5}
            />
          </>
        )}
      </button>

      {open && (
        <div className="absolute bottom-full left-3 right-3 mb-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 animate-fade-in">
          <button
            onClick={() => {
              setOpen(false)
              onSettings?.()
            }}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Settings className="w-4 h-4" strokeWidth={1.5} />
            Settings
          </button>
          <div className="h-px bg-slate-100 dark:bg-slate-700 my-1" />
          <button
            onClick={() => {
              setOpen(false)
              onLogout?.()
            }}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
