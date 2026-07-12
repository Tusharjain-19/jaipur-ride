import React from "react";
import Image from "next/image";
import Link from "next/link";
import tourismData from "@/data/tourism.json";
import stationsData from "@/data/stations.json";
import { ArrowLeft, Ticket, Clock, MapPin, Compass, ExternalLink, Train } from "lucide-react";

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
        <Link href="/explore-jaipur" className="text-brand-pink font-bold flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Directory</span>
        </Link>
      </div>
    );
  }

  // Find nearest station info
  const station = stationsData.find((s) => s.id === attraction.stationId);

  // Find related attractions (same type or near same station)
  const related = attractions
    .filter((a) => a.id !== attraction.id && (a.stationId === attraction.stationId || a.type === attraction.type))
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-8">
      
      {/* Back button */}
      <div>
        <Link
          href="/explore-jaipur"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-foreground/60 hover:text-brand-pink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Directory</span>
        </Link>
      </div>

      {/* Main Attraction Header Card */}
      <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-3xl overflow-hidden shadow-xl">
        
        {/* Banner Image */}
        <div className="relative h-64 sm:h-96 w-full bg-slate-100 dark:bg-slate-800">
          <Image
            src={attraction.image}
            alt={attraction.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1 bg-brand-pink text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {attraction.type}
            </span>
          </div>
        </div>

        {/* Text Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground">
              {attraction.name}
            </h1>
            <p className="text-lg font-semibold text-foreground/50">{attraction.nameHi}</p>
          </div>

          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
            {attraction.description}
          </p>

          <p className="text-sm text-foreground/70 leading-relaxed italic border-l-2 border-brand-pink/50 pl-3">
            {attraction.descriptionHi}
          </p>

          {/* Timing & Price Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-light-border dark:border-navy-border/20 text-sm">
            
            {/* Box 1: Fee */}
            <div className="p-4 bg-light-accent dark:bg-navy-card/50 rounded-2xl border border-light-border dark:border-navy-border/30 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-foreground/50 font-bold uppercase tracking-wider">
                <Ticket className="w-4 h-4 text-brand-pink" />
                <span>Ticket Price</span>
              </div>
              <p className="font-bold text-foreground truncate">{attraction.entry_fee}</p>
            </div>

            {/* Box 2: Hours */}
            <div className="p-4 bg-light-accent dark:bg-navy-card/50 rounded-2xl border border-light-border dark:border-navy-border/30 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-foreground/50 font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-brand-pink" />
                <span>Best Visit Hours</span>
              </div>
              <p className="font-bold text-foreground truncate">{attraction.best_time}</p>
            </div>

            {/* Box 3: Proximity */}
            <div className="p-4 bg-light-accent dark:bg-navy-card/50 rounded-2xl border border-light-border dark:border-navy-border/30 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-foreground/50 font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-brand-pink" />
                <span>Metro Distance</span>
              </div>
              <p className="font-bold text-foreground truncate">
                {attraction.walk_time_min 
                  ? `${attraction.distance_km} km (~${attraction.walk_time_min}m walk)`
                  : `${attraction.approx_drive_distance_km} km (~${attraction.approx_drive_time_min}m drive)`}
              </p>
            </div>

          </div>

          {/* Action links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-light-border dark:border-navy-border/20">
            {station && (
              <Link
                href={`/metro-stations/${station.id}`}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-xl text-xs font-bold transition-all hover:scale-102"
              >
                <Train className="w-4 h-4" />
                <span>View {station.name} Station Amenities</span>
              </Link>
            )}

            <a
              href={attraction.maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-light-accent hover:bg-light-border dark:bg-navy-card dark:hover:bg-navy-accent text-foreground rounded-xl text-xs font-bold transition-all border border-light-border dark:border-navy-border/40"
            >
              <ExternalLink className="w-4 h-4 text-brand-pink" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

        </div>

      </div>

      {/* Related Attractions Section */}
      {related.length > 0 && (
        <div className="space-y-6 pt-4">
          <h2 className="font-heading font-extrabold text-2xl text-foreground flex items-center space-x-2">
            <Compass className="w-5 h-5 text-brand-pink" />
            <span>Other Heritage Spots Nearby</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                href={`/explore-jaipur/${rel.id}`}
                key={rel.id}
                className="group bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-2xl overflow-hidden shadow-sm hover:scale-[1.02] transition-all duration-200"
              >
                <div className="relative h-32 w-full bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={rel.image}
                    alt={rel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <p className="text-[10px] text-brand-pink font-bold uppercase tracking-wider">{rel.type}</p>
                  <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors truncate">
                    {rel.name}
                  </h4>
                  <p className="text-[10px] text-foreground/50">Station: {rel.stationId}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
