"use client"

import { Heart, Mail, Phone, MapPin, Github, Linkedin, Twitter, Facebook } from "lucide-react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Link } from "react-router-dom"
import Logo from "./Logo"


const footerLinks = {
    // product: [
    //     { label: "Features", href: "#" },
    //     { label: "Pricing", href: "#" },
    //     { label: "API", href: "#" },
    //     { label: "Documentation", href: "#" },
    // ],
    company: [
        { label: "About Us", href: "/aboutus" }, // Redirects to the AboutUs.jsx component
        { label: "Blog", href: "#" },
    ],
    support: [
        { label: "Help Center", href: "/contact" },
        { label: "Contact Us", href: "/contact" },
    ],
    legal: [
    { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/privacy" },
    ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com/Hasnainbro", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/hasnainkherani1", label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border text-muted-foreground transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4">
              <Logo size="md" showText={true} />
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">
              Empowering professionals worldwide with AI-powered interview preparation. Transform job descriptions into
              personalized success strategies.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="break-all">hasnainkherani1@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+91-9175550529</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Nagpur, Maharashtra, IN</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          {/* <div className="sm:col-span-1">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Company Links */}
          <div className="sm:col-span-1">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="sm:col-span-1">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="sm:col-span-1">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-border mb-6 sm:mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            <span>© 2024 InterviewPrep AI. All rights reserved. </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1"> Website Created by <b>Hasnain Kherani</b> </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for your success
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground mr-2 hidden sm:inline">Follow us:</span>
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                asChild
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <social.icon className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-xs text-foreground text-center">
            <p className="mb-2">
              InterviewPrep AI uses advanced artificial intelligence to analyze job descriptions and generate
              personalized interview preparation guides. Results may vary based on individual preparation and
              performance.
            </p>
            <p>
              By using our service, you agree to our Terms of Service and Privacy Policy. We are committed to protecting
              your privacy and data security.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
