'use client'

import { getDashboardSummary, getWeeklySalesData, DEMO_RESERVATIONS } from '@/lib/demo-data'
import { KpiCards } from './KpiCards'
import { RevenueChart } from './RevenueChart'
import { HealthScore } from './HealthScore'
import { AlertPanel } from './AlertPanel'
import { PriorityActions } from './PriorityActions'
import { ReservationList } from './ReservationList'
import { ObjectiveCard } from './ObjectiveCard'
import { CalendarDays } from 'lucide-react'

export function DashboardShell() {
  const summary     = getDashboardSummary()
  const weeklyData  = getWeeklySalesData()

  const dateLabel = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-fade-up">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            {dateLabel}
          </p>
          <h1 className="text-3xl font-serif font-bold text-foreground leading-tight">
            Tableau de bord
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pine/10 border border-pine/20 text-pine text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-pine animate-pulse-dot" />
            Service en cours — Midi
          </div>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <KpiCards
        dailyRevenue={summary.daily_revenue}
        yesterdayRevenue={summary.yesterday_revenue}
        covers={summary.covers}
        avgBasket={summary.avg_basket}
        fillRate={summary.fill_rate}
        dailyObjective={summary.daily_objective}
        estimatedMargin={summary.estimated_margin}
        plannedHours={summary.planned_hours}
        actualHours={summary.actual_hours}
      />

      {/* ── Main grid: Chart + Right panel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column: chart + objectives */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">
              Chiffre d&apos;affaires — 7 derniers jours
            </h3>
            <RevenueChart data={weeklyData} type="bar" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ObjectiveCard
              title="Objectif journalier"
              current={summary.daily_revenue}
              objective={summary.daily_objective}
            />
            <ObjectiveCard
              title="Couverts aujourd&apos;hui"
              current={summary.covers}
              objective={90}
              unit=""
              color="orange"
            />
          </div>
        </div>

        {/* Right column: health + actions */}
        <div className="space-y-4">
          <HealthScore score={summary.health_score} />
          <PriorityActions actions={summary.priority_actions} />
        </div>
      </div>

      {/* ── Bottom: Alerts + Reservations ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AlertPanel alerts={summary.alerts} />
        <ReservationList reservations={DEMO_RESERVATIONS} />
      </div>
    </div>
  )
}
