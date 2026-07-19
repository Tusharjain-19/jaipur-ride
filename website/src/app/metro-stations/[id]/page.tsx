import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import stationsData from "@/data/stations.json";
import tourismData from "@/data/tourism.json";
import StationDetailsClient from "@/components/StationDetailsClient";

interface Station {
  id: string;
  name: string;
  nameHi: string;
  code: string;
  lineId: string;
  type: string;
  platforms: number;
  opened: string;
  facilities: string[];
  connectivity: string[];
  timings: { firstTrain: string; lastTrain: string };
  location: { lat: number; lon: number; mapsLink: string };
}

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
}

// Generate static params for Next.js build
export async function generateStaticParams() {
  return stationsData.map((st) => ({
    id: st.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const station = (stationsData as Station[]).find((s) => s.id === id);
  
  if (!station) {
    return {
      title: "Metro Station Not Found | Jaipur Ride Guide",
    };
  }

  return {
    title: `${station.name} Metro Station Timings, Map & Connectivity`,
    description: `Complete guide for ${station.name} Metro Station (JMRC Pink Line). Find first and last train timings (${station.timings.firstTrain} - ${station.timings.lastTrain}), station facilities (${station.facilities.join(", ")}), and nearby tourist places.`,
    keywords: [
      `${station.name} metro station timings`,
      `${station.name} metro route map`,
      `${station.name} station facilities`,
      `nearest metro to ${station.name} Jaipur`,
      `Jaipur metro line stations JMRC`
    ]
  };
}

export default async function StationDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stations = stationsData as Station[];
  const station = stations.find((s) => s.id === id);

  if (!station) {
    notFound();
  }

  // Filter tourist attractions near this station
  const attractions = (tourismData as Attraction[]).filter((a) => a.stationId === station.id);

  // JSON-LD Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SubwayStation",
    "@id": `https://jaipurride.vercel.app/metro-stations/${station.id}`,
    "name": `${station.name} Metro Station`,
    "alternateName": `${station.nameHi} मेट्रो स्टेशन`,
    "identifier": station.code,
    "description": `JMRC Pink Line subway station in Jaipur. Features facilities like ${station.facilities.join(", ")}. Connectivity: ${station.connectivity.join(", ")}.`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": station.location.lat,
      "longitude": station.location.lon
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "opens": station.timings.firstTrain,
      "closes": station.timings.lastTrain,
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <StationDetailsClient station={station} attractions={attractions} />
    </>
  );
}
