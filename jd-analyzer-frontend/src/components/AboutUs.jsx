"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Users, Target, Zap, Award, Heart, Globe, Mail, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Logo from "./Logo"
import Footer from "./Footer"

const features = [
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description: "Advanced natural language processing to extract key insights from job descriptions",
  },
  {
    icon: Target,
    title: "Personalized Preparation",
    description: "Tailored interview questions and preparation tips based on specific job requirements",
  },
  {
    icon: Award,
    title: "Expert Guidance",
    description: "Professional interview strategies and best practices from industry experts",
  },
  {
    icon: Globe,
    title: "Universal Compatibility",
    description: "Works with job descriptions from any industry, company size, or role level",
  },
]

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "AI Research Lead",
    bio: "PhD in Machine Learning with 8+ years in NLP and career development",
    avatar: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Manager",
    bio: "Former tech recruiter with expertise in interview processes and candidate success",
    avatar: "MR",
  },
  {
    name: "Emily Johnson",
    role: "UX Designer",
    bio: "Specializes in creating intuitive interfaces for professional development tools",
    avatar: "EJ",
  },
  {
    name: "David Kim",
    role: "Full Stack Developer",
    bio: "Expert in React, Node.js, and building scalable web applications",
    avatar: "DK",
  },
]

const stats = [
  { label: "Job Descriptions Analyzed", value: "50,000+" },
  { label: "Success Rate", value: "94%" },
  { label: "Active Users", value: "15,000+" },
  { label: "Countries Served", value: "45+" },
]

export default function AboutUs() {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="cursor-pointer" onClick={handleBackToHome}>
              <Logo size="sm" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
              <p className="text-sm text-gray-500">Learn more about InterviewPrep AI and our mission</p>
            </div>
          </div>
          <Button onClick={handleBackToHome} variant="outline" className="gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6 space-y-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Empowering Your Career Journey with AI</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              InterviewPrep AI transforms job descriptions into personalized interview preparation guides, helping
              professionals land their dream jobs with confidence and strategic preparation.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="w-8 h-8 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We believe that everyone deserves the opportunity to succeed in their career aspirations. Our mission
                  is to democratize interview preparation by providing AI-powered insights that level the playing field,
                  regardless of background, experience, or resources. We're committed to helping professionals present
                  their best selves and achieve their career goals.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose InterviewPrep AI?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform combines cutting-edge AI technology with proven interview strategies to give you the
                competitive edge you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our diverse team of experts combines technical excellence with deep understanding of career development
                and recruitment processes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                        {member.avatar}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                      <Badge variant="secondary" className="mb-3">
                        {member.role}
                      </Badge>
                      <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Technology Stack
                </CardTitle>
                <CardDescription>
                  Built with modern technologies for reliability, scalability, and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["React", "Node.js", "Python", "TensorFlow", "OpenAI GPT", "Django", "PostgreSQL", "AWS"].map(
                    (tech, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">{tech}</div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Interview Preparation?</h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Join thousands of professionals who have successfully landed their dream jobs with our AI-powered
                  preparation guides.
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={handleBackToHome} variant="secondary" className="gap-2">
                    <Users className="w-4 h-4" />
                    Get Started Free
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
