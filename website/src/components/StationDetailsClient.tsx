"use client";

import React from "react";
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

interface StationDetailsClientProps {
  station: Station;
  attractions: Attraction[];
}

export default function StationDetailsClient({ station, attractions }: StationDetailsClientProps) {
  const { language, t } = useLanguage();
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
    for (let key in map) {
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
    for (let key in map) {
      if (res.includes(key)) res = res.replace(key, map[key]);
    }
    return res;
  };

  const T_STATION = (name: string): string => {
    const stationTranslations: Record<string, string> = {
      "Mansarovar": "मानसरोवर",
      "New Aatish Market": "न्यू आतिश मार्केट",
      "Vivek Vihar": "विवेक विहार",
      "Shyam Nagar": "श्याम नगर",
      "Ram Nagar": "राम नगर",
      "Civil Lines": "सिविल लाइन्स",
      "Railway Station": "रेलवे स्टेशन",
      "Sindhi Camp": "सिंधी कैंप",
      "Chandpole": "चांदपोल",
      "Chhoti Chaupar": "छोटी चौपड़",
      "Badi Chaupar": "बड़ी चौपड़"
    };
    return stationTranslations[name] || name;
  };

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

          {/* Quick Marketing CTA */}
          <div className="bg-gradient-to-br from-navy-dark to-navy-accent text-white rounded-3xl p-6 border border-navy-border shadow-xl space-y-6">
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
    </div>
  );
}
