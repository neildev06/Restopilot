'use client'

import { useState, useMemo } from 'react'
import { DEMO_RECIPES, DEMO_INGREDIENTS, getMenuEngineeringMatrix } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Plus, TrendingUp, TrendingDown, Star, HelpCircle, Skull } from 'lucide-react'
import Link from 'next/link'

export default function RecettesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [view, setView] = useState<'list' | 'matrix'>('matrix')

  const matrixItems = useMemo(() => getMenuEngineeringMatrix(), [])

  const filtered = useMemo(() => {
    let items = matrixItems
    if (category !== 'all') items = items.filter(r => r.category === category)
    if (search) items = items.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    return items
  }, [search, category, matrixItems])

  const categories = ['all', 'entree', 'plat', 'dessert']
  const categoryLabels: Record<string, string> = { all: 'Toutes', entree: 'Entrées', plat: 'Plats', dessert: 'Desserts' }

  const matrixConfig = {
    star: { label: 'Stars', desc: 'Populaires et rentables', icon: <Star className="w-4 h-4" />, bg: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800', text: 'text-green-600' },
    cheval_de_labour: { label: 'Chevaux de labour', desc: 'Populaires mais peu rentables', icon: <TrendingUp className="w-4 h-4" />, bg: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800', text: 'text-orange-600' },
    enigme: { label: 'Énigmes', desc: 'Rentables mais peu vendues', icon: <HelpCircle className="w-4 h-4" />, bg: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800', text: 'text-blue-600' },
    poids_mort: { label: 'Poids morts', desc: 'Peu rentables et peu vendus', icon: <Skull className="w-4 h-4" />, bg: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800', text: 'text-red-600' },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recettes et Allergènes</h1>
          <p className="text-gray-500 dark:text-gray-400">Fiches techniques, marges et analyse de la carte</p>
        </div>
        <Button className="bg-terracotta hover:bg-terracotta/90 hidden sm:flex">
          <Plus className="w-4 h-4 mr-2" /> Nouvelle recette
        </Button>
      </div>

      {/* View toggle + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une recette..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-1">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={category === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategory(cat)}
              className={category === cat ? 'bg-terracotta hover:bg-terracotta/90' : ''}
            >
              {categoryLabels[cat]}
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          <Button variant={view === 'matrix' ? 'default' : 'outline'} size="sm" onClick={() => setView('matrix')} className={view === 'matrix' ? 'bg-terracotta' : ''}>Matrice</Button>
          <Button variant={view === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setView('list')} className={view === 'list' ? 'bg-terracotta' : ''}>Liste</Button>
        </div>
      </div>

      {/* Menu Engineering Matrix */}
      {view === 'matrix' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(matrixConfig).map(([key, config]) => {
            const items = filtered.filter(r => r.matrixCategory === key)
            if (items.length === 0) return null
            return (
              <div key={key} className={`rounded-xl border p-4 ${config.bg}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={config.text}>{config.icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{config.label}</h3>
                  <span className={`text-xs ${config.text} font-medium ml-auto`}>{items.length} plats</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{config.desc}</p>
                <div className="space-y-2">
                  {items.map(r => (
                    <div key={r.id} className="flex items-center justify-between bg-white/80 dark:bg-gray-900/80 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{r.name}</p>
                        <p className="text-xs text-gray-500">{r.sold} vendus</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(r.selling_price)}</p>
                        <p className={`text-xs ${r.margin_percent >= 68 ? 'text-green-500' : 'text-orange-500'}`}>
                          Marge {r.margin_percent.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="rounded-xl border bg-white dark:bg-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                  <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Plat</th>
                  <th className="text-left p-3 font-medium text-gray-500 dark:text-gray-400">Catégorie</th>
                  <th className="text-right p-3 font-medium text-gray-500 dark:text-gray-400">Coût/part</th>
                  <th className="text-right p-3 font-medium text-gray-500 dark:text-gray-400">Prix vente</th>
                  <th className="text-right p-3 font-medium text-gray-500 dark:text-gray-400">Marge</th>
                  <th className="text-right p-3 font-medium text-gray-500 dark:text-gray-400">%</th>
                  <th className="text-center p-3 font-medium text-gray-500 dark:text-gray-400">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-3 font-medium text-gray-900 dark:text-gray-100">{r.name}</td>
                    <td className="p-3 text-gray-500 capitalize">{r.category}</td>
                    <td className="p-3 text-right text-gray-700 dark:text-gray-300">{formatCurrency(r.cost_per_portion)}</td>
                    <td className="p-3 text-right text-gray-700 dark:text-gray-300">{formatCurrency(r.selling_price)}</td>
                    <td className="p-3 text-right font-medium text-gray-900 dark:text-gray-100">{formatCurrency(r.margin_euros)}</td>
                    <td className="p-3 text-right">
                      <span className={`font-medium ${r.margin_percent >= 68 ? 'text-green-500' : r.margin_percent >= 55 ? 'text-orange-500' : 'text-red-500'}`}>
                        {r.margin_percent.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant={r.is_available ? 'success' : 'destructive'}>
                        {r.is_available ? 'Disponible' : 'Rupture'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Food cost stats */}
      <div className="rounded-xl border bg-white dark:bg-gray-900 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Indicateurs clés</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Coût matière moyen', value: '28.5%', desc: 'Objectif : ≤ 30%', ok: true },
            { label: 'Marge brute moyenne', value: '71.0%', desc: 'Objectif : ≥ 65%', ok: true },
            { label: 'Plats disponibles', value: '12/13', desc: '1 plat en rupture', ok: false },
            { label: 'Prix moyen carte', value: '14.15€', desc: 'Entrée à dessert', ok: true },
          ].map((stat, i) => (
            <div key={i} className={`p-3 rounded-lg ${stat.ok ? 'bg-green-50 dark:bg-green-950/30' : 'bg-orange-50 dark:bg-orange-950/30'}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className={`text-lg font-bold mt-0.5 ${stat.ok ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Allergen disclaimer */}
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800 p-4">
        <p className="text-xs text-yellow-700 dark:text-yellow-400">
          ⚠️ Les informations sur les allergènes sont fournies à titre indicatif. En tant que restaurateur, vous êtes tenu de communiquer les allergènes présents dans vos plats conformément à la réglementation européenne (UE) N°1169/2011. Veuillez vérifier et mettre à jour régulièrement ces informations auprès de vos fournisseurs.
        </p>
      </div>
    </div>
  )
}
