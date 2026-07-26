'use client'

import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { UserNav } from './UserNav'
import { NotificationBell } from '@/components/shared/NotificationBell'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MobileNav } from './MobileNav'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'

function ServiceBadge() {
  const hour = new Date().getHours()
  const isLunch  = hour >= 11 && hour < 15
  const isDinner = hour >= 18 && hour < 23

  if (isLunch)  return (
    <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-pine/10 text-pine border border-pine/20">
      <span className="w-1.5 h-1.5 rounded-full bg-pine animate-pulse-dot" />
      Service midi
    </span>
  )
  if (isDinner) return (
    <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-ember/10 text-ember border border-ember/20">
      <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
      Service soir
    </span>
  )
  return (
    <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
      Hors service
    </span>
  )
}

export function Topbar() {
  const pathname = usePathname()
  const currentPage = NAV_ITEMS.find(item => pathname.startsWith(item.href))

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-background/90 backdrop-blur-md px-4 lg:px-5">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <MobileNav />
        </SheetContent>
      </Sheet>

      {/* Page title — desktop */}
      {currentPage && (
        <span className="hidden lg:block text-sm font-medium text-muted-foreground">
          {currentPage.label}
        </span>
      )}

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        <ServiceBadge />
        <NotificationBell />
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  )
}
