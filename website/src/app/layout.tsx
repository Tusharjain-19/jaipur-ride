import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import seoDb from "@/data/seo-knowledge-base.json";


export const metadata: Metadata = {
  title: {
    default: "Jaipur Ride | Jaipur Metro Route Planner & Travel Guide",
    template: "%s | Jaipur Ride Metro Guide",
  },
  description: "Calculate the best metro route in Jaipur. Get live ticket fares, timings, schedules, interactive Pink Line station maps, nearby tourist monuments (Hawa Mahal, City Palace), local markets, and travel tips.",
  keywords: [
    "Jaipur Metro",
    "Metro Route Jaipur",
    "Jaipur Travel Guide",
    "Things to do in Jaipur",
    "Places near Jaipur Metro",
    "Best Metro Route Jaipur",
    "Jaipur Tourist Guide",
    "Jaipur Local Guide",
    "Jaipur Metro Stations",
    "Jaipur Metro Timings",
    "Jaipur Metro Fare Calculator",
    "Pink City Transit",
    "Rajasthan Tourism Metro Route",
    "Sindhi Camp Bus Stand Metro",
    "Jaipur Railway Station Metro",
    "Hawa Mahal nearest station",
    "City Palace metro connectivity",
    "Johari Bazaar shopping metro",
    "JMRC Pink Line guides",
    "Sitapura to Ambabari Metro Phase 2"
  ],
  metadataBase: new URL("https://jaipurride.vercel.app"),
  alternates: {
    canonical: "/",
  },
  other: {
    "google-site-verification": "XZVEE03vf-otD9SoWv7imPWO1N1UxZYtBlnYekxD6fo",
  },
  openGraph: {
    title: "Jaipur Ride | Jaipur Metro Route Planner & Travel Guide",
    description: "Navigate the historic Pink City with Jaipur Metro companion guide. Find stations, compute smart card ticket fares, check operational schedules, and plan walking routes to local sightseeing spots.",
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
    title: "Jaipur Ride | Jaipur Metro Route Planner & Travel Guide",
    description: "Calculate your best metro route in Jaipur. Fast, responsive, offline-first companion transit app for Android & Web.",
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
      },
      {
        "@type": "Dataset",
        "@id": "https://jaipurride.vercel.app/#seo-dataset",
        "name": "Jaipur Ride Travel Directory & Semantic Search Index",
        "description": "A comprehensive local transit and tourism database mapping all Jaipur Metro Pink Line stations (Mansarovar to Badi Chaupar) to historical monuments, cafes, shopping markets, hotels, hospitals, and educational facilities in the Pink City.",
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "creator": {
          "@type": "Organization",
          "name": "Jaipur Ride"
        },
        "hasPart": [
          {
            "@type": "CreativeWork",
            "name": "Long-tail Travel Search Terms",
            "description": seoDb.data.longTailKeywords.slice(0, 15).join(", ")
          },
          {
            "@type": "CreativeWork",
            "name": "Voice Assistant Prompts",
            "description": seoDb.data.voiceSearch.slice(0, 15).join(", ")
          },
          {
            "@type": "CreativeWork",
            "name": "Alternate Transit Terms",
            "description": seoDb.data.synonyms.slice(0, 15).join(", ")
          }
        ]
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('jaipur-ride-theme');
                if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
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
