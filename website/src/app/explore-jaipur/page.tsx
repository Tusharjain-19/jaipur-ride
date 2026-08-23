import React from "react";
import { Metadata } from "next";
import tourismData from "@/data/tourism.json";
import ExploreClient from "@/components/ExploreClient";

export const metadata: Metadata = {
  title: "Explore Jaipur Sightseeing | Nearest Metro Stations & Guide",
  description: "Find the nearest metro stations to major Jaipur tourist attractions, local bazaars, hospitals, and universities. Get directions, walking times, and transit options.",
  keywords: [
    "explore jaipur",
    "jaipur sightseeing metro route",
    "places to visit near jaipur metro",
    "jaipur historical monuments metro",
    "shopping near jaipur metro",
    "tourist map jaipur metro"
  ]
};

export default function ExploreJaipurPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Title */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
          Explore Jaipur Local Sightseeing
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/70 font-sans">
          Discover historical palaces, fort complexes, traditional bazaars, and temples connected by the Jaipur Metro Pink Line.
        </p>
      </div>

      {/* Client Filter & Search list */}
      <ExploreClient initialAttractions={tourismData} language="en" />
    </div>
  );
}
