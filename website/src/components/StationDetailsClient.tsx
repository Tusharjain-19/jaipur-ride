"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  Train,
  Clock,
  Compass,
  MapPin,
  Check,
  ChevronRight,
  Download,
  Activity,
  ArrowLeft,
  Copy,
  HelpCircle
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

interface StationDetailsClientProps {
  station: Station;
  attractions: Attraction[];
}

export default function StationDetailsClient({ station, attractions }: StationDetailsClientProps) {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const isEn = language === "en";

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
    for (const key in map) {
      if (res.includes(key)) res = res.replace(key, map[key]);
    }
    return res;
  };

  const translateConnectivity = (c: string) => {
    if (isEn) return c;
    const map: Record<string, string> = {
      'Bus stop nearby': 'निकटतम बस स्टॉप',
      'Bus stop': 'बस स्टॉप',
      'Auto rickshaw stands': 'ऑटो रिक्शा स्टैंड',
      'Auto rickshaw': 'ऑटो रिक्शा',
      'Taxi / Cab': 'टैक्सी / कैब',
      'Cycle/Bike parking': 'साइकिल/बाइक पार्किंग',
      'Walking access to': 'पैदल पहुंच:',
      'Local buses': 'स्थानीय बसें'
    };
    let res = c;
    for (const key in map) {
      if (res.includes(key)) res = res.replace(key, map[key]);
    }
    return res;
  };

  const convertToDMS = (lat: number, lon: number) => {
    const getDMS = (val: number, isLat: boolean) => {
      const absVal = Math.abs(val);
      const degrees = Math.floor(absVal);
      const minutesNotTruncated = (absVal - degrees) * 60;
      const minutes = Math.floor(minutesNotTruncated);
      const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);
      const direction = isLat 
        ? (val >= 0 ? "N" : "S") 
        : (val >= 0 ? "E" : "W");
      return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
    };
    return {
      latDMS: getDMS(lat, true),
      lonDMS: getDMS(lon, false)
    };
  };

  const { latDMS, lonDMS } = convertToDMS(station.location.lat, station.location.lon);

  const getCommuteDistances = () => {
    const stationId = station.id;
    const stopIndex: Record<string, number> = {
      "J01": 0, "J02": 1, "J03": 2, "J04": 3, "J05": 4, "J06": 5, "J07": 6, "J08": 7, "J09": 8, "J10": 9, "J11": 10
    };
    
    const currentIndex = stopIndex[stationId] ?? 0;
    
    const getStopsText = (targetId: string) => {
      const targetIndex = stopIndex[targetId];
      if (targetIndex === undefined) return "";
      const diff = Math.abs(currentIndex - targetIndex);
      if (diff === 0) return isEn ? "At this station" : "इसी स्टेशन पर";
      return isEn 
        ? `${diff} stop${diff > 1 ? "s" : ""} (Direct Metro)` 
        : `${diff} स्टॉप (सीधी मेट्रो)`;
    };
    
    const getRoadDistance = (hub: string) => {
      switch (hub) {
        case "Airport":
          if (stationId === "J01" || stationId === "J03") {
            return isEn ? "9.8 km (approx 20 mins auto/cab)" : "9.8 किमी (लगभग 20 मिनट ऑटो/कैब)";
          }
          const stopsToJ01 = currentIndex;
          const estDist = 9.8 + (stopsToJ01 * 1.2);
          return isEn 
            ? `${estDist.toFixed(1)} km (${stopsToJ01} metro stops + cab)` 
            : `${estDist.toFixed(1)} किमी (${stopsToJ01} मेट्रो स्टॉप + कैब)`;
            
        case "Jal Mahal":
          if (stationId === "J11") {
            return isEn ? "3.8 km (approx 10 mins auto/bus)" : "3.8 किमी (लगभग 10 मिनट ऑटो/बस)";
          }
          const stopsToJ11 = 10 - currentIndex;
          const estDistJM = 3.8 + (stopsToJ11 * 1.2);
          return isEn 
            ? `${estDistJM.toFixed(1)} km (${stopsToJ11} metro stops + auto)` 
            : `${estDistJM.toFixed(1)} किमी (${stopsToJ11} मेट्रो स्टॉप + ऑटो)`;
            
        case "MNIT":
          if (stationId === "J06") {
            return isEn ? "4.5 km (approx 12 mins auto)" : "4.5 किमी (लगभग 12 मिनट ऑटो)";
          }
          const stopsToJ06 = Math.abs(currentIndex - 5);
          const estDistMN = 4.5 + (stopsToJ06 * 1.2);
          return isEn 
            ? `${estDistMN.toFixed(1)} km (${stopsToJ06} metro stops + auto)` 
            : `${estDistMN.toFixed(1)} किमी (${stopsToJ06} मेट्रो स्टॉप + ऑटो)`;

        case "JECRC":
          if (stationId === "J01") {
            return isEn ? "15.0 km (approx 30 mins auto/cab)" : "15.0 किमी (लगभग 30 मिनट ऑटो/कैब)";
          }
          const stopsToJ01_JE = currentIndex;
          const estDistJE = 15.0 + (stopsToJ01_JE * 1.2);
          return isEn 
            ? `${estDistJE.toFixed(1)} km (${stopsToJ01_JE} metro stops + cab)` 
            : `${estDistJE.toFixed(1)} किमी (${stopsToJ01_JE} मेट्रो स्टॉप + कैब)`;
            
        default:
          return "";
      }
    };
    
    return [
      {
        name: isEn ? "Jaipur Junction Railway Station" : "जयपुर जंक्शन रेलवे स्टेशन",
        detail: getStopsText("J07")
      },
      {
        name: isEn ? "Sindhi Camp Bus Stand" : "सिंधी कैंप बस स्टैंड",
        detail: getStopsText("J08")
      },
      {
        name: isEn ? "Hawa Mahal (Badi Chaupar)" : "हवा महल (बड़ी चौपड़)",
        detail: getStopsText("J11")
      },
      {
        name: isEn ? "Jaipur International Airport (JAI)" : "जयपुर इंटरनेशनल एयरपोर्ट (JAI)",
        detail: getRoadDistance("Airport")
      },
      {
        name: isEn ? "Jal Mahal (Water Palace)" : "जल महल (वॉटर पैलेस)",
        detail: getRoadDistance("Jal Mahal")
      },
      {
        name: isEn ? "MNIT Jaipur" : "एमएनआईटी जयपुर",
        detail: getRoadDistance("MNIT")
      },
      {
        name: isEn ? "JECRC University" : "जेईसीआरसी यूनिवर्सिटी",
        detail: getRoadDistance("JECRC")
      }
    ];
  };

  const commuteList = getCommuteDistances();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Breadcrumb / Back button */}
      <div>
        <Link
          href="/metro-stations"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-pink hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isEn ? "Back to Stations Directory" : "स्टेशन निर्देशिका पर वापस जाएँ"}</span>
        </Link>
      </div>

      {/* Header Info Banner */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 p-8 lg:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-brand-pink/15 text-brand-pink">
              {isEn ? "STATION CODE:" : "स्टेशन कोड:"} {station.code}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-foreground/10 text-foreground">
              {isEn ? station.type : (station.type === "Elevated" ? "एलिवेटेड" : "भूमिगत")}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-500">
              {isEn ? "Pink Line" : "पिंक लाइन"}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight leading-tight">
            {isEn ? `${station.name} Metro Station` : `${station.nameHi} मेट्रो स्टेशन`}
          </h1>
          <p className="text-xl text-foreground/60 font-semibold">{isEn ? station.nameHi : station.name}</p>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end w-full">
          <a
            href={station.location.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-2xl text-sm font-bold shadow-lg shadow-brand-pink/20 transition-all hover:scale-[1.02]"
          >
            <MapPin className="w-4 h-4" />
            <span>{isEn ? "Open in Google Maps" : "गूगल मैप्स में खोलें"}</span>
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
              <span>{isEn ? "Amenities & Facilities" : "सुविधाएं और साधन"}</span>
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
                  <span className="text-sm font-semibold text-foreground/80">{translateFacility(fac)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Commute & Distance Matrix */}
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
            <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
              <Compass className="w-6 h-6 text-brand-pink" />
              <span>{isEn ? "Commute & Landmark Distances" : "प्रमुख स्थानों से दूरी और संपर्क"}</span>
            </h2>
            <p className="text-sm text-foreground/60">
              {isEn 
                ? `Transit connections and travel distances from ${station.name} to major Jaipur hubs:`
                : `${station.nameHi} से जयपुर के प्रमुख केंद्रों की दूरी और आवागमन के साधन:`}
            </p>

            <div className="overflow-x-auto rounded-2xl border border-light-border dark:border-navy-border/20">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-light-accent/50 dark:bg-navy-card border-b border-light-border dark:border-navy-border/30 font-heading font-bold text-foreground">
                    <th className="p-4">{isEn ? "Destination Hub" : "गंतव्य स्थान"}</th>
                    <th className="p-4">{isEn ? "Distance / Transit Time" : "दूरी / यात्रा समय"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border dark:divide-navy-border/20 text-foreground/80">
                  {commuteList.map((item, index) => (
                    <tr key={index} className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                      <td className="p-4 font-semibold text-foreground">{item.name}</td>
                      <td className="p-4 font-mono font-medium text-brand-pink">{item.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Connectivity details */}
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
            <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
              <Activity className="w-6 h-6 text-brand-pink" />
              <span>{isEn ? "Last Mile Connectivity" : "अंतिम मील कनेक्टिविटी"}</span>
            </h2>
            <p className="text-sm text-foreground/60">
              {isEn ? "Transport options available outside the station building gates:" : "स्टेशन भवन के द्वारों के बाहर उपलब्ध परिवहन विकल्प:"}
            </p>

            <ul className="space-y-3">
              {station.connectivity.map((conn, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-foreground/85">
                  <ChevronRight className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                  <span>{translateConnectivity(conn)}</span>
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
              <span>{isEn ? "Timings & Operation" : "समय सारणी और संचालन"}</span>
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2.5 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/60">{isEn ? "First Train Departure" : "पहली ट्रेन प्रस्थान"}</span>
                <span className="font-bold text-foreground">{station.timings.firstTrain} AM</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/60">{isEn ? "Last Train Departure" : "आखिरी ट्रेन प्रस्थान"}</span>
                <span className="font-bold text-foreground">{station.timings.lastTrain} PM</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/60">{isEn ? "Platforms" : "प्लेटफॉर्म"}</span>
                <span className="font-bold text-foreground">{station.platforms} {isEn ? "Side Platforms" : "साइड प्लेटफॉर्म"}</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-foreground/60">{isEn ? "Opened Date" : "उद्घाटन तिथि"}</span>
                <span className="font-bold text-foreground">{station.opened} (Phase 1)</span>
              </div>
            </div>
          </div>

          {/* Geo Coordinates Card */}
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4">
            <h2 className="font-heading font-bold text-xl text-foreground flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-brand-pink" />
              <span>{isEn ? "Geo-Coordinates & GPS" : "भौगोलिक निर्देशांक और GPS"}</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-2 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/60">{isEn ? "Latitude (Lat)" : "अक्षांश (Lat)"}</span>
                <span className="font-mono font-bold text-foreground">{station.location.lat}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/60">{isEn ? "Longitude (Lon)" : "देशांतर (Lon)"}</span>
                <span className="font-mono font-bold text-foreground">{station.location.lon}</span>
              </div>
              <div className="flex flex-col py-1.5 border-b border-light-border dark:border-navy-border/20 space-y-1">
                <span className="text-xs text-foreground/50">{isEn ? "Latitude DMS" : "अक्षांश DMS"}</span>
                <span className="font-mono font-bold text-xs text-foreground/80">{latDMS}</span>
              </div>
              <div className="flex flex-col py-1.5 border-b border-light-border dark:border-navy-border/20 space-y-1">
                <span className="text-xs text-foreground/50">{isEn ? "Longitude DMS" : "देशांतर DMS"}</span>
                <span className="font-mono font-bold text-xs text-foreground/80">{lonDMS}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-foreground/60">{isEn ? "GPS Log" : "जीपीएस लॉग"}</span>
                <span className="font-mono font-semibold text-xs text-foreground/75 truncate">{station.location.lat}, {station.location.lon}</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`${station.location.lat}, ${station.location.lon}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-light-accent dark:bg-navy-card hover:bg-light-border dark:hover:bg-navy-accent text-foreground rounded-2xl text-xs font-bold transition-all border border-light-border dark:border-navy-border/40 cursor-pointer"
            >
              <Copy className="w-4 h-4 text-brand-pink" />
              <span>{copied ? (isEn ? "Copied!" : "कॉपी हो गया!") : (isEn ? "Copy GPS Lat-Lon" : "GPS निर्देशांक कॉपी करें")}</span>
            </button>
          </div>

          {/* Quick Marketing CTA */}
          <div className="bg-linear-to-br from-navy-dark to-navy-accent text-white rounded-3xl p-6 border border-navy-border shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded bg-brand-pink text-white font-bold text-[9px] uppercase tracking-wider">
                {isEn ? "Android Feature Only" : "केवल एंड्रॉइड ऐप सुविधा"}
              </span>
              <h3 className="font-heading font-bold text-xl leading-snug">
                {isEn ? "Never Miss Your Stop Again!" : "अपना स्टेशन कभी न चूकें!"}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-sans">
                {isEn 
                  ? "Download the Jaipur Ride Android app to experience automatic location-based vibrating reminders."
                  : "स्वचालित स्थान-आधारित कंपन अनुस्मारक का अनुभव करने के लिए जयपुर राइड एंड्रॉइड ऐप डाउनलोड करें।"}
              </p>
            </div>
            <Link
              href="/download"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-brand-pink hover:bg-brand-pink-dark rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t("btnDownloadApp")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Nearby Sightseeing attractions section */}
      <div className="space-y-6">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground flex items-center space-x-2">
          <Compass className="w-6 h-6 text-brand-pink" />
          <span>{isEn ? `Sightseeing Near ${station.name}` : `${station.nameHi} के पास दर्शनीय स्थल`}</span>
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
                        {isEn ? att.type : att.typeHi}
                      </span>
                      <span className="text-foreground/50">{att.entry_fee}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {isEn ? att.name : att.nameHi}
                    </h3>
                    <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                      {isEn ? att.summary : att.summaryHi}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-light-border dark:border-navy-border/20 text-xs flex justify-between items-center text-foreground/60 font-semibold">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                      <span>
                        {att.walk_time_min 
                          ? (isEn ? `${att.distance_km} km (${att.walk_time_min}m walk)` : `${att.distance_km} किमी (${att.walk_time_min} मिनट पैदल)`) 
                          : (isEn ? `${att.approx_drive_distance_km} km (${att.approx_drive_time_min}m drive)` : `${att.approx_drive_distance_km} किमी (${att.approx_drive_time_min} मिनट ड्राइव)`)}
                      </span>
                    </div>
                    <a
                      href={att.maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-pink hover:underline"
                    >
                      {isEn ? "Directions" : "दिशा-निर्देश"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-10 border border-light-border dark:border-navy-border/40 text-center text-sm text-foreground/50">
            {isEn 
              ? "No major tourist attractions listed within 3 km of this metro station."
              : "इस मेट्रो स्टेशन के 3 किमी के भीतर कोई प्रमुख पर्यटक आकर्षण सूचीबद्ध नहीं है।"}
          </div>
        )}
      </div>

      {/* Station FAQs Section */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
        <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
          <HelpCircle className="w-6 h-6 text-brand-pink" />
          <span>{isEn ? `FAQs About ${station.name} Metro Station` : `${station.nameHi} मेट्रो स्टेशन के बारे में अक्सर पूछे जाने वाले प्रश्न`}</span>
        </h2>

        <div className="space-y-4">
          {/* FAQ 1: Coordinates */}
          <details className="group border border-light-border/60 dark:border-navy-border/20 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none select-none bg-light-accent/30 dark:bg-navy-card/10">
              <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors flex items-center space-x-2.5">
                <span>{isEn ? `What are the GPS coordinates of ${station.name} Metro Station?` : `${station.nameHi} मेट्रो स्टेशन के जीपीएस निर्देशांक (Coordinates) क्या हैं?`}</span>
              </h3>
              <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                <ChevronRight className="w-4 h-4" />
              </span>
            </summary>
            <div className="px-5 py-4 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/10">
              <p>
                {isEn 
                  ? `${station.name} Metro Station is located at Latitude ${station.location.lat}° N and Longitude ${station.location.lon}° E. You can use these exact coordinates for Google Maps and GPS transit routing in Jaipur.` 
                  : `${station.nameHi} मेट्रो स्टेशन अक्षांश (Latitude) ${station.location.lat}° N और देशांतर (Longitude) ${station.location.lon}° E पर स्थित है। आप इन निर्देशांकों का उपयोग जीपीएस और गूगल मैप नेविगेशन के लिए कर सकते हैं।`}
              </p>
            </div>
          </details>

          {/* FAQ 2: Timings */}
          <details className="group border border-light-border/60 dark:border-navy-border/20 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none select-none bg-light-accent/30 dark:bg-navy-card/10">
              <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors flex items-center space-x-2.5">
                <span>{isEn ? `What is the first and last train timings from ${station.name} Metro Station?` : `${station.nameHi} मेट्रो स्टेशन से पहली और आखिरी ट्रेन का समय क्या है?`}</span>
              </h3>
              <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                <ChevronRight className="w-4 h-4" />
              </span>
            </summary>
            <div className="px-5 py-4 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/10">
              <p>
                {isEn 
                  ? `Daily operations at ${station.name} Metro Station begin with the first eastbound/westbound train dispatch at ${station.timings.firstTrain} AM and conclude with the last train departure at ${station.timings.lastTrain} PM. Train arrivals average every 10 minutes during morning/evening peak office hours.` 
                  : `${station.nameHi} मेट्रो स्टेशन पर दैनिक संचालन सुबह ${station.timings.firstTrain} बजे पहली ट्रेन के प्रस्थान के साथ शुरू होता है और रात ${station.timings.lastTrain} बजे आखिरी ट्रेन के साथ समाप्त होता है।`}
              </p>
            </div>
          </details>

          {/* FAQ 3: Parking */}
          <details className="group border border-light-border/60 dark:border-navy-border/20 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none select-none bg-light-accent/30 dark:bg-navy-card/10">
              <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors flex items-center space-x-2.5">
                <span>{isEn ? `Is parking available at ${station.name} Metro Station?` : `क्या ${station.nameHi} मेट्रो स्टेशन पर पार्किंग उपलब्ध है?`}</span>
              </h3>
              <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                <ChevronRight className="w-4 h-4" />
              </span>
            </summary>
            <div className="px-5 py-4 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/10">
              <p>
                {station.id === "J01" || station.id === "J07" || station.id === "J08" ? (
                  isEn 
                    ? `Yes, two-wheeler and four-wheeler parking facilities are available at ${station.name} Metro Station. JMRC charges standard parking fees of ₹10 for two-wheelers and ₹25 for four-wheelers for up to 8 hours.` 
                    : `हाँ, ${station.nameHi} मेट्रो स्टेशन पर दोपहिया और चार पहिया वाहनों के लिए पार्किंग उपलब्ध है। JMRC 8 घंटे तक की पार्किंग के लिए दोपहिया वाहनों से ₹10 और चार पहिया वाहनों से ₹25 का शुल्क लेता है।`
                ) : (
                  isEn 
                    ? `Official JMRC parking is not directly available at ${station.name} Metro Station. Commuters can utilize nearby private parking stands, street parking zones, or take last-mile e-rickshaw transit.` 
                    : `आधिकारिक JMRC पार्किंग सीधे ${station.nameHi} मेट्रो स्टेशन पर उपलब्ध नहीं है। यात्री आस-पास की निजी पार्किंग स्टैंड या ई-रिक्शा सुविधाओं का उपयोग कर सकते हैं।`
                )}
              </p>
            </div>
          </details>

          {/* FAQ 4: Smart Card / Fares */}
          <details className="group border border-light-border/60 dark:border-navy-border/20 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none select-none bg-light-accent/30 dark:bg-navy-card/10">
              <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors flex items-center space-x-2.5">
                <span>{isEn ? `How much is the metro ticket from ${station.name}?` : `${station.nameHi} से मेट्रो टिकट की कीमत कितनी है?`}</span>
              </h3>
              <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                <ChevronRight className="w-4 h-4" />
              </span>
            </summary>
            <div className="px-5 py-4 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/10">
              <p>
                {isEn 
                  ? `Jaipur Metro Pink Line ticket prices range from ₹10 to ₹30 based on distance (number of stations traveled). Commuters using a Jaipur Metro Smart Card receive a 10% to 20% discount on every transaction. Smart cards can be recharged at any station window or online.` 
                  : `जयपुर मेट्रो पिंक लाइन टिकट की कीमतें दूरी के आधार पर ₹10 से ₹30 तक हैं। जयपुर मेट्रो स्मार्ट कार्ड का उपयोग करने वाले यात्रियों को प्रत्येक सवारी पर 10% से 20% की छूट मिलती है।`}
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
