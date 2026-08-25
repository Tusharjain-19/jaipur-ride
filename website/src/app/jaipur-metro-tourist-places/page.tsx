import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnswerFirstBox from "@/components/AnswerFirstBox";
import FaqAccordion from "@/components/FaqAccordion";
import tourismData from "@/data/tourism.json";
import stationsData from "@/data/stations.json";
import { MapPin, ArrowRight, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Jaipur Metro Se Ghumne Ki Jagah: Tourist Places & Nearest Stations",
  description: "Explore Jaipur's top tourist places by metro. Find nearest metro stations to Hawa Mahal, City Palace, Jal Mahal, Jantar Mantar, Albert Hall, and Johari Bazaar with walking times & fares.",
  alternates: {
    canonical: "https://jaipurride.vercel.app/jaipur-metro-tourist-places",
  },
  openGraph: {
    title: "Jaipur Metro Tourist Places & Sightseeing Guide 2026",
    description: "Jaipur metro se ghumne ki jagah guide. Map of heritage monuments connected by Badi Chaupar, Chhoti Chaupar & Chandpole metro stations.",
    url: "https://jaipurride.vercel.app/jaipur-metro-tourist-places",
  },
};

export default function JaipurMetroTouristPlacesPage() {
  const breadcrumbs = [
    { name: "Jaipur Metro", url: "/jaipur-metro" },
    { name: "Tourist Places & Nearest Metro", url: "/jaipur-metro-tourist-places" },
  ];

  const touristFaqs = [
    {
      question: "Which Jaipur metro station is nearest to Hawa Mahal and City Palace?",
      answer: "Badi Chaupar Metro Station (J11) is the closest station to Hawa Mahal (300m / 4-minute walk) and City Palace (600m / 7-minute walk)."
    },
    {
      question: "Which metro station is nearest to Jaipur Railway Station?",
      answer: "Railway Station Metro Station (J07) is built directly beneath Jaipur Junction Railway Station, allowing easy transit to the Pink Line."
    },
    {
      question: "How do I reach Jal Mahal using Jaipur Metro?",
      answer: "Take the Pink Line to Badi Chaupar Metro Station (J11). From Exit Gate 2, board a 10-minute auto-rickshaw or local bus northbound along Amer Road directly to Jal Mahal (3.8 km)."
    },
    {
      question: "Which metro station is nearest to Albert Hall Museum?",
      answer: "Chhoti Chaupar Metro Station (J10) and Badi Chaupar Metro Station (J11) are both close to Albert Hall Museum (approx 1.5 km / 5-minute auto ride)."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/10 text-brand-pink text-xs font-extrabold rounded-full uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" /> Jaipur Sightseeing Guide
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight leading-tight">
          Jaipur Metro Se Ghumne Ki Jagah: Tourist Places & Nearest Stations
        </h1>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-sans">
          Discover historical palaces, royal forts, vibrant bazaars, and temples connected by the Jaipur Metro Pink Line.
        </p>
      </div>

      {/* Answer First */}
      <AnswerFirstBox
        title="Jaipur Metro Tourist Transit Overview"
        content="Badi Chaupar (J11) & Chhoti Chaupar (J10) metro stations are the ultimate gateways for Pink City sightseeing. Hawa Mahal, City Palace, Jantar Mantar, and Johari Bazaar are within short walking distance from Badi Chaupar exit gates."
      />

      {/* Top Tourist Destinations Grid */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-sm space-y-6">
        <h2 className="font-heading font-extrabold text-2xl text-foreground">
          Top Monuments & Attractions Connected by Jaipur Metro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourismData.map((att) => {
            const station = stationsData.find((s) => s.id === att.stationId);
            return (
              <div
                key={att.id}
                className="bg-light-accent/30 dark:bg-navy-card/40 border border-light-border dark:border-navy-border/30 rounded-2xl p-5 hover:border-brand-pink transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-brand-pink/10 text-brand-pink">
                      {att.type}
                    </span>
                    <span className="text-foreground/60 text-[11px] font-sans">{att.entry_fee}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-brand-pink transition-colors">
                    <Link href={`/explore-jaipur/${att.id}`}>
                      {att.name} ({att.nameHi})
                    </Link>
                  </h3>
                  <p className="text-xs text-foreground/70 line-clamp-3 font-sans leading-relaxed">
                    {att.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-light-border dark:border-navy-border/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground/80">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                      Nearest Metro: {station?.name || att.stationId}
                    </span>
                    <span className="text-brand-pink">{att.distance_km} km</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-foreground/60 font-sans">
                    <span>{att.walk_time_min ? `${att.walk_time_min} min walk` : `${att.approx_drive_time_min} min auto`}</span>
                    <Link
                      href={`/explore-jaipur/${att.id}`}
                      className="font-bold text-brand-pink hover:underline flex items-center gap-1"
                    >
                      Guide <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <FaqAccordion items={touristFaqs} title="Jaipur Sightseeing & Metro FAQs" />
    </div>
  );
}
