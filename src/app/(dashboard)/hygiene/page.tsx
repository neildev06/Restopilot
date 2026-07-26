'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Thermometer, ClipboardCheck, AlertTriangle, FileText, CheckCircle, XCircle } from 'lucide-react'

const DEMO_TEMPS = [
  { equipment: 'Réfrigérateur cuisine 1', zone: 'Cuisine', temp: 3.5, min: 0, max: 4, status: 'ok', time: '08:00' },
  { equipment: 'Réfrigérateur cuisine 2', zone: 'Cuisine', temp: 5.2, min: 0, max: 4, status: 'alert', time: '08:00' },
  { equipment: 'Congélateur', zone: 'Cuisine', temp: -18, min: -20, max: -15, status: 'ok', time: '08:00' },
  { equipment: 'Vitrine réfrigérée bar', zone: 'Bar', temp: 4, min: 0, max: 6, status: 'ok', time: '08:00' },
]

const DEMO_ACC = [
  { id: 'doc1', title: 'Licence IV', type: 'licence', expiry: '15/06/2027', status: 'valid' },
  { id: 'doc2', title: 'Assurance RC Pro', type: 'assurance', expiry: '01/03/2027', status: 'valid' },
  { id: 'doc3', title: 'Formation HACCP', type: 'formation', expiry: '15/01/2028', status: 'valid' },
  { id: 'doc4', title: 'Contrôle vétérinaire', type: 'controle', expiry: '15/08/2026', status: 'expiring' },
]

export default function HygienePage() {
  const [activeTab, setActiveTab] = useState<'haccp' | 'documents'>('haccp')

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Hygiène et Conformité</h1>
        <p className="text-gray-500 dark:text-gray-400">Relevés HACCP, température et documents obligatoires</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button variant={activeTab === 'haccp' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTab('haccp')} className={activeTab === 'haccp' ? 'bg-sage' : ''}>
          <Thermometer className="w-4 h-4 mr-1" /> HACCP
        </Button>
        <Button variant={activeTab === 'documents' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTab('documents')} className={activeTab === 'documents' ? 'bg-sage' : ''}>
          <FileText className="w-4 h-4 mr-1" /> Documents
        </Button>
      </div>

      {activeTab === 'haccp' && (
        <>
          {/* Température alert */}
          {DEMO_TEMPS.filter(t => t.status === 'alert').length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-red-700 dark:text-red-400">Alerte température</h3>
              </div>
              {DEMO_TEMPS.filter(t => t.status === 'alert').map(t => (
                <div key={t.equipment} className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-lg px-3 py-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{t.equipment}</p>
                    <p className="text-xs text-gray-500">{t.temp}°C (max: {t.max}°C) · {t.zone}</p>
                  </div>
                  <Badge variant="destructive">{t.temp}°C</Badge>
                </div>
              ))}
            </div>
          )}

          {/* Température logs */}
          <div className="rounded-xl border bg-white dark:bg-gray-900 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Relevés du jour</h3>
              <p className="text-xs text-gray-500 mt-0.5">Dernier relevé : 08:00</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {DEMO_TEMPS.map(t => (
                <div key={t.equipment} className="flex items-center gap-3 p-4">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', t.status === 'ok' ? 'bg-green-50' : 'bg-red-50')}>
                    <Thermometer className={cn('w-5 h-5', t.status === 'ok' ? 'text-green-500' : 'text-red-500')} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{t.equipment}</p>
                    <p className="text-xs text-gray-500">{t.zone} · Relevé à {t.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn('text-lg font-bold', t.status === 'ok' ? 'text-green-500' : 'text-red-500')}>
                      {t.temp}°C
                    </p>
                    <p className="text-xs text-gray-400">Plage: {t.min}°C à {t.max}°C</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800 p-4">
            <p className="text-xs text-yellow-700 dark:text-yellow-400">
              ⚠️ Les fonctionnalités de conformité sont des outils d&apos;organisation et de traçabilité. Elles ne remplacent pas un conseil juridique, sanitaire ou comptable professionnel. La restauration française est soumise à des obligations relatives à l&apos;hygiène, à la sécurité, aux prix, aux boissons et aux allergènes (Code du tourisme, Code de la consommation, Règlement UE 1169/2011).
            </p>
          </div>
        </>
      )}

      {activeTab === 'documents' && (
        <div className="rounded-xl border bg-white dark:bg-gray-900 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Documents obligatoires</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {DEMO_ACC.map(doc => (
              <div key={doc.id} className="flex items-center gap-3 p-4">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', doc.status === 'valid' ? 'bg-green-50' : 'bg-orange-50')}>
                  {doc.status === 'valid' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertTriangle className="w-5 h-5 text-orange-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{doc.title}</p>
                  <p className="text-xs text-gray-500 capitalize">{doc.type} · Expire le {doc.expiry}</p>
                </div>
                <Badge variant={doc.status === 'valid' ? 'success' : 'warning'}>
                  {doc.status === 'valid' ? 'Valide' : 'Expire bientôt'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
