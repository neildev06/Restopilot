'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router    = useRouter()
  const supabase  = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message === 'Invalid login credentials'
        ? 'Email ou mot de passe incorrect.'
        : 'Une erreur est survenue. Réessayez.')
      setLoading(false)
      return
    }
    router.push('/tableau-de-bord')
    router.refresh()
  }

  return (
    <div
      className="rounded-2xl border p-7 shadow-2xl"
      style={{
        backgroundColor: 'rgb(28 24 22 / 0.95)',
        borderColor: 'rgb(var(--sidebar-border))',
        backdropFilter: 'blur(20px)',
      }}
    >
      <h1 className="font-serif text-2xl font-bold text-white mb-1">Connexion</h1>
      <p className="text-sm mb-7" style={{ color: 'rgba(232,227,217,0.5)' }}>
        Accédez à votre tableau de bord
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider"
                 style={{ color: 'rgba(232,227,217,0.5)' }}>
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: 'rgba(232,227,217,0.3)' }} />
            <Input
              id="email"
              type="email"
              placeholder="gerant@comptoir-provencal.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9 h-10 text-sm text-white placeholder:text-white/20"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgb(var(--sidebar-border))',
              }}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider"
                 style={{ color: 'rgba(232,227,217,0.5)' }}>
            Mot de passe
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: 'rgba(232,227,217,0.3)' }} />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9 h-10 text-sm text-white placeholder:text-white/20"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgb(var(--sidebar-border))',
              }}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-ember hover:bg-ember-dark text-white font-semibold text-sm transition-all duration-150 shadow-ember hover:shadow-none mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion…
            </>
          ) : (
            <>
              Se connecter
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t" style={{ borderColor: 'rgb(var(--sidebar-border))' }}>
        <p className="text-xs text-center" style={{ color: 'rgba(232,227,217,0.3)' }}>
          Compte démo ·{' '}
          <span className="font-mono" style={{ color: 'rgba(232,227,217,0.6)' }}>
            gerant@comptoir-provencal.fr
          </span>{' '}
          / <span className="font-mono" style={{ color: 'rgba(232,227,217,0.6)' }}>demo1234</span>
        </p>
      </div>
    </div>
  )
}
