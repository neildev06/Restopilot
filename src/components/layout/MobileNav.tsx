'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'
import {
  LayoutDashboard, Euro, BookOpen, Package, Users,
  ClipboardCheck, Shield, Heart,
} from 'lucide-react'

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

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col h-full">
      <div className="flex items-center h-14 border-b border-gray-200 dark:border-gray-800 px-4">
        <span className="text-xl font-bold text-terracotta">RP</span>
        <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-gray-100">RestoPilot</span>
      </div>
      <div className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-terracotta/10 text-terracotta"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {iconMap[item.icon]}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
