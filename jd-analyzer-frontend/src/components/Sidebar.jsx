"use client"

import { motion } from "framer-motion"
import {
  Home,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  Plus,
  Target,
  BookOpen,
  Info,
  ChevronLeft,
} from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useMobile } from "../hooks/use-mobile"
import Logo from "./Logo"

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "analysis", label: "Analysis", icon: BarChart3 },
  { id: "about", label: "About Us", icon: Info },
]

const quickActions = [
  { label: "New Analysis", icon: Plus, color: "bg-blue-500" },
  { label: "More Tools Coming Soon...", icon: Target, color: "bg-green-500" },
]

export default function Sidebar({ currentView, onViewChange, onNewAnalysis, isCollapsed, onToggleCollapse }) {
  const isMobile = useMobile()

  // Hide sidebar on mobile - it will be handled by the mobile menu in Header
  if (isMobile) {
    return null
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-background border-r border-border flex flex-col transition-colors relative"
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full border border-border bg-background shadow-md hover:shadow-lg"
      >
        <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
      </Button>

      {/* Logo Section */}
      <div className={`p-6 border-b border-border ${isCollapsed ? "px-4" : ""}`}>
        {isCollapsed ? (
          <div className="flex justify-center">
            <Logo size="sm" showText={false} />
          </div>
        ) : (
          <Logo size="md" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="mb-6">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Navigation</h3>
          )}
          {navigationItems.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={currentView === item.id ? "default" : "ghost"}
                    className={`w-full mb-1 ${isCollapsed ? "justify-center px-0" : "justify-start gap-3"} ${
                      currentView === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => onViewChange(item.id)}
                  >
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && item.label}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {!isCollapsed && <Separator />}

        {/* Quick Actions */}
        <div className="mt-6">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h3>
          )}
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full text-muted-foreground hover:text-foreground hover:bg-muted ${
                          isCollapsed ? "justify-center px-0" : "justify-start gap-3"
                        }`}
                        onClick={action.label === "New Analysis" ? onNewAnalysis : undefined}
                      >
                        <div className={`w-2 h-2 rounded-full ${action.color}`} />
                        {!isCollapsed && action.label}
                      </Button>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{action.label}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </div>
        </div>
      </nav>

      {/* Help Section */}
      {/* {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h4 className="font-medium text-foreground">Need Help?</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Get tips on how to make the most of your interview preparation.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                View Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      )} */}
    </motion.div>
  )
}
