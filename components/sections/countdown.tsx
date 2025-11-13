"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"
import { WindSong, Playfair_Display, Great_Vibes } from "next/font/google"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})
export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: June 13, 2026 at 4:10 PM GMT+8
      // Compute using UTC to avoid timezone parsing inconsistencies across browsers
      // 4:10 PM GMT+8 == 08:10 AM UTC
      const targetDate = Date.UTC(2026, 5, 13, 8, 10, 0) // June is month 5 (0-indexed)
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Wedding has passed or is happening now
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const labelTaglines: Record<string, string> = {
    Days: "Days of Dreaming",
    Hours: "Hours of Sparkle",
    Minutes: "Moments of Magic",
    Seconds: "Heartbeats Away",
  }

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      {/* Simple, elegant card */}
      <div className="relative group">
        {/* Subtle glow on hover */}
        <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-[#9cb4ff]/30 via-[#6e88f7]/20 to-transparent" />
        
        {/* Main card */}
        <div className="relative bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 border border-white/12 shadow-[0_12px_30px_rgba(11,21,58,0.35)] hover:shadow-[0_16px_38px_rgba(26,52,112,0.45)] transition-all duration-300 hover:border-white/20 min-w-[65px] sm:min-w-[75px] md:min-w-[90px] lg:min-w-[100px]">
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={36}
              padding={6}
              gap={3}
              textColor="#e9efff"
              fontWeight={500}
              borderRadius={8}
              horizontalPadding={4}
              gradientHeight={10}
              gradientFrom="rgba(138,161,255,0.25)"
              gradientTo="transparent"
            />
          </div>
        </div>
      </div>

      {/* Enhanced label */}
      <div className="flex flex-col items-center text-center gap-1">
        <span className={`${playfair.className} text-base sm:text-lg text-[#f4f7ff] tracking-[0.25em] uppercase`}>
          {label}
        </span>
        <span className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-[#c7d4ff]/70">
          {labelTaglines[label] ?? "Until the Celebration"}
        </span>
      </div>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative bg-gradient-to-b from-[#040818] via-[#0b1732]/92 to-[#050b1f] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(138,161,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(89,122,255,0.2),transparent_45%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(159,182,255,0.14),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_60%)] opacity-40 mix-blend-screen" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <p className="text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase text-[#9fb2ff]/70 mb-3">
          Counting the Stars
        </p>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] text-[#f3f6ff] mb-3 sm:mb-4 drop-shadow-[0_18px_40px_rgba(8,18,46,0.65)]`}
        >
          Countdown to Her Grand Debut
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#dbe3ff]/85 font-light max-w-2xl mx-auto leading-relaxed">
          Every second shimmers closer to Trisha Mae’s eighteenth chapter
        </p>
      </div>

      {/* Main countdown container */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-8 sm:mb-10 md:mb-12 flex-wrap px-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Debut date presentation - Keepsake Card Style */}
        <div className="flex justify-center px-4">
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
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
        </div>
      </div>
    </Section>
  )
}
