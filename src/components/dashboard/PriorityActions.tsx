'use client'

import { cn } from '@/lib/utils'
import { ArrowRight, ChevronRight } from 'lucide-react'

interface PriorityActionsProps {
  actions: string[]
}

export function PriorityActions({ actions }: PriorityActionsProps) {
  const priorities = [
    { label: 'Haute', color: 'bg-red-500' },
    { label: 'Moyenne', color: 'bg-orange-500' },
    { label: 'Normale', color: 'bg-yellow-500' },
  ]

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">3 actions prioritaires</h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {actions.map((action, i) => (
          <div key={i} className="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className={cn('w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5', priorities[i].color)}>
              <span className="text-white text-[10px] font-bold">{i + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">{action}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
