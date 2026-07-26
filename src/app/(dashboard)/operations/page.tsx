'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Circle, ClipboardList, Clock, AlertTriangle, User, FileText } from 'lucide-react'

const DEMO_CHECKLISTS = [
  {
    id: 'cl1',
    name: 'Ouverture — Matin',
    type: 'ouverture',
    items: [
      { id: 'cli1', title: 'Allumer les équipements', desc: 'Fours, plaques, hotte, lave-vaisselle', zone: 'Cuisine', done: true, critical: false },
      { id: 'cli2', title: 'Vérifier les températures', desc: 'Noter les températures des frigos', zone: 'Cuisine', done: true, critical: true },
      { id: 'cli3', title: 'Contrôle visuel des produits', desc: 'Vérifier l\'état des aliments et DLC', zone: 'Cuisine', done: false, critical: true },
      { id: 'cli4', title: 'Mettre en place la salle', desc: 'Nappes, couverts, serviettes, cartes', zone: 'Salle', done: true, critical: false },
    ],
  },
  {
    id: 'cl2',
    name: 'Mise en place — Midi',
    type: 'mise_en_place',
    items: [
      { id: 'cli5', title: 'Préparer les légumes', desc: 'Laver, éplucher, couper les légumes du jour', zone: 'Cuisine', done: true, critical: false },
      { id: 'cli6', title: 'Vérifier les stocks du jour', desc: 'S\'assurer que tous les plats de la carte sont possibles', zone: 'Cuisine', done: false, critical: true },
      { id: 'cli7', title: 'Préparer les sauces', desc: 'Mise en place des sauces pour le service', zone: 'Cuisine', done: false, critical: false },
    ],
  },
  {
    id: 'cl3',
    name: 'Fermeture — Soir',
    type: 'fermeture',
    items: [
      { id: 'cli8', title: 'Nettoyage cuisine complet', desc: 'Plans de travail, sols, hotte', zone: 'Cuisine', done: false, critical: true },
      { id: 'cli9', title: 'Ranger les denrées', desc: 'Fermer hermétiquement, étiqueter, dater', zone: 'Cuisine', done: false, critical: true },
      { id: 'cli10', title: 'Fermer les frigos', desc: 'Vérifier fermeture', zone: 'Cuisine', done: false, critical: true },
      { id: 'cli11', title: 'Nettoyage salle', desc: 'Tables, sols, toilettes', zone: 'Salle', done: false, critical: true },
      { id: 'cli12', title: 'Activer l\'alarme', desc: 'Vérifier portes et fenêtres', zone: 'Sécurité', done: false, critical: true },
    ],
  },
  {
    id: 'cl4',
    name: 'Caisse — Clôture',
    type: 'caisse',
    items: [
      { id: 'cli13', title: 'Compter la caisse', desc: 'Espèces et tickets', zone: 'Caisse', done: false, critical: true },
      { id: 'cli14', title: 'Totaliser les tickets', desc: 'Additionner les ventes du service', zone: 'Caisse', done: false, critical: true },
      { id: 'cli15', title: 'Déposer la recette', desc: 'Coffre ou banque', zone: 'Caisse', done: false, critical: true },
    ],
  },
]

