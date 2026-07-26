'use client'

import { useState, useRef, useEffect } from 'react'
import { getDashboardSummary, DEMO_SALES, DEMO_RECIPES, DEMO_ALERTS, DEMO_INCIDENTS, DEMO_TEMPERATURES } from '@/lib/demo-data'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bot, Send, User, Lightbulb, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = {
  role: 'assistant' | 'user'
  content: string
  data?: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[]
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: `Bonjour Thomas ! 👋 Je suis votre **Copilote RestoPilot**. Je peux vous aider à analyser vos données du jour.

Voici ce que je peux faire pour vous :
- 📊 **Analyser votre journée** : marges, ventes, couverts
- ⚠️ **Détecter des anomalies** : gaspillage, baisse de panier, etc.
- 📋 **Générer un briefing** : résumé de début ou fin de service
- 💡 **Proposer des actions** concrètes et chiffrées

**Posez-moi une question** sur votre restaurant en français !`,
}

const BRIEFING_DATA = getDashboardSummary()

function getBriefing(): Message {
  const summary = getDashboardSummary()
  const tempsAlerts = DEMO_TEMPERATURES.filter(t => t.is_alert)
  const lowStock = DEMO_ALERTS.filter(a => a.type === 'stock_rupture')
  const criticalItems = DEMO_ALERTS.filter(a => a.severity === 'critical')

  return {
    role: 'assistant',
    content: `## 📋 Briefing du ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}

**Bonjour Thomas** — voici votre résumé du jour pour **Le Comptoir Provençal**.

### 📈 Chiffres clés
- **CA prévu :** ${formatCurrency(summary.daily_revenue)} (objectif : ${formatCurrency(summary.daily_objective)})
- **Couverts prévus :** ${summary.covers} (${summary.fill_rate}% de remplissage)
- **Panier moyen :** ${formatCurrency(summary.avg_basket)}
- **Marge brute estimée :** ${summary.estimated_margin.toFixed(1)}%

### ⚠️ Points d'attention
${criticalItems.length > 0 ? criticalItems.map(a => `- 🔴 **${a.title}** : ${a.message}`).join('\n') : '- Aucune alerte critique'}
${tempsAlerts.length > 0 ? `- 🌡️ **${tempsAlerts.length} température(s) anormale(s)** à vérifier` : ''}
${lowStock.length > 0 ? `- 📦 **${lowStock.length} rupture(s) de stock** imminentes` : ''}

### 👥 Réservations
- **${summary.upcoming_reservations} réservation(s)** aujourd'hui
- ${summary.covers} couverts estimés sur la journée

### 💡 Action prioritaire
> ${summary.priority_actions[0]}

*Sources : Module Ventes, Stocks, Réservations, HACCP — Mis à jour en temps réel.*`,
  }
}

