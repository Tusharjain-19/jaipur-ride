"use client";

import React, { useState } from "react";
import stationsData from "@/data/stations.json";
import { Clock, Train, HelpCircle, Info, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TimingsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title Header */}
      <div className="text-center lg:text-left space-y-4 max-w-3xl">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-pink/10 text-brand-pink border border-brand-pink/20">
          🕒 {language === "en" ? "Service Timetable" : "सेवा समय सारिणी"}
        </span>
        <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">
          {language === "en" ? "Jaipur Metro Train Timings" : "जयपुर मेट्रो ट्रेन समय सारिणी"}
        </h1>
        <p className="text-base text-foreground/75 leading-relaxed">
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
            <p className="text-xs text-foreground/50 mt-1">Daily pink line timings</p>
          </div>
          <div className="space-y-1.5 text-sm text-foreground/80 font-medium">
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
            <p className="text-xs text-foreground/50 mt-1">Train arrival intervals</p>
          </div>
          <div className="space-y-1.5 text-sm text-foreground/80 font-medium">
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
            <p className="text-xs text-foreground/50 mt-1">Operational updates</p>
          </div>
          <div className="space-y-1.5 text-sm text-foreground/80 font-medium">
            <div className="flex justify-between"><span>Monday - Saturday:</span> <span className="font-bold text-foreground">Full Schedule</span></div>
            <div className="flex justify-between"><span>Sundays / Holidays:</span> <span className="font-bold text-foreground">Modified Hours</span></div>
          </div>
        </div>

      </div>

      {/* Timetable Station Schedule Grid */}
      <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-heading font-bold text-xl text-foreground flex items-center space-x-2">
            <Info className="w-5 h-5 text-brand-pink" />
            <span>First & Last Train Timings by Station</span>
          </h2>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
            • Live Timetable synced
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-light-border dark:border-navy-border/20 text-foreground/50 font-bold text-xs uppercase tracking-wider">
                <th className="pb-3">Station Node</th>
                <th className="pb-3 text-center">First Train (Eastbound)</th>
                <th className="pb-3 text-center">Last Train (Eastbound)</th>
                <th className="pb-3 text-center">First Train (Westbound)</th>
                <th className="pb-3 text-center">Last Train (Westbound)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border/40 dark:divide-navy-border/10 font-medium text-foreground/80">
              {stationsData.map((st) => (
                <tr key={st.id} className="hover:bg-light-accent/30 dark:hover:bg-navy-card/30 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="font-bold text-foreground">
                      {language === "en" ? st.name : st.nameHi}
                    </div>
                    <div className="text-[10px] text-foreground/40">{st.id} • {st.type}</div>
                  </td>
                  <td className="py-3.5 text-center font-mono text-xs">
                    {st.id === "J11" ? "—" : st.timings.firstTrain}
                  </td>
                  <td className="py-3.5 text-center font-mono text-xs">
                    {st.id === "J11" ? "—" : st.timings.lastTrain}
                  </td>
                  <td className="py-3.5 text-center font-mono text-xs">
                    {st.id === "J01" ? "—" : st.timings.firstTrain}
                  </td>
                  <td className="py-3.5 text-center font-mono text-xs">
                    {st.id === "J01" ? "—" : st.timings.lastTrain}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="text-xs text-foreground/50 italic leading-relaxed text-center sm:text-left">
          * Note: Eastbound trains travel towards Badi Chaupar (J11). Westbound trains travel towards Mansarovar (J01). Please arrive at terminals 5 minutes before scheduled departure.
        </div>
      </div>

    </div>
  );
}
