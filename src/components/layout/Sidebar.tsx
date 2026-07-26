'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'
import {
  LayoutDashboard, Euro, BookOpen, Package, Users,
  ClipboardCheck, Shield, Heart, ChevronLeft, Flame,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-4 w-4" />,
  Euro:            <Euro className="h-4 w-4" />,
  BookOpen:        <BookOpen className="h-4 w-4" />,
  Package:         <Package className="h-4 w-4" />,
  Users:           <Users className="h-4 w-4" />,
  ClipboardCheck:  <ClipboardCheck className="h-4 w-4" />,
  Shield:          <Shield className="h-4 w-4" />,
  Heart:           <Heart className="h-4 w-4" />,
}

// Status per nav module — in a real app this would come from live data
const moduleStatus: Record<string, 'ok' | 'warn' | 'alert' | 'idle'> = {
  '/tableau-de-bord': 'ok',
  '/ventes':          'ok',
  '/recettes':        'warn',
  '/stocks':          'alert',
  '/equipe':          'ok',
  '/operations':      'warn',
  '/hygiene':         'ok',
  '/clients':         'idle',
}

const statusClasses = {
  ok:    'status-ok',
  warn:  'status-warn',
  alert: 'status-alert animate-pulse-dot',
  idle:  'status-idle',
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col transition-all duration-300 ease-in-out shrink-0',
        'border-r',
        collapsed ? 'w-[60px]' : 'w-[220px]'
      )}
      style={{
        backgroundColor: 'rgb(var(--sidebar-bg))',
        borderColor: 'rgb(var(--sidebar-border))',
      }}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center h-14 px-3 border-b shrink-0',
          collapsed ? 'justify-center' : 'justify-between'
        )}
        style={{ borderColor: 'rgb(var(--sidebar-border))' }}
      >
        {!collapsed ? (
          <Link href="/tableau-de-bord" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-ember flex items-center justify-center shrink-0 shadow-ember">
              <Flame className="h-4 w-4 text-white" />
            </div>
            <span
              className="font-serif text-base font-bold tracking-tight"
              style={{ color: 'rgb(var(--sidebar-fg))' }}
            >
              RestoPilot
            </span>
          </Link>
        ) : (
          <Link href="/tableau-de-bord">
            <div className="w-8 h-8 rounded-lg bg-ember flex items-center justify-center shadow-ember">
              <Flame className="h-4 w-4 text-white" />
            </div>
          </Link>
        )}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(true)}
            className="h-6 w-6 shrink-0 opacity-40 hover:opacity-100 transition-opacity"
            style={{ color: 'rgb(var(--sidebar-fg))' }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-hidden">
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="w-full flex justify-center py-2 mb-2 opacity-30 hover:opacity-80 transition-opacity"
            style={{ color: 'rgb(var(--sidebar-fg))' }}
          >
            <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
          </button>
        )}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const status = moduleStatus[item.href] ?? 'idle'
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-150 group relative',
                isActive
                  ? 'bg-ember/20 text-ember font-medium'
                  : 'font-normal hover:bg-white/5',
                collapsed && 'justify-center px-0'
              )}
              style={{
                color: isActive ? 'rgb(var(--sidebar-active))' : 'rgb(var(--sidebar-fg) / 0.65)',
              }}
            >
              <span className={cn('shrink-0', isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100')}>
                {iconMap[item.icon]}
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {/* Status dot — the signature element */}
                  <span
                    className={cn('w-1.5 h-1.5 rounded-full shrink-0', statusClasses[status])}
                  />
                </>
              )}
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-ember rounded-r-full" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div
          className="px-3 py-3 border-t"
          style={{ borderColor: 'rgb(var(--sidebar-border))' }}
        >
          <p className="text-[11px]" style={{ color: 'rgb(var(--sidebar-fg) / 0.3)' }}>
            RestoPilot v1.0
          </p>
        </div>
      )}
    </aside>
  )
}
