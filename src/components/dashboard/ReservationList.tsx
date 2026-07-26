'use client'

import type { Reservation } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Clock, Users } from 'lucide-react'

interface ReservationListProps {
  reservations: Reservation[]
}

export function ReservationList({ reservations }: ReservationListProps) {
  const sorted = [...reservations].sort((a, b) => a.reservation_time.localeCompare(b.reservation_time))

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Réservations du jour</h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {sorted.map((r) => {
          const [hours, minutes] = r.reservation_time.split(':')
          const timeStr = `${hours}h${minutes}`
          return (
            <div key={r.id} className="flex items-center gap-3 p-3">
              <div className="w-14 text-center shrink-0">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{timeStr}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{r.customer_name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    {r.covers} pers.
                  </span>
                  {r.allergies && r.allergies.length > 0 && (
                    <span className="text-xs text-orange-500">Allergies signalées</span>
                  )}
                </div>
              </div>
              <span className={cn(
                'text-xs px-2 py-1 rounded-full font-medium',
                r.status === 'confirmed' && 'bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400'
              )}>
                Confirmé
              </span>
            </div>
          )
        })}
        {sorted.length === 0 && (
          <p className="p-4 text-sm text-gray-500 text-center">Aucune réservation aujourd&apos;hui</p>
        )}
      </div>
    </div>
  )
}
