import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RestoPilot — Pilotez votre restaurant',
  description: 'Cockpit opérationnel tout-en-un pour gérants de restaurant.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}
