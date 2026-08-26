import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoCrawlerIndex from "@/components/SeoCrawlerIndex";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Jaipur Metro Route, Map, Timings & Fare Guide | Jaipur Ride",
    template: "%s | Jaipur Metro Guide & Route Planner",
  },
  description: "Official Jaipur Metro travel portal & guide. Check Pink Line route map, station list, first/last train timings, ticket fares, smart card discounts, and nearest metro stations to Hawa Mahal, City Palace & Jaipur Railway Station.",
  keywords: [
    "Jaipur Metro",
    "Jaipur Metro Route",
    "Jaipur Metro Map",
    "Jaipur Metro Timings",
    "Jaipur Metro Fare",
    "Jaipur Metro Stations",
    "Jaipur Metro Ticket Price",
    "Jaipur Railway Station to Hawa Mahal Metro",
    "Nearest Metro Station to Hawa Mahal",
    "Jaipur Metro App",
    "Jaipur Ride"
  ],
  metadataBase: new URL("https://jaipurride.vercel.app"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://jaipurride.vercel.app",
  },
  other: {
    "google-site-verification": "XZVEE03vf-otD9SoWv7imPWO1N1UxZYtBlnYekxD6fo",
    "geo.position": "26.9124;75.7873",
    "geo.placename": "Jaipur, Rajasthan, India",
    "geo.region": "IN-RJ",
    "ICBM": "26.9124, 75.7873"
  },
  openGraph: {
    title: "Jaipur Metro Route, Map, Timings & Fare Guide | Jaipur Ride",
    description: "Navigate Jaipur with ease. Access complete Pink Line station schedules, fare matrix, route planning, and tourist landmark directions.",
    url: "https://jaipurride.vercel.app",
    siteName: "Jaipur Ride - Jaipur Metro Transit Guide",
    images: [
      {
        url: "/splash.png",
        width: 1200,
        height: 630,
        alt: "Jaipur Ride Jaipur Metro Guide",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaipur Metro Route, Map, Timings & Fare Guide | Jaipur Ride",
    description: "Find Jaipur Metro stations, route map, ticket price, timings today, and travel guide.",
    images: ["/splash.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Jaipur Ride Metro",
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
        "@type": "WebSite",
        "@id": "https://jaipurride.vercel.app/#website",
        "name": "Jaipur Ride",
        "url": "https://jaipurride.vercel.app",
        "description": "Comprehensive guide for Jaipur Metro Pink Line routes, station timings, ticket fares, map, and tourist attractions."
      },
      {
        "@type": "SoftwareApplication",
        "name": "Jaipur Ride",
        "operatingSystem": "Android, Web, PWA",
        "applicationCategory": "TravelApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Companion guide app for navigating Jaipur Metro Pink Line with offline routing, station listings, ticket pricing, and tourist guides."
      }
    ]
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="XZVEE03vf-otD9SoWv7imPWO1N1UxZYtBlnYekxD6fo" />
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Jaipur, Rajasthan, India" />
        <meta name="geo.position" content="26.9124;75.7873" />
        <meta name="ICBM" content="26.9124, 75.7873" />
        <meta name="keywords" content="Jaipur Ride, best metro app jaipur, best metro app, jaipur metro best app, jaipur metro app, geo map jaipur metro, route planner" />
        <link rel="alternate" href="https://jaipurmetro.xyz" hrefLang="hi-IN" />
        <link rel="alternate" href="https://jaipurride.vercel.app" hrefLang="en-IN" />
        <Script
          id="google-preferred-sources-lib"
          src="https://www.gstatic.com/s2/preferred-sources/v1/preferred-sources.js"
          strategy="afterInteractive"
          async
        />
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('jaipur-ride-theme');
                if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-light-bg dark:bg-navy-deep text-foreground font-sans selection:bg-brand-pink/30 selection:text-brand-pink">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <SeoCrawlerIndex />
          <AppDownloadBanner />
        </Providers>
        <Analytics />
        <Script
          id="json-ld-layout"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}


