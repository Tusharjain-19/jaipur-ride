"use client";

import React from "react";
import { Info } from "lucide-react";

interface Station {
  id: string;
  name: string;
  nameHi: string;
  type: string;
  timings: {
    firstTrain: string;
    lastTrain: string;
  };
}

interface TimingsClientProps {
  stations: Station[];
  language: string;
}

export default function TimingsClient({ stations, language }: TimingsClientProps) {
  return (
    <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="font-heading font-bold text-xl text-foreground flex items-center space-x-2">
          <Info className="w-5 h-5 text-brand-pink" />
          <span>{language === "en" ? "First & Last Train Timings by Station" : "स्टेशनवार प्रथम और अंतिम ट्रेन समय"}</span>
        </h2>
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
          • Live Timetable Synced
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
            {stations.map((st) => (
              <tr key={st.id} className="hover:bg-light-accent/30 dark:hover:bg-navy-card/30 transition-colors">
                <td className="py-3.5 pr-4">
                  <div className="font-bold text-foreground">
                    {language === "en" ? st.name : st.nameHi}
                  </div>
                  <div className="text-[10px] text-foreground/40">{st.id} • {st.type}</div>
                </td>
                <td className="py-3.5 text-center font-mono text-xs">
                  {st.id === "J11" ? "-" : st.timings.firstTrain}
                </td>
                <td className="py-3.5 text-center font-mono text-xs">
                  {st.id === "J11" ? "-" : st.timings.lastTrain}
                </td>
                <td className="py-3.5 text-center font-mono text-xs">
                  {st.id === "J01" ? "-" : st.timings.firstTrain}
                </td>
                <td className="py-3.5 text-center font-mono text-xs">
                  {st.id === "J01" ? "-" : st.timings.lastTrain}
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
  );
}
