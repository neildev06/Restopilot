'use client'

import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface ObjectiveCardProps {
  title: string
  current: number
  objective: number
  unit?: string
  color?: 'green' | 'orange' | 'red'
}

export function ObjectiveCard({ title, current, objective, unit = '€', color = 'green' }: ObjectiveCardProps) {
  const progress = objective > 0 ? Math.min(100, Math.round((current / objective) * 100)) : 0
  const diff = current - objective

  const colorMap = {
    green: { bar: 'bg-green-500', text: 'text-green-600 dark:text-green-400' },
    orange: { bar: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-400' },
    red: { bar: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
  }

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
        {diff >= 0
          ? <TrendingUp className="w-4 h-4 text-green-500" />
          : <TrendingDown className="w-4 h-4 text-red-500" />
        }
      </div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {current.toFixed(0)}{unit}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          / {objective.toFixed(0)}{unit}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', colorMap[color].bar)}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className={cn('text-xs mt-1.5 font-medium', diff >= 0 ? colorMap.green.text : colorMap.red.text)}>
        {diff >= 0 ? `+${diff.toFixed(0)}${unit}` : `${diff.toFixed(0)}${unit}`} vs objectif
      </p>
    </div>
  )
}
