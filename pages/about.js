import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Users,
  Target,
  Award,
  TrendingUp,
  Heart,
  Globe,
  Zap,
  Shield,
  Linkedin,
  Twitter
} from 'lucide-react';

export default function About() {
  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Former VP of Engineering at Google with 15+ years in tech recruitment",
      avatar: "AJ",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Ex-Meta engineer specializing in AI and machine learning systems",
      avatar: "SC",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "Product leader from LinkedIn with expertise in job market dynamics",
      avatar: "MR",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Emily Park",
      role: "Head of Design",
      bio: "Design expert from Airbnb focused on user experience and accessibility",
      avatar: "EP",
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "People First",
      description: "We believe every person deserves meaningful work that aligns with their values and aspirations."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Transparency",
      description: "We're committed to honest communication and protecting our users' privacy and data."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation",
      description: "We constantly push boundaries to create better solutions for job seekers worldwide."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Impact",
      description: "We're building a platform that connects talent with opportunities across the globe."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a simple idea: make job searching more intelligent and efficient"
    },
    {
      year: "2021",
      title: "First 10K Users",
      description: "Reached our first major milestone with 10,000 active users"
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Launched our AI-powered job matching algorithm"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to 50+ countries with 1000+ partner companies"
    },
    {
      year: "2024",
      title: "100K+ Users",
      description: "Celebrated reaching 100,000+ active users and $2M ARR"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Connecting Talent with
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Opportunity
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're on a mission to revolutionize how people discover and land their dream jobs.
                Our AI-powered platform has helped over 100,000 professionals find meaningful careers.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100K+</div>
                  <div className="text-gray-600">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">1000+</div>
                  <div className="text-gray-600">Partner Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50+</div>
                  <div className="text-gray-600">Countries</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-8 shadow-xl">
                  <Target className="h-16 w-16 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize access to career opportunities by leveraging technology
              to create meaningful connections between talented individuals and forward-thinking companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full w-fit mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From startup to scale - here's how we've grown
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind JobAlert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto group-hover:scale-105 transition-transform">
                    {member.avatar}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.twitter} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Impact by Numbers
            </h2>
            <p className="text-xl text-blue-100">
              Our platform's growing impact on careers worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100K+", label: "Active Users", icon: <Users className="h-8 w-8" /> },
              { number: "2M+", label: "Job Alerts Sent", icon: <Target className="h-8 w-8" /> },
              { number: "1000+", label: "Partner Companies", icon: <Award className="h-8 w-8" /> },
              { number: "95%", label: "User Satisfaction", icon: <Heart className="h-8 w-8" /> }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking for your next opportunity or want to be part of our team,
            we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/auth/signin"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Today
            </a>
            <a
              href="/contact"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}