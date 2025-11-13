"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react"
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  })

  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchGuests()
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = guests.filter((guest) => guest.Name.toLowerCase().includes(query))

    setFilteredGuests(filtered)
    setIsSearching(filtered.length > 0)
  }, [searchQuery, guests])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("We couldn’t load the guest constellation. Please try again.")
      }
      const data = await response.json()
      setGuests(data)
    } catch (err: any) {
      console.error("Error fetching guests:", err)
      setError(err?.message || "We couldn’t load the guest constellation. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)

    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
    })

    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""))
    setShowModal(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError("Please let us know if you can join Trisha Mae’s debut.")
      setTimeout(() => setError(null), 5000)
      return
    }

    if (formData.RSVP === "Yes" && (!formData.Guest || parseInt(formData.Guest) < 1)) {
      setError("Let us know how many loved ones are coming with you (at least 1).")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? (formData.Guest || "1") : "0",
          Message: formData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Your RSVP didn’t reach us. Please try again in a moment.")
      }

      setSuccess("Your RSVP is starlit and saved. Thank you!")
      setHasResponded(true)

      window.dispatchEvent(new Event("rsvpUpdated"))

      setTimeout(() => {
        setShowModal(false)
        setSearchQuery("")
        setSelectedGuest(null)
        setSuccess(null)
        fetchGuests()
      }, 3000)
    } catch (err: any) {
      console.error("Error submitting RSVP:", err)
      setError(err?.message || "Your RSVP didn’t reach us. Please try again in a moment.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" })
    setHasResponded(false)
    setError(null)
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Please share your name so we know who to welcome.")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setRequestSuccess(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      })

      if (!response.ok) {
        throw new Error("We couldn’t send your request. Please try again.")
      }

      setRequestSuccess("Your request is on its way. We’ll get back to you shortly!")

      setTimeout(() => {
        setShowRequestModal(false)
        setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
        setSearchQuery("")
        setRequestSuccess(null)
      }, 3000)
    } catch (err: any) {
      console.error("Error submitting request:", err)
      setError(err?.message || "We couldn’t send your request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false)
    setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <Section
      id="guest-list"
      className="relative z-[60] overflow-visible py-16 sm:py-20 md:py-24 lg:py-28 bg-transparent"
    >

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 space-y-3 sm:space-y-4">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] sm:text-xs tracking-[0.48em] uppercase text-[#a7b7ff]/85 ${inter.className}`}
          >
            RSVP & Guestbook
          </div>
          <h2
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_40px_rgba(9,18,46,0.68)]`}
          >
            Reserve Your Place Among the Stars
          </h2>
          <p className={`${inter.className} text-xs sm:text-sm md:text-base text-white/75 max-w-2xl mx-auto leading-relaxed`}>
            Search your name to confirm your seat at Trisha Mae’s grand debut. Every RSVP helps us craft a night that
            shines for her and for you.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 px-2 sm:px-4 md:px-6">
          <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-[#4e6dff]/35 via-[#8ca4ff]/22 to-[#5a7aff]/35 opacity-70" />
          <div className="relative overflow-visible rounded-[30px] border border-white/12 bg-white/12 backdrop-blur-2xl shadow-[0_28px_75px_rgba(10,18,44,0.45)]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-white/6" />
            <div className="relative p-5 sm:p-7 md:p-9 lg:p-10 space-y-6 sm:space-y-8" ref={searchRef}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4e6dff] via-[#7f96ff] to-[#4e6dff] shadow-[0_16px_35px_rgba(42,70,158,0.55)]">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className={`${inter.className} text-[10px] sm:text-xs uppercase tracking-[0.38em] text-white/65`}>
                    Step 1
                  </p>
                  <h3 className={`${playfair.className} text-lg sm:text-xl text-white`}>Find Your Name</h3>
                  <p className={`${inter.className} text-xs sm:text-sm text-white/65`}>
                    Begin typing to see your RSVP details appear.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your name under the midnight sky..."
                    className={`${inter.className} w-full rounded-2xl border border-white/18 bg-white/12 px-12 py-4 text-sm sm:text-base text-white placeholder:text-white/35 shadow-[0_10px_28px_rgba(10,20,48,0.35)] focus:border-white/45 focus:outline-none focus:ring-4 focus:ring-[#8aa1ff]/25 transition-all duration-300`}
                  />
                </div>

                {isSearching && filteredGuests.length > 0 && (
                  <div className="absolute z-50 mt-3 w-full overflow-hidden rounded-2xl border border-white/14 bg-[#060d1f]/92 backdrop-blur-xl shadow-[0_24px_60px_rgba(8,18,44,0.5)]">
                    {filteredGuests.map((guest, index) => (
                      <button
                        key={`${guest.Name}-${index}`}
                        onClick={() => handleSearchSelect(guest)}
                        className="group flex w-full items-center gap-3 px-4 py-4 text-left transition-all duration-300 hover:bg-white/8"
                      >
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4e6dff] via-[#7f96ff] to-[#4e6dff] shadow-[0_12px_28px_rgba(40,68,150,0.45)]">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`${playfair.className} text-sm sm:text-base text-white truncate`}>
                            {guest.Name}
                          </p>
                          {guest.Email && guest.Email !== "Pending" && (
                            <p className={`${inter.className} text-[11px] text-white/60 truncate`}>{guest.Email}</p>
                          )}
                        </div>
                        <Sparkles className="h-4 w-4 text-[#a7b7ff]/60 group-hover:text-[#d6deff] transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery && filteredGuests.length === 0 && (
                  <div className="absolute z-50 mt-3 w-full overflow-hidden rounded-2xl border border-white/14 bg-[#060d1f]/92 backdrop-blur-xl shadow-[0_24px_60px_rgba(8,18,44,0.5)]">
                    <div className="space-y-4 px-5 py-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4e6dff] via-[#7f96ff] to-[#4e6dff] shadow-[0_18px_40px_rgba(28,50,120,0.45)]">
                        <UserPlus className="h-5 w-5 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h4 className={`${playfair.className} text-lg text-white`}>Not seeing your name?</h4>
                        <p className={`${inter.className} text-sm text-white/70`}>
                          Send a request and we’ll make sure you’re part of Trisha Mae’s constellation.
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setRequestFormData({ ...requestFormData, Name: searchQuery })
                          setShowRequestModal(true)
                        }}
                        className="w-full rounded-2xl bg-gradient-to-r from-[#4e6dff] via-[#a0b3ff] to-[#5a7aff] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(18,40,120,0.55)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_26px_55px_rgba(26,52,138,0.6)]"
                      >
                        Send a Joining Request
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/12 bg-[#070f26]/95 shadow-[0_35px_120px_rgba(6,14,40,0.58)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-white/8" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(146,168,255,0.16),transparent_65%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(126,144,255,0.18),transparent_65%)]" />
              </div>

              <div className="relative flex flex-col">
                <div className="relative overflow-hidden bg-gradient-to-r from-[#4e6dff] via-[#7f96ff] to-[#5a7aff] px-5 py-6 sm:px-8 sm:py-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.42em] text-white">
                        RSVP Update
                      </div>
                      <h3 className={`${greatVibes.className} text-3xl sm:text-4xl text-white drop-shadow-lg`}>
                        Hello, {selectedGuest?.Name?.split(" ")[0]}
                      </h3>
                      <p className={`${inter.className} text-sm sm:text-base text-white/85 leading-relaxed`}>
                        Trisha Mae is so excited to celebrate with you. Confirm your sparkle for her grand debut evening.
                      </p>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="rounded-full border border-white/35 bg-white/15 p-2 text-white/80 transition-colors hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative max-h-[70vh] overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
                  {hasResponded ? (
                    <div className="space-y-6 text-center">
                      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white shadow-[0_18px_45px_rgba(18,36,88,0.45)]">
                        <CheckCircle className="h-8 w-8 text-[#9cd6ff]" />
                      </div>
                      <div className="space-y-2">
                        <h4 className={`${playfair.className} text-2xl text-white`}>Your RSVP is on the books!</h4>
                        <p className={`${inter.className} text-sm sm:text-base text-white/70`}>
                          Thank you for letting us know. We can’t wait to celebrate beneath the constellations with you.
                        </p>
                      </div>
                      {selectedGuest?.RSVP === "Yes" && (
                        <div className="mx-auto max-w-sm rounded-2xl border border-white/15 bg-white/10 px-6 py-4">
                          <p className={`${inter.className} text-[11px] uppercase tracking-[0.38em] text-white/60`}>
                            Party Count
                          </p>
                          <p className={`${playfair.className} text-3xl text-white`}>
                            {selectedGuest.Guest || "1"}{" "}
                            {(parseInt(String(selectedGuest.Guest || "1")) || 1) === 1 ? "Guest" : "Guests"}
                          </p>
                        </div>
                      )}
                      {selectedGuest?.Message && selectedGuest.Message.trim() !== "" && (
                        <div className="mx-auto max-w-lg rounded-2xl border border-white/12 bg-white/8 px-6 py-4 text-left">
                          <p className={`${inter.className} text-xs uppercase tracking-[0.32em] text-white/55`}>
                            Your Note for Trisha Mae
                          </p>
                          <p className={`${inter.className} mt-2 text-sm text-white/80 italic`}>
                            “{selectedGuest.Message}”
                          </p>
                        </div>
                      )}
                      <Button
                        onClick={handleCloseModal}
                        className="rounded-2xl bg-gradient-to-r from-[#4e6dff] via-[#a0b3ff] to-[#5a7aff] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(18,42,120,0.55)] transition-transform duration-300 hover:-translate-y-1"
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmitRSVP()
                      }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <label
                          className={`${inter.className} flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/65`}
                        >
                          <Sparkles className="h-4 w-4 text-[#a7b7ff]" />
                          Can you attend?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, RSVP: "Yes" }))}
                            className={`rounded-2xl border px-4 py-5 transition-all ${
                              formData.RSVP === "Yes"
                                ? "border-[#91ffe4]/60 bg-[#0d1e32] text-white shadow-[0_22px_55px_rgba(14,60,110,0.45)]"
                                : "border-white/15 bg-white/6 text-white/70 hover:border-white/30 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <CheckCircle
                                className={`h-5 w-5 ${
                                  formData.RSVP === "Yes" ? "text-[#91ffe4]" : "text-white/45"
                                }`}
                              />
                              <span className={`${playfair.className} text-lg`}>I’ll be there</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                            className={`rounded-2xl border px-4 py-5 transition-all ${
                              formData.RSVP === "No"
                                ? "border-[#ff8aa4]/60 bg-[#1e0d19] text-white shadow-[0_22px_55px_rgba(110,20,60,0.45)]"
                                : "border-white/15 bg-white/6 text-white/70 hover:border-white/30 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <XCircle
                                className={`h-5 w-5 ${
                                  formData.RSVP === "No" ? "text-[#ffb3c4]" : "text-white/45"
                                }`}
                              />
                              <span className={`${playfair.className} text-lg`}>I’ll send my love</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {formData.RSVP === "Yes" && (
                        <div className="space-y-2">
                          <label
                            className={`${inter.className} text-xs uppercase tracking-[0.32em] text-white/65`}
                          >
                            How many are joining you?
                          </label>
                          <input
                            type="number"
                            name="Guest"
                            value={formData.Guest}
                            onChange={handleFormChange}
                            min="1"
                            required
                            className={`${inter.className} w-full rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-4 focus:ring-[#8aa1ff]/20`}
                            placeholder="Enter your guest count"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-white/65`}>
                          Message for Trisha Mae <span className="text-white/40">(optional)</span>
                        </label>
                        <textarea
                          name="Message"
                          value={formData.Message}
                          onChange={handleFormChange}
                          rows={4}
                          className={`${inter.className} w-full rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-4 focus:ring-[#8aa1ff]/20 resize-none`}
                          placeholder="Share a wish or a memory you’ll keep with her."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-white/65`}>
                          Email Address <span className="text-white/40">(optional)</span>
                        </label>
                        <input
                          type="email"
                          name="Email"
                          value={formData.Email}
                          onChange={handleFormChange}
                          className={`${inter.className} w-full rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-4 focus:ring-[#8aa1ff]/20`}
                          placeholder="So we can send updates if we need to."
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full rounded-2xl bg-gradient-to-r from-[#4e6dff] via-[#a0b3ff] to-[#5a7aff] px-5 py-3 text-sm font-semibold text-white shadow-[0_22px_55px_rgba(20,42,120,0.55)] transition-transform duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span>Sending RSVP…</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <Heart className="h-4 w-4" />
                              <span>Submit RSVP</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {success && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#040818]/95 backdrop-blur-xl">
                    <div className="space-y-4 text-center">
                      <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/20 bg-white/12">
                        <CheckCircle className="h-10 w-10 text-[#9cd6ff]" />
                      </div>
                      <h4 className={`${playfair.className} text-2xl text-white`}>Your RSVP is shining bright!</h4>
                      <p className={`${inter.className} text-sm text-white/75`}>
                        Thank you for lighting up Trisha Mae’s celebration. This will close on its own.
                      </p>
                    </div>
                  </div>
                )}

                {error && !success && (
                  <div className="px-5 pb-6 sm:px-8">
                    <div className="rounded-2xl border border-[#ff8aa4]/40 bg-[#2b1222]/70 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-white">
                        <AlertCircle className="h-5 w-5 text-[#ffb3c4]" />
                        <span>{error}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showRequestModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/12 bg-[#070f26]/95 shadow-[0_35px_120px_rgba(6,14,40,0.58)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-white/8" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(146,168,255,0.16),transparent_65%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(126,144,255,0.18),transparent_65%)]" />
              </div>

              <div className="relative flex flex-col">
                <div className="relative overflow-hidden bg-gradient-to-r from-[#5a7aff] via-[#9cb4ff] to-[#5a7aff] px-5 py-6 sm:px-8 sm:py-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.42em] text-white">
                        Join the Celebration
                      </div>
                      <h3 className={`${greatVibes.className} text-3xl sm:text-4xl text-white drop-shadow-lg`}>
                        We’d love to know you
                      </h3>
                      <p className={`${inter.className} text-sm sm:text-base text-white/85 leading-relaxed`}>
                        Share your details and we’ll reach out if we can add you to Trisha Mae’s guest constellation.
                      </p>
                    </div>
                    <button
                      onClick={handleCloseRequestModal}
                      className="rounded-full border border-white/35 bg-white/15 p-2 text-white/80 transition-colors hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="relative max-h-[70vh] overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRequest()
                    }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-white/65`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="Name"
                        value={requestFormData.Name}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                        required
                        className={`${inter.className} w-full rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-4 focus:ring-[#8aa1ff]/20`}
                        placeholder="Tell us who’s hoping to join"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-white/65`}>
                        Email Address <span className="text-white/40">(optional)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={requestFormData.Email}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                        className={`${inter.className} w-full rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-4 focus:ring-[#8aa1ff]/20`}
                        placeholder="Where can we reach you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-white/65`}>
                        Phone Number <span className="text-white/40">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="Phone"
                        value={requestFormData.Phone}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                        className={`${inter.className} w-full rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-4 focus:ring-[#8aa1ff]/20`}
                        placeholder="Add a number if that’s easier"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-white/65`}>
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        name="Guest"
                        value={requestFormData.Guest}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Guest: e.target.value })}
                        min="1"
                        required
                        className={`${inter.className} w-full rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-4 focus:ring-[#8aa1ff]/20`}
                        placeholder="How many will celebrate with you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`${inter.className} text-xs uppercase tracking-[0.32em] text-white/65`}>
                        Tell us a little more <span className="text-white/40">(optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={requestFormData.Message}
                        onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                        rows={4}
                        className={`${inter.className} w-full rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-4 focus:ring-[#8aa1ff]/20 resize-none`}
                        placeholder="Share how you’re connected or what you look forward to most."
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-2xl bg-gradient-to-r from-[#4e6dff] via-[#a0b3ff] to-[#5a7aff] px-5 py-3 text-sm font-semibold text-white shadow-[0_22px_55px_rgba(20,42,120,0.55)] transition-transform duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Sending request…</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Submit Request</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>

                  {requestSuccess && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#040818]/95 backdrop-blur-xl">
                      <div className="space-y-4 text-center">
                        <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/20 bg-white/12">
                          <CheckCircle className="h-10 w-10 text-[#9cd6ff]" />
                        </div>
                        <h4 className={`${playfair.className} text-2xl text-white`}>Request received!</h4>
                        <p className={`${inter.className} text-sm text-white/75`}>
                          We’ll reach out soon and let you know if we can add you to her constellation of guests.
                        </p>
                      </div>
                    </div>
                  )}

                  {error && !requestSuccess && (
                    <div className="px-5 pb-6 sm:px-8">
                      <div className="rounded-2xl border border-[#ff8aa4]/40 bg-[#2b1222]/70 px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <AlertCircle className="h-5 w-5 text-[#ffb3c4]" />
                          <span>{error}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {success && !showModal && !showRequestModal && !requestSuccess && (
          <div className="fixed left-1/2 top-20 z-[90] w-full max-w-md -translate-x-1/2 px-4">
            <div className="rounded-2xl border border-white/18 bg-[#060d1f]/90 px-5 py-4 text-center shadow-[0_25px_65px_rgba(6,14,40,0.5)]">
              <div className="flex items-center justify-center gap-2 text-sm text-white">
                <CheckCircle className="h-5 w-5 text-[#9cd6ff]" />
                <span className={`${inter.className}`}>{success}</span>
              </div>
            </div>
          </div>
        )}

        {error && !showModal && !showRequestModal && !success && !requestSuccess && (
          <div className="fixed left-1/2 top-20 z-[90] w-full max-w-md -translate-x-1/2 px-4">
            <div className="rounded-2xl border border-[#ff8aa4]/45 bg-[#2b1222]/90 px-5 py-4 text-center shadow-[0_25px_65px_rgba(40,10,24,0.45)]">
              <div className="flex items-center justify-center gap-2 text-sm text-white">
                <AlertCircle className="h-5 w-5 text-[#ffb3c4]" />
                <span className={`${inter.className}`}>{error}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

