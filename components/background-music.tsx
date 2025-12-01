"use client"

import { useEffect, useRef } from "react"

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    const removeInteractionListeners = () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }

    const handleUserInteraction = () => {
      audioEl
        .play()
        .then(removeInteractionListeners)
        .catch((error) => {
          console.log("Playback blocked:", error)
        })
    }

    const setupUserInteraction = () => {
      document.addEventListener("click", handleUserInteraction)
      document.addEventListener("touchstart", handleUserInteraction)
    }

    const tryAutoplay = () => {
      audioEl.play().catch((error) => {
        console.log(
          "Autoplay blocked, waiting for user interaction:",
          error,
        )
        setupUserInteraction()
      })
    }

    tryAutoplay()

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
      removeInteractionListeners()
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      src={encodeURI(
        "/background_music/Barbie - 12 Dancing Princesses (Theme) [Audio]  Barbie in the 12 Dancing Princesses.mp3",
      )}
      loop
      preload="auto"
      playsInline
      style={{ display: "none" }}
    />
  )
}

export default BackgroundMusic


