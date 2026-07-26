'use client'

import Link from 'next/link'
import { AlertTriangle, Package, Thermometer, Users, MessageSquare, Euro, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Alert } from '@/lib/types'

const alertConfig: Record<string, { icon: React.ReactNode; bg: string }> = {
  stock_rupture: {
    icon: <Package className="w-4 h-4" />,
    bg: 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400',
  },
  peremption: {
    icon: <AlertTriangle className="w-4 h-4" />,
    bg: 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400',
  },
  absence: {
    icon: <Users className="w-4 h-4" />,
    bg: 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400',
  },
  hygiene: {
    icon: <Thermometer className="w-4 h-4" />,
    bg: 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400',
  },
  avis_negatif: {
    icon: <MessageSquare className="w-4 h-4" />,
    bg: 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400',
  },
  facture: {
    icon: <Euro className="w-4 h-4" />,
    bg: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400',
  },
}

interface AlertPanelProps {
  alerts: Alert[]
}

export function AlertPanel({ alerts }: AlertPanelProps) {
  if (alerts.length === 0) {
    return (
      <div className="rounded-xl border bg-white dark:bg-gray-900 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Alertes</h3>
        <p className="text-sm text-gray-500">Aucune alerte active</p>
      </div>
    )
  }

  const severityOrder = { critical: 0, high: 1, normal: 2, low: 3 }
  const sorted = [...alerts].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Alertes ({alerts.length})
        </h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {sorted.map((alert, i) => {
          const config = alertConfig[alert.type] || { icon: <XCircle className="w-4 h-4" />, bg: 'bg-gray-100 text-gray-600' }
          const severityDot = alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'

          const content = (
            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <span className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', severityDot)} />
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs', config.bg)}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{alert.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{alert.message}</p>
              </div>
            </div>
          )

          if (alert.action_url) {
            return (
              <Link key={i} href={alert.action_url}>
                {content}
              </Link>
            )
          }
          return <div key={i}>{content}</div>
        })}
      </div>
    </div>
  )
}
