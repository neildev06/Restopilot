'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Users, Clock, Calendar, UserPlus } from 'lucide-react'

const DEMO_EMPLOYEES = [
  { id: 'e1', name: 'Thomas Bernard', role: 'Gérant', position: 'direction', phone: '06 11 22 33 44', initials: 'TB', hourlyRate: 25, active: true },
  { id: 'e2', name: 'Julie Moreau', role: 'Chef de cuisine', position: 'cuisine', phone: '06 22 33 44 55', initials: 'JM', hourlyRate: 20, active: true },
  { id: 'e3', name: 'Antoine Petit', role: 'Responsable salle', position: 'salle', phone: '06 33 44 55 66', initials: 'AP', hourlyRate: 17, active: true },
  { id: 'e4', name: 'Sophie Lefevre', role: 'Commis cuisine', position: 'cuisine', phone: '06 44 55 66 77', initials: 'SL', hourlyRate: 14, active: true },
  { id: 'e5', name: 'Lucas Martin', role: 'Serveur', position: 'salle', phone: '06 55 66 77 88', initials: 'LM', hourlyRate: 13, active: true },
  { id: 'e6', name: 'Emma Dubois', role: 'Serveuse', position: 'salle', phone: '06 66 77 88 99', initials: 'ED', hourlyRate: 13, active: true },
  { id: 'e7', name: 'Hugo Roux', role: 'Plongeur', position: 'plonge', phone: '06 77 88 99 00', initials: 'HR', hourlyRate: 12, active: false },
]

const DEMO_SCHEDULE = [
  { day: 'Mar 22', shifts: [
    { employee: 'Julie Moreau', time: '09h-14h30', position: 'cuisine', status: 'completed' },
    { employee: 'Sophie Lefevre', time: '09h-15h', position: 'cuisine', status: 'completed' },
    { employee: 'Antoine Petit', time: '11h-15h', position: 'salle', status: 'completed' },
    { employee: 'Lucas Martin', time: '11h-15h', position: 'salle', status: 'completed' },
    { employee: 'Antoine Petit', time: '19h-23h', position: 'salle', status: 'completed' },
    { employee: 'Emma Dubois', time: '19h-23h', position: 'salle', status: 'completed' },
    { employee: 'Julie Moreau', time: '19h-23h', position: 'cuisine', status: 'completed' },
  ]},
  { day: 'Mer 23', shifts: [
    { employee: 'Julie Moreau', time: '09h-14h30', position: 'cuisine', status: 'completed' },
    { employee: 'Sophie Lefevre', time: '09h-15h', position: 'cuisine', status: 'completed' },
    { employee: 'Antoine Petit', time: '11h-15h', position: 'salle', status: 'completed' },
    { employee: 'Emma Dubois', time: '11h-15h', position: 'salle', status: 'completed' },
    { employee: 'Antoine Petit', time: '19h-23h', position: 'salle', status: 'completed' },
    { employee: 'Lucas Martin', time: '19h-23h', position: 'salle', status: 'completed' },
    { employee: 'Julie Moreau', time: '19h-23h', position: 'cuisine', status: 'completed' },
  ]},
  { day: 'Jeu 24', shifts: [
    { employee: 'Julie Moreau', time: '09h-14h30', position: 'cuisine', status: 'completed' },
    { employee: 'Sophie Lefevre', time: '09h-15h', position: 'cuisine', status: 'completed' },
    { employee: 'Antoine Petit', time: '11h-15h', position: 'salle', status: 'completed' },
    { employee: 'Emma Dubois', time: '11h-15h', position: 'salle', status: 'completed' },
    { employee: 'Antoine Petit', time: '19h-23h', position: 'salle', status: 'completed' },
    { employee: 'Lucas Martin', time: '19h-23h', position: 'salle', status: 'completed' },
    { employee: 'Julie Moreau', time: '19h-23h', position: 'cuisine', status: 'completed' },
    { employee: 'Hugo Roux', time: '19h-23h', position: 'plonge', status: 'absent' },
  ]},
  { day: 'Ven 25', shifts: [
    { employee: 'Julie Moreau', time: '09h-14h30', position: 'cuisine', status: 'confirmed' },
    { employee: 'Sophie Lefevre', time: '09h-15h', position: 'cuisine', status: 'confirmed' },
    { employee: 'Antoine Petit', time: '11h-15h', position: 'salle', status: 'confirmed' },
    { employee: 'Lucas Martin', time: '11h-15h', position: 'salle', status: 'confirmed' },
    { employee: 'Antoine Petit', time: '19h-23h30', position: 'salle', status: 'confirmed' },
    { employee: 'Emma Dubois', time: '19h-23h30', position: 'salle', status: 'confirmed' },
    { employee: 'Julie Moreau', time: '19h-23h30', position: 'cuisine', status: 'confirmed' },
    { employee: 'Hugo Roux', time: '19h-23h30', position: 'plonge', status: 'scheduled' },
  ]},
  { day: 'Sam 26', shifts: [
    { employee: 'Julie Moreau', time: '10h-14h30', position: 'cuisine', status: 'scheduled' },
    { employee: 'Sophie Lefevre', time: '10h-15h', position: 'cuisine', status: 'scheduled' },
    { employee: 'Antoine Petit', time: '11h-15h', position: 'salle', status: 'scheduled' },
    { employee: 'Emma Dubois', time: '11h-15h', position: 'salle', status: 'scheduled' },
    { employee: 'Antoine Petit', time: '19h-00h', position: 'salle', status: 'scheduled' },
    { employee: 'Lucas Martin', time: '19h-00h', position: 'salle', status: 'scheduled' },
    { employee: 'Julie Moreau', time: '19h-00h', position: 'cuisine', status: 'scheduled' },
    { employee: 'Hugo Roux', time: '19h-00h', position: 'plonge', status: 'scheduled' },
  ]},
]

