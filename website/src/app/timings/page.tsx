import React from "react";
import { Metadata } from "next";
import stationsData from "@/data/stations.json";
import { Clock, Train, Calendar } from "lucide-react";
import TimingsClient from "@/components/TimingsClient";

export const metadata: Metadata = {
  title: "Jaipur Metro Train Timings | First & Last Train Schedules",
  description: "Check daily Jaipur Metro timings, operational hours, peak hour arrival frequencies, and first and last train schedules for all Pink Line stations from Mansarovar to Badi Chaupar.",
  keywords: [
    "jaipur metro timings",
    "jaipur metro first train",
    "jaipur metro last train",
    "jaipur metro timing today",
    "jaipur metro schedule",
    "jaipur metro frequency"
  ]
};

export default function TimingsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title Header */}
      <div className="text-center lg:text-left space-y-4 max-w-3xl">
        <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">
          Jaipur Metro Train Timings
        </h1>
        <p className="text-base text-foreground/75 leading-relaxed font-sans">
          Operational hours, frequency, and first/last train departure logs for Line 1 (Pink Line).
        </p>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Operating Hours */}
        <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-foreground">Operational Hours</h3>
            <p className="text-xs text-foreground/50 mt-1 font-sans">Daily Pink Line timings</p>
          </div>
          <div className="space-y-1.5 text-sm text-foreground/80 font-medium font-sans">
            <div className="flex justify-between"><span>First Train:</span> <span className="font-bold text-foreground">06:20 AM</span></div>
            <div className="flex justify-between"><span>Last Train:</span> <span className="font-bold text-foreground">09:20 PM</span></div>
          </div>
        </div>

        {/* Card 2: Frequency */}
        <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink">
            <Train className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-foreground">Peak Headway</h3>
            <p className="text-xs text-foreground/50 mt-1 font-sans">Train arrival intervals</p>
          </div>
          <div className="space-y-1.5 text-sm text-foreground/80 font-medium font-sans">
            <div className="flex justify-between"><span>Peak Hours:</span> <span className="font-bold text-foreground">Every 10 min</span></div>
            <div className="flex justify-between"><span>Off-Peak:</span> <span className="font-bold text-foreground">Every 15 min</span></div>
          </div>
        </div>

        {/* Card 3: Days of Service */}
        <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-foreground">Weekly Calendar</h3>
            <p className="text-xs text-foreground/50 mt-1 font-sans">Operational updates</p>
          </div>
          <div className="space-y-1.5 text-sm text-foreground/80 font-medium font-sans">
            <div className="flex justify-between"><span>Monday - Saturday:</span> <span className="font-bold text-foreground">Full Schedule</span></div>
            <div className="flex justify-between"><span>Sundays / Holidays:</span> <span className="font-bold text-foreground">Modified Hours</span></div>
          </div>
        </div>

      </div>

      {/* Interactive Timing Table */}
      <TimingsClient stations={stationsData} language="en" />

    </div>
  );
}
