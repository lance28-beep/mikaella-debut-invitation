"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Section } from "@/components/section"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

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
  weight: ["400", "500", "600"],
})

const galleryItems = [
  { image: "/desktop-background/couple (2).jpg", text: "Promise under the stars" },
  { image: "/mobile-background/couple (8).jpg", text: "Warm laughter" },
  { image: "/mobile-background/couple (19).jpg", text: "Moonlit whispers" },
  { image: "/mobile-background/couple (3).jpg", text: "Soft focus" },
  { image: "/desktop-background/couple (4).jpg", text: "Elegance in blue" },
  { image: "/mobile-background/couple (22).jpg", text: "City glow" },
  { image: "/mobile-background/couple (12).jpg", text: "Quiet smiles" },
  { image: "/mobile-background/couple (16).jpg", text: "Hand in hand" },
]

const tileLayouts = [
  "md:col-span-3 md:row-span-3 md:col-start-1 md:row-start-1",
  "md:col-span-2 md:row-span-3 md:col-start-4 md:row-start-1",
  "md:col-span-1 md:row-span-3 md:col-start-6 md:row-start-1",
  "md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-4",
  "md:col-span-3 md:row-span-2 md:col-start-4 md:row-start-4",
  "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-6",
  "md:col-span-2 md:row-span-1 md:col-start-5 md:row-start-6",
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: "prev" | "next") => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === "next") {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === "ArrowLeft") navigateImage("prev")
      if (e.key === "ArrowRight") navigateImage("next")
      if (e.key === "Escape") setSelectedImage(null)
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedImage])

  useEffect(() => {
    if (selectedImage) {
      const next = new Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <Section
      id="gallery"
      className="relative bg-gradient-to-b from-[#040818] via-[#071430] to-[#0b1732] py-14 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(126,151,255,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(166,183,255,0.2),transparent_45%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_85%,rgba(92,121,214,0.2),transparent_50%)]" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs sm:text-sm tracking-[0.45em] uppercase text-[#a9baff]/70 mb-3">Captured constellation</p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl text-[#f4f7ff] drop-shadow-[0_16px_35px_rgba(11,22,49,0.65)]`}
          >
            Glimpses of Trisha Mae
          </h2>
          <p className={`${inter.className} text-sm sm:text-base md:text-lg text-[#dbe3ff]/85 mt-4 leading-relaxed`}>
            Moments wrapped in midnight blue, ready to relive with every scroll.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 sm:mt-14 lg:mt-16 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
              <div className="w-14 h-14 border-[3px] border-[#7f9bff]/30 border-t-[#bcd0ff] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="mx-auto max-w-5xl w-full px-1">
              <div className="grid w-full min-h-[420px] sm:min-h-[460px] md:min-h-0 md:aspect-square grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:grid-rows-6 gap-2 sm:gap-3 md:gap-4">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.image + index}
                    type="button"
                    className={`group relative min-h-[190px] sm:min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/12 bg-white/6 backdrop-blur-lg shadow-[0_18px_35px_rgba(12,22,45,0.45)] transition-all duration-500 hover:shadow-[0_26px_50px_rgba(28,48,102,0.55)] hover:border-white/25 ${tileLayouts[index] ?? ""}`}
                    onClick={() => {
                      setSelectedImage(item)
                      setCurrentIndex(index)
                    }}
                    aria-label={`Open image ${index + 1}`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute -inset-5 sm:-inset-6 bg-gradient-to-br from-[#6d86ff]/30 via-transparent to-[#9fb2ff]/20 blur-2xl sm:blur-3xl" />
                    </div>

                    <div className="relative h-full w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050b1f]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white/90">
                      <span className={`${playfair.className} text-[9px] sm:text-xs tracking-[0.25em] uppercase`}>{item.text}</span>
                      <span className="text-[8px] sm:text-[10px] tracking-[0.38em] uppercase text-white/65">{index + 1}/{galleryItems.length}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-[#03040b]/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
          <div
            className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                const now = Date.now()
                if (now - lastTap < 300) {
                  setZoomScale((s) => (s > 1 ? 1 : 2))
                  setPan({ x: 0, y: 0 })
                }
                setLastTap(now)
                const t = e.touches[0]
                setTouchStartX(t.clientX)
                setTouchDeltaX(0)
                if (zoomScale > 1) {
                  setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                }
              }
              if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const dist = Math.hypot(dx, dy)
                setPinchStartDist(dist)
                setPinchStartScale(zoomScale)
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 2 && pinchStartDist) {
                const dx = e.touches[0].clientX - e.touches[1].clientX
                const dy = e.touches[0].clientY - e.touches[1].clientY
                const dist = Math.hypot(dx, dy)
                const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                setZoomScale(scale)
              } else if (e.touches.length === 1) {
                const t = e.touches[0]
                if (zoomScale > 1 && panStart) {
                  const dx = t.clientX - panStart.x
                  const dy = t.clientY - panStart.y
                  setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                } else if (touchStartX !== null) {
                  setTouchDeltaX(t.clientX - touchStartX)
                }
              }
            }}
            onTouchEnd={() => {
              setPinchStartDist(null)
              setPanStart(null)
              if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                navigateImage(touchDeltaX > 0 ? "prev" : "next")
              }
              setTouchStartX(null)
              setTouchDeltaX(0)
            }}
          >
            <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-3 sm:px-6 pt-3 sm:pt-6">
              <div className="bg-white/12 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 shadow-[0_12px_24px_rgba(0,0,0,0.25)]">
                <span className="text-xs sm:text-sm font-medium text-white/90 tracking-[0.18em]">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </div>

            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("prev")
                    resetZoom()
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage("next")
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(null)
                    resetZoom()
                  }}
                  className="absolute top-3 right-3 z-40 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/35 bg-white/15 backdrop-blur-md shadow-[0_14px_28px_rgba(8,12,26,0.45)] transition-all duration-200 hover:scale-105"
                  aria-label="Close lightbox"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/45 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <X size={18} className="sm:w-6 sm:h-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
                </button>
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
                    transition: pinchStartDist ? "none" : "transform 200ms ease-out",
                  }}
                  className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-2xl shadow-[0_35px_65px_rgba(6,13,31,0.8)]"
                />

                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full px-3 py-1.5 text-xs font-medium border border-white/20 transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-white/70 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 mt-12 sm:mt-14 md:mt-16 flex justify-center px-4">
        <a
          href="/gallery"
          className="group relative inline-flex h-full min-h-[3.5rem] sm:min-h-[3.75rem] items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10 px-10 sm:px-12 md:px-14 text-[9px] sm:text-[10px] md:text-xs tracking-[0.48em] uppercase text-white shadow-[0_26px_58px_rgba(18,33,76,0.55)] transition-all duration-600 ease-out hover:-translate-y-2 hover:shadow-[0_36px_70px_rgba(42,70,145,0.66)]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
          <span className="absolute inset-0 bg-gradient-to-r from-[#3f5bff]/92 via-[#7f95ff]/78 to-[#4f6dff]/92 opacity-90" />
          <span className="absolute inset-[2px] rounded-full bg-[#030a1d]/85 backdrop-blur-2xl border border-white/12" />
          <span className="absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-white/14 blur-3xl opacity-0 group-hover:opacity-95 transition-all duration-600" />
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-r from-transparent via-white/32 to-transparent" />
          <span className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-l from-transparent via-white/18 to-transparent" />
          <span className="relative z-10 inline-flex items-center justify-center">
            View Full Gallery
          </span>
        </a>
      </div>
    </Section>
  )
}
