"use client"

import { FileType, FileText, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useToast } from "./ui/use-toast"

export default function JobDescriptionPanel({ jobDescription, uploadedFile }) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jobDescription)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "Job description has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {uploadedFile?.type === "application/pdf" ? (
              <FileType className="h-5 w-5 text-red-500" />
            ) : (
              <FileText className="h-5 w-5 text-blue-500" />
            )}
            Original Job Description
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        {uploadedFile && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              {uploadedFile.name}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed">{jobDescription}</div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
