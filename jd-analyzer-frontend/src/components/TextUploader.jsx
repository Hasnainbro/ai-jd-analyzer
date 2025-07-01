"use client"

import { useState } from "react"
import { Send, Loader2, Type, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useToast } from "./ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Progress } from "./ui/progress"

const API_URL = "http://localhost:8000/api"

export default function TextUploader({ onAnalysisComplete }) {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const [analysisStage, setAnalysisStage] = useState("")
  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description first.")
      return
    }

    if (jobDescription.trim().length < 100) {
      setError("Job description seems too short. Please provide a more detailed description.")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setProgress(10)
    setAnalysisStage("Preparing analysis...")

    try {
      setProgress(30)
      setAnalysisStage("Sending to AI for processing...")

      const response = await fetch(`${API_URL}/analyze/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      })

      setProgress(70)
      setAnalysisStage("Generating insights...")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze job description")
      }

      const data = await response.json()
      setProgress(100)
      setAnalysisStage("Analysis complete!")

      const result = {
        summary: data.summary,
        keyRequirements: data.key_requirements,
        potentialQuestions: data.potential_questions,
        preparationTips: data.preparation_tips,
        originalText: jobDescription,
        fileName: null,
        fileType: "text/plain",
      }

      onAnalysisComplete(result, jobDescription, null)

      toast({
        title: "Analysis complete!",
        description: "Your job description has been analyzed successfully.",
      })

      // Reset form after successful analysis
      setTimeout(() => {
        setJobDescription("")
        setProgress(0)
        setAnalysisStage("")
      }, 2000)
    } catch (err) {
      setError(err.message || "Failed to analyze job description. Please try again.")
      console.error("Analysis error:", err)

      toast({
        title: "Analysis failed",
        description: err.message || "There was an error analyzing your job description.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleTextChange = (e) => {
    setJobDescription(e.target.value)
    setError(null) // Clear error when user starts typing
  }

  const wordCount = jobDescription
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
  const charCount = jobDescription.length

  return (
    <div className="space-y-4">
      <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5 text-blue-600" />
            Paste Job Description
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Textarea
            placeholder="Paste the complete job description here including:
• Job title and company information
• Required skills and qualifications  
• Job responsibilities and duties
• Experience requirements
• Any specific technologies or tools mentioned

The more detailed the description, the better your personalized preparation guide will be!"
            className="min-h-[300px] font-mono text-sm resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            value={jobDescription}
            onChange={handleTextChange}
            disabled={isAnalyzing}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{charCount} characters</span>
              <span>•</span>
              <span>{wordCount} words</span>
              {wordCount > 0 && (
                <>
                  <span>•</span>
                  <span className={wordCount < 50 ? "text-orange-500" : "text-green-600"}>
                    {wordCount < 50 ? "Add more details" : "Good length"}
                  </span>
                </>
              )}
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jobDescription.trim() || wordCount < 20}
              className="gap-2 min-w-[140px]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Analyze Description
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900">Analyzing your job description</p>
                  <p className="text-sm text-blue-700">{analysisStage}</p>
                </div>
                <span className="text-sm font-medium text-blue-900">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success State */}
      {!isAnalyzing && jobDescription && wordCount >= 50 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium text-green-900">Ready for analysis</p>
                <p className="text-sm text-green-700">Your job description looks comprehensive and ready to analyze</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Input Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Writing Tips */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900 mb-2">💡 Tips for better results:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Upload complete job descriptions with all requirements</li>
            <li>• Ensure PDF files have selectable text (not scanned images)</li>
            <li>• Include company information and role responsibilities</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
