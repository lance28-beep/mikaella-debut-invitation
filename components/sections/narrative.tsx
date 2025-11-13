"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import Stack from "@/components/stack"
import { motion } from "motion/react"
import { Great_Vibes, WindSong, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
})

const windSong = WindSong({
  subsets: ["latin"],
  weight: ["400", "500"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

type TabId = "about" | "dreams" | "bio"

const TAB_CONTENT: Record<
  TabId,
  {
    headline: string
    blurb: string
    paragraphs: string[]
    highlights?: string[]
  }
> = {
  about: {
    headline: "Starlit stories from the heart",
    blurb: "The girl behind the gown, discovering grace in every season.",
    paragraphs: [
      "Trisha Mae is a soft-spoken spark — the kind who remembers every detail, champions every friend, and never leaves a room without making someone laugh. She is the eldest sister, the dependable confidante, and the creative daydreamer who sketches gowns in the margins of her notebooks.",
      "Whether she is curating playlists for quiet evenings or hosting impromptu get-togethers with cousins, Trisha believes celebrations are best when everyone feels seen. Her eighteenth is not just a milestone — it is a thank-you to the people who raised, cheered, and walked beside her.",
    ],
    highlights: ["Eldest of three siblings", "Certified matcha latte lover", "Collects handwritten letters"],
  },
  dreams: {
    headline: "Dreaming beyond midnight wishes",
    blurb: "Plans penned in the journal she keeps under her pillow.",
    paragraphs: [
      "Trisha dreams of building a creative studio that blends events, storytelling, and fashion. She imagines designing keepsake experiences — the kind guests remember years after the music fades. Her sketchbook is filled with silhouettes, color palettes, and dreamy mood boards for future celebrations.",
      "Beyond career goals, she longs for simple joys: weekend road trips with family, faith-filled mornings, and a home that hums with music and warmth. Her wish list is less about luxury and more about living with intention, surrounded by the people she loves.",
    ],
    highlights: ["Study events & brand design", "Launch a keepsake studio", "Travel with the whole family"],
  },
  bio: {
    headline: "Moments that made this debut",
    blurb: "A quick glance at the chapters leading to eighteen.",
    paragraphs: [
      "Born and raised in Naga City, Trisha Mae grew up in a house where laughter was as common as lullabies. She was the kid who turned school projects into art exhibits and family gatherings into rehearsed performances.",
      "At sixteen, she joined her first community outreach and discovered how small acts of kindness could ripple far beyond a single day. That experience still fuels her desire to weave generosity into every plan.",
      "Today, she stands at the cusp of adulthood — grateful for unwavering parents, resilient friendships, and every lesson that refined her grace. Her debut is a celebration of all those who have shaped her glow.",
    ],
    highlights: ["Born June 13, 2008 — Gemini sun", "Plays acoustic guitar after classes", "Weekend volunteer for local youth workshops"],
  },
}

export function Narrative() {
  const [activeTab, setActiveTab] = useState<TabId>("about")

  return (
    <Section id="narrative" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#040818] via-[#050d1f] to-[#0b1732]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,149,255,0.2),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(154,178,255,0.22),transparent_45%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(94,119,220,0.18),transparent_50%)]" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/40 shadow-[0_0_12px_rgba(204,221,255,0.6)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.4, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs sm:text-sm tracking-[0.4em] uppercase text-[#aab7ff]/70 mb-4">
            A closer look at the celebrant
          </p>
          <h2
            className={`${greatVibes.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f2f6ff] drop-shadow-[0_18px_40px_rgba(9,18,42,0.65)]`}
          >
            My Journey to 18
          </h2>
          <p className={`${inter.className} text-base sm:text-lg md:text-xl text-[#cdd8ff] mt-4 tracking-[0.08em]`}>
            Every chapter glows a little brighter under the midnight sky.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col items-center gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex justify-center w-full">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#5778ff]/20 via-[#a7b7ff]/10 to-transparent blur-3xl rounded-full" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#b6c4ff]/25 via-transparent to-[#647cff]/15 blur-2xl" />

              <Stack
                randomRotation
                sensitivity={190}
                sendToBackOnClick={false}
                cardDimensions={{ width: 280, height: 340 }}
                cardsData={[
                  { id: 1, img: "/LoveStory/story (5).png" },
                  { id: 2, img: "/LoveStory/story (4).png" },
                  { id: 3, img: "/LoveStory/story (3).png" },
                  { id: 4, img: "/LoveStory/story (2).png" },
                  { id: 5, img: "/LoveStory/story (1).png" },
                ]}
                animationConfig={{ stiffness: 260, damping: 22 }}
              />

              <motion.p
                className="text-center text-xs sm:text-sm text-[#ccd6ff]/80 mt-6 tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                drag to discover memories
              </motion.p>
            </motion.div>
          </div>

          <div className="w-full max-w-3xl space-y-8">
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {(["about", "dreams", "bio"] as TabId[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`group relative overflow-hidden rounded-full border border-white/20 px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.32em] uppercase transition-all duration-400 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#5a78ff]/90 via-[#8ca4ff]/80 to-[#5a7aff]/85 text-white shadow-[0_12px_24px_rgba(68,93,201,0.35)]"
                      : "bg-white/5 text-[#c7d3ff]/80 hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10">
                    {tab === "about" && "About Me"}
                    {tab === "dreams" && "My Dreams"}
                    {tab === "bio" && "Bio"}
                  </span>
                  {activeTab === tab && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/7 backdrop-blur-xl shadow-[0_24px_60px_rgba(10,18,40,0.55)] px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 transition-all duration-500"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(171,191,255,0.18),transparent_60%)] pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#b5c2ff]/30 blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#6d86ff]/25 blur-[90px]" />

              <div className="relative z-10 space-y-5 sm:space-y-6">
                <div>
                  <p className="text-xs sm:text-sm tracking-[0.38em] uppercase text-[#9fb2ff]/80">
                    {TAB_CONTENT[activeTab].blurb}
                  </p>
                  <h3 className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl text-[#f1f5ff] mt-3 leading-tight`}>
                    {TAB_CONTENT[activeTab].headline}
                  </h3>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {TAB_CONTENT[activeTab].paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-sm sm:text-base md:text-lg text-[#dbe3ff]/85 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {TAB_CONTENT[activeTab].highlights && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-[10px] sm:text-xs tracking-[0.42em] uppercase text-[#a8b9ff]/65 mb-3 sm:mb-4">
                      Favorite highlights
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {TAB_CONTENT[activeTab].highlights?.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] sm:text-xs text-[#f0f4ff]/90 tracking-[0.28em]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#90a4ff]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 grid sm:grid-cols-3 gap-4 sm:gap-6 rounded-3xl border border-white/12 bg-white/5 backdrop-blur-xl px-6 sm:px-10 md:px-12 py-6 sm:py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            { label: "Debut Date", value: "June 13, 2026" },
            { label: "Grand Venue", value: "Villa Caceres Hotel" },
            { label: "Call Time", value: "4:10 PM" },
          ].map((item) => (
            <div key={item.label} className="text-center space-y-2">
              <p className="text-[11px] sm:text-xs tracking-[0.42em] uppercase text-[#9fb2ff]/70">{item.label}</p>
              <p className={`${playfair.className} text-lg sm:text-xl md:text-2xl text-[#f0f4ff]`}>{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
