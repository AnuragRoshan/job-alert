import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import {
  Bell,
  Search,
  Zap,
  Shield,
  Globe,
  Target,
  BarChart3,
  Clock,
  Users,
  Mail,
  Smartphone,
  Filter,
  CheckCircle,
  TrendingUp,
  Award,
  Briefcase
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Real-time Job Alerts",
      description: "Get instant notifications the moment a job matching your criteria is posted. Be the first to apply.",
      details: ["Push notifications", "Email alerts", "SMS notifications", "Slack integration"]
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Smart Job Matching",
      description: "AI-powered algorithm analyzes job descriptions and matches you with the most relevant opportunities.",
      details: ["Machine learning", "Skill matching", "Experience level filtering", "Location preferences"]
    },
    {
      icon: <Filter className="h-8 w-8" />,
      title: "Advanced Filtering",
      description: "Create precise job searches with powerful filters for salary, company size, remote work, and more.",
      details: ["Salary range filters", "Company size", "Remote/hybrid options", "Industry categories"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Job Coverage",
      description: "Access opportunities from top companies worldwide. From startups to Fortune 500 companies.",
      details: ["1000+ partner companies", "Global job boards", "Regional preferences", "Multi-language support"]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Our system processes thousands of job postings every minute to deliver instant notifications.",
      details: ["Sub-second processing", "Real-time updates", "Instant delivery", "99.9% uptime"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Your data is protected with enterprise-grade security and privacy measures.",
      details: ["SOC 2 compliant", "End-to-end encryption", "GDPR compliant", "Regular security audits"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Track your job search progress with detailed analytics and insights.",
      details: ["Application tracking", "Response rates", "Market insights", "Salary trends"]
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimized",
      description: "Access your job alerts anywhere with our mobile-optimized platform and apps.",
      details: ["Mobile web app", "iOS app", "Android app", "Offline access"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Share job opportunities with your network and collaborate on applications.",
      details: ["Team alerts", "Referral tracking", "Shared lists", "Collaboration tools"]
    }
  ];

  const stats = [
    { number: "100K+", label: "Active Users" },
    { number: "1M+", label: "Jobs Processed Daily" },
    { number: "1000+", label: "Partner Companies" },
    { number: "50+", label: "Countries Covered" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Job Seekers
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the comprehensive suite of tools designed to supercharge your job search
            and connect you with your dream opportunities.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly design
              to deliver the ultimate job search experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with your favorite tools and platforms for a streamlined workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'LinkedIn', 'Indeed', 'Glassdoor', 'AngelList', 'Remote.co', 'Stack Overflow',
              'GitHub', 'Slack', 'Discord', 'Notion', 'Trello', 'Zapier'
            ].map((integration, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-medium text-gray-900">{integration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using JobAlert to accelerate their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/signin"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}