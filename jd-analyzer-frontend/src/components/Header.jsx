"use client"

import { Bell, Search, User, ChevronDown, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { ThemeToggle } from "./ui/theme-toggle"
import { Badge } from "./ui/badge"

export default function Header({ currentView, onNewAnalysis }) {
  const getPageTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Dashboard"
      case "analysis":
        return "Analysis Results"
      default:
        return "Dashboard"
    }
  }

  return (
    <header className="bg-background border-b border-border px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{getPageTitle()}</h1>
            <p className="text-sm text-foreground">
              {currentView === "dashboard"
                ? "Upload and analyze job descriptions to get personalized interview preparation guides"
                : "Review your analysis results and preparation recommendations"}
            </p>
          </div>
        </div>
        
        

        <div className="flex items-center gap-4">
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search analyses..." className="pl-10 w-64 bg-gray-50 border-gray-200" />
          </div> */}

            {/* Theme Toggle */}
          <ThemeToggle />

          {/* New Analysis Button */}
          <Button onClick={onNewAnalysis} className="gap-2">
            <Plus className="w-4 h-4" />
            New Analysis
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link to="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link to="/aboutus">About Us</Link>
          </Button>

          {/* User Menu */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>DU</AvatarFallback>
                </Avatar>
                <span className="hidden md:block">Defualt User</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */} 
        </div>
      </div>
    </header>
  )
}
