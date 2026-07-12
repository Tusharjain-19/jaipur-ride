"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import stationsData from "@/data/stations.json";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Train, Clock, Compass, MapPin, Eye, Filter } from "lucide-react";

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

export default function StationsDirectory() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Elevated" | "Underground">("all");

  const stations = stationsData as Station[];

  const filteredStations = useMemo(() => {
    return stations.filter((st) => {
      const matchesSearch =
        st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.nameHi.includes(searchQuery) ||
        st.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterType === "all" || st.type === filterType;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType, stations]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Title */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
          Jaipur Metro Stations Guide
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/70">
          Complete directory of all 11 stations along the Pink Line. Browse layout types, facilities, timings, and tourist links.
        </p>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-foreground/45" />
          <input
            type="text"
            placeholder="Search stations (e.g. Mansarovar, Chandpole)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-light-accent dark:bg-navy-card border border-light-border dark:border-navy-border/40 rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors text-foreground"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center space-x-1.5 text-xs text-foreground/50 mr-2 whitespace-nowrap">
            <Filter className="w-4 h-4" />
            <span>Filter Type:</span>
          </div>
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              filterType === "all"
                ? "bg-brand-pink border-brand-pink text-white"
                : "border-light-border dark:border-navy-border/40 hover:border-brand-pink/40 text-foreground"
            }`}
          >
            All Stations
          </button>
          <button
            onClick={() => setFilterType("Elevated")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              filterType === "Elevated"
                ? "bg-brand-pink border-brand-pink text-white"
                : "border-light-border dark:border-navy-border/40 hover:border-brand-pink/40 text-foreground"
            }`}
          >
            Elevated
          </button>
          <button
            onClick={() => setFilterType("Underground")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              filterType === "Underground"
                ? "bg-brand-pink border-brand-pink text-white"
                : "border-light-border dark:border-navy-border/40 hover:border-brand-pink/40 text-foreground"
            }`}
          >
            Underground
          </button>
        </div>

      </div>

      {/* Grid List */}
      {filteredStations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((st) => (
            <div
              key={st.id}
              className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-brand-pink/15 text-brand-pink mb-3">
                      {st.code}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-foreground/10 text-foreground">
                      {st.type}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-brand-pink transition-colors">
                    {language === "en" ? st.name : st.nameHi}
                  </h3>
                  <p className="text-xs text-foreground/50 font-medium">
                    {language === "en" ? st.nameHi : st.name}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-light-border dark:border-navy-border/20 text-xs">
                  {/* Timings */}
                  <div className="flex items-center space-x-2 text-foreground/70">
                    <Clock className="w-4 h-4 text-brand-pink" />
                    <span>
                      Timings: {st.timings.firstTrain} AM - {st.timings.lastTrain} PM
                    </span>
                  </div>

                  {/* Facilities */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-foreground/45 uppercase tracking-wider font-bold">Top Amenities</p>
                    <div className="flex flex-wrap gap-1">
                      {st.facilities.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="px-2 py-0.5 bg-light-accent dark:bg-navy-card/60 border border-light-border/40 dark:border-navy-border/20 rounded text-[10px] text-foreground/75"
                        >
                          {f}
                        </span>
                      ))}
                      {st.facilities.length > 3 && (
                        <span className="px-2 py-0.5 bg-light-accent dark:bg-navy-card/60 rounded text-[10px] text-foreground/40">
                          +{st.facilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-light-accent/40 dark:bg-navy-card/30 border-t border-light-border dark:border-navy-border/20 grid grid-cols-2 gap-3">
                <Link
                  href={`/metro-stations/${st.id}`}
                  className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-xl text-xs font-semibold transition-all hover:scale-[1.02]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Link>
                <a
                  href={st.location.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-white dark:bg-navy-card hover:bg-light-accent dark:hover:bg-navy-accent/50 text-foreground rounded-xl text-xs font-semibold transition-all border border-light-border dark:border-navy-border/40"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-navy-dark rounded-3xl p-12 border border-light-border dark:border-navy-border/40 text-center space-y-3">
          <Train className="w-12 h-12 text-foreground/20 mx-auto animate-bounce" />
          <h3 className="font-heading font-bold text-lg text-foreground">No stations match search criteria</h3>
          <p className="text-sm text-foreground/60 max-w-sm mx-auto">
            Try adjusting your search filters or spelling to locate Pink Line station directory files.
          </p>
        </div>
      )}
    </div>
  );
}
