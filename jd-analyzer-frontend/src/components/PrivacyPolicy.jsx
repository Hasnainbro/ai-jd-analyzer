"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Shield, Home, Eye, Lock, Database, Users, FileText, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Logo from "./Logo"
import Footer from "./Footer"

const privacySections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "Job descriptions you upload or paste into our platform",
      "Account information (email, name) when you create an account",
      "Usage data and analytics to improve our service",
      "Technical information like IP address and browser type",
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: [
      "Analyze job descriptions to generate personalized preparation guides",
      "Improve our AI algorithms and service quality",
      "Send you important updates about our service",
      "Provide customer support and respond to inquiries",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "All data is encrypted in transit and at rest",
      "We use industry-standard security measures",
      "Regular security audits and vulnerability assessments",
      "Limited access to data on a need-to-know basis",
    ],
  },
  {
    icon: Users,
    title: "Data Sharing",
    content: [
      "We do not sell your personal information to third parties",
      "Job descriptions are processed by our AI systems only",
      "Anonymous usage statistics may be shared for research",
      "Legal compliance may require data disclosure in rare cases",
    ],
  },
]

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="cursor-pointer" onClick={handleBackToHome}>
              <Logo size="sm" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-sm text-gray-500">How we protect and handle your data</p>
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
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Privacy Matters</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              At InterviewPrep AI, we are committed to protecting your privacy and ensuring the security of your
              personal information. This policy explains how we collect, use, and safeguard your data.
            </p>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Last Updated: December 2024</p>
                    <p className="text-sm text-blue-700">
                      This privacy policy was last updated on December 15, 2024. We may update this policy from time to
                      time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-6">
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Your Rights
                </CardTitle>
                <CardDescription>You have the following rights regarding your personal data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Access Your Data</h4>
                    <p className="text-sm text-gray-600">Request a copy of all personal data we have about you</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Delete Your Data</h4>
                    <p className="text-sm text-gray-600">Request deletion of your personal information</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Correct Your Data</h4>
                    <p className="text-sm text-gray-600">Update or correct any inaccurate information</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Data Portability</h4>
                    <p className="text-sm text-gray-600">Export your data in a machine-readable format</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar technologies to enhance your experience on our platform:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      <strong>Essential Cookies:</strong> Required for basic functionality and security
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      <strong>Analytics Cookies:</strong> Help us understand how you use our service
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      <strong>Preference Cookies:</strong> Remember your settings and preferences
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Questions About Privacy?</h3>
                <p className="text-blue-100 mb-4">
                  If you have any questions about this privacy policy or how we handle your data, please don't hesitate
                  to contact us.
                </p>
                <div className="space-y-2 text-blue-100">
                  <p>📧 Email: hasnainkherani1@gmail.com</p>
                  <p>📞 Phone: +91-91755 50529</p>
                  <p>📍 Address: Moraj Oppo of IIM Nagpur, Mihan, Nagpur, India</p>
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
