'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'
import {
  LayoutDashboard, Euro, BookOpen, Package, Users,
  ClipboardCheck, Shield, Heart, ChevronLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-5 w-5" />,
  Euro: <Euro className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
  Package: <Package className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  ClipboardCheck: <ClipboardCheck className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      "hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all duration-200",
      collapsed ? "w-16" : "w-56"
    )}>
      <div className={cn(
        "flex items-center h-14 border-b border-gray-200 dark:border-gray-800 px-3",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed ? (
          <Link href="/tableau-de-bord" className="flex items-center gap-2">
            <span className="text-xl font-serif font-bold text-terracotta tracking-tight">RestoPilot</span>
          </Link>
        ) : (
          <Link href="/tableau-de-bord" className="text-xl font-serif font-bold text-terracotta">RP</Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-6 w-6 shrink-0"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-terracotta/10 text-terracotta"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              {iconMap[item.icon]}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-400">RestoPilot v1.0.0</p>
        </div>
      )}
    </aside>
  )
}
