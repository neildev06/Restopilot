'use client'

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { Notification } from '@/lib/types'

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(10)
      if (data) setNotifications(data)
    }
    fetchNotifications()
  }, [supabase])

  const unreadCount = notifications.length

  const iconMap: Record<string, string> = {
    alert: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    reminder: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    task: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    info: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-sm">Notifications</h3>
        </div>
        <ScrollArea className="h-72">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">
              Aucune notification
            </div>
          ) : (
            notifications.map((n) => (
              <Link
                key={n.id}
                href={n.action_url ?? '#'}
                className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex gap-3">
                  <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", iconMap[n.type])} />
                  <div>
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
