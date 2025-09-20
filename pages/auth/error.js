import { useRouter } from "next/router"
import { AlertCircle, ArrowLeft, Bell } from "lucide-react"
import Link from "next/link"

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query

  const errorMessages = {
    'Configuration': 'There is a problem with the server configuration.',
    'AccessDenied': 'Access was denied. Please try again.',
    'Verification': 'The verification token has expired or has already been used.',
    'Default': 'An unexpected error occurred during authentication.'
  }

  const errorMessage = errorMessages[error] || errorMessages['Default']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-white/20">
              <Bell className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mt-4 mb-2">
            Job Alert Platform
          </h1>
        </div>

        {/* Error Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/20 p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Error</h2>
            <p className="text-gray-600">{errorMessage}</p>
          </div>

          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Try Again</span>
            </Link>

            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
            >
              <span className="font-medium">Go to Home</span>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Need Help?</h3>
            <p className="text-xs text-gray-600">
              If you continue to experience issues, please ensure you have a valid Google or LinkedIn account and try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}