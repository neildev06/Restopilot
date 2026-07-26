export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4"
         style={{ backgroundColor: 'rgb(var(--sidebar-bg))' }}>

      {/* Background texture — subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(212,98,42,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(45,106,79,0.06) 0%, transparent 55%)
          `,
        }}
      />

      {/* Ember glow top-right */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-ember/5 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-ember flex items-center justify-center shadow-ember">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight">
              RestoPilot
            </span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(232,227,217,0.5)' }}>
            Pilotez votre restaurant sereinement
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}
