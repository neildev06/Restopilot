'use client'

import { TrendingUp, TrendingDown, Users, Euro, ShoppingCart, Percent } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string
  subtitle: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  color: 'green' | 'orange' | 'red' | 'blue'
}

function KPICard({ title, value, subtitle, trend, icon, color }: KPICardProps) {
  const colorLabels = {
    green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/40',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800/40',
    red: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/40',
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/40',
  }

  return (
    <div className="rounded-xl border bg-white dark:bg-stone-900 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 text-stone-500 dark:text-stone-400">
        <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
        <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center border', colorLabels[color])}>
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">{value}</p>
        <div className="flex items-center gap-1.5">
          {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-green-500" />}
          {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
          <span className={cn(
            'text-xs font-medium',
            trend === 'up' && 'text-green-600 dark:text-green-400',
            trend === 'down' && 'text-red-600 dark:text-red-400',
            trend === 'neutral' && 'text-stone-500 dark:text-stone-400'
          )}>
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  )
}

interface KpiCardsProps {
  dailyRevenue: number
  yesterdayRevenue: number
  covers: number
  avgBasket: number
  fillRate: number
  dailyObjective: number
  estimatedMargin: number
  plannedHours: number
  actualHours: number
}

export function KpiCards({
  dailyRevenue,
  yesterdayRevenue,
  covers,
  avgBasket,
  fillRate,
  dailyObjective,
  estimatedMargin,
  plannedHours,
  actualHours,
}: KpiCardsProps) {
  const revenueDiff = yesterdayRevenue > 0 ? ((dailyRevenue - yesterdayRevenue) / yesterdayRevenue * 100) : 0
  const hourDiff = plannedHours > 0 ? ((actualHours - plannedHours) / plannedHours * 100) : 0

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <KPICard
        title="CA du jour"
        value={`${dailyRevenue.toFixed(0)}€`}
        subtitle={`${revenueDiff >= 0 ? '+' : ''}${revenueDiff.toFixed(1)}% vs hier`}
        trend={revenueDiff >= 0 ? 'up' : 'down'}
        icon={<Euro className="w-4 h-4" />}
        color="green"
      />
      <KPICard
        title="Couverts"
        value={covers.toString()}
        subtitle={`Panier moyen ${avgBasket.toFixed(2)}€`}
        trend={covers >= 30 ? 'up' : covers >= 20 ? 'neutral' : 'down'}
        icon={<Users className="w-4 h-4" />}
        color="blue"
      />
      <KPICard
        title="Taux de remplissage"
        value={`${fillRate}%`}
        subtitle={`Objectif: ${Math.round(dailyObjective / 35)}€/couvert`}
        trend={fillRate >= 60 ? 'up' : fillRate >= 40 ? 'neutral' : 'down'}
        icon={<Percent className="w-4 h-4" />}
        color="orange"
      />
      <KPICard
        title="Marge brute estimée"
        value={`${estimatedMargin.toFixed(1)}%`}
        subtitle={`${Math.abs(hourDiff).toFixed(0)}% heures ${hourDiff >= 0 ? 'supplémentaires' : 'économisées'}`}
        trend={hourDiff <= 0 ? 'up' : 'down'}
        icon={<ShoppingCart className="w-4 h-4" />}
        color={estimatedMargin >= 65 ? 'green' : estimatedMargin >= 55 ? 'orange' : 'red'}
      />
    </div>
  )
}
