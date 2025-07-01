"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Dashboard from "./Dashboard"
import AnalysisView from "./AnalysisView"
import Footer from "./Footer"
import { useMobile } from "../hooks/use-mobile.jsx"


export default function MainLayout({ initialView = "dashboard" }) {
  const [currentView, setCurrentView] = useState(initialView)
  const [analysisData, setAnalysisData] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMobile()

  useEffect(() => {
    // Update view based on route
    const path = location.pathname
    if (path === "/") {
      setCurrentView("dashboard")
    } else if (path === "/analysis") {
      setCurrentView("analysis")
    } else if (path === "/history") {
      setCurrentView("history")
    } else if (path === "/settings") {
      setCurrentView("settings")
    }
  }, [location])


  
  // Auto-collapse sidebar on tablet screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setSidebarCollapsed(true)
      } else if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleAnalysisComplete = (data, jd, file) => {
    setAnalysisData(data)
    setJobDescription(jd)
    setUploadedFile(file)
    setCurrentView("analysis")
    navigate("/analysis")
  }

  const handleNewAnalysis = () => {
    setCurrentView("dashboard")
    setAnalysisData(null)
    setJobDescription("")
    setUploadedFile(null)
    navigate("/")
  }

  const handleLogoClick = () => {
    setCurrentView("dashboard")
    navigate("/")
  }

  const handleViewChange = (view) => {
    if (view === "about") {
      navigate("/aboutus")
    } else {
      setCurrentView(view)
      navigate(view === "dashboard" ? "/" : `/${view}`)
    }
  }

  
  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        onNewAnalysis={handleNewAnalysis}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header currentView={currentView} onNewAnalysis={handleNewAnalysis} onLogoClick={handleLogoClick} />

        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            {currentView === "dashboard" ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="min-h-full"
              >
                <Dashboard onAnalysisComplete={handleAnalysisComplete} />
              </motion.div>
            ) : currentView === "analysis" ? (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-full p-4 sm:p-6"
              >
                <AnalysisView analysisData={analysisData} jobDescription={jobDescription} uploadedFile={uploadedFile} />
              </motion.div>
            ) : currentView === "history" ? (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-full p-6"
              >
                <div className="text-center py-12">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Analysis History</h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Your previous job description analyses will appear here.
                  </p>
                </div>
              </motion.div>
            ) : currentView === "settings" ? (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-full p-4 sm:p-6"
              >
                <div className="text-center py-12">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                  <p className="text-gray-600 text-sm sm:text-base">Customize your preferences and account settings.</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  )
}
