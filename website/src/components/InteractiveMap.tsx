"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import stationsData from "@/data/stations.json";
import { Search, Train, Info, MapPin, ArrowRight, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

// Coordinate mappings for SVG layout (viewBox 0 0 1000 350)
const stationCoordinates: Record<string, { x: number; y: number }> = {
  J01: { x: 80, y: 120 },    // Mansarovar (Elevated)
  J02: { x: 160, y: 120 },   // New Aatish Market (Elevated)
  J03: { x: 240, y: 120 },   // Vivek Vihar (Elevated)
  J04: { x: 320, y: 120 },   // Shyam Nagar (Elevated)
  J05: { x: 400, y: 120 },   // Ram Nagar (Elevated)
  J06: { x: 480, y: 120 },   // Civil Lines (Elevated)
  J07: { x: 560, y: 120 },   // Railway Station (Elevated)
  J08: { x: 640, y: 120 },   // Sindhi Camp (Elevated Interchange Node)
  J09: { x: 730, y: 180 },   // Chandpole (Transition to Underground)
  J10: { x: 820, y: 240 },   // Chhoti Chaupar (Underground)
  J11: { x: 910, y: 240 }    // Badi Chaupar (Underground)
};

export default function InteractiveMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState("J08"); // Default to Sindhi Camp
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const stations = stationsData as Station[];

  // Filter stations based on search query
  const filteredStations = useMemo(() => {
    if (!searchQuery.trim()) return stations;
    const query = searchQuery.toLowerCase();
    return stations.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.nameHi.includes(query) ||
        s.code.toLowerCase().includes(query)
    );
  }, [searchQuery, stations]);

  const selectedStation = useMemo(() => {
    return stations.find((s) => s.id === selectedId) || stations[7];
  }, [selectedId, stations]);

  // Is matching search
  const isHighlighted = (id: string) => {
    if (!searchQuery.trim()) return false;
    return filteredStations.some((s) => s.id === id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white dark:bg-navy-dark rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none">
      {/* Sidebar - search & details */}
      <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-foreground/45" />
            <input
              type="text"
              placeholder="Search station (e.g. Sindhi Camp)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-light-accent dark:bg-navy-card border border-light-border dark:border-navy-border/40 rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors text-foreground"
            />
          </div>

          <div className="text-xs text-foreground/60 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-pink inline-block"></span>
            <span>Pink Line (Mansarovar ↔ Badi Chaupar)</span>
            <span className="w-2 h-2 rounded-full border border-dashed border-foreground/60 inline-block ml-4"></span>
            <span>Dashed = Underground</span>
          </div>
        </div>

        {/* Selected Station Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStation.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 bg-light-accent dark:bg-navy-card rounded-2xl p-5 border border-light-border/60 dark:border-navy-border/40 flex flex-col justify-between mt-4"
          >
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-brand-pink/15 text-brand-pink mb-2">
                    {selectedStation.code}
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    {selectedStation.name}
                  </h3>
                  <p className="text-sm text-foreground/65 font-medium">
                    {selectedStation.nameHi}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-foreground/10 text-foreground">
                    {selectedStation.type}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 my-6 text-sm">
                <div>
                  <p className="text-foreground/50 text-xs">First Train</p>
                  <p className="font-semibold text-foreground">{selectedStation.timings.firstTrain} AM</p>
                </div>
                <div>
                  <p className="text-foreground/50 text-xs">Last Train</p>
                  <p className="font-semibold text-foreground">{selectedStation.timings.lastTrain} PM</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-foreground/50 mb-2">Facilities</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStation.facilities.slice(0, 4).map((fac) => (
                    <span
                      key={fac}
                      className="text-xs px-2 py-1 bg-white dark:bg-navy-accent/25 border border-light-border dark:border-navy-border/20 rounded-lg text-foreground/80"
                    >
                      {fac}
                    </span>
                  ))}
                  {selectedStation.facilities.length > 4 && (
                    <span className="text-xs px-2 py-1 bg-white dark:bg-navy-accent/25 border border-light-border dark:border-navy-border/20 rounded-lg text-foreground/50">
                      +{selectedStation.facilities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                href={`/metro-stations/${selectedStation.id}`}
                className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-xl text-xs font-semibold transition-all hover:scale-[1.02]"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Station Info</span>
              </Link>
              <a
                href={selectedStation.location.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-light-bg dark:bg-navy-accent/30 hover:bg-light-border dark:hover:bg-navy-accent text-foreground rounded-xl text-xs font-semibold transition-all border border-light-border dark:border-navy-border/40"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                <span>Google Maps</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SVG Canvas Map */}
      <div className="lg:col-span-2 relative flex items-center justify-center bg-light-bg/50 dark:bg-navy-deep/40 rounded-2xl overflow-x-auto min-h-[300px] border border-light-border dark:border-navy-border/20 p-4">
        <svg
          viewBox="0 0 1000 350"
          className="w-full min-w-[700px] h-auto select-none"
        >
          {/* Background grid markings for modern layout */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-navy-border/20" />
            </pattern>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="1000" height="350" fill="url(#grid)" className="opacity-70" />

          {/* Connection Lines (Pink line track) */}
          {/* Elevated section path (Mansarovar J01 to Sindhi Camp J08) */}
          <path
            d="M 80 120 H 640"
            fill="none"
            stroke="#EC4899"
            strokeWidth="8"
            strokeLinecap="round"
            className="drop-shadow-[0_2px_8px_rgba(236,72,153,0.3)]"
          />
          {/* Underground transition path (Sindhi Camp J08 to Badi Chaupar J11) */}
          <path
            d="M 640 120 C 680 120, 690 180, 730 180 C 770 180, 780 240, 820 240 H 910"
            fill="none"
            stroke="#EC4899"
            strokeWidth="8"
            strokeDasharray="10 8"
            strokeLinecap="round"
            className="drop-shadow-[0_2px_8px_rgba(236,72,153,0.3)]"
          />

          {/* Station Labels and Circles */}
          {stations.map((st, idx) => {
            const coords = stationCoordinates[st.id] || { x: 0, y: 0 };
            const isSelected = selectedId === st.id;
            const isHovered = hoveredId === st.id;
            const isSearched = isHighlighted(st.id);
            const isEven = idx % 2 === 0;

            return (
              <g
                key={st.id}
                className="cursor-pointer"
                onClick={() => setSelectedId(st.id)}
                onMouseEnter={() => setHoveredId(st.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Search pulse glow */}
                {isSearched && (
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="24"
                    fill="none"
                    stroke="#EC4899"
                    strokeWidth="2"
                    className="animate-ping"
                  />
                )}

                {/* Animated Outer Ring (selection / hover) */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isSelected ? "18" : isHovered ? "15" : "0"}
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="2"
                  className="transition-all duration-300 ease-out opacity-75"
                />

                {/* Inner Core Circle */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isSelected ? "9" : isHovered ? "8" : "6"}
                  fill={isSelected ? "#EC4899" : "#FFFFFF"}
                  stroke={isSelected ? "#FFFFFF" : "#EC4899"}
                  strokeWidth={isSelected ? "2.5" : "3.5"}
                  className="transition-all duration-300 shadow-md dark:shadow-none"
                  style={isHovered || isSelected ? { filter: "url(#glow)" } : {}}
                />

                {/* Label text */}
                <text
                  x={coords.x}
                  y={isEven ? coords.y - 20 : coords.y + 24}
                  textAnchor="middle"
                  className={`font-heading text-[11px] select-none font-bold transition-colors ${
                    isSelected
                      ? "fill-brand-pink font-extrabold text-[12px]"
                      : isSearched
                      ? "fill-amber-500 font-extrabold"
                      : "fill-foreground/90 dark:fill-white/80"
                  }`}
                >
                  {st.name}
                </text>

                {/* Subtext type under */}
                <text
                  x={coords.x}
                  y={isEven ? coords.y + 22 : coords.y - 18}
                  textAnchor="middle"
                  className="font-sans text-[8px] fill-foreground/45 dark:fill-white/35 font-bold"
                >
                  {st.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