export default function OperationsPage() {
  const [checklists, setChecklists] = useState(DEMO_CHECKLISTS)
  const [expandedId, setExpandedId] = useState<string>(checklists[0].id)

  const toggleItem = (checklistId: string, itemId: string) => {
    setChecklists(prev => prev.map(cl => {
      if (cl.id !== checklistId) return cl
      return {
        ...cl,
        items: cl.items.map(item =>
          item.id === itemId ? { ...item, done: !item.done } : item
        ),
      }
    }))
  }

  const typeLabels: Record<string, string> = {
    ouverture: 'Ouverture',
    mise_en_place: 'Mise en place',
    fermeture: 'Fermeture',
    caisse: 'Caisse',
  }

  const typeIcons: Record<string, React.ReactNode> = {
    ouverture: <Sun className="w-4 h-4" />,
    mise_en_place: <ClipboardList className="w-4 h-4" />,
    fermeture: <Moon className="w-4 h-4" />,
    caisse: <FileText className="w-4 h-4" />,
  }

  const totalTasks = checklists.reduce((sum, cl) => sum + cl.items.length, 0)
  const doneTasks = checklists.reduce((sum, cl) => sum + cl.items.filter(i => i.done).length, 0)
  const criticalPending = checklists.reduce((sum, cl) => sum + cl.items.filter(i => i.critical && !i.done).length, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Opérations quotidiennes</h1>
        <p className="text-gray-500 dark:text-gray-400">Check-lists d&apos;ouverture, service et fermeture</p>
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-terracotta" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">Progression du jour</span>
          </div>
          <span className="text-sm font-medium text-gray-500">{doneTasks}/{totalTasks} tâches</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-terracotta transition-all duration-500"
            style={{ width: `${(doneTasks / totalTasks) * 100}%` }}
          />
        </div>
        {criticalPending > 0 && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-red-500">
            <AlertTriangle className="w-3 h-3" />
            <span>{criticalPending} tâche{criticalPending > 1 ? 's' : ''} critique{criticalPending > 1 ? 's' : ''} non terminée{criticalPending > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {checklists.map(cl => {
          const doneCount = cl.items.filter(i => i.done).length
          const isExpanded = expandedId === cl.id

          return (
            <div
              key={cl.id}
              className={cn(
                'rounded-xl border bg-white dark:bg-gray-900 transition-all cursor-pointer',
                isExpanded ? 'ring-1 ring-terracotta/30' : ''
              )}
              onClick={() => setExpandedId(isExpanded ? '' : cl.id)}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-5 h-5 text-terracotta" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{cl.name}</h3>
                    <p className="text-xs text-gray-500">{doneCount}/{cl.items.length} tâches</p>
                  </div>
                </div>
                <Badge variant={doneCount === cl.items.length ? 'success' : doneCount > 0 ? 'warning' : 'outline'}>
                  {doneCount === cl.items.length ? 'Terminé' : `${Math.round((doneCount / cl.items.length) * 100)}%`}
                </Badge>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 space-y-2">
                  {cl.items.map(item => (
                    <div
                      key={item.id}
                      className={cn(
                        'flex items-start gap-3 p-2 rounded-lg transition-colors',
                        item.done ? 'bg-green-50/50 dark:bg-green-950/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      )}
                      onClick={(e) => { e.stopPropagation(); toggleItem(cl.id, item.id) }}
                    >
                      <button className="mt-0.5 shrink-0">
                        {item.done
                          ? <CheckCircle className="w-5 h-5 text-green-500" />
                          : <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                        }
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            'text-sm font-medium',
                            item.done ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'
                          )}>
                            {item.title}
                          </p>
                          {item.critical && <AlertTriangle className="w-3 h-3 text-red-400" />}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">{item.desc}</span>
                          <span className="text-xs text-gray-400">·</span>
                          <span className="text-xs text-gray-400">{item.zone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Incidents */}
      <div className="rounded-xl border bg-white dark:bg-gray-900 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Incidents en cours</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Plaque induction n°3 en panne</p>
                <Badge variant="warning">En cours</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Signalé le 25/07 — Intervention technique en attente</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
            <User className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Absence plongeur non remplacée</p>
                <Badge variant="warning">Urgent</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Appel maladie — Affection pour le service de midi</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Journal de bord mis à jour en temps réel · Dernière activité : {new Date().toLocaleTimeString('fr-FR')}
      </p>
    </div>
  )
}

function Sun(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m-10-10H2m20 0h-2m-2.93-5.07l-1.41 1.41M7.34 16.66l-1.41 1.41M16.66 7.34l1.41-1.41"/></svg>
}

function Moon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
}