export default function EquipePage() {
  const [view, setView] = useState<'planning' | 'equipe'>('planning')

  const activeEmployees = DEMO_EMPLOYEES.filter(e => e.active)
  const totalHoursThisWeek = DEMO_SCHEDULE.slice(0, 3).reduce((sum, day) => sum + day.shifts.length * 7, 0)
  const totalPlannedHours = DEMO_SCHEDULE.reduce((sum, day) => {
    return sum + day.shifts.filter(s => s.status === 'scheduled' || s.status === 'confirmed').length * 7
  }, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Équipe et Planning</h1>
        <p className="text-gray-500 dark:text-gray-400">Planifiez les services et gérez vos équipes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Employés actifs', value: activeEmployees.length.toString(), icon: <Users className="w-4 h-4" />, color: 'blue' },
          { label: 'Heures travaillées', value: `${totalHoursThisWeek}h`, subtitle: 'Cette semaine', icon: <Clock className="w-4 h-4" />, color: 'green' },
          { label: 'Heures planifiées', value: `${totalPlannedHours}h`, subtitle: 'À venir', icon: <Calendar className="w-4 h-4" />, color: 'orange' },
          { label: 'Coût personnel', value: '3 850€', subtitle: '28.5% du CA', icon: <Users className="w-4 h-4" />, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">{stat.label}</span>
              <span className="text-gray-400">{stat.icon}</span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            {stat.subtitle && <p className="text-xs text-gray-500 mt-0.5">{stat.subtitle}</p>}
          </div>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex gap-2">
        <Button variant={view === 'planning' ? 'default' : 'outline'} size="sm" onClick={() => setView('planning')} className={view === 'planning' ? 'bg-terracotta' : ''}>
          Planning
        </Button>
        <Button variant={view === 'equipe' ? 'default' : 'outline'} size="sm" onClick={() => setView('equipe')} className={view === 'equipe' ? 'bg-terracotta' : ''}>
          Équipe
        </Button>
      </div>

      {/* Planning View */}
      {view === 'planning' && (
        <div className="space-y-4">
          {DEMO_SCHEDULE.map((day) => {
            const midi = day.shifts.filter(s => s.time.includes('11h') || s.time.includes('09h') || s.time.includes('10h'))
            const soir = day.shifts.filter(s => s.time.includes('19h'))
            const hasAbsence = day.shifts.some(s => s.status === 'absent')
            const midiCount = midi.length
            const soirCount = soir.length

            return (
              <div key={day.day} className={cn('rounded-xl border bg-white dark:bg-gray-900 overflow-hidden', hasAbsence && 'ring-1 ring-red-300')}>
                <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{day.day}</span>
                    {hasAbsence && <Badge variant="danger">Absence</Badge>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>Midi: {midiCount}</span>
                    <span>Soir: {soirCount}</span>
                  </div>
                </div>
                <div className="p-3">
                  <table className="w-full text-sm">
                    <tbody>
                      {day.shifts.map((shift, i) => (
                        <tr key={i} className="border-b border-gray-50 dark:border-gray-800 last:border-0">
                          <td className="py-2 pr-3">
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                'w-1.5 h-1.5 rounded-full',
                                shift.status === 'completed' ? 'bg-green-500' :
                                shift.status === 'absent' ? 'bg-red-500' :
                                shift.status === 'confirmed' ? 'bg-blue-500' : 'bg-gray-300'
                              )} />
                              <span className="font-medium text-gray-900 dark:text-gray-100">{shift.employee}</span>
                            </div>
                          </td>
                          <td className="py-2 text-gray-500">{shift.position}</td>
                          <td className="py-2 text-gray-500">{shift.time}</td>
                          <td className="py-2 text-right">
                            <Badge variant={
                              shift.status === 'completed' ? 'success' :
                              shift.status === 'absent' ? 'destructive' :
                              shift.status === 'confirmed' ? 'default' : 'outline'
                            } className="text-[10px]">
                              {shift.status === 'completed' ? 'Fait' : shift.status === 'absent' ? 'Absent' : shift.status === 'confirmed' ? 'Confirmé' : 'Planifié'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Team View */}
      {view === 'equipe' && (
        <div className="rounded-xl border bg-white dark:bg-gray-900 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Employés ({activeEmployees.length})</h3>
            <Button size="sm" variant="outline"><UserPlus className="w-4 h-4 mr-1" /> Ajouter</Button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {DEMO_EMPLOYEES.map(emp => (
              <div key={emp.id} className={cn('flex items-center gap-3 p-3', !emp.active && 'opacity-50')}>
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-terracotta text-white text-xs">{emp.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{emp.name}</p>
                  <p className="text-xs text-gray-500">{emp.role} · {emp.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{emp.hourlyRate}€/h</p>
                  <Badge variant={emp.active ? 'success' : 'secondary'} className="text-[10px]">
                    {emp.active ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
