"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import Stack from "@/components/stack"
import { motion } from "motion/react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"
import { ButterflyCluster } from "@/components/butterfly-cluster"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
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
    headline: "The Heart of Xyza Jenine",
    blurb: "Grounded in grace, lifted by love",
    paragraphs: [
      "Xyza Jenine is the kind of light that fills a room quietly—soft, steady, and deeply sincere. She leads with compassion, listens with curiosity, and shares joy like it is second nature. Every laugh, hug, and gentle word she offers feels intentional, as if she’s stitching kindness into the people she loves.",
      "Her debut is her way of honoring the family who raised her, the friends who cheer her on, and the mentors who taught her how to stay humble while chasing the extraordinary. It is the celebration of a daughter who never forgets to say thank you, a sister who shows up, and a friend who makes every moment feel safe.",
      "Wrapped in the lavender palette she adores, she steps into adulthood with a quiet confidence—ready to keep growing, keep giving, and keep carrying the values that shaped her.",
    ],
    highlights: [
      "Gentle, generous, and faith-filled",
      "Celebrates family stories and traditions",
      "Always choosing kindness first",
    ],
  },
  dreams: {
    headline: "Dreaming Beyond Lavender Horizons",
    blurb: "A heart set on adventure, service, and purpose",
    paragraphs: [
      "Xyza dreams in widescreen color. She sees herself exploring new cities, learning from different cultures, and representing her family with pride wherever she lands. Travel is more than a bucket-list wish—it is how she imagines growing wiser, braver, and more compassionate.",
      "She is drawn to careers that let her care for people and keep them inspired, whether through hospitality, aviation, or creative storytelling. Whatever path she takes, she wants it to reflect excellence, elegance, and empathy.",
      "Above everything, she dreams of becoming the kind of woman who lifts others up—an achiever whose success is shared with the people who believed in her from the beginning.",
    ],
    highlights: [
      "Pursue a career that blends travel and service",
      "See the world with her parents’ blessing and pride",
      "Inspire younger siblings and cousins to dream boldly",
    ],
  },
  bio: {
    headline: "A Lavender Story in Motion",
    blurb: "From shy girl to confident debutante",
    paragraphs: [
      "Xyza Jenine grew up surrounded by family who taught her that gentleness can still be powerful. She learned to serve others before herself, to study diligently, and to carry her faith with quiet courage. Those early lessons turned into leadership roles at school, volunteer work in her community, and friendships built on trust.",
      "She discovered her love for hosting and organizing events while helping with campus activities and family celebrations. Whether she’s planning surprises, styling looks, or writing heartfelt notes, she approaches every task with creativity and a meticulous eye.",
      "As she turns 18, she carries stories of victories and setbacks, of prayers answered at the last minute, and of mentors who believed in her even when she doubted herself. Her bio is still being written, but every chapter so far points to a young woman ready to serve, to soar, and to shine for the people she loves.",
    ],
    highlights: [
      "Proud daughter, sister, and friend",
      "Active campus leader and community volunteer",
      "Believes in purpose before perfection",
    ],
  },
}

