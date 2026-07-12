import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import stationsData from "@/data/stations.json";
import tourismData from "@/data/tourism.json";
import {
  Train,
  Clock,
  Compass,
  MapPin,
  Check,
  ChevronRight,
  Download,
  Activity,
  Calendar,
  Layers,
  ArrowLeft
} from "lucide-react";

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Breadcrumb / Back button */}
      <div>
        <Link
          href="/metro-stations"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-pink hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Stations Directory</span>
        </Link>
      </div>

      {/* Header Info Banner */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 p-8 lg:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-brand-pink/15 text-brand-pink">
              STATION CODE: {station.code}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-foreground/10 text-foreground">
              {station.type}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-500">
              Pink Line
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight leading-tight">
            {station.name} Metro Station
          </h1>
          <p className="text-xl text-foreground/60 font-semibold">{station.nameHi}</p>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end w-full">
          <a
            href={station.location.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-2xl text-sm font-bold shadow-lg shadow-brand-pink/20 transition-all hover:scale-[1.02]"
          >
            <MapPin className="w-4 h-4" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Facilities & Connectivity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Amenities details */}
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
            <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
              <Train className="w-6 h-6 text-brand-pink" />
              <span>Amenities & Facilities</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {station.facilities.map((fac) => (
                <div
                  key={fac}
                  className="flex items-center space-x-3 p-3.5 bg-light-accent dark:bg-navy-card/60 rounded-2xl border border-light-border/40 dark:border-navy-border/20"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connectivity details */}
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
            <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
              <Activity className="w-6 h-6 text-brand-pink" />
              <span>Last Mile Connectivity</span>
            </h2>
            <p className="text-sm text-foreground/60">
              Transport options available outside the station building gates:
            </p>

            <ul className="space-y-3">
              {station.connectivity.map((conn, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-foreground/85">
                  <ChevronRight className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                  <span>{conn}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Schedules & Details */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Train Schedule */}
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
            <h2 className="font-heading font-bold text-xl text-foreground flex items-center space-x-2">
              <Clock className="w-5 h-5 text-brand-pink" />
              <span>Timings & Operation</span>
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2.5 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/60">First Train Departure</span>
                <span className="font-bold text-foreground">{station.timings.firstTrain} AM</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/60">Last Train Departure</span>
                <span className="font-bold text-foreground">{station.timings.lastTrain} PM</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/60">Platforms</span>
                <span className="font-bold text-foreground">{station.platforms} Side Platforms</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-foreground/60">Opened Date</span>
                <span className="font-bold text-foreground">{station.opened} (Phase 1)</span>
              </div>
            </div>
          </div>

          {/* Quick Marketing CTA */}
          <div className="bg-linear-to-br from-navy-dark to-navy-accent text-white rounded-3xl p-6 border border-navy-border shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded bg-brand-pink text-white font-bold text-[9px] uppercase tracking-wider">
                Android Feature Only
              </span>
              <h3 className="font-heading font-bold text-xl leading-snug">
                Never Miss Your Stop Again!
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Download the Jaipur Ride Android app to experience automatic location-based vibrating reminders and offline safety dialers.
              </p>
            </div>
            <Link
              href="/download"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-brand-pink hover:bg-brand-pink-dark rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Android App</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Nearby Sightseeing attractions section */}
      <div className="space-y-6">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground flex items-center space-x-2">
          <Compass className="w-6 h-6 text-brand-pink" />
          <span>Sightseeing Near {station.name}</span>
        </h2>

        {attractions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((att) => (
              <div
                key={att.id}
                className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={att.image}
                    alt={att.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-pink/15 text-brand-pink font-semibold">
                        {att.type}
                      </span>
                      <span className="text-foreground/50">{att.entry_fee}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {att.name}
                    </h3>
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      {att.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-light-border dark:border-navy-border/20 text-xs flex justify-between items-center text-foreground/60 font-semibold">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                      <span>
                        {att.walk_time_min ? `${att.distance_km} km (${att.walk_time_min}m walk)` : `${att.approx_drive_distance_km} km (${att.approx_drive_time_min}m drive)`}
                      </span>
                    </div>
                    <a
                      href={att.maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-pink hover:underline"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-10 border border-light-border dark:border-navy-border/40 text-center text-sm text-foreground/50">
            No major tourist attractions listed within 3 km of this metro station.
          </div>
        )}
      </div>
    </div>
  );
}
