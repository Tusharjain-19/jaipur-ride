import React from "react";
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

  return <AttractionDetailsClient attraction={attraction} station={station} related={related} />;
}
