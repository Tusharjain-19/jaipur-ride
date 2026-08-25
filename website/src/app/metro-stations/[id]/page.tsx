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
    title: `${station.name} Metro Station Jaipur: Timings, Route & Facilities`,
    description: `Complete guide for ${station.name} Metro Station (${station.code}) on Pink Line Jaipur. Timings: ${station.timings.firstTrain} AM to ${station.timings.lastTrain} PM. Check platform directions, facilities, coordinates & nearby tourist places.`,
    keywords: [
      `${station.name} metro station`,
      `${station.name} metro station jaipur`,
      `${station.name} metro station timing`,
      `${station.name} metro station route`,
      `${station.name} metro station facilities`,
      `places near ${station.name} metro station`,
      `Jaipur Metro Pink Line`
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
      canonical: `https://jaipurride.vercel.app/metro-stations/${station.id}`,
    },
    openGraph: {
      title: `${station.name} Metro Station Jaipur: Timings, Route & Facilities`,
      description: `${station.name} Metro Station (Code: ${station.code}). Operational timings: ${station.timings.firstTrain} AM to ${station.timings.lastTrain} PM. Coordinates: ${station.location.lat}, ${station.location.lon}.`,
      url: `https://jaipurride.vercel.app/metro-stations/${station.id}`,
    }
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

  // JSON-LD SubwayStation Schema
  const subwaySchema = {
    "@context": "https://schema.org",
    "@type": "SubwayStation",
    "@id": `https://jaipurride.vercel.app/metro-stations/${station.id}`,
    "name": `${station.name} Metro Station`,
    "alternateName": `${station.nameHi} मेट्रो स्टेशन`,
    "identifier": station.code,
    "description": `${station.name} Metro Station is a ${station.type.toLowerCase()} station on Jaipur Metro Pink Line with ${station.platforms} platforms. Features: ${station.facilities.join(", ")}.`,
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

  // JSON-LD FAQPage Schema for station page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the first and last train time at ${station.name} Metro Station?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The first train arrives at ${station.name} Metro Station at ${station.timings.firstTrain} AM and the last train departs at ${station.timings.lastTrain} PM daily.`
        }
      },
      {
        "@type": "Question",
        "name": `What facilities are available at ${station.name} Metro Station?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${station.name} Metro Station offers facilities including ${station.facilities.join(", ")}.`
        }
      },
      {
        "@type": "Question",
        "name": `Which tourist places are near ${station.name} Metro Station?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": attractions.length > 0 
            ? `Popular places near ${station.name} Metro Station include ${attractions.map(a => a.name).join(", ")}.`
            : `${station.name} Metro Station provides convenient transit connections to Jaipur's major hubs.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(subwaySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StationDetailsClient station={station} attractions={attractions} />
    </>
  );
}
