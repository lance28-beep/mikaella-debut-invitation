"use client"

import React from "react"
import { useState, useEffect, useMemo } from "react"
import { Loader2, Users } from "lucide-react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface EntourageMember {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

const ROLE_CATEGORY_ORDER = [
  "The Debutante",
  "Parents",
  "Her Court",
  "Honored Pair",
  "Celestial Sponsors",
  "Circle of Eighteen",
  "Twinkling Pages",
  "Dancers of the Night",
  "Young Stars",
  "Special Roles",
]

const DEFAULT_CATEGORY_MAP: Record<string, string> = {
  "The Couple": "The Debutante",
  "Parents of the Bride": "Parents",
  "Parents of the Groom": "Parents",
  "Best Man": "Her Court",
  "Maid/Matron of Honor": "Her Court",
  "Bridesmaids": "Circle of Eighteen",
  "Groomsmen": "Circle of Eighteen",
  "Candle Sponsors": "Celestial Sponsors",
  "Veil Sponsors": "Celestial Sponsors",
  "Cord Sponsors": "Celestial Sponsors",
  "Flower Girls": "Young Stars",
  "Ring/Coin Bearers": "Young Stars",
  "Bible Bearer": "Special Roles",
  "Presider": "Special Roles",
  "Reader": "Special Roles",
  "Dancers": "Dancers of the Night",
  "Coordinators": "Twinkling Pages",
}

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntourage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data: EntourageMember[] = await response.json()
      setEntourage(data)
    } catch (error: any) {
      console.error("Failed to load entourage:", error)
      setError(error?.message || "Failed to load entourage")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEntourage()

    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage()
      }, 1000)
    }

    window.addEventListener("entourageUpdated", handleEntourageUpdate)

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate)
    }
  }, [])

  const remapCategory = (original: string) => {
    if (!original) return "Special Roles"
    return DEFAULT_CATEGORY_MAP[original] || original
  }

  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {}

    entourage.forEach((member) => {
      const category = remapCategory(member.RoleCategory)
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(member)
    })

    return grouped
  }, [entourage])

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

  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember
    align?: "left" | "center" | "right"
    showRole?: boolean
  }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-1.5 sm:py-2 md:py-2.5 leading-relaxed`}
      >
        <p className={`${inter.className} text-[13px] sm:text-sm md:text-base font-medium text-white/90 ${textAlign}`}>
          {member.Name}
        </p>
        {showRole && member.RoleTitle && (
          <p className={`${inter.className} text-[10px] sm:text-[11px] md:text-xs font-normal text-white/60 mt-0.5 leading-snug ${textAlign}`}>
            {member.RoleTitle}
          </p>
        )}
      </div>
    )
  }

  const TwoColumnLayout = ({
    children,
    leftTitle,
    rightTitle,
    singleTitle,
    centerContent = false,
  }: {
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div
            className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 md:gap-y-4 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
          >
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-6 mb-3 sm:mb-4">
          {leftTitle && (
            <SectionTitle align="right" className="pr-3 sm:pr-4 md:pr-6">
              {leftTitle}
            </SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-3 sm:pl-4 md:pl-6">
              {rightTitle}
            </SectionTitle>
          )}
        </div>
        <div
          className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 md:gap-y-4 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
        >
          {children}
        </div>
      </div>
    )
  }

  const renderDivider = (categoryIndex: number) =>
    categoryIndex > 0 && (
      <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
        <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
    )

  return (
    <section
      id="entourage"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-[#040818] via-[#0b1732]/92 to-[#050b1f]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 bg-[#4e6dff]/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 bg-[#92a5ff]/18 blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-72 w-72 bg-white/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-[#a7b7ff]/85">
          Her Celestial Court
        </div>
        <h2
          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_48px_rgba(8,16,38,0.65)] mt-4`}
        >
          Guiding Lights of the Night
        </h2>
        <p
          className={`${inter.className} text-xs sm:text-sm md:text-base text-white/75 max-w-2xl mx-auto mt-4 leading-relaxed`}
        >
          Every name shimmers with a role in Trisha Mae’s story—friends, family, and mentors who help her step into this starlit chapter.
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="relative bg-white/12 backdrop-blur-2xl border border-white/12 rounded-xl sm:rounded-2xl shadow-[0_25px_80px_rgba(8,18,50,0.45)] overflow-hidden">
          <div className="absolute inset-[10px] sm:inset-[14px] md:inset-[18px] border border-white/15 rounded-lg sm:rounded-xl pointer-events-none" />
          <div className="relative p-5 sm:p-7 md:p-9 lg:p-12">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-[#9cb4ff]" />
                  <span className={`${inter.className} text-white/80 text-lg`}>
                    Illuminating her court…
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <p className={`${inter.className} text-red-400 text-lg mb-2`}>{error}</p>
                  <button
                    onClick={fetchEntourage}
                    className={`${playfair.className} text-[#9cb4ff] hover:text-white transition-colors underline`}
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : entourage.length === 0 ? (
              <div className="text-center py-24">
                <Users className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <p className={`${inter.className} text-white/70 text-lg`}>
                  Her constellation is coming together soon.
                </p>
              </div>
            ) : (
              <div className="relative z-10 w-full">
                {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                  const members = grouped[category] || []
                  if (members.length === 0) return null

                  if (category === "The Debutante") {
                    const debutante = members[0]
                    return (
                      <div key={category}>
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout singleTitle="The Debutante" centerContent>
                          <div className="col-span-full">
                            <div className="max-w-sm mx-auto">
                              {debutante && <NameItem member={debutante} align="center" showRole />}
                            </div>
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  if (category === "Parents") {
                    const parents = members
                    const left = parents.filter((member) =>
                      member.RoleTitle?.toLowerCase().includes("father")
                    )
                    const right = parents.filter((member) =>
                      member.RoleTitle?.toLowerCase().includes("mother")
                    )
                    const maxLen = Math.max(left.length, right.length)
                    return (
                      <div key={category}>
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout leftTitle="Fathers" rightTitle="Mothers">
                          {Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`parents-row-${idx}`}>
                              <div className="px-3 sm:px-4 md:px-6">
                                {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-2" />}
                              </div>
                              <div className="px-3 sm:px-4 md:px-6">
                                {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-2" />}
                              </div>
                            </React.Fragment>
                          ))}
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  const pairedCategories: Record<string, string> = {
                    "Her Court": "Honored Pair",
                    "Honored Pair": "Her Court",
                    "Celestial Sponsors": "Celestial Sponsors",
                    "Circle of Eighteen": "Circle of Eighteen",
                  }

                  if (category === "Her Court" || category === "Honored Pair") {
                    const leftMembers = grouped["Honored Pair"] || []
                    const rightMembers = grouped["Her Court"] || []
                    if (category !== "Honored Pair") return null
                    const maxLen = Math.max(leftMembers.length, rightMembers.length)
                    return (
                      <div key="court">
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout leftTitle="Honored Pair" rightTitle="Her Court">
                          {Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`court-row-${idx}`}>
                              <div className="px-3 sm:px-4 md:px-6">
                                {leftMembers[idx] ? (
                                  <NameItem member={leftMembers[idx]} align="right" />
                                ) : (
                                  <div className="py-2" />
                                )}
                              </div>
                              <div className="px-3 sm:px-4 md:px-6">
                                {rightMembers[idx] ? (
                                  <NameItem member={rightMembers[idx]} align="left" />
                                ) : (
                                  <div className="py-2" />
                                )}
                              </div>
                            </React.Fragment>
                          ))}
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  if (category === "Circle of Eighteen") {
                    const debutantes = grouped["Circle of Eighteen"] || []
                    const half = Math.ceil(debutantes.length / 2)
                    const left = debutantes.slice(0, half)
                    const right = debutantes.slice(half)
                    const maxLen = Math.max(left.length, right.length)
                    return (
                      <div key="circle">
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout leftTitle="Circle A" rightTitle="Circle B">
                          {Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`circle-row-${idx}`}>
                              <div className="px-3 sm:px-4 md:px-6">
                                {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-2" />}
                              </div>
                              <div className="px-3 sm:px-4 md:px-6">
                                {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-2" />}
                              </div>
                            </React.Fragment>
                          ))}
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  if (category === "Celestial Sponsors") {
                    const sponsors = members
                    const half = Math.ceil(sponsors.length / 2)
                    const left = sponsors.slice(0, half)
                    const right = sponsors.slice(half)
                    const maxLen = Math.max(left.length, right.length)
                    return (
                      <div key="sponsors">
                        {renderDivider(categoryIndex)}
                        <TwoColumnLayout leftTitle="Guiding Lights" rightTitle="Star Sponsors">
                          {Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`sponsors-row-${idx}`}>
                              <div className="px-3 sm:px-4 md:px-6">
                                {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-2" />}
                              </div>
                              <div className="px-3 sm:px-4 md:px-6">
                                {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-2" />}
                              </div>
                            </React.Fragment>
                          ))}
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  const singleColumn = new Set([
                    "Honored Pair",
                    "Twinkling Pages",
                    "Dancers of the Night",
                    "Young Stars",
                    "Special Roles",
                  ])

                  return (
                    <div key={category}>
                      {renderDivider(categoryIndex)}
                      <TwoColumnLayout singleTitle={category} centerContent>
                        {(() => {
                          if (singleColumn.has(category) || members.length <= 2) {
                            return (
                              <div className="col-span-full">
                                <div className="max-w-sm mx-auto flex flex-col items-center gap-2.5">
                                  {members.map((member, idx) => (
                                    <NameItem
                                      key={`${category}-${idx}-${member.Name}`}
                                      member={member}
                                      align="center"
                                    />
                                  ))}
                                </div>
                              </div>
                            )
                          }

                          const half = Math.ceil(members.length / 2)
                          const left = members.slice(0, half)
                          const right = members.slice(half)
                          const maxLen = Math.max(left.length, right.length)
                          return Array.from({ length: maxLen }).map((_, idx) => (
                            <React.Fragment key={`${category}-row-${idx}`}>
                              <div className="px-3 sm:px-4 md:px-6">
                                {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-2" />}
                              </div>
                              <div className="px-3 sm:px-4 md:px-6">
                                {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-2" />}
                              </div>
                            </React.Fragment>
                          ))
                        })()}
                      </TwoColumnLayout>
                    </div>
                  )
                })}

                {Object.keys(grouped)
                  .filter((cat) => !ROLE_CATEGORY_ORDER.includes(cat))
                  .map((category) => {
                    const members = grouped[category]
                    if (!members || members.length === 0) return null
                    return (
                      <div key={category}>
                        <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                          <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                        </div>
                        <TwoColumnLayout singleTitle={category} centerContent>
                          {(() => {
                            if (members.length <= 2) {
                              return (
                                <div className="col-span-full">
                                  <div className="max-w-sm mx-auto flex flex-col items-center gap-2.5">
                                    {members.map((member, idx) => (
                                      <NameItem
                                        key={`${category}-${idx}-${member.Name}`}
                                        member={member}
                                        align="center"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )
                            }
                            const half = Math.ceil(members.length / 2)
                            const left = members.slice(0, half)
                            const right = members.slice(half)
                            const maxLen = Math.max(left.length, right.length)
                            return Array.from({ length: maxLen }).map((_, idx) => (
                              <React.Fragment key={`${category}-row-${idx}`}>
                                <div className="px-3 sm:px-4 md:px-6">
                                  {left[idx] ? <NameItem member={left[idx]} align="right" /> : <div className="py-2" />}
                                </div>
                                <div className="px-3 sm:px-4 md:px-6">
                                  {right[idx] ? <NameItem member={right[idx]} align="left" /> : <div className="py-2" />}
                                </div>
                              </React.Fragment>
                            ))
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
