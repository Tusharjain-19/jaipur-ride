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

  return {
    title: `${attraction.name} Nearest Metro Station & Complete Guide`,
    description: `Calculate the best way to reach ${attraction.name} via Jaipur Metro. Nearest station is ${attraction.stationId} (distance ${attraction.distance_km} km). Check ticket entry fees, timings, and tourist map routes.`,
    keywords: [
      `${attraction.name} nearest metro`,
      `${attraction.name} Jaipur ticket price`,
      `how to reach ${attraction.name} by train`,
      `Jaipur sightseeing nearest station`,
      `Jaipur metro tourism guide`
    ]
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

  // JSON-LD Schema Markup
  const schemaMarkup = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <AttractionDetailsClient attraction={attraction} station={station} related={related} />
    </>
  );
}
