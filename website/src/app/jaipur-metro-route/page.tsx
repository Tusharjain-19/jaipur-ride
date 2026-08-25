import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnswerFirstBox from "@/components/AnswerFirstBox";
import FaqAccordion from "@/components/FaqAccordion";
import stationsData from "@/data/stations.json";
import { Navigation, ArrowRight, Train } from "lucide-react";

export const metadata: Metadata = {
  title: "Jaipur Metro Route Map & Station Sequence (Pink Line)",
  description: "Explore complete Jaipur Metro Pink Line route sequence from Mansarovar to Badi Chaupar (11 stations, 11.97 km). Find interchange stations, stops list & transit connections.",
  alternates: {
    canonical: "https://jaipurride.vercel.app/jaipur-metro-route",
  },
  openGraph: {
    title: "Jaipur Metro Route Map & Station Sequence (Pink Line)",
    description: "Complete station list and route map for Jaipur Metro Pink Line (Phase 1A). Total travel time approx. 25 minutes.",
    url: "https://jaipurride.vercel.app/jaipur-metro-route",
  },
};

export default function JaipurMetroRoutePage() {
  const breadcrumbs = [
    { name: "Jaipur Metro", url: "/jaipur-metro" },
    { name: "Metro Route & Map", url: "/jaipur-metro-route" },
  ];

  const routeFaqs = [
    {
      question: "Which line of Jaipur Metro is currently operational?",
      answer: "The Pink Line (Phase 1A) is currently the fully operational corridor of Jaipur Metro. It stretches 11.97 km from Mansarovar to Badi Chaupar."
    },
    {
      question: "How long does it take to travel the entire Jaipur Metro route?",
      answer: "A complete end-to-end journey on the Pink Line from Mansarovar (J01) to Badi Chaupar (J11) takes approximately 25 to 28 minutes."
    },
    {
      question: "Is there an interchange station in Jaipur Metro?",
      answer: "Railway Station Metro Station (J07) connects with Jaipur Junction Railway Station, while Sindhi Camp Metro Station (J08) serves as the primary interchange connector for the interstate bus terminal (ISBT) and planned Phase 1B Orange Line extension."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/10 text-brand-pink text-xs font-extrabold rounded-full uppercase tracking-wider">
          <Navigation className="w-3.5 h-3.5" /> Pink Line Route Guide
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight leading-tight">
          Jaipur Metro Route Map & Pink Line Station List
        </h1>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-sans">
          Full 11-station sequence connecting western residential hubs to the heart of the walled Pink City.
        </p>
      </div>

      {/* Answer First */}
      <AnswerFirstBox
        title="Jaipur Metro Route Summary"
        content="Jaipur Metro Pink Line covers 11 stations: Mansarovar, New Aishbagh, Vivek Vihar, Shyam Nagar, Ram Nagar, Civil Lines, Railway Station, Sindhi Camp, Chandpole, Chhoti Chaupar, and Badi Chaupar. Total distance is 11.97 km."
      />

      {/* Interactive Map Link Box */}
      <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="font-heading font-extrabold text-2xl text-foreground">View Graphical Vector Map</h2>
          <p className="text-xs sm:text-sm text-foreground/70 font-sans">
            Pan and zoom across station nodes, platform directions, and track topology on our SVG map.
          </p>
        </div>
        <Link
          href="/metro-map"
          className="px-6 py-3 bg-brand-pink text-white font-extrabold rounded-xl text-xs shadow-md hover:bg-brand-pink-dark transition-all flex items-center gap-2 shrink-0"
        >
          <Train className="w-4 h-4" /> Open Full SVG Map
        </Link>
      </div>

      {/* Station Sequence Flow */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-sm space-y-6">
        <h2 className="font-heading font-extrabold text-2xl text-foreground">
          Step-by-Step Pink Line Station Sequence
        </h2>
        <div className="space-y-4 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-1 before:bg-brand-pink/30 font-sans">
          {stationsData.map((st, index) => (
            <div key={st.id} className="relative flex items-start gap-4 pl-12 group">
              <div className="absolute left-3 top-1 w-7 h-7 rounded-full bg-brand-pink text-white flex items-center justify-center font-bold text-xs shadow-sm group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <div className="flex-1 bg-light-accent/30 dark:bg-navy-card/40 border border-light-border dark:border-navy-border/30 rounded-2xl p-4 hover:border-brand-pink transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-brand-pink">{st.code}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-foreground/10 text-foreground">{st.type}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground">
                    <Link href={`/metro-stations/${st.id}`} className="hover:text-brand-pink transition-colors">
                      {st.name} ({st.nameHi})
                    </Link>
                  </h3>
                  <p className="text-xs text-foreground/60">Facilities: {st.facilities.slice(0, 3).join(", ")}</p>
                </div>
                <Link
                  href={`/metro-stations/${st.id}`}
                  className="text-xs font-bold text-brand-pink hover:underline flex items-center gap-1 shrink-0 self-start sm:self-center"
                >
                  Station Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FaqAccordion items={routeFaqs} title="Jaipur Metro Route FAQs" />
    </div>
  );
}
