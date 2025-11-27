"use client"

import { Section } from "@/components/section"
import { Heart, ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

export function Registry() {
  const [showQRCode, setShowQRCode] = useState(false)
  const debutanteName = siteConfig.couple.brideNickname || siteConfig.couple.bride || "Mehai"

  return (
    <Section
      id="registry"
      className="relative z-[30] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-transparent"
    >

      <div className="relative z-10 text-center mb-8 sm:mb-14 lg:mb-16 px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[9px] sm:text-xs uppercase tracking-[0.42em] text-white">
          Gift Registry
        </div>
        <h2
          className={`${greatVibes.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(10,0,25,0.75)] mt-4`}
        >
          Lavender Tokens of Love
        </h2>
        <p
          className={`${inter.className} text-[11px] sm:text-sm md:text-base text-white/85 max-w-2xl mx-auto mt-3 leading-relaxed`}
        >
          Your presence is the shimmer {debutanteName} cherishes most. Should you wish to leave a keepsake, a monetary
          gift will help her chase the skies she dreams of.
        </p>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-6">
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/25 bg-white shadow-[0_26px_70px_rgba(6,0,25,0.45)]">
          <div className="relative px-4 py-6 sm:px-10 sm:py-10 md:px-12 md:py-12 space-y-6 sm:space-y-10 text-[#372847]">
            <div className="flex flex-col items-center gap-3.5 sm:gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6A239E]/20 bg-[#F4EBFB] px-3 py-1.5 text-[11px] sm:text-sm shadow-[0_12px_30px_rgba(6,0,20,0.18)]">
                <Heart className="h-4 w-4 text-[#6A239E]" />
                <span className={`${playfair.className} text-[13px] sm:text-base text-[#6A239E]`}>
                  A Lavender Note for Our Guests
                </span>
                <Heart className="h-4 w-4 text-[#6A239E]" />
              </div>

              <div className="max-w-2xl text-center space-y-2">
                <p className={`${playfair.className} text-base sm:text-2xl text-[#372847] leading-relaxed`}>
                  "As {debutanteName} turns eighteen, your presence is the keepsake she treasures most."
                </p>
                <p className={`${inter.className} text-[13px] sm:text-base text-[#372847]/80 leading-relaxed`}>
                  If you feel called to sprinkle an extra blessing, a monetary gift fuels her dream of soaring as a flight
                  attendant and gifting her parents proud smiles.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowQRCode((prev) => !prev)}
                className="group relative inline-flex items-center justify-center gap-1.5 rounded-2xl border border-[#6A239E] bg-gradient-to-r from-[#6A239E] to-[#B47FE8] px-4 py-2.5 text-sm sm:text-base font-semibold text-white shadow-[0_12px_30px_rgba(6,0,20,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(6,0,20,0.45)]"
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
              <div className="flex flex-col items-center gap-4 pt-5 sm:pt-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#6A239E]/25 bg-[#F4EBFB] px-3 py-0.5 text-[9px] uppercase tracking-[0.3em] text-[#6A239E]">
                  <Sparkles className="h-4 w-4 text-[#6A239E]" />
                  <span>GCash details</span>
                  <Sparkles className="h-4 w-4 text-[#6A239E]" />
                </div>

                <div className="text-center space-y-1">
                  <h3 className={`${playfair.className} text-lg sm:text-3xl text-[#372847]`}>GCash</h3>
                  <p className={`${inter.className} text-[11px] sm:text-base text-[#372847]/70`}>
                    Scan to send your thoughtful gift
                  </p>
                </div>

                <div className="relative w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl border border-[#6A239E]/25 bg-white/70 p-4 sm:p-5 shadow-[0_16px_40px_rgba(6,0,20,0.3)]">
                  <Image
                    src="/QR/GCASH.png"
                    alt={`GCash QR code for ${debutanteName}'s debut gift fund`}
                    fill
                    className="rounded-2xl object-contain"
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                    priority
                  />
                  <div className="absolute inset-0 rounded-2xl border border-white/60" />
                </div>

                <div className="text-center space-y-2">
                  <p className={`${inter.className} text-[10px] sm:text-sm text-[#372847]/70`}>
                    Open your GCash app → tap “Scan” → send any amount that matches the blessing in your heart.
                  </p>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#6A239E]/25 bg-[#F4EBFB] px-3 py-0.5 text-[9px] uppercase tracking-[0.28em] text-[#6A239E]">
                    <Heart className="h-4 w-4 text-[#6A239E]" />
                    <span>Thank you for gilding her celebration</span>
                    <Heart className="h-4 w-4 text-[#6A239E]" />
                  </div>
                </div>
              </div>
            </div>

            <p className={`${inter.className} text-[11px] sm:text-base text-[#372847]/85 text-center`}>
              With lavender gratitude, {debutanteName} & family
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
