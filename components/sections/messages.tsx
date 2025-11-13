"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Sparkles, PenLine, Send, Heart } from "lucide-react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLScjgd5qPcKEgdroGnL4nPTbWolKyslFDrNJt5Mc_pVEixZGhQ/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Card
        className={`relative w-full border border-white/18 bg-white/12 backdrop-blur-2xl transition-all duration-500 group overflow-hidden rounded-[32px] shadow-[0_32px_75px_rgba(9,17,38,0.45)] ${
          isFocused ? "border-white/35" : "hover:border-white/25"
        } ${isSubmitted ? "animate-[pulse_1.2s_ease-in-out]" : ""}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(146,168,255,0.22),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(146,168,255,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/16 via-white/6 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out" />

        {isSubmitted && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(144,223,126,0.25),transparent_60%)] flex items-center justify-center z-30 pointer-events-none">
            <div className="flex flex-col items-center gap-2 text-white">
              <Sparkles className="h-10 w-10" />
              <p className={`${inter.className} text-sm sm:text-base tracking-[0.4em] uppercase`}>Sent</p>
            </div>
          </div>
        )}

        <CardContent className="relative p-6 sm:p-8 lg:p-10">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-[10px] sm:text-xs tracking-[0.55em] uppercase text-[#9bb4ff]/85 mb-3">Message For The Debutante</p>
            <h3 className={`${greatVibes.className} text-3xl sm:text-4xl text-white drop-shadow-[0_18px_40px_rgba(8,18,46,0.6)] mb-2`}>
              Leave a Starlit Wish
            </h3>
            <p className={`${inter.className} text-xs sm:text-sm text-white/70 tracking-[0.22em] uppercase`}>Every note becomes part of her story</p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-5 sm:space-y-6"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="space-y-2 sm:space-y-3">
              <label className={`${inter.className} block text-[11px] sm:text-sm tracking-[0.4em] uppercase text-white/80 flex items-center gap-2`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border border-white/30 transition-transform ${focusedField === "name" ? "scale-110 bg-white/15" : ""}`}>
                  <PenLine className="h-3 w-3 text-white/80" />
                </span>
                From
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name or nickname"
                  className={`w-full border border-white/22 rounded-2xl py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base ${inter.className} placeholder:text-white/45 transition-all duration-300 bg-white/25 backdrop-blur-lg shadow-[0_14px_32px_rgba(9,17,38,0.28)] hover:shadow-[0_18px_36px_rgba(12,22,45,0.34)] focus:shadow-[0_22px_40px_rgba(14,24,50,0.38)] ${
                    focusedField === "name"
                      ? "border-white/55 focus:border-white/65 focus:ring-4 focus:ring-[#9bb4ff]/30"
                      : "border-white/22 hover:border-white/32"
                  }`}
                />
                {nameValue && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <label className={`${inter.className} block text-[11px] sm:text-sm tracking-[0.4em] uppercase text-white/80 flex items-center gap-2`}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border border-white/30 transition-transform ${focusedField === "message" ? "scale-110 bg-white/15" : ""}`}>
                    <Heart className="h-3 w-3 text-white/75" />
                  </span>
                  Message For Trisha Mae
                </label>
                {messageValue && (
                  <span
                    className={`${inter.className} text-[10px] sm:text-xs tracking-[0.3em] uppercase transition-colors ${
                      messageValue.length > 500 ? "text-rose-300" : "text-white/50"
                    }`}
                  >
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell Trisha Mae what you wish for her eighteenth chapter..."
                  className={`w-full border border-white/22 rounded-3xl min-h-[120px] sm:min-h-[150px] text-sm sm:text-base ${inter.className} placeholder:text-white/45 transition-all duration-300 resize-none bg-white/22 backdrop-blur-xl shadow-[0_16px_36px_rgba(10,18,40,0.3)] hover:shadow-[0_20px_42px_rgba(13,24,52,0.34)] focus:shadow-[0_26px_55px_rgba(16,28,58,0.42)] py-3.5 sm:py-4.5 px-4 sm:px-6 ${
                    focusedField === "message"
                      ? "border-white/55 focus:border-white/65 focus:ring-4 focus:ring-[#9bb4ff]/28"
                      : "border-white/22 hover:border-white/32"
                  }`}
                />
                {messageValue && (
                  <div className="absolute right-3 top-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-[pulse_1.2s_infinite]" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className="w-full bg-gradient-to-r from-[#4e6dff] via-[#7f95ff] to-[#4f6dff] hover:from-[#4e6dff] hover:via-[#9bb4ff] hover:to-[#4f6dff] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-2xl text-sm sm:text-base font-lora font-semibold shadow-[0_18px_40px_rgba(46,79,210,0.35)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_24px_48px_rgba(64,102,225,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group border border-white/25"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-900" />
              
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbzqsFj6fnxe5hZ52r5NRehZsk3Ue3KzsqAqYNvtmf5TVrHMMENDTKN40Yr8k2-Xc5t7/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section id="messages" className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-18 px-2">
          <p className={`${inter.className} text-[10px] sm:text-xs tracking-[0.55em] uppercase text-[#4e6dff]/80 mb-3`}>Words She’ll Keep Forever</p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(10,18,46,0.6)] mb-4`}
          >
            Letters for Trisha Mae
          </h2>
          <h3 className={`${playfair.className} text-lg sm:text-xl lg:text-2xl text-white/90 mb-3`}>Write a wish for her eighteenth chapter</h3>
          <p className={`${inter.className} text-xs sm:text-sm lg:text-base text-white/70 leading-relaxed tracking-[0.2em] max-w-2xl mx-auto px-4`}>
            Pen a note of love, wisdom, or sparkle that Trisha will read long after the candles fade. Every message becomes part of her debut keepsake.
          </p>
        </div>

        {/* Form Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20 px-1 sm:px-0">
          <div className="relative mx-auto w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-[36px] border border-white/12 bg-white/8 backdrop-blur-2xl shadow-[0_28px_65px_rgba(8,16,34,0.45)]">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-stretch">
                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1b2648]/70 via-[#1d2a52]/55 to-transparent" />
                  <Image
                    src="/Couple_img/couple (2).jpg"
                    alt="Portrait of Trisha Mae"
                    fill
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/85">
                    <p className={`${greatVibes.className} text-3xl tracking-wide`}>Trisha Mae</p>
                    <p className={`${inter.className} text-[10px] tracking-[0.5em] uppercase`}>Celebrating 18 years</p>
                  </div>
                </div>
                <div className="relative py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
                  <MessageForm onMessageSent={fetchMessages} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Display Section */}
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4e6dff] to-[#8ea3ff] rounded-full flex items-center justify-center mx-auto shadow-[0_18px_35px_rgba(22,36,84,0.45)]">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-white mb-2 sm:mb-3">
              Keepsakes From Her Constellation
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-white/72 font-lora max-w-2xl mx-auto leading-relaxed">
              Scroll through the sparkling words that loved ones have tucked into Trisha Mae’s debut album of memories.
            </p>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

      </div>
    </Section>
  )
}
