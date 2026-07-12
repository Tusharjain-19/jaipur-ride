import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Jaipur Ride — Official Website & Metro Guide",
    template: "%s | Jaipur Ride",
  },
  description: "Plan your Jaipur Metro journey instantly. Official website for Jaipur Ride companion app. Get routes, interactive map, fares, station facilities, and local sightseeing guides.",
  keywords: [
    "Jaipur Metro",
    "Jaipur Metro Route",
    "Jaipur Metro Fare",
    "Jaipur Metro App",
    "Jaipur Metro Map",
    "Jaipur Metro Stations",
    "Jaipur Metro Timings",
    "Jaipur Tourism",
    "Jaipur Metro Phase 2",
    "Jaipur Ride",
    "Metro Jaipur",
    "Route Planner Jaipur",
  ],
  metadataBase: new URL("https://jaipurride.vercel.app"),
  alternates: {
    canonical: "/",
  },
  other: {
    "google-site-verification": "XZVEE03vf-otD9SoWv7imPWO1N1UxZYtBlnYekxD6fo",
  },
  openGraph: {
    title: "Jaipur Ride — Official Website & Metro Guide",
    description: "Navigate the Jaipur Metro Pink Line with ease. Compute fares, view interactive route maps, find stations, and explore historic places near you.",
    url: "https://jaipurride.vercel.app",
    siteName: "Jaipur Ride",
    images: [
      {
        url: "/splash.png",
        width: 1200,
        height: 630,
        alt: "Jaipur Ride Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaipur Ride — Official Website & Metro Guide",
    description: "Plan your Jaipur Metro journey instantly. Fast, responsive, offline-first companion app.",
    images: ["/splash.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Jaipur Ride",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Jaipur Ride",
        "operatingSystem": "Android",
        "applicationCategory": "TravelApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "The official companion guide app for navigating the Jaipur Metro Pink Line. Supports offline routing, station listings, and tourist guides.",
        "downloadUrl": "https://jaipurride.vercel.app/download"
      },
      {
        "@type": "WebSite",
        "name": "Jaipur Ride",
        "url": "https://jaipurride.vercel.app"
      }
    ]
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-light-bg dark:bg-navy-deep text-foreground font-sans selection:bg-brand-pink/30 selection:text-brand-pink">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
