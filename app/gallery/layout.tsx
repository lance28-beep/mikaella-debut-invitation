"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global navbar while on /gallery
    const navbar = document.querySelector("nav") as HTMLElement | null
    if (navbar) navbar.style.display = "none"
    return () => {
      if (navbar) navbar.style.display = ""
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#172822]">
      {/* Elegant top navigation bar */}
      <div className="sticky top-0 z-50 bg-[#172822]/95 backdrop-blur-sm border-b border-[#E6A379]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-18 flex items-center justify-between">
            <Link
              href="/#gallery"
              className="group inline-flex items-center gap-2.5 text-[#E6A379] font-medium px-4 sm:px-5 py-2.5 rounded-full border border-[#E6A379]/40 bg-[#172822] hover:bg-[#E6A379] hover:text-white hover:scale-105 transition-all duration-300 font-sans text-sm sm:text-base shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-2 text-[#E9D3A4]">
              <div className="hidden sm:block w-px h-6 bg-[#E6A379]/40" />
              <div className="text-xs sm:text-sm font-sans font-light tracking-wider uppercase">Gallery</div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}






