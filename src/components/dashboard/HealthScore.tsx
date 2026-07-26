'use client'

interface HealthScoreProps {
  score: number
}

export function HealthScore({ score }: HealthScoreProps) {
  const getStyle = (s: number) => {
    if (s >= 80) return { stroke: '#2D6A4F', bg: 'bg-pine/8', text: 'text-pine',  label: 'Excellent',     sublabel: 'Tout est en ordre' }
    if (s >= 60) return { stroke: '#D4622A', bg: 'bg-ember/8', text: 'text-ember', label: 'À surveiller', sublabel: 'Quelques points d\'attention' }
    return           { stroke: '#DC2626', bg: 'bg-red-500/8', text: 'text-red-500', label: 'Critique',    sublabel: 'Actions requises' }
  }

  const s     = getStyle(score)
  const r     = 38
  const circ  = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ

  return (
    <div className={`rounded-xl border bg-card p-5 shadow-card`}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Score santé
      </p>
      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="relative w-[80px] h-[80px] shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r={r} fill="none" stroke="rgb(var(--muted))" strokeWidth="5" />
            <circle
              cx="42" cy="42" r={r}
              fill="none"
              stroke={s.stroke}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-data text-xl font-bold ${s.text}`}>{score}</span>
          </div>
        </div>

        {/* Label */}
        <div>
          <p className={`text-xl font-serif font-bold ${s.text}`}>{s.label}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.sublabel}</p>
          <p className="text-[11px] text-muted-foreground/60 mt-2">
            Rentabilité · Stock · Personnel · Hygiène
          </p>
        </div>
      </div>
    </div>
  )
}