export function Narrative() {
  const [activeTab, setActiveTab] = useState<TabId>("about")

  return (
    <Section id="narrative" className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#372847] via-[#4a2f5e] to-[#372847]">
      <ButterflyCluster
        className="pointer-events-none absolute z-0 opacity-50 sm:opacity-60 md:opacity-70"
        style={{
          right: "-80px",
          top: "10%",
          transform: "scale(1.1)",
          width: "180px",
          height: "190px",
        }}
        ariaHidden={true}
      />
      <Image
        src="/lavander%20decoration/righ-bottom-corner.png"
        alt=""
        width={420}
        height={420}
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 right-[-40px] w-48 sm:w-64 md:w-72 opacity-80"
        sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, 18rem"
        priority={false}
      />
      <Image
        src="/lavander%20decoration/righ-bottom-corner.png"
        alt=""
        width={420}
        height={420}
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-[-40px] w-40 sm:w-56 md:w-64 opacity-70"
        style={{ transform: "scaleX(-1)" }}
        sizes="(max-width: 640px) 10rem, (max-width: 768px) 14rem, 16rem"
        priority={false}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.35em] sm:tracking-[0.4em] uppercase text-white/80 mb-2 sm:mb-3 md:mb-4">
            Lavender dreams of the debutante
          </p>
          <h2
            className={`${greatVibes.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight`}
          >
            My Journey to 18
          </h2>
          <p className={`${inter.className} text-sm sm:text-base md:text-lg lg:text-xl text-[#FBF7F8]/80 mt-2 sm:mt-3 md:mt-4 tracking-[0.06em] sm:tracking-[0.08em] px-2`}>
            Every chapter blooms beautifully beneath lavender skies and dreamy lights.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-12 md:mt-16 flex flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16"
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
              <div className="scale-75 sm:scale-90 md:scale-100 origin-center">
                <Stack
                  randomRotation
                  sensitivity={190}
                  sendToBackOnClick={false}
                  cardDimensions={{ width: 240, height: 300 }}
                  cardsData={[
                    { id: 1, img: "/desktop-background/debut 3.jpg" },
                    { id: 2, img: "/desktop-background/debut 2.jpg" },
                    { id: 3, img: "/desktop-background/debut 1.jpg" },


                  ]}
                  animationConfig={{ stiffness: 260, damping: 22 }}
                />
              </div>

              <motion.p
                className="text-center text-[10px] sm:text-xs md:text-sm text-white/80 mt-3 sm:mt-4 md:mt-6 tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                drag to discover memories
              </motion.p>
            </motion.div>
          </div>

          <div className="w-full max-w-3xl space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 px-1 sm:px-0 relative">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start relative z-10">
              {(["about", "dreams", "bio"] as TabId[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`group relative overflow-hidden rounded-full border border-[#DC96FD]/25 px-3.5 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 text-[10px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.32em] uppercase transition-all duration-400 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#DC96FD] via-[#c880f0] to-[#DC96FD] text-white shadow-[0_12px_24px_rgba(220,150,253,0.35)]"
                      : "bg-[#372847]/40 text-white/75 hover:bg-[#372847]/60"
                  }`}
                >
                  <span className="relative z-10">
                    {tab === "about" && "About Me"}
                    {tab === "dreams" && "My Dreams"}
                    {tab === "bio" && "Bio"}
                  </span>
                  {activeTab === tab && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#372847]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              className="relative z-10 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#DC96FD]/25 bg-[#372847] mx-1 sm:mx-0 px-3.5 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 transition-all duration-500"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-6">
                <div>
                  <p className="text-[9px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.38em] uppercase text-[#DC96FD]/70 leading-snug">
                    {TAB_CONTENT[activeTab].blurb}
                  </p>
                  <h3 className={`${playfair.className} text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#DC96FD] mt-1.5 sm:mt-2 md:mt-3 leading-tight`}>
                    {TAB_CONTENT[activeTab].headline}
                  </h3>
                </div>

                <div className="space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-5">
                  {TAB_CONTENT[activeTab].paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-xs sm:text-sm md:text-base lg:text-lg text-[#FBF7F8]/85 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {TAB_CONTENT[activeTab].highlights && (
                  <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-[#DC96FD]/15">
                    <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.42em] uppercase text-[#DC96FD]/60 mb-2 sm:mb-3 md:mb-4">
                      Favorite highlights
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
                      {TAB_CONTENT[activeTab].highlights?.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 rounded-full border border-[#DC96FD]/25 bg-[#372847]/40 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs text-[#FBF7F8]/90 tracking-[0.2em] sm:tracking-[0.24em] md:tracking-[0.28em]"
                        >
                          <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#DC96FD] flex-shrink-0" />
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
          className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 rounded-2xl sm:rounded-3xl border border-[#DC96FD]/20 bg-[#372847] px-4 sm:px-6 md:px-10 lg:px-12 py-4 sm:py-6 md:py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            { label: "Debut Date", value: siteConfig.wedding.date },
            { label: "Grand Venue", value: siteConfig.ceremony.venue },
            { label: "Call Time", value: siteConfig.wedding.time },
          ].map((item) => (
            <div key={item.label} className="text-center space-y-1 sm:space-y-2">
              <p className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.35em] sm:tracking-[0.42em] uppercase text-[#DC96FD]/70">{item.label}</p>
              <p className={`${playfair.className} text-base sm:text-lg md:text-xl lg:text-2xl text-[#DC96FD] leading-tight`}>{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
