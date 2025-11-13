"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

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
        className={`${playfair.className} text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase text-[#a7b7ff]/80 mb-2 sm:mb-3 md:mb-4 ${textAlign} ${className}`}
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
        <p className={`${inter.className} text-[13px] sm:text-sm md:text-base font-medium text-white/90 leading-snug break-words ${textAlign}`}>
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
      className="relative bg-gradient-to-b from-[#040818] via-[#0b1732]/92 to-[#050b1f] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 h-72 w-72 bg-[#92a5ff]/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 bg-[#4e6dff]/18 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(156,180,255,0.22),transparent_60%)]" />
      </div>

      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-[#a7b7ff]/85">
          Guiding Sponsors
        </div>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_20px_50px_rgba(8,16,38,0.65)] mt-4`}
        >
          Constellation of Honor
        </h2>
        <p className={`${inter.className} text-xs sm:text-sm md:text-base text-white/75 max-w-2xl mx-auto mt-4 leading-relaxed`}>
          Trisha Mae is surrounded by mentors and godparents whose love and wisdom light her path into this eighteenth year.
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="relative bg-white/12 backdrop-blur-2xl border border-white/12 rounded-xl sm:rounded-2xl shadow-[0_25px_80px_rgba(8,18,50,0.45)] overflow-hidden">
          <div className="absolute inset-[10px] sm:inset-[14px] md:inset-[18px] border border-white/15 rounded-lg sm:rounded-xl pointer-events-none" />

          <div className="relative p-5 sm:p-7 md:p-9 lg:p-12">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white/70 rounded-full animate-spin" />
                  <span className={`${inter.className} text-white/80 text-lg`}>
                    Gathering her sponsors…
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <p className={`${inter.className} text-red-400 text-lg mb-2`}>{error}</p>
                  <button
                    onClick={fetchSponsors}
                    className={`${playfair.className} text-[#9cb4ff] hover:text-white transition-colors underline`}
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : sponsorPairs.length === 0 ? (
              <div className="text-center py-24">
                <p className={`${inter.className} text-white/70 text-lg`}>
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
