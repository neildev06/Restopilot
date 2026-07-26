'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MOBILE_NAV_ITEMS } from '@/lib/constants'
import { LayoutDashboard, BookOpen, Package, ClipboardCheck, Users } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-5 w-5" />,
  BookOpen:        <BookOpen className="h-5 w-5" />,
  Package:         <Package className="h-5 w-5" />,
  ClipboardCheck:  <ClipboardCheck className="h-5 w-5" />,
  Users:           <Users className="h-5 w-5" />,
}

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md">
      <div className="flex items-center justify-around h-16 px-2 safe-area-inset-bottom">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all duration-150 rounded-lg',
                isActive
                  ? 'text-ember'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span className={cn(
                'transition-transform duration-150',
                isActive && 'scale-110'
              )}>
                {iconMap[item.icon]}
              </span>
              <span>{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-ember" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
