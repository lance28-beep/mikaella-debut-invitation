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
        "https://docs.google.com/forms/d/e/1FAIpQLScpNJ-KbBt9iQ43Is8j07aS62kdZAYHJC5xUx7LlQEfbCR4OQ/formResponse",
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
    <div className="relative w-full max-w-lg mx-auto">
      <Card
        className={`relative w-full border border-[#DC96FD]/35 bg-white/85 backdrop-blur-xl transition-all duration-500 group overflow-hidden rounded-[28px] shadow-[0_24px_55px_rgba(23,2,14,0.38)] ${
          isFocused ? "border-[#F5CFA1]" : "hover:border-[#FADDBB]"
        } ${isSubmitted ? "animate-[pulse_1.2s_ease-in-out]" : ""}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFECD3]/50 via-transparent to-[#FDF6EC]/70 opacity-95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(253,244,230,0.8),transparent_60%)] pointer-events-none" />

        {isSubmitted && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(144,223,126,0.25),transparent_60%)] flex items-center justify-center z-30 pointer-events-none">
            <div className="flex flex-col items-center gap-2 text-white">
              <Sparkles className="h-10 w-10" />
              <p className={`${inter.className} text-sm sm:text-base tracking-[0.4em] uppercase`}>Sent</p>
            </div>
          </div>
        )}

        <CardContent className="relative p-5 sm:p-6 lg:p-8">
          <div className="text-center mb-5 sm:mb-7 space-y-2.5">
            <p className="text-[10px] sm:text-xs tracking-[0.55em] uppercase text-[#372847]/70">
              Message For The Debutante
            </p>
            <h3 className={`${greatVibes.className} text-3xl sm:text-4xl text-[#372847]`}>
              Leave a Gilded Wish
            </h3>
            <p className={`${inter.className} text-[11px] sm:text-xs text-[#372847]/70 tracking-[0.22em] uppercase`}>
              Every note becomes part of her story
            </p>
            <div className="flex justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#372847]/55">
              <span>Share</span>
              <span className="text-[#DC96FD]/40">•</span>
              <span>Bless</span>
              <span className="text-[#DC96FD]/40">•</span>
              <span>Send</span>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="space-y-1.5 sm:space-y-2.5">
              <label className={`${inter.className} block text-[11px] sm:text-sm tracking-[0.4em] uppercase text-[#372847]/70 flex items-center gap-2`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border border-[#372847]/30 transition-transform ${focusedField === "name" ? "scale-110 bg-[#372847]/10" : ""}`}>
                  <PenLine className="h-3 w-3 text-[#372847]/70" />
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
                  className={`w-full border border-[#E1B489]/60 rounded-2xl py-2.5 sm:py-3.5 px-4 sm:px-5 text-sm ${inter.className} text-[#372847] placeholder:text-[#5F2B3A]/55 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-[0_8px_20px_rgba(46,4,26,0.12)] hover:shadow-[0_12px_26px_rgba(46,4,26,0.18)] focus:shadow-[0_16px_32px_rgba(46,4,26,0.22)] ${
                    focusedField === "name"
                      ? "border-[#372847]/60 focus:border-[#372847]/70 focus:ring-4 focus:ring-[#372847]/15"
                      : "border-[#E1B489]/60 hover:border-[#372847]/45"
                  }`}
                />
                {nameValue && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2.5">
              <div className="flex items-center justify-between">
                <label className={`${inter.className} block text-[11px] sm:text-sm tracking-[0.4em] uppercase text-[#372847]/70 flex items-center gap-2`}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border border-[#372847]/30 transition-transform ${focusedField === "message" ? "scale-110 bg-[#372847]/10" : ""}`}>
                    <Heart className="h-3 w-3 text-[#372847]/65" />
                  </span>
                  Message For Melai
                </label>
                {messageValue && (
                  <span
                    className={`${inter.className} text-[10px] sm:text-xs tracking-[0.3em] uppercase transition-colors ${
                      messageValue.length > 500 ? "text-rose-300" : "text-[#DC96FD]/50"
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
                  placeholder="Tell Melai what you wish for her eighteenth chapter..."
                  className={`w-full border border-[#E1B489]/60 rounded-[26px] min-h-[100px] sm:min-h-[130px] text-sm ${inter.className} text-[#372847] placeholder:text-[#5F2B3A]/55 transition-all duration-300 resize-none bg-white/90 backdrop-blur-sm shadow-[0_10px_26px_rgba(46,4,26,0.12)] hover:shadow-[0_16px_34px_rgba(46,4,26,0.2)] focus:shadow-[0_20px_42px_rgba(46,4,26,0.26)] py-3 sm:py-4 px-4 sm:px-5 ${
                    focusedField === "message"
                      ? "border-[#372847]/60 focus:border-[#372847]/70 focus:ring-4 focus:ring-[#372847]/15"
                      : "border-[#E1B489]/60 hover:border-[#372847]/45"
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
            <div className="space-y-2.5">
              <Button
                type="submit"
                disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
                className="w-full border border-[#372847]/40 bg-[#372847] text-[#DC96FD] py-2.5 sm:py-3.5 px-5 sm:px-7 rounded-2xl text-sm font-lora font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-[#3f0823] hover:border-[#372847]/60 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
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
              <div className="rounded-2xl border border-[#372847]/30 bg-[#372847]/15 backdrop-blur-sm px-3.5 py-2.5">
                <p className={`${inter.className} text-[10px] sm:text-xs text-[#372847] leading-relaxed text-center font-medium`}>
                  <span className="font-semibold">Tip:</span> speak from the heart—share a favorite memory, a prayer, or a promise to cheer her on.
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const portraitImages = [
    "/Debutant/debutant.png",
    "/Debutant/debutant2.png",
    "/Debutant/flux-pro-2.0_Create_a_“Coming_Soon”_announcement_image_with_an_elegant_debutante_theme._I-0.jpg",
  ]
  const [portraitIndex, setPortraitIndex] = useState(0)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbzGVNgDnjMh3XSl0E2JOAtzgFfsRbzb6rnVNswgVgrsAdzi9iGG8l3sJFidPPADT5L6Iw/exec"
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

  useEffect(() => {
    const timer = setInterval(() => {
      setPortraitIndex((prev) => (prev + 1) % portraitImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [portraitImages.length])

  return (
    <Section id="messages" className="relative overflow-hidden bg-transparent">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-18 px-2">
          <p className={`${inter.className} text-[10px] sm:text-xs tracking-[0.55em] uppercase text-white/80 mb-3`}>
            Words She’ll Keep Forever
          </p>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4`}
          >
            Letters for Melai
          </h2>
          <h3 className={`${playfair.className} text-lg sm:text-xl lg:text-2xl text-white/90 mb-3`}>
            Write a wish for her eighteenth chapter
          </h3>
          <p className={`${inter.className} text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed tracking-[0.2em] max-w-2xl mx-auto px-4`}>
            Send a note woven in wine red and gold—a keepsake Melai will treasure long after the candles fade.
          </p>
        </div>

        {/* Form Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20 px-1 sm:px-0">
          <div className="relative mx-auto w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-[36px] border border-[#DC96FD]/30 bg-transparent shadow-[0_28px_65px_rgba(23,2,14,0.3)]">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-stretch">
                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 bg-transparent" />
                  <div className="relative w-full h-full">
                    <Image
                      key={portraitImages[portraitIndex]}
                      src={portraitImages[portraitIndex]}
                      alt="Portrait of Melai"
                      fill
                      className="object-cover transition-opacity duration-700"
                      priority={false}
                    />
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[#1F1F1F]">
                    <p className={`${greatVibes.className} text-3xl tracking-wide text-[#1F1F1F]`}>Melai</p>
                    <p className={`${inter.className} text-[10px] tracking-[0.5em] uppercase text-[#1F1F1F]/85`}>Eighteen in Crimson & Gold</p>
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
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#372847] to-[#640c35] rounded-full flex items-center justify-center mx-auto shadow-[0_18px_35px_rgba(23,2,14,0.65)]">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-[#DC96FD]" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-white mb-2 sm:mb-3">
              Keepsakes From Her Constellation
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-white/80 font-lora max-w-2xl mx-auto leading-relaxed">
              Scroll through the sparkling words that loved ones have tucked into Melai's debut album of memories.
            </p>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

      </div>
    </Section>
  )
}
