"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import tourismData from "@/data/tourism.json";
import { useLanguage } from "@/context/LanguageContext";
import { Search, MapPin, Ticket, Clock, Compass, Filter, ExternalLink, ArrowRight } from "lucide-react";

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

export default function ExploreJaipur() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const attractions = tourismData as Attraction[];

  // Get unique attraction types
  const types = useMemo(() => {
    const allTypes = attractions.map((a) => a.type);
    return ["all", ...Array.from(new Set(allTypes))];
  }, [attractions]);

  // Filter based on search query and type
  const filteredAttractions = useMemo(() => {
    return attractions.filter((att) => {
      const matchesSearch =
        att.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.nameHi.includes(searchQuery) ||
        att.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.summaryHi.includes(searchQuery);

      const matchesType = selectedType === "all" || att.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType, attractions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Title */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
          Explore Jaipur Local Sightseeing
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/70">
          Discover historical palaces, fort complexes, traditional bazaars, and temples connected by the Jaipur Metro Pink Line.
        </p>
      </div>

      {/* Filters and Search Panel */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-foreground/45" />
          <input
            type="text"
            placeholder="Search attractions (e.g. Hawa Mahal, Amer Fort)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-light-accent dark:bg-navy-card border border-light-border dark:border-navy-border/40 rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors text-foreground"
          />
        </div>

        {/* Filter categories */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center space-x-1.5 text-xs text-foreground/50 mr-2 whitespace-nowrap">
            <Filter className="w-4 h-4" />
            <span>Category:</span>
          </div>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border capitalize transition-all ${
                selectedType === type
                  ? "bg-brand-pink border-brand-pink text-white"
                  : "border-light-border dark:border-navy-border/40 hover:border-brand-pink/40 text-foreground"
              }`}
            >
              {type === "all" ? "All Places" : type}
            </button>
          ))}
        </div>

      </div>

      {/* Attraction Cards Grid */}
      {filteredAttractions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.map((att) => (
            <div
              key={att.id}
              className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-3xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800">
                <Image
                  src={att.image}
                  alt={att.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Body details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-pink/15 text-brand-pink font-semibold uppercase tracking-wider text-[10px]">
                      {language === "en" ? att.type : att.typeHi}
                    </span>
                    <span className="text-foreground/50 font-medium">Nearest Station: {att.stationId}</span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    {language === "en" ? att.name : att.nameHi}
                  </h3>

                  <p className="text-xs text-foreground/75 leading-relaxed">
                    {language === "en" ? att.description : att.descriptionHi}
                  </p>
                </div>

                {/* Additional metadata */}
                <div className="space-y-3 pt-4 border-t border-light-border dark:border-navy-border/20 text-xs">
                  <div className="flex items-center space-x-2 text-foreground/75">
                    <Ticket className="w-4 h-4 text-brand-pink shrink-0" />
                    <span><strong>Entry Fee:</strong> {att.entry_fee}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-foreground/75">
                    <Clock className="w-4 h-4 text-brand-pink shrink-0" />
                    <span><strong>Best Hours:</strong> {att.best_time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-foreground/75">
                    <MapPin className="w-4 h-4 text-brand-pink shrink-0" />
                    <span>
                      <strong>Proximity:</strong>{" "}
                      {att.walk_time_min
                        ? `${att.distance_km} km (~${att.walk_time_min} min walk)`
                        : `${att.approx_drive_distance_km} km (~${att.approx_drive_time_min} min drive/last-mile)`}
                    </span>
                  </div>
                </div>

                {/* Details & Directions CTA Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Link
                    href={`/explore-jaipur/${att.id}`}
                    className="flex items-center justify-center space-x-1 px-3 py-2.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-xl text-[11px] font-bold transition-all shadow-sm hover:scale-[1.02]"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <a
                    href={att.maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1 px-3 py-2.5 bg-light-accent hover:bg-light-border dark:bg-navy-card dark:hover:bg-navy-accent text-foreground rounded-xl text-[11px] font-bold transition-all border border-light-border dark:border-navy-border/40"
                  >
                    <ExternalLink className="w-3 h-3 text-brand-pink" />
                    <span>Map Directions</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-navy-dark rounded-3xl p-12 border border-light-border dark:border-navy-border/40 text-center space-y-3">
          <Compass className="w-12 h-12 text-foreground/20 mx-auto animate-spin" />
          <h3 className="font-heading font-bold text-lg text-foreground">No places match search</h3>
          <p className="text-sm text-foreground/60 max-w-sm mx-auto">
            Try adjusting search text filters to explore other heritage sights.
          </p>
        </div>
      )}
    </div>
  );
}
