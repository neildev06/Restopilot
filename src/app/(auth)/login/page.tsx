import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          RestoPilot
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Pilotez votre restaurant sereinement
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
