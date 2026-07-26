import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
  }).format(new Date(date))
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  return `${hours}h${minutes || '00'}`
}

export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
    case 'resolved':
    case 'confirmed':
    case 'active':
      return 'text-green-600 dark:text-green-400'
    case 'pending':
    case 'scheduled':
    case 'new':
    case 'read':
      return 'text-orange-500 dark:text-orange-400'
    case 'overdue':
    case 'cancelled':
    case 'no_show':
    case 'critical':
    case 'open':
      return 'text-red-600 dark:text-red-400'
    default:
      return 'text-gray-500'
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent':
    case 'high':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case 'normal':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    case 'low':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
