export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100/30 dark:from-gray-950 dark:to-orange-950/10 p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
