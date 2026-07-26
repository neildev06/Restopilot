'use client'

interface HealthScoreProps {
  score: number
}

export function HealthScore({ score }: HealthScoreProps) {
  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#10B981', bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-600 dark:text-green-400', label: 'Excellent' }
    if (s >= 60) return { stroke: '#F59E0B', bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-600 dark:text-orange-400', label: 'À surveiller' }
    return { stroke: '#EF4444', bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-600 dark:text-red-400', label: 'Critique' }
  }

  const color = getColor(score)
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (score / 100) * circumference

  return (
    <div className={`rounded-xl border p-5 ${color.bg}`}>
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="40" fill="none" stroke="#e5e7eb" strokeWidth="6" />
            <circle
              cx="45" cy="45" r="40"
              fill="none"
              stroke={color.stroke}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-bold ${color.text}`}>{score}</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Score Santé</p>
          <p className={`text-lg font-bold ${color.text}`}>{color.label}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Basé sur la rentabilité, le stock, le personnel, l&apos;hygiène et la satisfaction client
          </p>
        </div>
      </div>
    </div>
  )
}
