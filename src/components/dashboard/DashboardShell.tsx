'use client'

import { getDashboardSummary, getWeeklySalesData, DEMO_RESERVATIONS } from '@/lib/demo-data'
import { KpiCards } from './KpiCards'
import { RevenueChart } from './RevenueChart'
import { HealthScore } from './HealthScore'
import { AlertPanel } from './AlertPanel'
import { PriorityActions } from './PriorityActions'
import { ReservationList } from './ReservationList'
import { ObjectiveCard } from './ObjectiveCard'

export function DashboardShell() {
  const summary = getDashboardSummary()
  const weeklyData = getWeeklySalesData()

  return (
    <div className="space-y-6 animate-fade-in max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">Tableau de bord</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Vue d&apos;ensemble du {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">Service en cours : Midi</span>
        </div>
      </div>

      {/* KPI Cards */}
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

      {/* Main grid: Charts + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-white dark:bg-stone-900 p-6 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">Chiffre d&apos;affaires — 7 derniers jours</h3>
            <RevenueChart data={weeklyData} type="bar" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ObjectiveCard title="Objectif journalier" current={summary.daily_revenue} objective={summary.daily_objective} />
            <ObjectiveCard title="Couverts aujourd&apos;hui" current={summary.covers} objective={90} unit="" color="orange" />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <HealthScore score={summary.health_score} />
          <PriorityActions actions={summary.priority_actions} />
        </div>
      </div>

      {/* Bottom section: Alerts + Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertPanel alerts={summary.alerts} />
        <ReservationList reservations={DEMO_RESERVATIONS} />
      </div>
    </div>
  )
}
