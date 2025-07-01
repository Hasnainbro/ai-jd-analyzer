import { FileText, FileType } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"

export default function OriginalJd({ text, fileName, fileType }) {
  return (
    <Card className="border shadow-sm h-full">
      <CardHeader className="bg-muted/30 pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {fileType === "application/pdf" ? (
            <FileType className="h-5 w-5 text-red-500" />
          ) : (
            <FileText className="h-5 w-5 text-blue-500" />
          )}
          Original Job Description
        </CardTitle>
        {fileName && <p className="text-xs text-muted-foreground mt-1 truncate">Source: {fileName}</p>}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] rounded-md">
          <div className="p-4 font-mono text-sm whitespace-pre-wrap">{text}</div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
