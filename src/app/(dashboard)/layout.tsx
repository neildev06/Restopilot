import { AuthProvider } from '@/providers/auth-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { Toaster } from '@/components/ui/toaster'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
              {children}
            </main>
          </div>
        </div>
        <MobileBottomNav />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}
