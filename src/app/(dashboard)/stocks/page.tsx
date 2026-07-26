'use client'

import { useState, useMemo } from 'react'
import { DEMO_INGREDIENTS } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, AlertTriangle, Package, Thermometer } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STORAGE_ZONE_LABELS } from '@/lib/constants'

export default function StocksPage() {
  const [search, setSearch] = useState('')
  const [zone, setZone] = useState<string>('all')

  const filtered = useMemo(() => {
    let items = DEMO_INGREDIENTS
    if (zone !== 'all') items = items.filter(i => i.storage_zone === zone)
    if (search) items = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    return items
  }, [search, zone])

  const alerts = useMemo(() => {
    return DEMO_INGREDIENTS.filter(i => {
      if (i.current_stock <= i.min_stock) return true
      if (i.expiry_date && new Date(i.expiry_date) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)) return true
      return false
    })
  }, [])

  const zones = ['all', 'froid_positif', 'reserve_seche', 'congelateur', 'cave']
  const zoneLabels: Record<string, string> = { all: 'Toutes zones', froid_positif: 'Froid +', reserve_seche: 'Réserve sèche', congelateur: 'Congélateur', cave: 'Cave' }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Stocks et Achats</h1>
        <p className="text-gray-500 dark:text-gray-400">Suivi des inventaires et alertes</p>
      </div>

      {/* Alertes stock */}
      {alerts.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-red-700 dark:text-red-400">Alertes stock ({alerts.length})</h3>
          </div>
          <div className="space-y-2">
            {alerts.map(i => {
              const isRupture = i.current_stock <= i.min_stock
              const isExpiring = i.expiry_date && new Date(i.expiry_date) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
              return (
                <div key={i.id} className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-lg px-3 py-2">
                  <div className={cn('w-2 h-2 rounded-full', isRupture ? 'bg-red-500' : 'bg-orange-500')} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{i.name}</p>
                    <p className="text-xs text-gray-500">
                      {isRupture
                        ? `Stock : ${i.current_stock} ${i.unit} (seuil min : ${i.min_stock} ${i.unit})`
                        : `Péremption : ${new Date(i.expiry_date!).toLocaleDateString('fr-FR')} — ${i.current_stock} ${i.unit} en stock`
                      }
                    </p>
                  </div>
                  <Badge variant={isRupture ? 'destructive' : 'warning'}>
                    {isRupture ? 'Rupture' : 'Péremption'}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Rechercher un produit..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {zones.map(z => (
            <Button key={z} variant={zone === z ? 'default' : 'outline'} size="sm" onClick={() => setZone(z)} className={zone === z ? 'bg-sage hover:bg-sage/90' : ''}>
              {zoneLabels[z]}
            </Button>
          ))}
        </div>
      </div>

      {/* Tableau stocks */}
      <div className="rounded-xl border bg-white dark:bg-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 dark:bg-gray-900/50">
                <th className="text-left p-3 font-medium text-gray-500">Produit</th>
                <th className="text-left p-3 font-medium text-gray-500">Zone</th>
                <th className="text-right p-3 font-medium text-gray-500">Stock</th>
                <th className="text-right p-3 font-medium text-gray-500">Seuil min</th>
                <th className="text-right p-3 font-medium text-gray-500">Coût unit.</th>
                <th className="text-right p-3 font-medium text-gray-500">DLC</th>
                <th className="text-center p-3 font-medium text-gray-500">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(i => {
                const stockPercent = i.max_stock > 0 ? (i.current_stock / i.max_stock * 100) : 0
                const isLow = i.current_stock <= i.min_stock
                const isExpiringSoon = i.expiry_date && new Date(i.expiry_date) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

                return (
                  <tr key={i.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-3 font-medium text-gray-900 dark:text-gray-100">{i.name}</td>
                    <td className="p-3 text-gray-500">{STORAGE_ZONE_LABELS[i.storage_zone || ''] || i.storage_zone}</td>
                    <td className="p-3 text-right">
                      <span className={`font-medium ${isLow ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`}>
                        {i.current_stock} {i.unit}
                      </span>
                    </td>
                    <td className="p-3 text-right text-gray-500">{i.min_stock} {i.unit}</td>
                    <td className="p-3 text-right text-gray-700 dark:text-gray-300">{formatCurrency(i.cost_per_unit)}</td>
                    <td className="p-3 text-right text-gray-500">
                      {i.expiry_date ? new Date(i.expiry_date).toLocaleDateString('fr-FR') : '-'}
                    </td>
                    <td className="p-3 text-center">
                      {isLow && <Badge variant="danger">Stock bas</Badge>}
                      {isExpiringSoon && !isLow && <Badge variant="warning">Bientôt expiré</Badge>}
                      {!isLow && !isExpiringSoon && <Badge variant="success">OK</Badge>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
