import { getProviders, signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Mail, Users, ArrowRight, Shield, Bell } from "lucide-react"
import toast from "react-hot-toast"

export default function SignIn({ providers }) {
  const [loading, setLoading] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/')
      }
    })
  }, [router])

  const handleSignIn = async (providerId) => {
    setLoading(providerId)
    try {
      toast.loading('Signing you in...', { id: 'signin' })
      const result = await signIn(providerId, { callbackUrl: '/' })
      if (result?.error) {
        toast.error('Sign in failed. Please try again.', { id: 'signin' })
      } else {
        toast.success('Sign in successful! Redirecting...', { id: 'signin' })
      }
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('An error occurred during sign in.', { id: 'signin' })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-white/20">
              <Bell className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-4 mb-2">
            Job Alert Platform
          </h1>
          <p className="text-gray-600">Sign in to manage your job alerts</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/20 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Choose your preferred sign-in method</p>
          </div>

          <div className="space-y-4">
            {providers && Object.values(providers).map((provider) => {
              if (provider.id === 'google') {
                return (
                  <button
                    key={provider.name}
                    onClick={() => handleSignIn(provider.id)}
                    disabled={loading === provider.id}
                    className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading === provider.id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-600 border-t-transparent"></div>
                    ) : (
                      <Mail className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-medium">
                      {loading === provider.id ? 'Signing in...' : `Continue with ${provider.name}`}
                    </span>
                    {loading !== provider.id && <ArrowRight className="w-4 h-4" />}
                  </button>
                )
              }

              if (provider.id === 'linkedin') {
                return (
                  <button
                    key={provider.name}
                    onClick={() => handleSignIn(provider.id)}
                    disabled={loading === provider.id}
                    className="w-full bg-blue-700 text-white px-6 py-4 rounded-xl hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading === provider.id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Users className="w-5 h-5" />
                    )}
                    <span className="font-medium">
                      {loading === provider.id ? 'Signing in...' : `Continue with ${provider.name}`}
                    </span>
                    {loading !== provider.id && <ArrowRight className="w-4 h-4" />}
                  </button>
                )
              }

              return null
            })}
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Secure Authentication</h3>
                <p className="text-xs text-blue-600 mt-1">
                  We use OAuth 2.0 for secure authentication. Your credentials are never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          By signing in, you agree to our terms of service and privacy policy.
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}