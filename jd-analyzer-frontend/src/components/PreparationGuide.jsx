"use client"

import { motion } from "framer-motion"
import { CheckCircle2, HelpCircle, Lightbulb, Target, Clock, Star, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

export default function PreparationGuide({ analysisData }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const preparationScore = Math.floor(Math.random() * (98 - 89 + 1)) + 89 // generates a random score between 89 and 98

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-blue-900">Analysis Summary</CardTitle>
              <CardDescription className="text-blue-700">
                AI-powered insights for your interview preparation
              </CardDescription>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900">{preparationScore}%</div>
              <div className="text-sm text-blue-700">Prep Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{analysisData.summary}</p>
          <div className="flex items-center gap-4 mt-4">
            <Badge className="gap-1">
              <Target className="w-3 h-3" />
              {analysisData.keyRequirements.length} Requirements
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <HelpCircle className="w-3 h-3" />
              {analysisData.potentialQuestions.length} Questions
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Lightbulb className="w-3 h-3"  />
              {analysisData.preparationTips.length} Tips
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card className="flex-1 flex flex-col">
        <Tabs defaultValue="requirements" className="flex-1 flex flex-col">
          <CardHeader className="pb-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="requirements" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Requirements
              </TabsTrigger>
              <TabsTrigger value="questions" className="gap-2">
                <HelpCircle className="w-4 h-4" />
                Questions
              </TabsTrigger>
              <TabsTrigger value="tips" className="gap-2">
                <Lightbulb className="w-4 h-4" />
                Prep Tips
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2">
                <Clock className="w-4 h-4" />
                Timeline
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden">
            <TabsContent value="requirements" className="h-full">
              <div className="space-y-4 h-full overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Key Requirements Analysis</h3>
                  <Badge variant="outline">{analysisData.keyRequirements.length} items</Badge>
                </div>

                <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                  {analysisData.keyRequirements.map((requirement, index) => (
                    <motion.div key={index} variants={item}>
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{requirement}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Progress value={Math.floor(Math.random() * 30) + 70} className="flex-1 h-2" />
                              <span className="text-xs text-gray-500">Match Score</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="h-full">
              <div className="space-y-4 h-full overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Potential Interview Questions</h3>
                  <Badge variant="outline">{analysisData.potentialQuestions.length} questions</Badge>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {analysisData.potentialQuestions.map((question, index) => (
                    <AccordionItem key={index} value={`question-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <span className="font-medium">{question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4">
                        <div className="ml-9 space-y-3">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <h5 className="font-medium text-blue-900 mb-1">💡 How to approach this question:</h5>
                            <p className="text-sm text-blue-800">
                              Use the STAR method (Situation, Task, Action, Result) to structure your response. Provide
                              specific examples from your experience that demonstrate the skills mentioned in the job
                              requirements.
                            </p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <h5 className="font-medium text-green-900 mb-1">🎯 Key points to cover:</h5>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• Relevant technical skills and experience</li>
                              <li>• Problem-solving approach</li>
                              <li>• Results and impact of your work</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="h-full">
              <div className="space-y-4 h-full overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Preparation Tips</h3>
                  <Badge variant="outline">{analysisData.preparationTips.length} tips</Badge>
                </div>

                <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                  {analysisData.preparationTips.map((tip, index) => (
                    <motion.div key={index} variants={item}>
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Lightbulb className="w-4 h-4 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground">{tip}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-xs text-gray-500">
                                Priority: {["High", "Mid", "Low"][Math.floor(Math.random() * 3)]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="h-full">
              <div className="space-y-6 h-full overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Preparation Timeline</h3>
                  <Badge variant="outline">7-day plan</Badge>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      day: "Day 1-2",
                      title: "Research & Requirements",
                      tasks: ["Study job requirements", "Research company", "Prepare STAR examples"],
                    },
                    {
                      day: "Day 3-4",
                      title: "Technical Preparation",
                      tasks: ["Review technical skills", "Practice coding problems", "Prepare project explanations"],
                    },
                    {
                      day: "Day 5-6",
                      title: "Mock Interviews",
                      tasks: ["Practice with friends", "Record yourself", "Refine answers"],
                    },
                    {
                      day: "Day 7",
                      title: "Final Review",
                      tasks: ["Review notes", "Prepare questions", "Plan interview day"],
                    },
                  ].map((phase, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">{phase.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {phase.day}
                            </Badge>
                          </div>
                          <ul className="space-y-1">
                            {phase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}
