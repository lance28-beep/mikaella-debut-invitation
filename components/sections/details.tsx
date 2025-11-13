import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, PartyPopper, MapPin, Navigation, Copy, Check, Palette, Car, Sparkles } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const eventPalette = ["#4e6dff", "#8199ff", "#d5deff", "#f5f7ff"]

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems((prev) => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems((prev) => {
          const updated = new Set(prev)
          updated.delete(itemId)
          return updated
        })
      }, 1800)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }

  const { ceremony, reception } = siteConfig
  const venue = ceremony.location
  const entourageCall = ceremony.entourageTime
  const guestsCall = ceremony.guestsTime
  const mapsLink = `https://maps.google.com/?q=${encodeURIComponent(venue)}`

  const openInMaps = () => {
    window.open(mapsLink, "_blank", "noopener,noreferrer")
  }

  const schedule = [
    { label: "Ceremony Begins", value: ceremony.time },
    { label: "Reception Follows", value: reception.time },
    entourageCall && { label: "Entourage Call Time", value: entourageCall },
    guestsCall && { label: "Guest Doors Open", value: guestsCall },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <Section id="details" className="relative overflow-hidden py-14 sm:py-18 md:py-20 lg:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040818] via-[#071331] to-[#0f1d3f]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(132,155,255,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(136,110,255,0.16),transparent_70%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 space-y-2 sm:space-y-3">
          <p className="text-[9px] sm:text-[10px] tracking-[0.55em] uppercase text-[#8aa0ff]/85">
            Evening Of Eighteen
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-[0_18px_40px_rgba(12,20,46,0.6)]">
            Event Details
          </h2>
          <p className="text-[11px] sm:text-xs lg:text-sm text-white/70 leading-relaxed tracking-[0.22em] max-w-2xl mx-auto px-2">
            Here’s everything you need to glide through Trisha Mae’s celebration—from call times and
            directions to the hues of the night sky we’re wearing.
          </p>
        </div>

        <div className="grid gap-5 lg:gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch mb-12 sm:mb-16 lg:mb-20">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/14 bg-white/8 backdrop-blur-2xl shadow-[0_26px_65px_rgba(8,16,34,0.42)]">
            <div className="relative h-[220px] sm:h-60 md:h-80 lg:h-[420px] xl:h-[460px] overflow-hidden">
              <Image
                src="/Details/VillaCaceres.png"
                alt={venue}
                fill
                priority
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040818]/95 via-[#040818]/35 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 sm:bottom-6 text-white">
                <h3 className="text-xl sm:text-3xl font-serif font-semibold tracking-wide drop-shadow-lg">
                  Villa Caceres Hotel
                </h3>
                <p className="text-[10px] sm:text-[12px] text-white/80 tracking-[0.24em] uppercase">
                  Naga City, Camarines Sur
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-7 lg:p-8 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="inline-flex justify-center rounded-full border border-white/18 bg-white/10 px-4 py-1.5 text-white/80 text-[9px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.32em] uppercase whitespace-nowrap">
                  {`${ceremony.day}, ${ceremony.date}`}
                </div>
                <p className="text-[10px] sm:text-xs text-white/70 tracking-[0.3em] uppercase text-center sm:text-right">
                  Doors open in the twilight
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {schedule.map((entry) => (
                  <div
                    key={entry.label}
                    className="rounded-2xl border border-white/18 bg-white/12 px-3.5 py-3 text-center shadow-[0_12px_30px_rgba(12,20,46,0.28)]"
                  >
                    <p className="text-[9px] sm:text-[11px] tracking-[0.34em] uppercase text-white/70 mb-1">
                      {entry.label}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-white text-sm sm:text-base font-semibold">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{entry.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/18 bg-white/10 px-4 py-3.5 flex items-start sm:items-center gap-2.5 sm:gap-3 shadow-[0_12px_30px_rgba(12,20,46,0.25)]">
                <MapPin className="mt-[2px] sm:mt-0 h-4 w-4 sm:h-5 sm:w-5 text-[#9bb4ff] flex-shrink-0" />
                <div className="text-[11px] sm:text-sm text-white/75 leading-relaxed">{venue}</div>
              </div>

              <div className="flex flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={openInMaps}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-gradient-to-r from-[#4e6dff] via-[#8ca3ff] to-[#4e6dff] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_14px_34px_rgba(46,79,210,0.38)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(66,102,225,0.45)]"
                  aria-label="Get directions to the venue"
                >
                  <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Get Directions
                </button>
                <button
                  onClick={() => copyToClipboard(venue, "venue")}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-4 py-3 text-xs sm:text-sm font-semibold text-white/85 shadow-[0_12px_30px_rgba(12,20,48,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:text-white"
                  aria-label="Copy venue address"
                >
                  {copiedItems.has("venue") ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {copiedItems.has("venue") ? "Copied!" : "Copy Address"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="rounded-[26px] sm:rounded-[30px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,16,34,0.4)] p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <PartyPopper className="h-6 w-6 text-[#9bb4ff]" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Debut Agenda</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Moments to Look Forward To</h3>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-3.5 w-3.5 text-[#d5deff]" />
                  18 Candles &amp; 18 Treasures will follow after the formal program—prepare a short wish or keepsake.
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-3.5 w-3.5 text-[#d5deff]" />
                  Please arrive before the entourage call time to sign the debut guest book and take portraits.
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-1 h-3.5 w-3.5 text-[#d5deff]" />
                  Program wraps by 8:30 PM so you can rest and travel home safely.
                </li>
              </ul>
            </div>

            <div className="rounded-[26px] sm:rounded-[30px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,16,34,0.4)] p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-[#9bb4ff]" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Attire & Palette</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Dress in Midnight Constellations</h3>
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                <li>
                  Ladies: flowing gowns or cocktail dresses in shades of midnight blue, moonlit silver, or soft pearl.
                </li>
                <li>Gentlemen: barong, suit, or smart separates in deep navy, charcoal, or black.</li>
              </ul>
              <div className="flex gap-2 flex-wrap">
                {eventPalette.map((color) => (
                  <span
                    key={color}
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/40 shadow-[0_6px_18px_rgba(10,16,34,0.35)]"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[26px] sm:rounded-[30px] border border-white/18 bg-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,16,34,0.4)] p-5 sm:p-7 lg:p-8 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <Car className="h-6 w-6 text-[#9bb4ff]" />
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.38em] text-white/70">Travel Notes</p>
                  <h3 className="text-white text-base sm:text-lg font-semibold">Parking & Transport</h3>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                <li>Complimentary parking is available at the hotel—just mention Trisha Mae’s debut at the gate.</li>
                <li>Need a ride? The venue is Grab-accessible; kindly set drop-off to “Villa Caceres Hotel”.</li>
                <li>If you’re staying overnight, the concierge can assist with room bookings; ask for the debut rate.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

