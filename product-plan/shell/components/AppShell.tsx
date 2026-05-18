import { useState } from 'react'
import { Menu, X, RefreshCw } from 'lucide-react'
import { MainNav, type NavEntry } from './MainNav'
import { UserMenu } from './UserMenu'

interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavEntry[]
  user?: {
    name: string
    role?: string
    avatarUrl?: string
  }
  breadcrumbs?: Array<{ label: string; href?: string }> // reserved for future breadcrumb rendering
  pageTitle?: string
  pageActions?: React.ReactNode
  syncStatus?: {
    lastSynced?: string
    status: 'idle' | 'syncing' | 'error'
  }
  onNavigate?: (href: string) => void
  onLogout?: () => void
  onSettings?: () => void
  onSync?: () => void
}

export function AppShell({
  children,
  navigationItems,
  user,
  breadcrumbs: _breadcrumbs,
  pageTitle,
  pageActions,
  syncStatus,
  onNavigate,
  onLogout,
  onSettings,
  onSync,
}: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex lg:w-60 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        {/* Logo */}
        <div className="px-6 py-5 shrink-0">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Vor
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2">
          <MainNav items={navigationItems} onNavigate={onNavigate} />
        </div>

        {/* Sync status */}
        {syncStatus && (
          <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onSync}
              className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors w-full"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${syncStatus.status === 'syncing' ? 'animate-spin' : ''}`}
                strokeWidth={1.5}
              />
              <span>
                {syncStatus.status === 'syncing'
                  ? 'Syncing...'
                  : syncStatus.status === 'error'
                    ? 'Sync failed'
                    : syncStatus.lastSynced
                      ? `Last synced: ${syncStatus.lastSynced}`
                      : 'Not synced'}
              </span>
            </button>
          </div>
        )}

        {/* User menu */}
        {user && (
          <div className="border-t border-slate-100 dark:border-slate-800 py-2">
            <UserMenu user={user} onLogout={onLogout} onSettings={onSettings} />
          </div>
        )}
      </aside>

      {/* Sidebar — tablet (icon-only rail) */}
      <aside className="hidden md:flex lg:hidden w-16 flex-col items-center border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 py-4 gap-4">
        {/* Logo */}
        <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
          V
        </div>

        {/* Navigation icons */}
        <nav className="flex-1 flex flex-col items-center gap-1 overflow-y-auto pt-2">
          {navigationItems.map((entry, index) => {
            if (entry.type === 'separator') {
              return <div key={`sep-${index}`} className="my-1 h-px w-8 bg-slate-200 dark:bg-slate-700" />
            }
            const item = entry.item
            const Icon = item.icon
            return (
              <button
                key={item.href}
                onClick={() => onNavigate?.(item.href)}
                title={item.label}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  item.isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </button>
            )
          })}
        </nav>

        {/* User avatar */}
        {user && (
          <div className="shrink-0">
            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-semibold">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
          </div>
        )}
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile header — only shown on small screens for hamburger */}
        <header className="md:hidden shrink-0 h-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center px-4 gap-4">
          <button
            className="p-1.5 -ml-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
          {pageTitle && (
            <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {pageTitle}
            </h1>
          )}
          <div className="flex-1" />
          {pageActions}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 dark:bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-xl flex flex-col animate-fade-in">
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Vor
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile navigation */}
            <div className="flex-1 overflow-y-auto py-2">
              <MainNav
                items={navigationItems}
                onNavigate={(href) => {
                  setMobileMenuOpen(false)
                  onNavigate?.(href)
                }}
              />
            </div>

            {/* Mobile user menu */}
            {user && (
              <div className="border-t border-slate-100 dark:border-slate-800 py-2">
                <UserMenu user={user} onLogout={onLogout} onSettings={onSettings} />
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}
