"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Sparkles, Music2 } from "lucide-react"
import { Great_Vibes, Playfair_Display, Inter, WindSong } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })
const windSong = WindSong({ subsets: ["latin"], weight: ["400", "500"] })

export function Footer() {
  const year = new Date().getFullYear()

  const quotes = [
    "Eighteen years of dreams, and tonight they all come true under the midnight sky.",
    "Every star in the sky is a wish she's made, and tonight we celebrate them all together.",
    "From a little girl with big dreams to a young woman ready to shine—this is her moment."
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      } else {
        setIsDeleting(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      } else {
        setIsPaused(true)
        setIsDeleting(true)
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "My Journey", href: "#narrative" },
    { label: "Gallery", href: "#gallery" },
    { label: "Snap & Share", href: "#snap-share" },
    { label: "RSVP", href: "#guest-list" },
    { label: "FAQ", href: "#faq" },
  ] as const

  return (
    <footer 
      className="relative z-20 mt-16 text-cream overflow-hidden bg-gradient-to-b from-[#040818] via-[#08102d]/95 to-[#050b1f]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#4e6dff]/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-[#92a5ff]/18 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#4e6dff]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#92a5ff]/16 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4e6dff]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#92a5ff]/25 to-transparent" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#4e6dff]/15 via-[#92a5ff]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#4e6dff]/15 via-[#92a5ff]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#4e6dff]/15 via-[#92a5ff]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#4e6dff]/15 via-[#92a5ff]/10 to-transparent rounded-tl-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Debut date presentation */}
        <motion.div className="flex justify-center px-4 mb-16" variants={fadeInUp}>
          <div className="max-w-2xl w-full">
            {/* Save The Debut Night Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 bg-[#9cb4ff]/70 rounded-full" />
                <div className="w-1 h-1 bg-[#cbd8ff]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#9cb4ff]/70 rounded-full" />
              </div>

              <p className="text-xs sm:text-sm md:text-base font-medium text-[#bfcfff] uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-4">
                Save The Debut Night
              </p>

              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#9cb4ff]/70 rounded-full" />
                <div className="w-1 h-1 bg-[#cbd8ff]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#9cb4ff]/70 rounded-full" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p
                  className={`${windSong.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#e8efff] leading-none drop-shadow-[0_10px_35px_rgba(7,16,39,0.65)]`}
                >
                  June
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Day - Large and bold focal point */}
                <p
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#9cb4ff] via-[#d5deff] to-[#7a92ff] leading-none drop-shadow-[0_18px_35px_rgba(37,59,126,0.45)]"
                >
                  13
                </p>
                
                {/* Vertical divider */}
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-gradient-to-b from-transparent via-[#9cb4ff]/60 to-transparent" />
                
                {/* Year - Elegant and refined */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#dbe3ff] leading-none tracking-[0.2em] uppercase">
                  2026
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 bg-[#9cb4ff]/70 rounded-full" />
                <div className="w-1 h-1 bg-[#cbd8ff]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#9cb4ff]/70 rounded-full" />
              </div>
              
              {/* Time */}
              <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-[#dbe3ff]/85 tracking-[0.4em] uppercase mb-3 sm:mb-4">
                <span className="block sm:inline">4:10 PM • Villa Caceres Hotel</span>
                <span className="block sm:inline sm:before:content-['•'] sm:before:mx-2">Naga City</span>
              </div>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#9cb4ff]/70 rounded-full" />
                <div className="w-1 h-1 bg-[#cbd8ff]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#9cb4ff]/70 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12" variants={staggerChildren} initial="initial" animate="animate">
          {/* Debutante Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className={`${greatVibes.className} text-3xl md:text-4xl text-white`}>Trisha Mae</h3>
              </div>
              <div className="space-y-4">
                <div className={`flex items-center gap-3 ${inter.className} text-white/95`}>
                  <Calendar className="w-5 h-5 text-white/80" />
                  <span className="text-lg">June 13, 2026</span>
                </div>
                <div className={`flex items-center gap-3 ${inter.className} text-white/90`}>
                  <MapPin className="w-5 h-5 text-white/70" />
                  <span>Villa Caceres Hotel, Naga City</span>
                </div>
              </div>
            </div>

            <motion.div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/15" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className={`${inter.className} text-white/95 italic text-lg leading-relaxed min-h-[80px]`}>
                "{displayedText}
                <span className="inline-block w-0.5 h-6 bg-white/95 ml-1 animate-pulse">|</span>"
              </blockquote>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-white/70 rounded-full" />
                <div className="w-2 h-2 bg-white/50 rounded-full" />
                <div className="w-2 h-2 bg-white/70 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <motion.div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h4 className={`${playfair.className} font-bold text-xl text-white`}>Debut Celebration</h4>
              </div>
              <div className={`space-y-3 ${inter.className} text-white/90 text-sm`}>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/70" />
                  <span>Villa Caceres Hotel, Naga City</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span>4:10 PM</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h4 className={`${playfair.className} font-bold text-xl text-white`}>Evening Reception</h4>
              </div>
              <div className={`space-y-3 ${inter.className} text-white/90 text-sm`}>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/70" />
                  <span>Villa Caceres Hotel, Naga City</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span>Following the debut</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <div>
              <h4 className={`${playfair.className} font-bold text-xl mb-6 flex items-center gap-3 text-white`}>
                <div className="w-2 h-8 bg-white/50 rounded-full" /> Follow Her Journey
              </h4>
              <div className="flex items-center gap-3 flex-wrap">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="TikTok"
                >
                  <Music2 className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h5 className={`${playfair.className} font-bold text-lg mb-4 text-white`}>Quick Links</h5>
              <div className="space-y-2">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className={`block text-white/80 hover:text-white transition-colors duration-200 ${inter.className} text-sm`}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div className="border-t border-white/20 pt-8" variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className={`text-white/85 ${inter.className} text-sm`}>© {year} Trisha Mae's Debut. All rights reserved.</p>
              <p className={`text-white/90 ${inter.className} text-sm mt-1`}>
                Made with ✨ for her special night
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-1">
              <p className={`text-white/80 ${inter.className} text-xs`}>
                Developed by{" "}
                <a 
                  href="https://lance28-beep.github.io/portfolio-website/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                >
                  Lance Valle
                </a>
              </p>
              <p className={`text-white/80 ${inter.className} text-xs`}>
                Want a website like this? Visit{" "}
                <a 
                  href="https://www.facebook.com/WeddingInvitationNaga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}


