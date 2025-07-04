"use client"

import { motion } from "framer-motion"
import { FileText, Download, Share2, Bookmark, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import JobDescriptionPanel from "./JobDescriptionPanel"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import PreparationGuide from "./PreparationGuide"

export default function AnalysisView({ analysisData, jobDescription, uploadedFile }) {
  const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false)
  const handleDownload = () => {
    const content = `
# Interview Preparation Guide

## Job Summary
${analysisData.summary}

## Key Requirements
${analysisData.keyRequirements.map((req) => `- ${req}`).join("\n")}

## Potential Interview Questions
${analysisData.potentialQuestions.map((q) => `- ${q}`).join("\n")}

## Preparation Tips
${analysisData.preparationTips.map((tip) => `- ${tip}`).join("\n")}

Generated by InterviewPrep AI
`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "interview-prep-guide.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Action Bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="font-medium text-gray-900 text-sm sm:text-base truncate">
                {uploadedFile ? uploadedFile.name : "Text Input"}
              </span>
            </div>
            <Separator orientation="vertical" className="h-4 sm:h-6 hidden sm:block" />
            <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              Analysis completed • {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
              <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
           <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button onClick={handleDownload} size="sm" className="gap-2 text-xs sm:text-sm">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              Download
            </Button>
          </div>
        </div>
         {/* Mobile timestamp */}
        <div className="text-xs text-gray-500 mt-2 sm:hidden">
          Analysis completed • {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="hidden lg:block h-full">
          <div className="h-full grid grid-cols-5 gap-6 p-6">
          {/* Job Description Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-2"
          >
            <JobDescriptionPanel jobDescription={jobDescription} uploadedFile={uploadedFile} />
          </motion.div>

          {/* Preparation Guide */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-3"
          >
            <PreparationGuide analysisData={analysisData} />
          </motion.div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden h-full flex flex-col">
          <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Collapsible Job Description for Mobile/Tablet */}
            <Collapsible open={isJobDescriptionOpen} onOpenChange={setIsJobDescriptionOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    View Original Job Description
                  </span>
                  {isJobDescriptionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <JobDescriptionPanel jobDescription={jobDescription} uploadedFile={uploadedFile} />
                </motion.div>
              </CollapsibleContent>
            </Collapsible>

            {/* Preparation Guide */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <PreparationGuide analysisData={analysisData} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
