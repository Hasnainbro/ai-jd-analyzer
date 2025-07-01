"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, Zap, TrendingUp, Clock, CheckCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import FileUploader from "./FileUploader"
import TextUploader from "./TextUploader"

// const stats = [
//   { label: "Analyses Completed", value: "24", icon: CheckCircle, color: "text-green-600" },
//   { label: "Success Rate", value: "96%", icon: TrendingUp, color: "text-blue-600" },
//   { label: "Avg. Processing Time", value: "2.3s", icon: Clock, color: "text-purple-600" },
//   { label: "AI Accuracy", value: "98%", icon: Zap, color: "text-orange-600" },
// ]

// const recentAnalyses = [
//   { title: "Senior Frontend Developer", company: "TechCorp", date: "2 hours ago", status: "completed" },
//   { title: "Product Manager", company: "StartupXYZ", date: "1 day ago", status: "completed" },
//   { title: "Data Scientist", company: "DataCorp", date: "3 days ago", status: "completed" },
// ]

export default function Dashboard({ onAnalysisComplete }) {
  const [activeTab, setActiveTab] = useState("upload")

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-auto h-full">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 sm:p-6 border border-blue-200"
      >
        <div className="flex items-start gap-3 mb-3">
          <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Welcome to InterviewPrep AI</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Transform any job description into a personalized interview preparation guide. Our AI analyzes
              requirements, generates relevant questions, and provides strategic tips to help you succeed in your next
              interview.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${stat.color} flex-shrink-0`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div> */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Upload Section */}
        <div className="xl:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                Upload Job Description
              </CardTitle>
              <CardDescription className="text-sm">
                Upload a job description to get personalized interview preparation insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
                  <TabsTrigger value="upload" className="text-xs sm:text-sm">
                    Upload File
                  </TabsTrigger>
                  <TabsTrigger value="text" className="text-xs sm:text-sm">
                    Paste Text
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-0">
                  <FileUploader onAnalysisComplete={onAnalysisComplete} />
                </TabsContent>
                <TabsContent value="text" className="mt-0">
                  <TextUploader onAnalysisComplete={onAnalysisComplete} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Recent Analyses */}
        {/* <div>
          <Card className="h-full">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                Recent Analyses
              </CardTitle>
              <CardDescription className="text-sm">Your latest job description analyses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {recentAnalyses.map((analysis, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{analysis.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{analysis.company}</p>
                      <p className="text-xs text-gray-400 mt-1">{analysis.date}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 capitalize hidden sm:inline">{analysis.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Button variant="outline" className="w-full mt-3 sm:mt-4 text-sm">
                View All Analyses
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>

      {/* Quick Tips */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl">💡 Pro Tips for Better Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">Complete Job Descriptions</h4>
              <p className="text-xs sm:text-sm text-blue-700">
                Upload complete job descriptions with requirements, responsibilities, and qualifications for best
                results.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2 text-sm sm:text-base">Clear Text Format</h4>
              <p className="text-xs sm:text-sm text-green-700">
                Ensure your PDF files have clear, readable text. Scanned images may not work as well.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2 text-sm sm:text-base">Review Results</h4>
              <p className="text-xs sm:text-sm text-purple-700">
                Take time to review and customize the generated preparation guide based on your experience.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
