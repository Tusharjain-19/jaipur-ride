"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnswerFirstBox from "@/components/AnswerFirstBox";
import { Ticket, Clock, MapPin, Compass, ExternalLink, Train, ChevronRight, HelpCircle, Route } from "lucide-react";

interface Station {
  id: string;
  name: string;
  nameHi: string;
  code: string;
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
  description: string;
  descriptionHi: string;
}

interface AttractionDetailsClientProps {
  attraction: Attraction;
  station?: Station;
  related: Attraction[];
}

export default function AttractionDetailsClient({ attraction, station, related }: AttractionDetailsClientProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const breadcrumbs = [
    { name: isEn ? "Explore Jaipur" : "एक्सप्लोर जयपुर", url: "/explore-jaipur" },
    { name: isEn ? attraction.name : attraction.nameHi, url: `/explore-jaipur/${attraction.id}` }
  ];

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

  // Compute stops between two station indices
  const stopIndex: Record<string, number> = {
    "J01": 0, "J02": 1, "J03": 2, "J04": 3, "J05": 4, "J06": 5, "J07": 6, "J08": 7, "J09": 8, "J10": 9, "J11": 10
  };

  const stationNames: Record<string, { en: string; hi: string }> = {
    "J01": { en: "Mansarovar", hi: "मानसरोवर" },
    "J02": { en: "New Aatish Market", hi: "न्यू आतिश मार्केट" },
    "J03": { en: "Vivek Vihar", hi: "विवेक विहार" },
    "J04": { en: "Shyam Nagar", hi: "श्याम नगर" },
    "J05": { en: "Ram Nagar", hi: "राम नगर" },
    "J06": { en: "Civil Lines", hi: "सिविल लाइन्स" },
    "J07": { en: "Railway Station", hi: "रेलवे स्टेशन" },
    "J08": { en: "Sindhi Camp", hi: "सिंधी कैंप" },
    "J09": { en: "Chandpole", hi: "चांदपोल" },
    "J10": { en: "Chhoti Chaupar", hi: "छोटी चौपड़" },
    "J11": { en: "Badi Chaupar", hi: "बड़ी चौपड़" }
  };

  const nearestStationId = attraction.stationId;
  const nearestStationName = stationNames[nearestStationId];
  const nearestIdx = stopIndex[nearestStationId] ?? 0;

  const getStopCount = (fromId: string) => {
    const fromIdx = stopIndex[fromId] ?? 0;
    return Math.abs(nearestIdx - fromIdx);
  };

  const getDirection = (fromId: string) => {
    const fromIdx = stopIndex[fromId] ?? 0;
    if (fromIdx < nearestIdx) return isEn ? "eastbound towards Badi Chaupar" : "बड़ी चौपड़ की ओर पूर्व दिशा में";
    if (fromIdx > nearestIdx) return isEn ? "westbound towards Mansarovar" : "मानसरोवर की ओर पश्चिम दिशा में";
    return "";
  };

  const lastMileText = () => {
    if (attraction.walk_time_min) {
      return isEn
        ? `Walk ${attraction.distance_km} km (~${attraction.walk_time_min} minutes) from the metro station exit to ${attraction.name}.`
        : `मेट्रो स्टेशन के बाहर से ${attraction.nameHi} तक ${attraction.distance_km} किमी (~${attraction.walk_time_min} मिनट) पैदल चलें।`;
    }
    return isEn
      ? `Take an auto-rickshaw or cab from the metro station exit (~${attraction.approx_drive_distance_km} km, ${attraction.approx_drive_time_min} minutes) to ${attraction.name}.`
      : `मेट्रो स्टेशन के बाहर से ऑटो-रिक्शा या कैब लें (~${attraction.approx_drive_distance_km} किमी, ${attraction.approx_drive_time_min} मिनट) ${attraction.nameHi} तक।`;
  };

  const buildRouteSteps = (fromId: string) => {
    const stops = getStopCount(fromId);
    const direction = getDirection(fromId);

    const steps: { en: string; hi: string }[] = [];

    // Step 1: Get to the starting metro station
    if (fromId === "J07") {
      steps.push({
        en: `Head to Jaipur Junction Railway Station Metro Station (${fromId}). The metro entrance is connected to the railway station building.`,
        hi: `जयपुर जंक्शन रेलवे स्टेशन मेट्रो स्टेशन (${fromId}) पर जाएं। मेट्रो का प्रवेश रेलवे स्टेशन से जुड़ा है।`
      });
    } else if (fromId === "J08") {
      steps.push({
        en: `Head to Sindhi Camp Metro Station (${fromId}). The station is adjacent to the RSRTC Central Bus Stand.`,
        hi: `सिंधी कैंप मेट्रो स्टेशन (${fromId}) पर जाएं। स्टेशन RSRTC सेंट्रल बस स्टैंड के पास है।`
      });
    }

    // Step 2: Buy ticket
    steps.push({
      en: `Purchase a token ticket or tap your Jaipur Metro Smart Card at the counter/gate for ${isEn ? nearestStationName.en : nearestStationName.hi} Metro Station (${nearestStationId}).`,
      hi: `काउंटर/गेट पर ${nearestStationName.hi} मेट्रो स्टेशन (${nearestStationId}) के लिए टोकन टिकट खरीदें या अपना जयपुर मेट्रो स्मार्ट कार्ड टैप करें।`
    });

    // Step 3: Board the train
    if (stops === 0) {
      steps.push({
        en: `You are already at the nearest metro station! Exit and proceed to ${attraction.name}.`,
        hi: `आप पहले से निकटतम मेट्रो स्टेशन पर हैं! बाहर निकलें और ${attraction.nameHi} की ओर बढ़ें।`
      });
    } else {
      steps.push({
        en: `Board the Pink Line metro train ${direction}. Travel ${stops} stop${stops > 1 ? "s" : ""} and alight at ${nearestStationName.en} Metro Station (${nearestStationId}).`,
        hi: `पिंक लाइन मेट्रो ट्रेन ${direction} बोर्ड करें। ${stops} स्टॉप यात्रा करें और ${nearestStationName.hi} मेट्रो स्टेशन (${nearestStationId}) पर उतरें।`
      });
    }

    // Step 4: Last mile
    steps.push({
      en: lastMileText(),
      hi: lastMileText()
    });

    return steps;
  };

  const routeFromRailway = buildRouteSteps("J07");
  const routeFromSindhiCamp = buildRouteSteps("J08");

  const airportRoute = (() => {
    const steps: { en: string; hi: string }[] = [];
    steps.push({
      en: "From Jaipur International Airport (JAI), take a prepaid taxi or cab to Mansarovar Metro Station (J01) — the closest metro station to the airport (~9.8 km, 20 minutes drive).",
      hi: "जयपुर इंटरनेशनल एयरपोर्ट (JAI) से प्रीपेड टैक्सी या कैब लेकर मानसरोवर मेट्रो स्टेशन (J01) जाएं — एयरपोर्ट से निकटतम मेट्रो स्टेशन (~9.8 किमी, 20 मिनट ड्राइव)।"
    });
    const stopsFromJ01 = getStopCount("J01");
    if (stopsFromJ01 === 0) {
      steps.push({
        en: `Mansarovar is the nearest metro station. Exit and proceed to ${attraction.name}.`,
        hi: `मानसरोवर निकटतम मेट्रो स्टेशन है। बाहर निकलें और ${attraction.nameHi} की ओर बढ़ें।`
      });
    } else {
      const direction = getDirection("J01");
      steps.push({
        en: `Board the Pink Line metro ${direction}. Travel ${stopsFromJ01} stop${stopsFromJ01 > 1 ? "s" : ""} to ${nearestStationName.en} Metro Station (${nearestStationId}).`,
        hi: `पिंक लाइन मेट्रो ${direction} बोर्ड करें। ${stopsFromJ01} स्टॉप ${nearestStationName.hi} मेट्रो स्टेशन (${nearestStationId}) तक यात्रा करें।`
      });
    }
    steps.push({
      en: lastMileText(),
      hi: lastMileText()
    });
    return steps;
  })();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Answer First Summary Box for AEO */}
      <AnswerFirstBox
        title={isEn ? `Nearest Metro to ${attraction.name}` : `${attraction.nameHi} का निकटतम मेट्रो स्टेशन`}
        content={
          isEn
            ? `The nearest metro station to ${attraction.name} is ${station?.name || attraction.stationId} Metro Station on the Pink Line (${attraction.distance_km} km away). ${attraction.walk_time_min ? `Walk time: ~${attraction.walk_time_min} minutes.` : `Drive time: ~${attraction.approx_drive_time_min} minutes.`}`
            : `${attraction.nameHi} का निकटतम मेट्रो स्टेशन पिंक लाइन पर ${station?.nameHi || attraction.stationId} मेट्रो स्टेशन (${attraction.distance_km} किमी दूर) है।`
        }
      />

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
              {isEn ? attraction.type : attraction.typeHi}
            </span>
          </div>
        </div>

        {/* Text Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              {isEn ? attraction.name : attraction.nameHi}
            </h1>
            <p className="text-lg font-semibold text-foreground/50">{isEn ? attraction.nameHi : attraction.name}</p>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {isEn ? attraction.description : attraction.descriptionHi}
          </p>

          {/* Timing & Price Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-light-border dark:border-navy-border/20 text-sm">
            
            {/* Box 1: Fee */}
            <div className="p-4 bg-light-accent dark:bg-navy-card/50 rounded-2xl border border-light-border dark:border-navy-border/30 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-foreground/50 font-bold uppercase tracking-wider">
                <Ticket className="w-4 h-4 text-brand-pink" />
                <span>{isEn ? "Ticket Price" : "टिकट दर"}</span>
              </div>
              <p className="font-bold text-foreground truncate">{attraction.entry_fee}</p>
            </div>

            {/* Box 2: Hours */}
            <div className="p-4 bg-light-accent dark:bg-navy-card/50 rounded-2xl border border-light-border dark:border-navy-border/30 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-foreground/50 font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-brand-pink" />
                <span>{isEn ? "Best Visit Hours" : "सर्वोत्तम समय"}</span>
              </div>
              <p className="font-bold text-foreground truncate">{attraction.best_time}</p>
            </div>

            {/* Box 3: Proximity */}
            <div className="p-4 bg-light-accent dark:bg-navy-card/50 rounded-2xl border border-light-border dark:border-navy-border/30 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-foreground/50 font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-brand-pink" />
                <span>{isEn ? "Metro Distance" : "मेट्रो से दूरी"}</span>
              </div>
              <p className="font-bold text-foreground truncate">
                {attraction.walk_time_min 
                  ? (isEn ? `${attraction.distance_km} km (~${attraction.walk_time_min}m walk)` : `${attraction.distance_km} किमी (~${attraction.walk_time_min} मिनट पैदल)`)
                  : (isEn ? `${attraction.approx_drive_distance_km} km (~${attraction.approx_drive_time_min}m drive)` : `${attraction.approx_drive_distance_km} किमी (~${attraction.approx_drive_time_min} मिनट ड्राइव)`)}
              </p>
            </div>

          </div>

          {/* Action links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-light-border dark:border-navy-border/20">
            {station && (
              <Link
                href={`/metro-stations/${station.id}`}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-xl text-xs font-bold transition-all hover:scale-102 border-none"
              >
                <Train className="w-4 h-4" />
                <span>{isEn ? `View ${station.name} Amenities` : `${station.nameHi} स्टेशन सुविधाएं देखें`}</span>
              </Link>
            )}

            <a
              href={attraction.maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-light-accent hover:bg-light-border dark:bg-navy-card dark:hover:bg-navy-accent text-foreground rounded-xl text-xs font-bold transition-all border border-light-border dark:border-navy-border/40"
            >
              <ExternalLink className="w-4 h-4 text-brand-pink" />
              <span>{isEn ? "Get Directions on Google Maps" : "गूगल मैप्स पर मार्ग निर्देश प्राप्त करें"}</span>
            </a>
          </div>

        </div>

      </div>

      {/* How to Reach by Metro Section */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
        <h2 className="font-heading font-extrabold text-2xl text-foreground flex items-center space-x-2">
          <Route className="w-6 h-6 text-brand-pink" />
          <span>{isEn ? `How to Reach ${attraction.name} by Jaipur Metro` : `जयपुर मेट्रो से ${attraction.nameHi} कैसे पहुंचें`}</span>
        </h2>
        <p className="text-sm text-foreground/60">
          {isEn
            ? `Step-by-step directions to reach ${attraction.name} using the Jaipur Metro Pink Line from major transit hubs.`
            : `प्रमुख ट्रांजिट केंद्रों से जयपुर मेट्रो पिंक लाइन से ${attraction.nameHi} पहुँचने के लिए चरण-दर-चरण निर्देश।`}
        </p>

        {/* Route from Railway Station */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-foreground flex items-center space-x-2">
            <Train className="w-4 h-4 text-brand-pink" />
            <span>{isEn ? "From Jaipur Junction Railway Station" : "जयपुर जंक्शन रेलवे स्टेशन से"}</span>
          </h3>
          <ol className="space-y-2.5 list-none">
            {routeFromRailway.map((step, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-brand-pink/15 text-brand-pink font-bold text-xs rounded-full mt-0.5">{idx + 1}</span>
                <span>{isEn ? step.en : step.hi}</span>
              </li>
            ))}
          </ol>
        </div>

        <hr className="border-light-border dark:border-navy-border/20" />

        {/* Route from Sindhi Camp */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-foreground flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-brand-pink" />
            <span>{isEn ? "From Sindhi Camp Bus Stand (RSRTC)" : "सिंधी कैंप बस स्टैंड (RSRTC) से"}</span>
          </h3>
          <ol className="space-y-2.5 list-none">
            {routeFromSindhiCamp.map((step, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-brand-pink/15 text-brand-pink font-bold text-xs rounded-full mt-0.5">{idx + 1}</span>
                <span>{isEn ? step.en : step.hi}</span>
              </li>
            ))}
          </ol>
        </div>

        <hr className="border-light-border dark:border-navy-border/20" />

        {/* Route from Airport */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-foreground flex items-center space-x-2">
            <Compass className="w-4 h-4 text-brand-pink" />
            <span>{isEn ? "From Jaipur International Airport (JAI)" : "जयपुर इंटरनेशनल एयरपोर्ट (JAI) से"}</span>
          </h3>
          <ol className="space-y-2.5 list-none">
            {airportRoute.map((step, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-brand-pink/15 text-brand-pink font-bold text-xs rounded-full mt-0.5">{idx + 1}</span>
                <span>{isEn ? step.en : step.hi}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Landmark FAQs Section */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
        <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
          <HelpCircle className="w-6 h-6 text-brand-pink" />
          <span>{isEn ? `FAQs About ${attraction.name}` : `${attraction.nameHi} के बारे में अक्सर पूछे जाने वाले प्रश्न`}</span>
        </h2>

        <div className="space-y-4">
          {/* FAQ 1: Nearest Metro Station */}
          <details className="group border border-light-border/60 dark:border-navy-border/20 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none select-none bg-light-accent/30 dark:bg-navy-card/10">
              <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors">
                {isEn ? `Which is the nearest metro station to ${attraction.name}?` : `${attraction.nameHi} का निकटतम मेट्रो स्टेशन कौन सा है?`}
              </h3>
              <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                <ChevronRight className="w-4 h-4" />
              </span>
            </summary>
            <div className="px-5 py-4 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/10">
              <p>
                {isEn
                  ? `The nearest Jaipur Metro station to ${attraction.name} is ${nearestStationName.en} Metro Station (${nearestStationId}) on the Pink Line. It is located approximately ${attraction.distance_km} km from ${attraction.name}.`
                  : `${attraction.nameHi} का निकटतम जयपुर मेट्रो स्टेशन पिंक लाइन पर ${nearestStationName.hi} मेट्रो स्टेशन (${nearestStationId}) है। यह ${attraction.nameHi} से लगभग ${attraction.distance_km} किमी दूर स्थित है।`}
              </p>
            </div>
          </details>

          {/* FAQ 2: Distance from Metro */}
          <details className="group border border-light-border/60 dark:border-navy-border/20 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none select-none bg-light-accent/30 dark:bg-navy-card/10">
              <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors">
                {isEn ? `What is the distance from ${nearestStationName.en} Metro Station to ${attraction.name}?` : `${nearestStationName.hi} मेट्रो स्टेशन से ${attraction.nameHi} की दूरी कितनी है?`}
              </h3>
              <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                <ChevronRight className="w-4 h-4" />
              </span>
            </summary>
            <div className="px-5 py-4 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/10">
              <p>
                {attraction.walk_time_min
                  ? (isEn
                    ? `The distance from ${nearestStationName.en} Metro Station (${nearestStationId}) to ${attraction.name} is ${attraction.distance_km} km, which is approximately ${attraction.walk_time_min} minutes walking distance. No auto-rickshaw or cab is needed.`
                    : `${nearestStationName.hi} मेट्रो स्टेशन (${nearestStationId}) से ${attraction.nameHi} की दूरी ${attraction.distance_km} किमी है, जो लगभग ${attraction.walk_time_min} मिनट की पैदल दूरी है। ऑटो-रिक्शा या कैब की आवश्यकता नहीं है।`)
                  : (isEn
                    ? `The distance from ${nearestStationName.en} Metro Station (${nearestStationId}) to ${attraction.name} is approximately ${attraction.approx_drive_distance_km} km by road, which takes about ${attraction.approx_drive_time_min} minutes by auto-rickshaw or cab.`
                    : `${nearestStationName.hi} मेट्रो स्टेशन (${nearestStationId}) से ${attraction.nameHi} की दूरी सड़क मार्ग से लगभग ${attraction.approx_drive_distance_km} किमी है, जो ऑटो-रिक्शा या कैब से लगभग ${attraction.approx_drive_time_min} मिनट लगते हैं।`)}
              </p>
            </div>
          </details>

          {/* FAQ 3: How to reach from Railway Station */}
          <details className="group border border-light-border/60 dark:border-navy-border/20 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none select-none bg-light-accent/30 dark:bg-navy-card/10">
              <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors">
                {isEn ? `How to reach ${attraction.name} from Jaipur Railway Station by metro?` : `जयपुर रेलवे स्टेशन से मेट्रो द्वारा ${attraction.nameHi} कैसे पहुँचें?`}
              </h3>
              <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                <ChevronRight className="w-4 h-4" />
              </span>
            </summary>
            <div className="px-5 py-4 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/10">
              <p>
                {isEn
                  ? `From Jaipur Junction Railway Station Metro Station (J07), board the Pink Line metro ${getDirection("J07")}. Travel ${getStopCount("J07")} stop${getStopCount("J07") > 1 ? "s" : ""} and exit at ${nearestStationName.en} Metro Station (${nearestStationId}). ${attraction.walk_time_min ? `Walk ${attraction.distance_km} km (~${attraction.walk_time_min} min) to reach ${attraction.name}.` : `Take an auto/cab (~${attraction.approx_drive_distance_km} km, ${attraction.approx_drive_time_min} min) to reach ${attraction.name}.`}`
                  : `जयपुर जंक्शन रेलवे स्टेशन मेट्रो स्टेशन (J07) से पिंक लाइन मेट्रो ${getDirection("J07")} बोर्ड करें। ${getStopCount("J07")} स्टॉप यात्रा करें और ${nearestStationName.hi} मेट्रो स्टेशन (${nearestStationId}) पर उतरें। ${attraction.walk_time_min ? `${attraction.distance_km} किमी (~${attraction.walk_time_min} मिनट) पैदल चलकर ${attraction.nameHi} पहुँचें।` : `ऑटो/कैब (~${attraction.approx_drive_distance_km} किमी, ${attraction.approx_drive_time_min} मिनट) लेकर ${attraction.nameHi} पहुँचें।`}`}
              </p>
            </div>
          </details>

          {/* FAQ 4: Entry Fee & Timings */}
          <details className="group border border-light-border/60 dark:border-navy-border/20 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none select-none bg-light-accent/30 dark:bg-navy-card/10">
              <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors">
                {isEn ? `What are the entry ticket prices and visiting hours for ${attraction.name}?` : `${attraction.nameHi} के प्रवेश टिकट की कीमतें और यात्रा का समय क्या है?`}
              </h3>
              <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                <ChevronRight className="w-4 h-4" />
              </span>
            </summary>
            <div className="px-5 py-4 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/10">
              <p>
                {isEn
                  ? `The entry fee for ${attraction.name} is ${attraction.entry_fee}. The best time to visit is ${attraction.best_time}. We recommend visiting during early morning or late afternoon for the best experience and to avoid crowds.`
                  : `${attraction.nameHi} का प्रवेश शुल्क ${attraction.entry_fee} है। यात्रा का सबसे अच्छा समय ${attraction.best_time} है। हम सबसे अच्छे अनुभव और भीड़ से बचने के लिए सुबह जल्दी या देर दोपहर में जाने की सलाह देते हैं।`}
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Related Attractions Section */}
      {related.length > 0 && (
        <div className="space-y-6 pt-4">
          <h2 className="font-heading font-extrabold text-2xl text-foreground flex items-center space-x-2">
            <Compass className="w-5 h-5 text-brand-pink" />
            <span>{isEn ? "Other Heritage Spots Nearby" : "आस-पास के अन्य विरासत स्थल"}</span>
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
                  <p className="text-[10px] text-brand-pink font-bold uppercase tracking-wider">{isEn ? rel.type : rel.typeHi}</p>
                  <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors truncate">
                    {isEn ? rel.name : rel.nameHi}
                  </h4>
                  <p className="text-[10px] text-foreground/50">{isEn ? "Station:" : "स्टेशन:"} {isEn ? rel.stationId : T_STATION(rel.stationId)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
