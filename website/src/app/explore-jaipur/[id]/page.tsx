import React from "react";
import { Metadata } from "next";
import tourismData from "@/data/tourism.json";
import stationsData from "@/data/stations.json";
import AttractionDetailsClient from "@/components/AttractionDetailsClient";

interface Attraction {
  id: string;
  name: string;
  nameHi: string;
  type: string;
  typeHi: string;
  stationId: string;
  distance_km: number;
  walk_time_min: number | null;
  approx_drive_distance_km: number | null;
  approx_drive_time_min: number | null;
  last_mile: boolean;
  entry_fee: string;
  best_time: string;
  maps_link: string;
  image: string;
  summary: string;
  summaryHi: string;
  description: string;
  descriptionHi: string;
}

export async function generateStaticParams() {
  return tourismData.map((att) => ({
    id: att.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const attraction = (tourismData as Attraction[]).find((a) => a.id === id);
  
  if (!attraction) {
    return {
      title: "Attraction Not Found | Jaipur Ride Guide",
    };
  }

  const station = stationsData.find((s) => s.id === attraction.stationId);

  return {
    title: `Nearest Metro Station to ${attraction.name} (Distance & Route)`,
    description: `Find the nearest metro station to ${attraction.name} in Jaipur. Closest JMRC station is ${station?.name} (${attraction.distance_km} km away). Get routes, directions, entry fees, and travel timings.`,
    keywords: [
      `nearest metro station to ${attraction.name.toLowerCase()}`,
      `${attraction.name.toLowerCase()} nearest metro station`,
      `${attraction.name.toLowerCase()} distance from my location`,
      `how to reach ${attraction.name.toLowerCase()} by metro`,
      `${attraction.name} jaipur metro route`,
      `nearest metro to ${attraction.name.toLowerCase()}`,
      `distance to ${attraction.name.toLowerCase()} from metro station`,
      `jaipur me metro se ${attraction.name.toLowerCase()} kaise jaye`,
      `how to reach ${attraction.name} by train`,
      `best metro app jaipur`,
      `jaipur metro app`,
      `jaipur metro best app`,
      `Jaipur sightseeing nearest station`,
      `Jaipur metro tourism guide`
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    alternates: {
      canonical: `https://jaipurride.vercel.app/explore-jaipur/${attraction.id}`,
    },
    openGraph: {
      title: `Nearest Metro Station to ${attraction.name} & Travel Guide`,
      description: `Complete travel guide for visiting ${attraction.name} using Jaipur Metro Pink Line. Nearest station: ${station?.name}.`,
      url: `https://jaipurride.vercel.app/explore-jaipur/${attraction.id}`,
    }
  };
}

export default async function AttractionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const attractions = tourismData as Attraction[];
  const attraction = attractions.find((a) => a.id === id);

  if (!attraction) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="font-heading font-extrabold text-2xl text-foreground">Attraction Not Found</h2>
      </div>
    );
  }

  // Find nearest station info
  const station = stationsData.find((s) => s.id === attraction.stationId);

  // Find related attractions (same type or near same station)
  const related = attractions
    .filter((a) => a.id !== attraction.id && (a.stationId === attraction.stationId || a.type === attraction.type))
    .slice(0, 3);

  // Stop calculations for directions
  const stopIndex: Record<string, number> = {
    "J01": 0, "J02": 1, "J03": 2, "J04": 3, "J05": 4, "J06": 5, "J07": 6, "J08": 7, "J09": 8, "J10": 9, "J11": 10
  };
  const startIdx = 6; // J07 is index 6
  const targetIdx = stopIndex[attraction.stationId] ?? 0;
  const stops = Math.abs(targetIdx - startIdx);
  const directionText = targetIdx > startIdx ? "eastbound towards Badi Chaupar" : "westbound towards Mansarovar";

  // JSON-LD TouristAttraction Schema
  const attractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `https://jaipurride.vercel.app/explore-jaipur/${attraction.id}`,
    "name": attraction.name,
    "description": attraction.summary,
    "image": `https://jaipurride.vercel.app${attraction.image}`,
    "touristType": ["Culture", "History", "Sightseeing", "Tourism"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "location": {
      "@type": "Place",
      "name": attraction.name,
      "hasMap": attraction.maps_link
    },
    "publicAccess": true,
    "offers": {
      "@type": "Offer",
      "price": attraction.entry_fee.toLowerCase().includes("free") ? "0" : attraction.entry_fee.replace(/[^0-9]/g, "") || "100",
      "priceCurrency": "INR"
    }
  };

  // JSON-LD FAQPage Schema for rich snippet listings
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Which is the nearest metro station to ${attraction.name} in Jaipur?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The nearest metro station to ${attraction.name} is ${station?.name} Metro Station (${attraction.stationId}) on the Pink Line. It is located approximately ${attraction.distance_km} km away, which takes about ${attraction.walk_time_min ? `${attraction.walk_time_min} minutes to walk` : `${attraction.approx_drive_time_min} minutes by auto/cab`} from the exit gate.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I reach ${attraction.name} from Jaipur Railway Station using the metro?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can board the Pink Line metro at Jaipur Junction Metro Station (J07) ${directionText}. Travel ${stops} stops and get off at ${station?.name} Metro Station (${attraction.stationId}). From the station, ${attraction.walk_time_min ? `walk ${attraction.distance_km} km` : `take a quick auto/cab`} directly to ${attraction.name}.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the entry ticket price and best time to visit ${attraction.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The entry ticket details for ${attraction.name} are: ${attraction.entry_fee}. The best visiting hours are ${attraction.best_time}.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AttractionDetailsClient attraction={attraction} station={station} related={related} />
    </>
  );
}
