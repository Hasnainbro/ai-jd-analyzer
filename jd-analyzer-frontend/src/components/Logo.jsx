"use client"

import { Briefcase, Zap } from "lucide-react"

export default function Logo({ size = "md", showText = true, className = "" }) {
  const sizeClasses = {
    sm: {
      container: "flex items-center gap-2",
      icon: "w-8 h-8",
      iconContainer: "w-10 h-10",
      title: "text-lg font-bold",
      subtitle: "text-xs",
    },
    md: {
      container: "flex items-center gap-3",
      icon: "w-10 h-10",
      iconContainer: "w-12 h-12",
      title: "text-xl font-bold",
      subtitle: "text-sm",
    },
    lg: {
      container: "flex items-center gap-4",
      icon: "w-12 h-12",
      iconContainer: "w-16 h-16",
      title: "text-2xl font-bold",
      subtitle: "text-base",
    },
  }

  const classes = sizeClasses[size]

  return (
    <div className={`${classes.container} ${className}`}>
      <div
        className={`${classes.iconContainer} bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>

        {/* Main Icon */}
        <Briefcase className={`${classes.icon} text-white relative z-10`} />

        {/* Accent Icon */}
        <Zap className="w-3 h-3 text-yellow-300 absolute top-1 right-1 z-10" />
      </div>

      {showText && (
        <div>
          <h1 className={`${classes.title} text-purple-900 tracking-tight`}>
            Interview<span className="text-blue-600">Prep</span>
          </h1>
          <p className={`${classes.subtitle} text-gray-500 font-medium`}>AI Career Assistant</p>
        </div>
      )}
    </div>
  )
}
