'use client'

import { TrendingUp, TrendingDown, Users, Euro, ShoppingCart, Percent } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string
  subtitle: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  progress?: number        // 0-100, optional progress bar
  color: 'green' | 'orange' | 'red' | 'blue'
  delay?: number
}

const colorMap = {
  green:  { icon: 'text-pine bg-pine/10 border-pine/20',    bar: 'bg-pine',        text: 'text-pine' },
  orange: { icon: 'text-ember bg-ember/10 border-ember/20', bar: 'bg-ember',       text: 'text-ember' },
  red:    { icon: 'text-red-500 bg-red-500/10 border-red-500/20', bar: 'bg-red-500', text: 'text-red-500' },
  blue:   { icon: 'text-blue-500 bg-blue-500/10 border-blue-500/20', bar: 'bg-blue-500', text: 'text-blue-500' },
}

function KPICard({ title, value, subtitle, trend, icon, progress, color, delay = 0 }: KPICardProps) {
  const c = colorMap[color]
  return (
    <div
      className="rounded-xl border bg-card p-5 shadow-card card-lift animate-fade-up relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center border', c.icon)}>
          {icon}
        </div>
      </div>

      {/* Value — JetBrains Mono for data */}
      <p className="font-data text-[2rem] font-bold leading-none tracking-tight text-foreground mb-2">
        {value}
      </p>

      {/* Trend row */}
      <div className="flex items-center gap-1.5">
        {trend === 'up'   && <TrendingUp  className="w-3.5 h-3.5 text-pine shrink-0" />}
        {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500 shrink-0" />}
        <span className={cn(
          'text-xs font-medium',
          trend === 'up'      && 'text-pine',
          trend === 'down'    && 'text-red-500',
          trend === 'neutral' && 'text-muted-foreground'
        )}>
          {subtitle}
        </span>
      </div>

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-700', c.bar)}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      )}
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
  dailyRevenue, yesterdayRevenue, covers, avgBasket,
  fillRate, dailyObjective, estimatedMargin, plannedHours, actualHours,
}: KpiCardsProps) {
  const revenueDiff = yesterdayRevenue > 0 ? ((dailyRevenue - yesterdayRevenue) / yesterdayRevenue * 100) : 0
  const hourDiff    = plannedHours > 0 ? ((actualHours - plannedHours) / plannedHours * 100) : 0
  const revenueProgress = dailyObjective > 0 ? (dailyRevenue / dailyObjective) * 100 : 0

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
      <KPICard
        title="CA du jour"
        value={`${dailyRevenue.toFixed(0)} €`}
        subtitle={`${revenueDiff >= 0 ? '+' : ''}${revenueDiff.toFixed(1)}% vs hier`}
        trend={revenueDiff >= 0 ? 'up' : 'down'}
        icon={<Euro className="w-4 h-4" />}
        progress={revenueProgress}
        color="green"
        delay={0}
      />
      <KPICard
        title="Couverts"
        value={covers.toString()}
        subtitle={`Panier moy. ${avgBasket.toFixed(2)} €`}
        trend={covers >= 30 ? 'up' : covers >= 20 ? 'neutral' : 'down'}
        icon={<Users className="w-4 h-4" />}
        progress={(covers / 90) * 100}
        color="blue"
        delay={60}
      />
      <KPICard
        title="Taux de remplissage"
        value={`${fillRate} %`}
        subtitle={`Objectif ${Math.round(dailyObjective / 35)} € / couvert`}
        trend={fillRate >= 60 ? 'up' : fillRate >= 40 ? 'neutral' : 'down'}
        icon={<Percent className="w-4 h-4" />}
        progress={fillRate}
        color="orange"
        delay={120}
      />
      <KPICard
        title="Marge brute"
        value={`${estimatedMargin.toFixed(1)} %`}
        subtitle={`${Math.abs(hourDiff).toFixed(0)} % heures ${hourDiff >= 0 ? 'suppl.' : 'économisées'}`}
        trend={hourDiff <= 0 ? 'up' : 'down'}
        icon={<ShoppingCart className="w-4 h-4" />}
        progress={estimatedMargin}
        color={estimatedMargin >= 65 ? 'green' : estimatedMargin >= 55 ? 'orange' : 'red'}
        delay={180}
      />
    </div>
  )
}
