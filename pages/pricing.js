import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import {
  Check,
  X,
  Crown,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Star
} from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with job searching",
      features: [
        "Up to 3 active job alerts",
        "Daily email notifications",
        "Basic job matching",
        "Standard support",
        "Mobile access"
      ],
      limitations: [
        "No premium company access",
        "No analytics dashboard",
        "No API access",
        "No team features"
      ],
      buttonText: "Get Started Free",
      buttonStyle: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false
    },
    {
      name: "Professional",
      price: "$19",
      period: "per month",
      description: "Ideal for serious job seekers and career changers",
      features: [
        "Unlimited job alerts",
        "Real-time notifications",
        "AI-powered smart matching",
        "Premium company access",
        "Analytics dashboard",
        "Priority support",
        "Mobile app access",
        "Custom filters",
        "Salary insights"
      ],
      limitations: [],
      buttonText: "Start Free Trial",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams and organizations with advanced needs",
      features: [
        "Everything in Professional",
        "Team collaboration tools",
        "Advanced analytics",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "SSO authentication",
        "Custom branding",
        "Advanced security",
        "Bulk operations"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonStyle: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial for our Professional plan. No credit card required to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay by invoice."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely. You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your billing period."
    },
    {
      question: "Do you offer discounts for annual plans?",
      answer: "Yes! Annual subscribers save 20% compared to monthly billing. Contact us for special discounts on multi-year commitments."
    },
    {
      question: "What kind of support do you provide?",
      answer: "Free users get standard email support. Professional users get priority support with faster response times. Enterprise customers get dedicated account management."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your job search needs. Start free and upgrade as you grow.
          </p>
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium">
              Monthly
            </button>
            <button className="text-gray-600 px-6 py-2 rounded-full text-sm font-medium">
              Annual (Save 20%)
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg border-2 ${plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'} p-8`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Crown className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-center opacity-50">
                      <X className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              See what&apos;s included in each plan
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Free</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Professional</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: "Job Alerts", free: "3", pro: "Unlimited", enterprise: "Unlimited" },
                    { feature: "Real-time Notifications", free: false, pro: true, enterprise: true },
                    { feature: "AI Smart Matching", free: false, pro: true, enterprise: true },
                    { feature: "Analytics Dashboard", free: false, pro: true, enterprise: true },
                    { feature: "API Access", free: false, pro: false, enterprise: true },
                    { feature: "Team Collaboration", free: false, pro: false, enterprise: true },
                    { feature: "Priority Support", free: false, pro: true, enterprise: true },
                    { feature: "Dedicated Account Manager", free: false, pro: false, enterprise: true }
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-700">{row.free}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-700">{row.pro}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-700">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs with JobAlert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/signin"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}