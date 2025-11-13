"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("We couldn’t open the guestbook right now. Please try again in a moment.")
      }

      const data: Guest[] = await response.json()

      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || "1",
        }))

      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1
        return sum + guestCount
      }, 0)

      setGuests(attendingGuests)
      setTotalGuests(totalGuestCount)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "We couldn’t open the guestbook right now. Please try again in a moment.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGuests()

    const handleRsvpUpdate = () => {
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <Section
      id="guests"
      className="relative z-[40] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-[#040818] via-[#08102d]/92 to-[#050b1f]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(146,168,255,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(146,168,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)] opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101b3d]/30 to-[#040818]/85" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-[#a7b7ff]/85">
            Our Starlit Circle
          </div>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(10,18,46,0.6)]`}
          >
            Guests of Her Constellation
          </h2>
          <p className={`${inter.className} text-xs sm:text-sm md:text-base text-white/75 max-w-2xl mx-auto leading-relaxed`}>
            Every name here is a shimmering light guiding Trisha Mae into her eighteenth year. Thank you for being
            part of her midnight celebration.
          </p>
        </div>

        <div className="relative mb-10 sm:mb-12 lg:mb-16">
          <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-[#4e6dff]/25 via-[#829aff]/20 to-[#5a7aff]/25 opacity-70" />
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/12 bg-white/12 backdrop-blur-2xl shadow-[0_25px_75px_rgba(8,18,40,0.45)] px-6 sm:px-10 md:px-12 py-8 sm:py-10 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/6" />
            <div className="relative z-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">
                <div className="inline-flex items-center gap-3 sm:gap-4 rounded-full border border-white/20 bg-white/12 px-5 py-3 shadow-[0_15px_35px_rgba(12,22,48,0.35)]">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#4e6dff] via-[#7f96ff] to-[#4e6dff] shadow-[0_14px_35px_rgba(46,79,210,0.45)]">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`${inter.className} text-[10px] sm:text-xs uppercase tracking-[0.48em] text-white/70`}>
                      confirmed guests
                    </p>
                    <h3
                      className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl text-white leading-tight drop-shadow-[0_12px_28px_rgba(14,28,66,0.55)]`}
                    >
                      {totalGuests} {totalGuests === 1 ? "Star" : "Stars"} in Attendance
                    </h3>
                  </div>
                </div>

                <div className="grid gap-4 sm:gap-5 text-left sm:text-right">
                  <div>
                    <p className={`${inter.className} text-[10px] sm:text-xs uppercase tracking-[0.42em] text-white/70`}>
                      RSVP ENTRIES
                    </p>
                    <p className={`${playfair.className} text-xl sm:text-2xl text-white`}>
                      {guests.length} {guests.length === 1 ? "Loved One" : "Loved Ones"}
                    </p>
                  </div>
                  <div className="inline-flex items-center justify-center sm:justify-end gap-2 text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[#c9d5ff]/80">
                    <Sparkles className="h-4 w-4 text-[#a7b7ff]" />
                    <span>Thank you for lighting the night</span>
                  </div>
                </div>
              </div>
              <p className={`${inter.className} text-sm sm:text-base text-white/75 leading-relaxed max-w-3xl`}>
                Your RSVP ensures Trisha Mae saves you a seat beneath the constellations. If plans change, kindly
                update your response so we can welcome every guest with care.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#4e6dff]/10 via-transparent to-[#9cb4ff]/12 blur-3xl opacity-70" />
          <div className="relative overflow-hidden rounded-[30px] border border-white/12 bg-white/10 backdrop-blur-2xl shadow-[0_30px_85px_rgba(8,18,40,0.48)] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10">
            <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-white/8" />

            {isLoading ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-5 py-24 sm:py-28">
                <Loader2 className="h-12 w-12 animate-spin text-[#a7b7ff]" />
                <span className={`${inter.className} text-base sm:text-lg text-white/80`}>
                  Opening the guestbook…
                </span>
              </div>
            ) : error ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-24 sm:py-28 text-center">
                <MessageSquare className="h-12 w-12 text-[#ff8a8a]/80" />
                <p className={`${inter.className} text-base sm:text-lg text-white/80 max-w-md`}>{error}</p>
              </div>
            ) : guests.length === 0 ? (
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-24 sm:py-28 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#4e6dff] via-[#7f96ff] to-[#4e6dff] shadow-[0_18px_40px_rgba(22,36,84,0.45)]">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className={`${playfair.className} text-2xl sm:text-3xl text-white`}>
                  No RSVPs shimmer here just yet.
                </h3>
                <p className={`${inter.className} text-sm sm:text-base text-white/75 max-w-md`}>
                  Be the first to confirm a seat at her debut. Your name will glow in this constellation as soon as
                  you RSVP.
                </p>
              </div>
            ) : (
              <div className="relative z-10 space-y-3 sm:space-y-4">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-white/14 bg-white/16 px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 backdrop-blur-xl transition-all duration-300 hover:border-white/35 hover:shadow-[0_22px_55px_rgba(18,32,72,0.45)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6d86ff]/18 via-transparent to-[#9fb2ff]/16 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col sm:flex-row gap-3.5 sm:gap-4.5">
                      <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4e6dff] via-[#7f96ff] to-[#4e6dff] shadow-[0_16px_40px_rgba(26,44,96,0.45)]" />
                        <div className="relative h-full w-full rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                          {getInitials(guest.Name)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                          <div className="flex-1 pr-16 sm:pr-0">
                            <h4
                              className={`${playfair.className} text-lg sm:text-xl text-white drop-shadow-sm group-hover:text-[#dbe3ff] transition-colors`}
                            >
                              {guest.Name}
                            </h4>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="mt-1 inline-flex items-center gap-2 text-[11px] sm:text-xs text-white/70">
                                <Mail className="h-3.5 w-3.5 text-[#cbd6ff]" />
                                <span className={`${inter.className} break-all`}>{guest.Email}</span>
                              </div>
                            )}
                          </div>

                          <div className="absolute right-4 top-4 sm:static sm:right-auto sm:top-auto inline-flex items-center gap-2">
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/12 border border-white/20 text-[#a7b7ff]">
                              <User className="h-4 w-4" />
                            </div>
                            <span
                              className={`${inter.className} inline-flex items-center justify-center rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 text-xs sm:text-sm text-white/85`}
                            >
                              {guest.Guest ? parseInt(String(guest.Guest)) || 1 : 1}{" "}
                              {(parseInt(String(guest.Guest || "1")) || 1) === 1 ? "guest" : "guests"}
                            </span>
                          </div>
                        </div>

                        {guest.Message && (
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/15">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <MessageSquare className="mt-0.5 h-4 w-4 text-[#a7b7ff]" />
                              <p className={`${inter.className} text-sm sm:text-base text-white/80 italic leading-relaxed flex-1`}>
                                “{guest.Message}”
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
