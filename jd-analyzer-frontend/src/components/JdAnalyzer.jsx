"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Send, X, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useToast } from "./ui/use-toast"
import FileUploader from "./FileUploader"
import PrepGuide from "./PrepGuide"

// API URL - adjust this to match your Django backend URL
const API_URL = "http://localhost:8000/api"

export default function JdAnalyzer() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [activeTab, setActiveTab] = useState("text")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [uploadedFileType, setUploadedFileType] = useState("")
  const { toast } = useToast()

  const handleTextChange = (e) => {
    setJobDescription(e.target.value)
    // Clear any previously uploaded file info when text is manually entered
    setUploadedFile(null)
    setUploadedFileName("")
    setUploadedFileType("")
  }

  const handleFileContent = (content, file) => {
    setJobDescription(content)
    setUploadedFile(file)
    setUploadedFileName(file.name)
    setUploadedFileType(file.type)
    setActiveTab("text")
    toast({
      title: "File loaded successfully",
      description: `${file.name} has been loaded and is ready for analysis.`,
    })
  }

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Empty job description",
        description: "Please enter or upload a job description first.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      let response

      // If we have an uploaded file, send it as FormData
      if (uploadedFile && uploadedFileType === "application/pdf") {
        const formData = new FormData()
        formData.append("file", uploadedFile)

        response = await fetch(`${API_URL}/analyze-pdf/`, {
          method: "POST",
          body: formData,
        })
      } else {
        // Otherwise send the text content
        response = await fetch(`${API_URL}/analyze/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription }),
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze job description")
      }

      const data = await response.json()

      // Transform the backend response to match our frontend structure
      const result = {
        summary: data.summary,
        keyRequirements: data.key_requirements,
        potentialQuestions: data.potential_questions,
        preparationTips: data.preparation_tips,

        fileName: uploadedFileName || null,
        fileType: uploadedFileType || "text/plain",
      }

      setAnalysisResult(result)

      toast({
        title: "Analysis complete",
        description: "Your job description has been analyzed successfully.",
      })
    } catch (error) {
      console.error("Analysis error:", error)
      toast({
        title: "Analysis failed",
        description: error.message || "There was an error analyzing the job description. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setAnalysisResult(null)
    setJobDescription("")
    setUploadedFile(null)
    setUploadedFileName("")
    setUploadedFileType("")
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">InterviewPrep AI</h1>
          <p className="text-muted-foreground mt-2">
            Upload a job description and get a personalized interview preparation guide
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!analysisResult ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <CardTitle>Job Description Analyzer</CardTitle>
                  <CardDescription>Paste your job description or upload a file to get started</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="text">Paste Text</TabsTrigger>
                      <TabsTrigger value="upload">Upload File</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text">
                      <Textarea
                        placeholder="Paste the job description here..."
                        className="min-h-[300px] font-mono text-sm"
                        value={jobDescription}
                        onChange={handleTextChange}
                      />
                      {uploadedFileName && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>Loaded from: {uploadedFileName}</span>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="upload">
                        <FileUploader
                          onAnalysisComplete={(result, content, file) => {
                            setAnalysisResult(result)
                            setJobDescription(content)
                            setUploadedFile(file)
                            setUploadedFileName(file.name)
                            setUploadedFileType(file.type)
                            setActiveTab("text")
                          
                            toast({
                              title: "Analysis complete",
                              description: `${file.name} was analyzed successfully.`,
                            })
                          }}
                        />
                      </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleAnalyze} disabled={isAnalyzing || !jobDescription.trim()} className="gap-2">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Analyze Job Description
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-end mb-4">
                <Button variant="outline" onClick={resetAnalysis} className="gap-2">
                  <X className="h-4 w-4" />
                  New Analysis
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="md:col-span-2">
                  <PrepGuide result={analysisResult} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
