import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'RestoPilot - Pilotez votre restaurant sereinement',
  description: 'Cockpit opérationnel pour gérants de restaurant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn("antialiased")}>
        {children}
      </body>
    </html>
  )
}
