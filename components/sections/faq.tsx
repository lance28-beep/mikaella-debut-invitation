"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is the dress code for Trisha Mae's debut?",
    answer:
      "Ladies: Flowing gowns or cocktail dresses in shades of midnight blue, moonlit silver, or soft pearl.\n\nGentlemen: Barong, suit, or smart separates in deep navy, charcoal, or black.\n\nKindly avoid bright, neon, or overly casual attire to keep the evening elegant.",
  },
  {
    question: "When and where is the debut celebration?",
    answer:
      "Trisha Mae's eighteenth debut is on Sunday, June 13, 2026 at 4:10 PM at Villa Caceres Hotel, Naga City. The celebration will take place in the Grand Ballroom.",
  },
  {
    question: "What time should I arrive?",
    answer:
      "Guest doors open at 3:30 PM. We recommend arriving 15-20 minutes early to sign the debut guest book, take portraits, and find your seat before the formal program begins.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Kindly RSVP by June 1, 2026. Your response helps us prepare for Trisha Mae's special night. [RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Do you have a gift registry?",
    answer:
      "Your presence is the brightest gift for Trisha Mae's eighteenth chapter. If you wish to share a token of love, we welcome monetary gifts that help her chase dreams beyond the horizon. You can use the GCash QR code available in the Gift Registry section.",
  },
  {
    question: "Is there parking available at the venue?",
    answer:
      "Yes! Complimentary parking is available at Villa Caceres Hotel. Just mention Trisha Mae's debut at the gate. We recommend arriving early to secure a spot.",
  },
  {
    question: "Can I bring additional guests?",
    answer:
      "We kindly ask that any additional guests be included in your RSVP so we can make proper arrangements. Please update your guest count when you submit your RSVP. Thank you for helping us create a perfect celebration for Trisha Mae!",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP. We'll do our best to accommodate your needs.",
  },
  {
    question: "Can I take photos during the debut?",
    answer:
      "Yes! We have a professional photographer, but you're welcome to capture moments throughout the evening. We'll have a dedicated time for group photos with Trisha Mae after the formal program.",
  },
  {
    question: "What should I do if I need to cancel or update my RSVP?",
    answer:
      "Please update your RSVP as soon as possible if your plans change. You can search for your name in the RSVP section and update your response. We appreciate your timely communication!",
  },
  {
    question: "What happens during the 18 Candles and 18 Treasures ceremony?",
    answer:
      "After the formal program, Trisha Mae will light 18 candles and receive 18 treasures from loved ones. If you're participating, please prepare a short wish or keepsake. This is a beautiful tradition that celebrates her journey to adulthood.",
  },
  {
    question: "What time does the celebration end?",
    answer:
      "The program wraps by 8:30 PM so you can rest and travel home safely. We want everyone to enjoy the evening while ensuring a safe journey home.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
      className="relative z-[30] overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-[#040818] via-[#08102d]/92 to-[#050b1f]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(146,168,255,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(146,168,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)] opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101b3d]/30 to-[#040818]/85" />
      </div>

      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16 px-3 sm:px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-[#a7b7ff]/85">
          Your Questions Answered
        </div>
        <h2
          className={`${greatVibes.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white drop-shadow-[0_18px_40px_rgba(10,18,46,0.6)] mt-3 sm:mt-4`}
        >
          Questions Under the Stars
        </h2>
        <p className={`${inter.className} text-[11px] sm:text-xs md:text-sm lg:text-base text-white/75 max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed px-2`}>
          Everything you need to know about Trisha Mae's eighteenth celebration
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] md:rounded-[32px] border border-white/12 bg-white/12 backdrop-blur-2xl shadow-[0_20px_55px_rgba(8,18,44,0.4)] sm:shadow-[0_26px_70px_rgba(8,18,44,0.45)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/6" />

          <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/14 bg-white/16 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:shadow-[0_14px_35px_rgba(12,24,64,0.3)] sm:hover:shadow-[0_18px_45px_rgba(12,24,64,0.35)]"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 flex items-start sm:items-center justify-between gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-colors min-h-[3.5rem] sm:min-h-[4rem]"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span
                        className={`${playfair.className} font-semibold text-white flex-1 text-[13px] sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed group-hover:text-[#d6deff] transition-colors duration-200`}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-white/70 flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-white" : ""} w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-0 group-hover:text-white`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 bg-white/8 border-t border-white/12">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className={`${inter.className} text-white/85 leading-relaxed text-[12px] sm:text-sm md:text-base lg:text-lg whitespace-pre-line`}>
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a
                                href="#guest-list"
                                className="text-[#a7b7ff] underline font-semibold hover:text-white transition-colors break-words"
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className={`${inter.className} text-white/85 leading-relaxed text-[12px] sm:text-sm md:text-base lg:text-lg whitespace-pre-line`}>
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
