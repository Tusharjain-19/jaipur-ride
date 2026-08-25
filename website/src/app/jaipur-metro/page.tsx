import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnswerFirstBox from "@/components/AnswerFirstBox";
import FaqAccordion from "@/components/FaqAccordion";
import stationsData from "@/data/stations.json";
import tourismData from "@/data/tourism.json";
import { Train, Clock, Ticket, Navigation, ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Jaipur Metro Guide: Route, Map, Timings, Fare & Stations",
  description: "Complete 2026 Jaipur Metro Pink Line travel guide. Check operational timings (06:20 AM - 09:20 PM), ticket fares (₹6 - ₹18), route map, 11 stations, and nearest metro for Hawa Mahal & Railway Station.",
  alternates: {
    canonical: "https://jaipurride.vercel.app/jaipur-metro",
  },
  openGraph: {
    title: "Jaipur Metro Guide: Route, Map, Timings, Fare & Stations",
    description: "Everything you need to know about traveling on Jaipur Metro Pink Line. Station schedules, ticket prices, map, and tourist attractions.",
    url: "https://jaipurride.vercel.app/jaipur-metro",
  },
};

export default function JaipurMetroHubPage() {
  const breadcrumbs = [{ name: "Jaipur Metro", url: "/jaipur-metro" }];

  const hubFaqs = [
    {
      question: "What is the Jaipur Metro starting and ending time today?",
      answer: "Jaipur Metro starts operations at 06:20 AM and the last train departs at 09:20 PM daily from both Mansarovar and Badi Chaupar terminal stations."
    },
    {
      question: "What is the ticket price for Jaipur Metro?",
      answer: "Jaipur Metro fares range from ₹6 to ₹18 depending on the distance traveled. Commuters using a Jaipur Metro Smart Card receive a 10% to 20% discount on ticket fares."
    },
    {
      question: "How many stations are currently active in Jaipur Metro?",
      answer: "Jaipur Metro currently has 11 active stations along Phase 1A (Pink Line), stretching 11.97 km from Mansarovar (J01) in the west to Badi Chaupar (J11) in the historic walled city."
    },
    {
      question: "Which metro station is nearest to Hawa Mahal and City Palace?",
      answer: "Badi Chaupar Metro Station (J11) is the nearest metro station to Hawa Mahal (300m walk), City Palace (600m walk), and Jantar Mantar (700m walk)."
    },
    {
      question: "Is there direct metro connectivity to Jaipur Railway Station?",
      answer: "Yes, Railway Station Metro Station (J07) provides direct subterranean access to Jaipur Junction Railway Station platforms."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/10 text-brand-pink text-xs font-extrabold rounded-full uppercase tracking-wider">
          <Train className="w-3.5 h-3.5" /> Official Travel Hub
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight leading-tight">
          Jaipur Metro Route, Map, Timings & Ticket Fare Guide
        </h1>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-sans">
          Your complete, verified transit guide for navigating Jaipur Metro Phase 1A (Pink Line). Check real-time schedules, ticket pricing, platform directions, and heritage monument connections.
        </p>
      </div>

      {/* Answer-First AEO Block */}
      <AnswerFirstBox
        title="Jaipur Metro Quick Overview"
        content="Jaipur Metro Pink Line spans 11.97 km across 11 stations from Mansarovar to Badi Chaupar. Trains run daily every 10 to 15 minutes between 06:20 AM and 09:20 PM. Standard single-journey fares range from ₹6 (1–2 stations) to ₹18 (full route)."
      />

      {/* Core SEO Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/jaipur-metro-route"
          className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit mb-4 group-hover:bg-brand-pink group-hover:text-white transition-colors">
            <Navigation className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Metro Route & Map</h2>
          <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-4">
            Interactive station sequence, line map, stop lists, and interchange directions.
          </p>
          <span className="text-xs font-extrabold text-brand-pink flex items-center gap-1">
            Explore Route <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/jaipur-metro-fare"
          className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit mb-4 group-hover:bg-brand-pink group-hover:text-white transition-colors">
            <Ticket className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Ticket Fares</h2>
          <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-4">
            Calculate cash token prices, smart card discounts, passes, and fare tables.
          </p>
          <span className="text-xs font-extrabold text-brand-pink flex items-center gap-1">
            Check Fares <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/jaipur-metro-timings"
          className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit mb-4 group-hover:bg-brand-pink group-hover:text-white transition-colors">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Train Timings</h2>
          <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-4">
            First & last train arrival times for all 11 stations with peak hour frequencies.
          </p>
          <span className="text-xs font-extrabold text-brand-pink flex items-center gap-1">
            View Schedules <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/jaipur-metro-tourist-places"
          className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit mb-4 group-hover:bg-brand-pink group-hover:text-white transition-colors">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Tourist Attractions</h2>
          <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-4">
            Nearest metro stations to Hawa Mahal, City Palace, Jal Mahal, and local markets.
          </p>
          <span className="text-xs font-extrabold text-brand-pink flex items-center gap-1">
            Browse Sights <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Station List Directory Section */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-sm space-y-6">
        <h2 className="font-heading font-extrabold text-2xl text-foreground">
          Jaipur Metro Stations Directory (Pink Line)
        </h2>
        <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
          Click any station below to view detailed facilities, opening dates, platform guides, nearby tourist places, and maps.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stationsData.map((st) => (
            <Link
              key={st.id}
              href={`/metro-stations/${st.id}`}
              className="p-4 rounded-2xl border border-light-border dark:border-navy-border/30 hover:border-brand-pink bg-light-accent/30 dark:bg-navy-card/40 hover:bg-white dark:hover:bg-navy-card transition-all flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-pink/15 text-brand-pink">
                    {st.code}
                  </span>
                  <span className="text-[10px] text-foreground/50">{st.type}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors">
                  {st.name} ({st.nameHi})
                </h3>
              </div>
              <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-brand-pink group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Top Sightseeing Highlights */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-sm space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-foreground">
              Jaipur Metro Sightseeing Highlights
            </h2>
            <p className="text-xs text-foreground/70 mt-1">
              Top tourist destinations easily accessible via Pink Line stations.
            </p>
          </div>
          <Link href="/jaipur-metro-tourist-places" className="text-xs font-bold text-brand-pink hover:underline hidden sm:block">
            View All Tourist Places &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tourismData.slice(0, 3).map((place) => (
            <Link
              key={place.id}
              href={`/explore-jaipur/${place.id}`}
              className="border border-light-border dark:border-navy-border/30 rounded-2xl overflow-hidden hover:border-brand-pink transition-all group bg-light-accent/20 dark:bg-navy-card/20"
            >
              <div className="p-5 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-pink/10 text-brand-pink">
                  {place.type}
                </span>
                <h3 className="font-heading font-bold text-base text-foreground group-hover:text-brand-pink transition-colors">
                  {place.name}
                </h3>
                <p className="text-xs text-foreground/70 line-clamp-2">{place.summary}</p>
                <div className="pt-2 text-[11px] font-semibold text-brand-pink flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Nearest Metro: {place.stationId} ({place.distance_km} km)
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <FaqAccordion
        items={hubFaqs}
        title="Jaipur Metro Frequently Asked Questions"
        description="Clear, factual answers to common traveler inquiries."
      />
    </div>
  );
}