function getAnomalyReport(): Message {
  const summary = getDashboardSummary()
  const anomalies: string[] = []

  // Check revenue
  if (summary.daily_revenue < summary.daily_objective * 0.8) {
    anomalies.push(`🔴 **Baisse du CA** : ${formatCurrency(summary.daily_revenue)} contre ${formatCurrency(summary.daily_objective)} d'objectif (-${Math.round((1 - summary.daily_revenue / summary.daily_objective) * 100)}%)`)
  }

  // Check margin
  if (summary.estimated_margin < 65) {
    anomalies.push(`🟠 **Marge en baisse** : ${summary.estimated_margin.toFixed(1)}% (cible : 65%+)`)
  }

  // Check fill rate
  if (summary.fill_rate < 50) {
    anomalies.push(`🟠 **Taux de remplissage faible** : ${summary.fill_rate}%`)
  }

  // Check stock alerts
  const criticalAlerts = DEMO_ALERTS.filter(a => a.severity === 'critical')
  if (criticalAlerts.length > 0) {
    anomalies.push(`🔴 ${criticalAlerts.length} alerte(s) critique(s) en stock/HACCP`)
  }

  // Check temperature
  const tempAlerts = DEMO_TEMPERATURES.filter(t => t.is_alert)
  if (tempAlerts.length > 0) {
    anomalies.push(`🔴 **Température anormale** : ${tempAlerts[0].equipment_name} à ${tempAlerts[0].temperature}°C`)
  }

  // Check incidents
  const openIncidents = DEMO_INCIDENTS.filter(i => i.status === 'open')
  if (openIncidents.length > 0) {
    anomalies.push(`🟠 **Incident${openIncidents.length > 1 ? 's' : ''} ouvert${openIncidents.length > 1 ? 's' : ''}** : ${openIncidents.map(i => i.description).join(', ')}`)
  }

  return {
    role: 'assistant',
    content: `## 🔍 Analyse des anomalies

${anomalies.length > 0 ? anomalies.join('\n') : '✅ **Aucune anomalie détectée aujourd\'hui** — tout est dans les clous !'}

### Suggestions d'actions
1. ${DEMO_ALERTS[0]?.message || 'Continuer à surveiller les indicateurs'}
2. Réviser les plats à faible marge dans la matrice Menu Engineering
3. Vérifier le planning pour les jours à forte affluence

*Sources : Ventes, Stocks, HACCP. Certaines données peuvent être manquantes si non renseignées.*`,
  }
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const suggestions = [
    { label: 'Briefing du jour', action: 'briefing' },
    { label: 'Anomalies', action: 'anomalies' },
    { label: 'Plats à retirer', action: 'plats' },
    { label: 'Stock critique', action: 'stock' },
  ]

  const quickActions: Record<string, () => Message> = {
    briefing: () => getBriefing(),
    anomalies: () => getAnomalyReport(),
    plats: () => {
      const lowMargin = DEMO_RECIPES.filter(r => r.margin_percent < 68 && r.is_available)
      return {
        role: 'assistant',
        content: `## 📋 Analyse des plats

**Plats à faible marge :**
${lowMargin.length > 0 ? lowMargin.map(r => `- **${r.name}** : marge ${r.margin_percent.toFixed(1)}% (prix : ${formatCurrency(r.selling_price)}, coût : ${formatCurrency(r.cost_per_portion)})`).join('\n') : 'Aucun plat à faible marge identifié.'}

**Suggestions :**
- Augmenter le prix de vente des plats < 65% de marge
- Négocier les prix fournisseurs sur les ingrédients les plus coûteux
- Mettre en avant les plats à forte marge (stars) dans le menu
- Envisager de retirer les plats à la fois peu vendus ET peu rentables (poids morts)`,
      }
    },
    stock: () => {
      const ruptures = DEMO_ALERTS.filter(a => a.type === 'stock_rupture')
      return {
        role: 'assistant',
        content: `## 📦 Alertes stock

${ruptures.length > 0 ? ruptures.map(a => `- ⚠️ **${a.title}** : ${a.message}`).join('\n') : '✅ Aucune rupture de stock imminente.'}

- **Suggestions de commande** : Commander les articles sous seuil minimum
- **Produits à écouler** : Vérifier les DLC proches pour les mettre en avant`,
      }
    },
  }

  function handleQuickAction(action: string) {
    const response = quickActions[action]?.()
    if (response) {
      setMessages(prev => [...prev, { role: 'user', content: suggestions.find(s => s.action === action)?.label || action }, response])
    }
  }

  async function handleSend() {
    if (!input.trim()) return
    const question = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: question }])
    setIsTyping(true)

    // Simulate AI response with analysis
    await new Promise(r => setTimeout(r, 1000))

    const q = question.toLowerCase()
    let response: string

    if (q.includes('marge') || q.includes('rentabilite') || q.includes('rentabilité')) {
      response = `## 📊 Analyse des marges

**Marge brute estimée aujourd'hui :** ${BRIEFING_DATA.estimated_margin.toFixed(1)}%
**Food cost :** ~${(100 - BRIEFING_DATA.estimated_margin).toFixed(1)}% (objectif ≤ 30%)

**Plats les plus rentables :**
- Penne puttanesca : marge 77.1%
- Crème brûlée lavande : marge 76.5%
- Ratatouille œuf poché : marge 75.5%

**Recommandation :** Mettez en avant les plats à forte marge (> 70%) dans votre formule du midi. Le filet de bar (63.6%) est actuellement retiré de la carte pour cause de rupture — envisagez un plat de remplacement temporaire.

*Source : Module Recettes, Ventes.*`
    } else if (q.includes('rupture') || q.includes('stock') || q.includes('péremption') || q.includes('peremption')) {
      const peremptions = DEMO_ALERTS.filter(a => a.type === 'peremption')
      response = `## 📦 Situation des stocks

**Ruptures imminentes :**
${DEMO_ALERTS.filter(a => a.type === 'stock_rupture').map(a => `- ⚠️ ${a.message}`).join('\n') || 'Aucune'}

**Produits proches de péremption :**
${peremptions.map(a => `- 🔴 ${a.message}`).join('\n') || 'Aucun'}

**Suggestion :** Utilisez les produits proches de péremption dans vos suggestions du jour ou votre plat du jour pour éviter le gaspillage.

*Source : Module Stocks.*`
    } else if (q.includes('absent') || q.includes('équipe') || q.includes('equipe') || q.includes('planning') || q.includes('disponible')) {
      response = `## 👥 Équipe aujourd'hui

**Absence non remplacée :** Plongeur (appel maladie)
**Effectif présent :** 5 employés (cuisine: 2, salle: 3)
**Effectif nécessaire pour le service du soir :** 6 minimum

**Actions recommandées :**
1. Contacter le plongeur en repos pour le remplacer (Hugo — jour de repos)
2. Réaffecter un commis de cuisine à la plonge si nécessaire
3. Prévoir un roulement pour éviter la surcharge

*Source : Module Équipe.*`
    } else if (q.includes('hygiène') || q.includes('hygiene') || q.includes('haccp') || q.includes('temperature') || q.includes('température')) {
      response = `## 🌡️ État HACCP

**Alerte température :** Réfrigérateur cuisine 2 à 5.2°C (max : 4°C)
**Action requise :** Vérifier la porte, contacter le mainteneur si persiste
**Rappel :** La DDPP peut contrôler ces relevés à tout moment.

**Documents à renouveler :** Contrôle vétérinaire expire le 15/08/2026

*Source : Module Hygiène.*`
    } else if (q.includes('briefing') || q.includes('résumé') || q.includes('resume') || q.includes('journée') || q.includes('journee')) {
      const b = getBriefing()
      response = b.content
    } else if (q.includes('plat') || q.includes('carte') || q.includes('menu') || q.includes('retirer')) {
      const lowMargin = DEMO_RECIPES.filter(r => r.margin_percent < 68 && r.is_available)
      response = `## 🍽️ Analyse de la carte

**${DEMO_RECIPES.filter(r => r.is_available).length} plats disponibles** sur ${DEMO_RECIPES.length}

**Stars** (populaires et rentables) : Poulet rôti, Risotto, Crème brûlée
**À surveiller** (marge < 68%) : ${lowMargin.map(r => `${r.name} (${r.margin_percent.toFixed(1)}%)`).join(', ') || 'aucun'}

**Plat à retirer :** Filet de bar — déjà retiré (rupture stock bar)
**Plat à mettre en avant :** Poulet rôti aux herbes — forte marge (68.7%), très populaire

*Source : Module Recettes.*`
    } else {
      response = `## 💬 Je peux vous aider

Voici les questions que je peux traiter :
- "**Pourquoi ma marge a baissé cette semaine ?**" → Analyse des marges et food cost
- "**Quels produits risquent d'être en rupture ?**" → État des stocks et alertes
- "**Qui est disponible samedi soir ?**" → Planning et effectifs
- "**Quelles tâches d'hygiène sont en retard ?**" → Relevés HACCP et conformité
- "**Quel plat dois-je retirer de la carte ?**" → Matrice menu engineering

*Essayez l'une de ces questions ou cliquez sur les suggestions ci-dessous.*`
    }

    setMessages(prev => [...prev, { role: 'assistant', content: response }])
    setIsTyping(false)
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Copilote IA</h1>
        <p className="text-gray-500 dark:text-gray-400">Votre assistant pour des décisions éclairées</p>
      </div>

      {/* Quick suggestions */}
      <div className="flex gap-2 flex-wrap">
        {suggestions.map(s => (
          <Button
            key={s.action}
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction(s.action)}
            className="text-xs"
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            {s.label}
          </Button>
        ))}
      </div>

      {/* Chat */}
      <div className="rounded-xl border bg-white dark:bg-gray-900 flex flex-col h-[500px] lg:h-[600px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}>
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className={cn(
                  'text-xs',
                  msg.role === 'assistant' ? 'bg-terracotta text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                'rounded-xl px-4 py-3 max-w-[85%] lg:max-w-[70%]',
                msg.role === 'assistant'
                  ? 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  : 'bg-terracotta/10 text-gray-900 dark:text-gray-100'
              )}>
                <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                  {msg.content.split('\n').map((line, j) => (
                    <p key={j} className={line.startsWith('-') ? 'ml-3' : ''}>{line}</p>
                  ))}
                </div>
                {msg.role === 'assistant' && msg.content.includes('**') && (
                  <p className="text-[10px] text-gray-400 mt-2">
                    Sources : Modules Ventes, Stocks, Recettes, Équipe, HACCP
                  </p>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-terracotta text-white text-xs"><Bot className="w-4 h-4" /></AvatarFallback>
              </Avatar>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 p-3">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend() }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question sur votre restaurant..."
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-terracotta hover:bg-terracotta/90 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        🤖 Cet assistant utilise les données de démonstration. Les réponses sont basées sur des données réelles disponibles dans vos modules.
        Il ne remplace pas un conseil professionnel pour les décisions stratégiques.
      </p>
    </div>
  )
}
