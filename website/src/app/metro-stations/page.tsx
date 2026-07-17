"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import stationsData from "@/data/stations.json";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Train, Clock, MapPin, Eye, Filter } from "lucide-react";

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
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Elevated" | "Underground">("all");
  const isEn = language === "en";

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

  const translateFacility = (f: string) => {
    if (isEn) return f;
    const map: Record<string, string> = {
      'Toilets': 'शौचालय',
      'Escalator': 'एस्केलेटर',
      'Elevator': 'लिफ्ट',
      'Ticket Counter': 'टिकट काउंटर',
      'Smart Card Recharge': 'स्मार्ट कार्ड रिचार्ज',
      'Wheelchair Access': 'व्हीलचेयर एक्सेस',
      'Parking': 'पार्किंग'
    };
    let res = f;
    for (let key in map) {
      if (res.includes(key)) res = res.replace(key, map[key]);
    }
    return res;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Title */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
          {isEn ? "Jaipur Metro Stations Guide" : "जयपुर मेट्रो स्टेशन गाइड"}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/70">
          {isEn 
            ? "Complete directory of all 11 stations along the Pink Line. Browse layout types, facilities, timings, and tourist links."
            : "पिंक लाइन के सभी 11 स्टेशनों की विस्तृत सूची। स्टेशन संरचना, सुविधाएं, समय और पर्यटन लिंक देखें।"}
        </p>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-foreground/45" />
          <input
            type="text"
            placeholder={isEn ? "Search stations (e.g. Mansarovar, Chandpole)..." : "स्टेशन खोजें (जैसे मानसरोवर, चांदपोल)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-light-accent dark:bg-navy-card border border-light-border dark:border-navy-border/40 rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors text-foreground"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center space-x-1.5 text-xs text-foreground/50 mr-2 whitespace-nowrap">
            <Filter className="w-4 h-4" />
            <span>{isEn ? "Filter Type:" : "फ़िल्टर प्रकार:"}</span>
          </div>
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filterType === "all"
                ? "bg-brand-pink border-brand-pink text-white"
                : "border-light-border dark:border-navy-border/40 hover:border-brand-pink/40 text-foreground"
            }`}
          >
            {isEn ? "All Stations" : "सभी स्टेशन"}
          </button>
          <button
            onClick={() => setFilterType("Elevated")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filterType === "Elevated"
                ? "bg-brand-pink border-brand-pink text-white"
                : "border-light-border dark:border-navy-border/40 hover:border-brand-pink/40 text-foreground"
            }`}
          >
            {isEn ? "Elevated" : "एलिवेटेड"}
          </button>
          <button
            onClick={() => setFilterType("Underground")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filterType === "Underground"
                ? "bg-brand-pink border-brand-pink text-white"
                : "border-light-border dark:border-navy-border/40 hover:border-brand-pink/40 text-foreground"
            }`}
          >
            {isEn ? "Underground" : "भूमिगत"}
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
                      {isEn ? st.type : (st.type === "Elevated" ? "एलिवेटेड" : "भूमिगत")}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-brand-pink transition-colors">
                    {isEn ? st.name : st.nameHi}
                  </h3>
                  <p className="text-xs text-foreground/50 font-medium">
                    {isEn ? st.nameHi : st.name}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-light-border dark:border-navy-border/20 text-xs">
                  {/* Timings */}
                  <div className="flex items-center space-x-2 text-foreground/70">
                    <Clock className="w-4 h-4 text-brand-pink" />
                    <span>
                      {isEn ? "Timings:" : "समय सारणी:"} {st.timings.firstTrain} AM - {st.timings.lastTrain} PM
                    </span>
                  </div>

                  {/* Facilities */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-foreground/45 uppercase tracking-wider font-bold">
                      {isEn ? "Top Amenities" : "प्रमुख सुविधाएं"}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {st.facilities.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="px-2 py-0.5 bg-light-accent dark:bg-navy-card/60 border border-light-border/40 dark:border-navy-border/20 rounded text-[10px] text-foreground/75"
                        >
                          {translateFacility(f)}
                        </span>
                      ))}
                      {st.facilities.length > 3 && (
                        <span className="px-2 py-0.5 bg-light-accent dark:bg-navy-card/60 rounded text-[10px] text-foreground/40">
                          +{st.facilities.length - 3} {isEn ? "more" : "और"}
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
                  <span>{isEn ? "View Details" : "विवरण देखें"}</span>
                </Link>
                <a
                  href={st.location.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-white dark:bg-navy-card hover:bg-light-accent dark:hover:bg-navy-accent/50 text-foreground rounded-xl text-xs font-semibold transition-all border border-light-border dark:border-navy-border/40"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                  <span>{isEn ? "Navigate" : "दिशा-निर्देश"}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-navy-dark rounded-3xl p-12 border border-light-border dark:border-navy-border/40 text-center space-y-3">
          <Train className="w-12 h-12 text-foreground/20 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-foreground">
            {isEn ? "No stations match search criteria" : "कोई स्टेशन खोज से मेल नहीं खाता"}
          </h3>
          <p className="text-sm text-foreground/60 max-w-sm mx-auto">
            {isEn 
              ? "Try adjusting your search filters or spelling to locate Pink Line station directory files."
              : "पिंक लाइन स्टेशन सूची को खोजने के लिए अपने फ़िल्टर या वर्तनी को बदलने का प्रयास करें।"}
          </p>
        </div>
      )}
    </div>
  );
}
