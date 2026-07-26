'use client'

import { useMemo } from 'react'
import { DEMO_SALES } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { ObjectiveCard } from '@/components/dashboard/ObjectiveCard'
import { SERVICE_LABELS, CHANNEL_LABELS } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'

export default function VentesPage() {
  const today = new Date()
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  const monthSales = useMemo(() => {
    return DEMO_SALES.filter(s => {
      const d = new Date(s.sale_date)
      return d >= monthStart && d <= monthEnd
    })
  }, [])

  const weeklyData = useMemo(() => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    const data: { name: string; revenu: number; couverts: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const daySales = DEMO_SALES.filter(s => s.sale_date === dateStr)
      data.push({
        name: days[d.getDay()],
        revenu: daySales.reduce((sum, s) => sum + s.total_amount - s.discounts, 0),
        couverts: daySales.reduce((sum, s) => sum + s.covers, 0),
      })
    }
    return data
  }, [])

  const totalMonthRevenue = monthSales.reduce((s, sale) => s + sale.total_amount - sale.discounts, 0)
  const totalMonthCovers = monthSales.reduce((s, sale) => s + sale.covers, 0)
  const totalMonthDiscounts = monthSales.reduce((s, sale) => s + (sale.discounts || 0), 0)

  // Group by service
  const byService = useMemo(() => {
    const groups: Record<string, { revenue: number; covers: number }> = {}
    monthSales.forEach(s => {
      if (!groups[s.service]) groups[s.service] = { revenue: 0, covers: 0 }
      groups[s.service].revenue += s.total_amount - s.discounts
      groups[s.service].covers += s.covers
    })
    return Object.entries(groups)
  }, [monthSales])

  // Group by channel
  const byChannel = useMemo(() => {
    const groups: Record<string, { revenue: number; covers: number }> = {}
    monthSales.forEach(s => {
      if (!groups[s.channel]) groups[s.channel] = { revenue: 0, covers: 0 }
      groups[s.channel].revenue += s.total_amount - s.discounts
      groups[s.channel].covers += s.covers
    })
    return Object.entries(groups)
  }, [monthSales])

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Ventes et Rentabilité</h1>
        <p className="text-gray-500 dark:text-gray-400">Analysez votre chiffre d&apos;affaires et vos marges</p>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'CA mensuel', value: formatCurrency(totalMonthRevenue), subtitle: 'Objectif : 45 000€', trend: totalMonthRevenue >= 45000 ? 'up' : 'down' as const },
          { label: 'Couverts', value: totalMonthCovers.toString(), subtitle: `Mois en cours`, trend: 'neutral' as const },
          { label: 'Panier moyen', value: formatCurrency(totalMonthCovers > 0 ? totalMonthRevenue / totalMonthCovers : 0), subtitle: 'Objectif : 35€', trend: totalMonthCovers > 0 && totalMonthRevenue / totalMonthCovers >= 35 ? 'up' as const : 'down' as const },
          { label: 'Remises', value: formatCurrency(totalMonthDiscounts), subtitle: `${((totalMonthDiscounts / (totalMonthRevenue + totalMonthDiscounts)) * 100).toFixed(1)}% du CA`, trend: totalMonthDiscounts <= 100 ? 'up' as const : 'down' as const },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border bg-white dark:bg-gray-900 p-4">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white dark:bg-gray-900 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">CA quotidien — 7 jours</h3>
          <RevenueChart data={weeklyData} type="line" />
        </div>

        <div className="space-y-4">
          <ObjectiveCard title="Objectif mensuel" current={totalMonthRevenue} objective={45000} />
          <div className="rounded-xl border bg-white dark:bg-gray-900 p-5">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Répartition par service</h3>
            <div className="space-y-2">
              {byService.map(([service, data]) => (
                <div key={service} className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{SERVICE_LABELS[service] || service}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrency(data.revenue)}</span>
                    <span className="text-xs text-gray-500 ml-2">({data.covers} couv.)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* By channel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white dark:bg-gray-900 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Par canal de vente</h3>
          <div className="space-y-3">
            {byChannel.map(([channel, data]) => (
              <div key={channel}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">{CHANNEL_LABELS[channel] || channel}</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(data.revenue)}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-terracotta"
                    style={{ width: `${(data.revenue / totalMonthRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest sales */}
        <div className="rounded-xl border bg-white dark:bg-gray-900 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Dernières ventes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left pb-2 font-medium text-gray-500">Date</th>
                  <th className="text-left pb-2 font-medium text-gray-500">Service</th>
                  <th className="text-right pb-2 font-medium text-gray-500">Couverts</th>
                  <th className="text-right pb-2 font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[...DEMO_SALES].reverse().slice(0, 8).map(sale => (
                  <tr key={sale.id}>
                    <td className="py-2 text-gray-700 dark:text-gray-300">{new Date(sale.sale_date).toLocaleDateString('fr-FR')}</td>
                    <td className="py-2">
                      <Badge variant="outline" className="text-xs">
                        {SERVICE_LABELS[sale.service]}
                      </Badge>
                    </td>
                    <td className="py-2 text-right text-gray-700 dark:text-gray-300">{sale.covers}</td>
                    <td className="py-2 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(sale.total_amount - sale.discounts)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
