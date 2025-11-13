"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-white/12 shadow-[0_20px_40px_rgba(8,16,38,0.45)] bg-white/10 backdrop-blur-xl rounded-3xl">
            <CardContent className="p-4 sm:p-6 lg:p-7">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                <Skeleton className="w-11 h-11 sm:w-12 sm:h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 sm:w-32" />
                  <Skeleton className="h-3 w-20 sm:w-28" />
                </div>
              </div>
              <Skeleton className="h-20 sm:h-24 w-full rounded-2xl" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <div className="relative inline-block mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4e6dff]/25 to-[#9bb4ff]/20 rounded-full blur-xl scale-150 animate-pulse" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#4e6dff] to-[#8199ff] rounded-full flex items-center justify-center mx-auto shadow-[0_18px_35px_rgba(20,32,75,0.5)]">
            <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-white mb-3 sm:mb-4">
          No Letters Yet
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-white/75 font-lora max-w-md mx-auto leading-relaxed">
          Be the first to whisper a wish for Trisha’s grand debut—your message will glow here.
        </p>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-[#9bb4ff]/80">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-xs sm:text-sm font-lora text-white/85 tracking-[0.28em] uppercase">Her keepsake awaits</span>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border border-white/14 shadow-[0_24px_55px_rgba(9,17,38,0.32)] bg-white/12 backdrop-blur-2xl hover:shadow-[0_30px_65px_rgba(12,22,48,0.42)] transition-all duration-500 group overflow-hidden rounded-[26px] ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#4e6dff]/18 via-transparent to-[#9bb4ff]/16 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#9bb4ff] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-left" />
          <div className="absolute -inset-[1px] rounded-[26px] pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(132,155,255,0.18)' }} />
          
          <CardContent className="relative p-5 sm:p-7 lg:p-8">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#4e6dff] to-[#8ea3ff] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_16px_32px_rgba(22,36,84,0.35)]">
                    <span className="text-white font-lora text-sm sm:text-base font-semibold tracking-wide">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4e6dff]/35 to-[#9bb4ff]/25 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-white text-base sm:text-lg font-semibold truncate tracking-wide">{msg.name}</h4>
                  <span className="text-[11px] sm:text-sm text-white/60 font-lora">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-[#9bb4ff]/80 fill-[#9bb4ff]/20 group-hover:fill-[#9bb4ff]/40 group-hover:text-white transition-all duration-300" />
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#d5deff]/80 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-1 -top-1 sm:-left-2 sm:-top-3 text-2xl sm:text-4xl text-[#7d92ff]/30 font-playfair group-hover:text-[#a7baff]/50 transition-colors duration-300">\"</span>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 font-lora group-hover:text-white/95 transition-colors duration-300">{msg.message}</p>
              <span className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-3 text-2xl sm:text-4xl text-[#7d92ff]/30 font-playfair group-hover:text-[#a7baff]/50 transition-colors duration-300">\"</span>
            </div>
            
            <div className="mt-4 flex justify-end">
              <div className="w-14 h-px bg-gradient-to-r from-transparent via-[#9bb4ff]/60 to-transparent group-hover:via-[#d5deff]/80 transition-colors duration-300" />
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="pt-4 sm:pt-6 text-center">
        <div className="inline-flex flex-col items-center gap-3 px-5 py-4 rounded-3xl border border-white/15 bg-white/6 backdrop-blur-xl shadow-[0_18px_45px_rgba(12,22,48,0.35)]">
          <p className="text-xs sm:text-sm font-lora text-white/75 leading-relaxed max-w-md">
            Have a memory, blessing, or secret wish for Trisha Mae? Add your letter above and let her feel your love tonight.
          </p>
          <div className="inline-flex items-center gap-2 text-[#9bb4ff] text-[10px] sm:text-xs tracking-[0.38em] uppercase">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Write your wish</span>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
