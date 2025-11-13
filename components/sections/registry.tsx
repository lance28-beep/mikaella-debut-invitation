"use client"

import { Section } from "@/components/section"
import { Heart, ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

export function Registry() {
  const [showQRCode, setShowQRCode] = useState(false)

  return (
    <Section
      id="registry"
      className="relative z-[30] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(146,168,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(130,150,255,0.16),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08142e]/65 to-[#030716]" />
      </div>

      <div className="relative z-10 text-center mb-10 sm:mb-14 lg:mb-16 px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.48em] text-[#a7b7ff]/85">
          Celestial Wishes
        </div>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(8,18,40,0.65)] mt-4`}
        >
          Gifts Beneath the Midnight Sky
        </h2>
        <p
          className={`${inter.className} text-xs sm:text-sm md:text-base text-white/75 max-w-2xl mx-auto mt-4 leading-relaxed`}
        >
          Your presence is the brightest gift for Trisha Mae’s eighteenth chapter. If you wish to share a token of love,
          a starlit fund is ready to carry your blessings.
        </p>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/12 backdrop-blur-2xl shadow-[0_26px_70px_rgba(8,18,44,0.45)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/6" />

          <div className="relative px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 space-y-8 sm:space-y-10">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/12 px-6 py-2 shadow-[0_14px_35px_rgba(14,28,66,0.4)]">
                <Heart className="h-5 w-5 text-[#d6deff]" />
                <span className={`${playfair.className} text-sm sm:text-base text-white`}>
                  A Gentle Note for Our Guests
                </span>
                <Heart className="h-5 w-5 text-[#d6deff]" />
              </div>

              <div className="max-w-2xl text-center space-y-3">
                <p className={`${playfair.className} text-lg sm:text-xl md:text-2xl text-white leading-relaxed`}>
                  “As Trisha Mae turns eighteen, your presence is the glow she treasures most.”
                </p>
                <p className={`${inter.className} text-sm sm:text-base text-white/75 leading-relaxed`}>
                  Should you wish to send a keepsake, we welcome monetary gifts that help her chase dreams beyond the
                  horizon. Thank you for wrapping her in your love and light.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowQRCode((prev) => !prev)}
                className="group relative inline-flex items-center justify-center gap-2 rounded-2xl border border-white/18 bg-gradient-to-r from-[#4e6dff] via-[#a0b3ff] to-[#5a7aff] px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-[0_20px_45px_rgba(18,40,120,0.45)] transition-all duration-300 hover:-translate-y-1"
                aria-label={showQRCode ? "Hide GCash QR code" : "Reveal GCash QR code"}
              >
                {showQRCode ? "Hide" : "Reveal"} GCash QR
                {showQRCode ? (
                  <ChevronUp className="h-4 w-4 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                )}
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                showQRCode ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col items-center gap-6 pt-6 sm:pt-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.38em] text-white/70">
                  <Sparkles className="h-4 w-4 text-[#a7b7ff]" />
                  <span>GCash details</span>
                  <Sparkles className="h-4 w-4 text-[#a7b7ff]" />
                </div>

                <div className="text-center space-y-1">
                  <h3 className={`${playfair.className} text-2xl sm:text-3xl text-white`}>GCash</h3>
                  <p className={`${inter.className} text-sm sm:text-base text-white/70`}>
                    Scan to share your love offering
                  </p>
                </div>

                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl border border-white/18 bg-white/14 p-5 shadow-[0_24px_60px_rgba(12,24,64,0.45)]">
                  <Image
                    src="/QR/GCASH.png"
                    alt="GCash QR code for Trisha Mae’s debut gift fund"
                    fill
                    className="rounded-2xl object-contain"
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                    priority
                  />
                  <div className="absolute inset-0 rounded-2xl border border-white/20" />
                </div>

                <div className="text-center space-y-3">
                  <p className={`${inter.className} text-xs sm:text-sm text-white/70`}>
                    Open your GCash app → Tap “Scan” → Enter any amount that feels right.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-white/75">
                    <Heart className="h-4 w-4 text-[#d6deff]" />
                    <span>Thank you for making her night unforgettable</span>
                    <Heart className="h-4 w-4 text-[#d6deff]" />
                  </div>
                </div>
              </div>
            </div>

            <p className={`${inter.className} text-sm sm:text-base text-white/75 text-center`}>
              With gratitude and stardust, Trisha Mae and family
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
