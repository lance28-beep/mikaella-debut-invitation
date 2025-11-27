"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"
import { WindSong, Great_Vibes } from "next/font/google"
import { siteConfig } from "@/content/site"
import LiquidEther from "@/components/LiquidEther"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400", "500"],
})

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#372847]">
      <div className="absolute inset-0 w-full h-full">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#372847]/95 via-[#6A239E]/70 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#372847]/70 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(106,35,158,0.18),transparent_55%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,150,253,0.12),transparent_35%)] opacity-70 animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-end min-h-screen pb-12 sm:pb-20 md:pb-28 lg:pb-40 xl:pb-48">
        <div
          className={`w-full max-w-4xl text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-4">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.35em] text-white drop-shadow-lg">
              Please Join Us in Celebrating
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white drop-shadow-lg italic">
              The 18th Birthday of
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-4 py-1">
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-[#6A239E]/60 to-[#DC96FD]" />
              <Sparkles size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-white drop-shadow-md" />
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-[#6A239E]/60 to-[#DC96FD]" />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h1
              className="imperial-script-regular text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8.5rem] text-white drop-shadow-[0_14px_38px_rgba(55,40,71,0.72)] leading-tight tracking-[0.06em]"
              style={{
                letterSpacing: "0.08em",
              }}
            >
              Mehai Jeffverly
            </h1>
            <p
              className={`${windSong.className} text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] text-white drop-shadow-[0_12px_28px_rgba(106,35,158,0.6)]`}
              style={{
                marginTop: "-0.25rem",
              }}
            >
              {siteConfig.wedding.tagline}
            </p>
            <div className="h-0.5 sm:h-1 w-28 sm:w-32 md:w-40 lg:w-52 mx-auto bg-gradient-to-r from-transparent via-[#DC96FD] to-transparent shadow-[0_0_20px_rgba(220,150,253,0.65)]" />
          </div>

          <div className="w-full max-w-4xl mt-2 sm:mt-3 md:mt-5 lg:mt-6 text-white" style={{ textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}>
            <div className="flex flex-col items-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 uppercase">
              <span className="text-[9px] sm:text-sm md:text-base tracking-[0.45em] sm:tracking-[0.75em]">
                April
              </span>
              <div className="flex w-full items-center gap-2 sm:gap-4 md:gap-6">
                <div className="flex flex-1 items-center gap-2 sm:gap-4">
                  <span className="h-[1px] flex-1 bg-white/70" />
                  <span className="text-[8px] sm:text-xs md:text-sm tracking-[0.32em] sm:tracking-[0.6em]">
                    Sun
                  </span>
                  <span className="h-[1px] w-8 sm:w-10 md:w-12 bg-white/70" />
                </div>
                <div className="relative flex items-center justify-center px-2 sm:px-4 md:px-8 lg:px-10">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 mx-auto h-[80%] max-h-[220px] w-[120px] sm:w-[180px] md:w-[220px] rounded-full bg-gradient-to-b from-[#DC96FD] via-[#B47FE8] to-[#6A239E] blur-[32px] opacity-80"
                  />
                  <span
                    className="relative font-tiktok text-[2rem] sm:text-[4.25rem] md:text-[5.5rem] lg:text-[6.5rem] leading-none tracking-[0.05em] text-white"
                    style={{
                      textShadow:
                        "0 0 30px rgba(220, 150, 253, 0.85), 0 0 70px rgba(180, 127, 232, 0.7), 0 0 120px rgba(106, 35, 158, 0.55), 0 18px 45px rgba(0,0,0,0.65)",
                      filter: "drop-shadow(0 0 15px rgba(220, 150, 253, 0.6))",
                    }}
                  >
                    19
                  </span>
                </div>
                <div className="flex flex-1 items-center gap-2 sm:gap-4 justify-end">
                  <span className="h-[1px] w-8 sm:w-10 md:w-12 bg-white/70" />
                  <span className="text-[8px] sm:text-xs md:text-sm tracking-[0.27em] sm:tracking-[0.45em]">
                    5:30 PM
                  </span>
                  <span className="h-[1px] flex-1 bg-white/70" />
                </div>
              </div>
              <span className="text-[10px] sm:text-sm md:text-base tracking-[0.4em] sm:tracking-[0.7em]">
                2026
              </span>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-2.5 md:space-y-3 pt-4 sm:pt-6">
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-white drop-shadow-lg tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.2em] lg:tracking-[0.24em]"
              style={{
                textShadow: "0 2px 16px rgba(106, 35, 158, 0.8)",
              }}
            >
              {siteConfig.wedding.venue}
            </p>
          </div>

          <div className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 flex flex-row flex-wrap gap-3 sm:gap-4 md:gap-5 justify-center items-stretch max-w-3xl mx-auto w-full px-2">
             <a
               href="#narrative"
               className="group relative flex-1 w-full sm:max-w-none sm:min-w-[200px] md:min-w-[240px] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC96FD]/40"
             >
               <span className="absolute inset-0 rounded-2xl bg-[#DC96FD] transition-colors duration-300" aria-hidden />
               <span className="relative z-10 inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] w-full items-center justify-center px-7 sm:px-9 md:px-11 text-[9px] sm:text-[10px] md:text-xs tracking-[0.42em] text-[#372847] uppercase font-semibold transition-colors duration-300">
                 Journey to Eighteen
               </span>
             </a>
             <a
               href="#guest-list"
               className="group relative flex-1 w-full sm:max-w-none sm:min-w-[200px] md:min-w-[240px] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC96FD]/40"
             >
               <span className="absolute inset-0 rounded-2xl bg-[#372847] border border-[#DC96FD] transition-colors duration-300" aria-hidden />
               <span className="relative z-10 inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] w-full items-center justify-center px-7 sm:px-9 md:px-11 text-[9px] sm:text-[10px] md:text-xs tracking-[0.42em] text-[#DC96FD] uppercase font-semibold transition-colors duration-300">
                 RSVP & Guestbook
               </span>
             </a>
          </div>
        </div>
      </div>
    </section>
  )
}
