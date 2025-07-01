import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import { ThemeProvider } from "./components/theme-provider"
import MainLayout from "./components/MainLayout"
import AboutUs from "./components/AboutUs"
import PrivacyPolicy from "./components/PrivacyPolicy"
import ContactUs from "./components/ContactUs"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background transition-colors">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/analysis" element={<MainLayout initialView="analysis" />} />
            <Route path="/history" element={<MainLayout initialView="history" />} />
            <Route path="/settings" element={<MainLayout initialView="settings" />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
