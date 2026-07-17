import React from "react";
import { notFound } from "next/navigation";
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

export default async function StationDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stations = stationsData as Station[];
  const station = stations.find((s) => s.id === id);

  if (!station) {
    notFound();
  }

  // Filter tourist attractions near this station
  const attractions = (tourismData as Attraction[]).filter((a) => a.stationId === station.id);

  return <StationDetailsClient station={station} attractions={attractions} />;
}
