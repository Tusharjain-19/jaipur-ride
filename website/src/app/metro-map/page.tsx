import React from "react";
import InteractiveMap from "@/components/InteractiveMap";
import { Train, Info, Clock, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Interactive Metro Map Guide",
  description: "View the official interactive map of the Jaipur Metro Pink Line. Hover stations to see details, facilities, schedules, and connectivity.",
};

export default function MetroMapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Title */}
      <div className="text-center space-y-4 mb-6">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
          Jaipur Metro Interactive Route Map
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/70">
          Navigate the 11 stations of the Pink Line. Search for stations, highlight nodes, and explore terminal links.
        </p>
      </div>

      {/* Main Interactive Map Canvas */}
      <InteractiveMap />

      {/* Auxiliary Transit Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 shadow-md space-y-4">
          <h3 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <Clock className="w-5 h-5 text-brand-pink" />
            <span>Operating Hours</span>
          </h3>
          <p className="text-sm text-foreground/75 leading-relaxed">
            Trains operate daily from <strong>05:50 AM</strong> to <strong>11:00 PM</strong>. Frequencies range from <strong>5–7 minutes</strong> during peak commute hours, and <strong>8–10 minutes</strong> during off-peak hours.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 shadow-md space-y-4">
          <h3 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <Train className="w-5 h-5 text-brand-pink" />
            <span>Line Specification</span>
          </h3>
          <p className="text-sm text-foreground/75 leading-relaxed">
            The Pink Line covers 11 stations spanning 11.3 kilometers. It transitions from an <strong>Elevated</strong> configuration at Chandpole gate to <strong>Underground</strong> stations through the historical walled city blocks.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 shadow-md space-y-4">
          <h3 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-brand-pink" />
            <span>Phase 2 Ready</span>
          </h3>
          <p className="text-sm text-foreground/75 leading-relaxed">
            Our map database is built using a relational node schema. This allows seamless future integration of interchanges, future station platforms, and new transit lines (e.g. Orange Line) when JMRC updates services.
          </p>
        </div>
      </div>
    </div>
  );
}
