import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoCrawlerIndex from "@/components/SeoCrawlerIndex";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import seoDb from "@/data/seo-knowledge-base.json";

export const metadata: Metadata = {
  title: {
    default: "Jaipur Ride & Jaipur Metro | Route Planner, Timings & Fares",
    template: "%s | Jaipur Metro Guide",
  },
  description: "Calculate the best metro route in Jaipur. Get live ticket fares, timings, schedules, interactive Pink Line station maps, coordinates, nearby tourist monuments (Hawa Mahal, City Palace, Jal Mahal), local markets, and travel tips. Dual domain portal for jaipurride.vercel.app & jaipurmetro.xyz.",
  keywords: [
    "Jaipur Metro",
    "jaipur ride jaipur",
    "jaipur ride",
    "best metro app jaipur",
    "jaipur metro app",
    "best matro app",
    "metro app jaipur",
    "jaipur metr o fare",
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
    "mansarovar metro station jaipur coordinates",
    "mansarovar metro station coordinates jaipur",
    "jaipur railway station to raj mandir cinema distance",
    "jal mahal nearest metro station",
    "jal mahal metro station",
    "metro station near jal mahal",
    "nearest metro to jal mahal",
    "jal mahal transit office hub",
    "jaipur railway station to hawa mahal metro ticket price",
    "jaipur railway station to hawa mahal distance by metro",
    "jaipur junction to hawa mahal metro route",
    "jaipur to hawa mahal metro route",
    "jaipur railway station metro to hawa mahal",
    "jaipur railway station to hawa mahal metro",
    "jaipur railway station to hawa mahal distance",
    "hawa mahal to jaipur railway station",
    "hawa mahal distance from jaipur railway station",
    "jaipur metro app download",
    "one jaipur app",
    "onejaipur app",
    "genuine app",
    "jaipur metro online ticket app",
    "ride metro",
    "jaipur rides",
    "ride 53",
    "badi chaupar metro station to hawa mahal",
    "badi chaupar to hawa mahal",
    "badi chaupar to hawa mahal distance",
    "hawa mahal to badi chaupar distance",
    "badi chaupar se hawa mahal ki duri",
    "jaipur me metro se ghumne ki jagah",
    "jaipur metro fare calculator",
    "jaipur metro ticket price",
    "metro station ticket price",
    "7 fare",
    "jaipur metro price",
    "mansarovar metro station to iskcon temple distance",
    "sindhi camp metro station",
    "sindhi camp to patrika gate distance",
    "sindhi camp to hawa mahal metro",
    "sindhi camp to hawa mahal distance",
    "hawa mahal to sindhi camp",
    "sindhi camp to jhotwara distance",
    "sindhi camp to railway station distance",
    "sindhi camp metro station to jaipur railway station",
    "jaipur railway station to sindhi camp distance",
    "narayan singh circle to sindhi camp",
    "sindhi camp railway station",
    "sindhi camp to ajmeri gate jaipur distance",
    "jpr metro",
    "jaipur metro route",
    "jai metro",
    "jmrc jaipur",
    "jmrc metro",
    "jaipur metro route map",
    "jaipur metro map",
    "jaipur metro station",
    "jaipur metro line map",
    "metro jaipur route",
    "jaipur route",
    "metro route map",
    "jaipur metro timing today",
    "jaipur metro timing",
    "jaipur metro time table",
    "jaipur metro timings",
    "metro time table jaipur",
    "jaipur metro starting time",
    "junction distance from my location",
    "distance from here to railway station",
    "railway station to metro station distance",
    "hawa mahal distance from me",
    "hawa mahal distance",
    "metro station near amer fort",
    "jaipur metro booking",
    "metro card charges",
    "jaipur metro card kaise banaye",
    "jaipur metro parking",
    "jaipur airport nearest metro station",
    "nearest metro station to jaipur airport",
    "hawa mahal to patrika gate distance",
    "gaurav tower",
    "badi chaupar to jal mahal distance",
    "jaipur railway station to rajasthan international centre distance",
    "nearest metro station to mnit jaipur",
    "nearest metro station to sitapura jaipur",
    "nearest metro station to sms hospital jaipur",
    "raja park nearest metro station",
    "metro jaipur mojari",
    "transport nagar to sindhi camp",
    "jal mahal to hawa mahal distance",
    "chandpole metro station",
    "jaipurmetro.xyz",
    "jaipurride.vercel.app"
  ],
  metadataBase: new URL("https://jaipurride.vercel.app"),
  alternates: {
    canonical: "./",
    languages: {
      "en-IN": "https://jaipurride.vercel.app",
      "hi-IN": "https://jaipurmetro.xyz",
    },
  },
  other: {
    "google-site-verification": "XZVEE03vf-otD9SoWv7imPWO1N1UxZYtBlnYekxD6fo",
    "geo.position": "26.9124;75.7873",
    "geo.placename": "Jaipur, Rajasthan, India",
    "geo.region": "IN-RJ",
    "ICBM": "26.9124, 75.7873",
    "alias-domain": "https://jaipurmetro.xyz"
  },
  openGraph: {
    title: "Jaipur Ride & Jaipur Metro | Route Planner & Travel Guide",
    description: "Navigate the historic Pink City with Jaipur Metro companion guide. Find stations, compute smart card ticket fares, check operational schedules, lat-long coordinates, and plan walking routes to local sightseeing spots.",
    url: "https://jaipurride.vercel.app",
    siteName: "Jaipur Ride & Jaipur Metro",
    images: [
      {
        url: "/splash.png",
        width: 1200,
        height: 630,
        alt: "Jaipur Ride & Jaipur Metro Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaipur Ride & Jaipur Metro | Route Planner & Travel Guide",
    description: "Calculate your best metro route in Jaipur. Fast, responsive, offline-first companion transit app for Android & Web.",
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
        "@type": "SoftwareApplication",
        "name": "Jaipur Ride",
        "operatingSystem": "Android, Web, PWA",
        "applicationCategory": "TravelApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "The official companion guide app for navigating the Jaipur Metro Pink Line. Supports offline routing, station listings, coordinates, ticket pricing, and tourist guides.",
        "downloadUrl": "https://jaipurride.vercel.app/download"
      },
      {
        "@type": "WebSite",
        "@id": "https://jaipurride.vercel.app/#website",
        "name": "Jaipur Ride & Jaipur Metro Portal",
        "url": "https://jaipurride.vercel.app",
        "sameAs": ["https://jaipurmetro.xyz"]
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
            "description": seoDb.data.longTailQueries.slice(0, 15).join(", ")
          },
          {
            "@type": "CreativeWork",
            "name": "Voice & GEO Search Prompts",
            "description": seoDb.data.geoSearchPrompts.slice(0, 15).join(", ")
          },
          {
            "@type": "CreativeWork",
            "name": "Geo Coordinates Terms",
            "description": seoDb.data.dataMatrixQueries.slice(0, 15).join(", ")
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
        <link rel="alternate" href="https://jaipurmetro.xyz" hrefLang="hi-IN" />
        <link rel="alternate" href="https://jaipurride.vercel.app" hrefLang="en-IN" />
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
          <SeoCrawlerIndex />
          <AppDownloadBanner />
        </Providers>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}


