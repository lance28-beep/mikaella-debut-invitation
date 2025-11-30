"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { ButterflyCluster } from "@/components/butterfly-cluster"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

const debutanteName = "Mikaella Arkean"

export function PrincipalSponsors() {
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <h3
        className={`${playfair.className} text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase text-[#172822] mb-2 sm:mb-3 md:mb-4 ${textAlign} ${className}`}
      >
        {children}
      </h3>
    )
  }

  const NameItem = ({ name, align = "center" }: { name: string; align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-1.5 sm:py-2 md:py-2.5 w-full`}>
        <p className={`${inter.className} text-[13px] sm:text-sm md:text-base font-medium text-[#172822] leading-snug break-words ${textAlign}`}>
          {name}
        </p>
      </div>
    )
  }

  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  const sponsorPairs = useMemo(
    () => sponsors.filter((s) => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative bg-gradient-to-b from-[#172822] via-[#3B553C] to-[#172822] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Ornate pattern background - matching Countdown section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Base pattern - diagonal lines forming diamonds */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(230,163,121,0.1) 70px, rgba(230,163,121,0.1) 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(230,163,121,0.1) 70px, rgba(230,163,121,0.1) 71px),
              repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(230,163,121,0.08) 35px, rgba(230,163,121,0.08) 36px),
              repeating-linear-gradient(225deg, transparent, transparent 35px, rgba(230,163,121,0.08) 35px, rgba(230,163,121,0.08) 36px)
            `,
            backgroundSize: '70px 70px, 70px 70px, 35px 35px, 35px 35px',
          }}
        />
        
        {/* Decorative scroll motifs - using SVG pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="sponsorScrollPattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              {/* Scroll motifs at intersections */}
              <g fill="none" stroke="#E6A379" strokeWidth="0.5">
                {/* Top scroll */}
                <path d="M 70 0 Q 65 15 70 30 Q 75 15 70 0" />
                {/* Bottom scroll */}
                <path d="M 70 140 Q 65 125 70 110 Q 75 125 70 140" />
                {/* Left scroll */}
                <path d="M 0 70 Q 15 65 30 70 Q 15 75 0 70" />
                {/* Right scroll */}
                <path d="M 140 70 Q 125 65 110 70 Q 125 75 140 70" />
                {/* Center decorative element */}
                <path d="M 70 30 Q 60 50 70 70 Q 80 50 70 30" />
                <path d="M 70 110 Q 60 90 70 70 Q 80 90 70 110" />
                <path d="M 30 70 Q 50 60 70 70 Q 50 80 30 70" />
                <path d="M 110 70 Q 90 60 70 70 Q 90 80 110 70" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sponsorScrollPattern)" />
        </svg>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#172822]/80 via-transparent to-[#172822]/80" />
      </div>

      {/* Butterfly accents */}
      <ButterflyCluster
        className="pointer-events-none absolute -top-6 sm:-top-10 left-0 sm:left-10 opacity-70"
        style={{ width: "170px", height: "170px", transform: "rotate(-12deg)" }}
        ariaHidden={true}
      />
      <ButterflyCluster
        className="pointer-events-none absolute bottom-4 sm:bottom-8 right-2 sm:right-10 opacity-60"
        style={{ width: "190px", height: "190px", transform: "rotate(10deg)" }}
        ariaHidden={true}
      />

      {/* Top-right corner decoration */}
      <div className="absolute top-0 right-0 z-0 pointer-events-none">
        <img
          src="/decoration/top-right-corner-decoration.png"
          alt=""
          className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 opacity-60"
          aria-hidden="true"
        />
      </div>

      {/* Top-left corner decoration */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none">
        <img
          src="/decoration/top-right-corner-decoration.png"
          alt=""
          className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 opacity-60 scale-x-[-1]"
          aria-hidden="true"
        />
      </div>

      {/* Bottom-right corner decoration */}
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
        <img
          src="/decoration/top-right-corner-decoration.png"
          alt=""
          className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 opacity-60 scale-y-[-1]"
          aria-hidden="true"
        />
      </div>

      {/* Bottom-left corner decoration */}
      <div className="absolute bottom-0 left-0 z-0 pointer-events-none">
        <img
          src="/decoration/top-right-corner-decoration.png"
          alt=""
          className="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 opacity-60 scale-x-[-1] scale-y-[-1]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-white">
          For Mikaella Arkean
        </div>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_48px_rgba(23,40,34,0.65)] mt-4`}
        >
          Circle of Principal Sponsors
        </h2>
        <p className={`${inter.className} text-xs sm:text-sm md:text-base text-[#E9D3A4]/90 max-w-2xl mx-auto mt-4 leading-relaxed`}>
          Honoring the mentors and godparents who steady {debutanteName}&apos;s heart—each blessing, toast, and prayer surrounding her eighteenth celebration with grace.
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="relative bg-white border-2 border-[#E6A379]/20 rounded-xl sm:rounded-2xl shadow-[0_25px_80px_rgba(23,40,34,0.45)] overflow-hidden">
          <div className="absolute inset-[10px] sm:inset-[14px] md:inset-[18px] border-2 border-[#E6A379]/20 rounded-lg sm:rounded-xl pointer-events-none" />

          <div className="relative p-5 sm:p-7 md:p-9 lg:p-12">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#E6A379]/20 border-t-[#E6A379]/70 rounded-full animate-spin" />
                  <span className={`${inter.className} text-[#172822]/80 text-lg`}>
                    Gathering her sponsors…
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <p className={`${inter.className} text-red-600 text-lg mb-2`}>{error}</p>
                  <button
                    onClick={fetchSponsors}
                    className={`${playfair.className} text-[#E6A379] hover:text-[#E6A379]/70 transition-colors underline`}
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : sponsorPairs.length === 0 ? (
              <div className="text-center py-24">
                <p className={`${inter.className} text-[#172822]/70 text-lg`}>
                  Her sponsors will be announced soon.
                </p>
              </div>
            ) : (
              <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-6 mb-3 sm:mb-4">
                  <SectionTitle align="right" className="pr-3 sm:pr-4 md:pr-6">
                    Gentlemen of Honor
                  </SectionTitle>
                  <SectionTitle align="left" className="pl-3 sm:pl-4 md:pl-6">
                    Ladies of Grace
                  </SectionTitle>
                </div>
                <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 md:gap-y-4 items-stretch">
                  {sponsorPairs.map((pair, idx) => (
                    <React.Fragment key={`pair-${idx}`}>
                      <div className="px-3 sm:px-4 md:px-6">
                        {pair.MalePrincipalSponsor ? (
                          <NameItem name={pair.MalePrincipalSponsor} align="right" />
                        ) : (
                          <div className="py-2" />
                        )}
                      </div>
                      <div className="px-3 sm:px-4 md:px-6">
                        {pair.FemalePrincipalSponsor ? (
                          <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                        ) : (
                          <div className="py-2" />
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
