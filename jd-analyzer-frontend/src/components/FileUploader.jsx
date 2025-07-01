"use client"

import { useState, useRef } from "react"
import { FileText, Upload, AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { useToast } from "./ui/use-toast"
import { Progress } from "./ui/progress"
import { Card, CardContent } from "./ui/card"

const API_URL = "http://localhost:8000/api"

export default function FileUploader({ onAnalysisComplete = () => {} }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [analysisStage, setAnalysisStage] = useState("")
  const fileInputRef = useRef(null)
  const { toast } = useToast()

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const processFile = async (file) => {
    setError(null)
    setIsProcessing(true)
    setProgress(10)
    setUploadedFile(file)
    setAnalysisStage("Uploading file...")

    // Check file type
    if (file.type !== "text/plain" && file.type !== "application/pdf") {
      setError("Please upload a text or PDF file only.")
      setIsProcessing(false)
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.")
      setIsProcessing(false)
      return
    }

    try {
      setProgress(30)
      setAnalysisStage("Processing file...")

      let response
      let jobDescription = ""

      if (file.type === "text/plain") {
        // Handle text file
        jobDescription = await file.text()
        setProgress(50)
        setAnalysisStage("Analyzing content...")

        response = await fetch(`${API_URL}/analyze/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription }),
        })
      } else if (file.type === "application/pdf") {
        // Handle PDF file
        const formData = new FormData()
        formData.append("file", file)
        setProgress(50)
        setAnalysisStage("Extracting text from PDF...")

        response = await fetch(`${API_URL}/analyze-pdf/`, {
          method: "POST",
          body: formData,
        })
      }

      setProgress(80)
      setAnalysisStage("Generating insights...")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze job description")
      }

      const data = await response.json()
      setProgress(100)
      setAnalysisStage("Analysis complete!")

      // Transform the backend response
      const result = {
        summary: data.summary,
        keyRequirements: data.key_requirements,
        potentialQuestions: data.potential_questions,
        preparationTips: data.preparation_tips,
        originalText: jobDescription || `[PDF File: ${file.name}]\n\nThis PDF was processed on the server.`,
        fileName: file.name,
        fileType: file.type,
      }

      // Pass the complete analysis to the parent component
      onAnalysisComplete(result, jobDescription || `[PDF File: ${file.name}]`, file)

      toast({
        title: "Analysis complete!",
        description: `Successfully analyzed ${file.name}. View your personalized preparation guide.`,
      })

      // Reset after successful analysis
      setTimeout(() => {
        setProgress(0)
        setAnalysisStage("")
        setUploadedFile(null)
      }, 2000)
    } catch (err) {
      setError(err.message || "Failed to process file. Please try again.")
      console.error("File processing error:", err)

      toast({
        title: "Analysis failed",
        description: err.message || "There was an error processing your file.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      await processFile(file)
    }
  }

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      await processFile(file)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
          isDragging
            ? "border-blue-400 bg-blue-50 scale-105"
            : isProcessing
              ? "border-green-400 bg-green-50"
              : "border-gray-300 hover:border-gray-400 hover:shadow-md"
        }`}
        onClick={!isProcessing ? handleButtonClick : undefined}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,.pdf"
            className="hidden"
            disabled={isProcessing}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                isProcessing ? "bg-green-100" : isDragging ? "bg-blue-100 scale-110" : "bg-gray-100"
              }`}
            >
              {isProcessing ? (
                <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
              ) : isDragging ? (
                <Upload className="w-8 h-8 text-blue-600" />
              ) : (
                <Upload className="w-8 h-8 text-gray-600" />
              )}
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isProcessing ? "Processing your file..." : isDragging ? "Drop your file here" : "Upload Job Description"}
            </h3>
 
            <p className="text-gray-600 mb-4">
              {isProcessing ? analysisStage : "Drag and drop your file here, or click to browse"}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <FileText className="w-4 h-4" />
              <span>Supports TXT and PDF files up to 5MB</span>
            </div>

            {!isProcessing && (
              <Button variant="outline" className="gap-2 hover:bg-blue-50 hover:border-blue-300">
                <Upload className="w-4 h-4" />
                Choose File
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Upload Success */}
      {uploadedFile && !isProcessing && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium text-green-900">{uploadedFile.name}</p>
                <p className="text-sm text-green-700">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Progress */}
      {isProcessing && (
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

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upload Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Tips Section */}
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
