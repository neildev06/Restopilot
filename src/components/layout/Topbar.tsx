'use client'

import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { UserNav } from './UserNav'
import { NotificationBell } from '@/components/shared/NotificationBell'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MobileNav } from './MobileNav'

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm px-4 lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <MobileNav />
        </SheetContent>
      </Sheet>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <NotificationBell />
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  )
}
