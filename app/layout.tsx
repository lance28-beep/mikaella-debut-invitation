import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter, Imperial_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const imperialScript = Imperial_Script({ subsets: ["latin"], weight: "400", variable: "--font-imperial-script" })

export const metadata: Metadata = {
  title: "Mehai Jeffverly Servanda Debut Celebration | April 19, 2026 | Villa Anaya, Mangatarem",
  description:
    "Join us in celebrating the debut of Mehai Jeffverly Servanda on April 19, 2026 at Villa Anaya, Mangatarem, Pangasinan. A joyful milestone celebration of turning 18.",
  keywords:
    "Mehai Jeffverly Servanda debut celebration, Filipino debut celebration, RSVP, debut celebration gallery, debut celebration message wall, debut celebration invitation, 2026 debut celebrations, debut celebration venues Villa Anaya, Mangatarem, Pangasinan, #MehaiJeffverlyServandaDebutCelebration",
  authors: [
    { name: "Mehai Jeffverly Servanda" },
    { name: "Mehai Jeffverly Servanda" },
  ],
  creator: "Mehai Jeffverly Servanda",
  publisher: "Mehai Jeffverly Servanda",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://mehai-debut-celebration-invitation.vercel.app/"),
  alternates: {
    canonical: "https://mehai-debut-celebration-invitation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Mehai Jeffverly Servanda Debut Celebration | April 19, 2026",
    description:
      "Join us in celebrating the debut of Mehai Jeffverly Servanda on April 19, 2026 at Villa Anaya, Mangatarem, Pangasinan. A joyful milestone celebration of turning 18.",
    url: "https://mehai-debut-celebration-invitation.vercel.app/",
    siteName: "Mehai Jeffverly Servanda Debut Celebration",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://mehai-debut-celebration-invitation.vercel.app/Debutant/placeholder.png?v=1",
        width: 1200,
        height: 630,
        alt: "Mehai Jeffverly Servanda Debut Celebration Invitation - April 19, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehai Jeffverly Servanda Debut Celebration | April 19, 2026",
    description:
      "Join us in celebrating the debut of Mehai Jeffverly Servanda on April 19, 2026 at Villa Anaya, Mangatarem, Pangasinan. A joyful milestone celebration of turning 18.",
    images: ["https://mehai-debut-celebration-invitation.vercel.app/Debutant/placeholder.png?v=1"],
    creator: "@mehaijeffverly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Mehai Jeffverly Servanda Debut Celebration",
      startDate: "2026-04-19T17:30:00+08:00",
      endDate: "2026-04-19T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Villa Anaya",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Daan Kalikasan Road, Brgy. Parian",
            addressLocality: "Mangatarem, Pangasinan",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://mehai-debut-celebration-invitation.vercel.app/Debutant/placeholder.png?v=1"],
      description:
        "Join us in celebrating the debut of Mehai Jeffverly Servanda on April 19, 2026 at Villa Anaya, Mangatarem, Pangasinan. A joyful milestone celebration of turning 18.",
      organizer: {
        "@type": "Person",
        name: "Mehai Jeffverly Servanda",
      },
      offers: {
        "@type": "Offer",
        url: "https://mehai-debut-celebration-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#MehaiJeffverlyServandaDebutCelebration",
    }),
    "image": "https://mehai-debut-celebration-invitation.vercel.app/Debutant/placeholder.png?v=1",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#6A239E" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} ${imperialScript.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
