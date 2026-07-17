import React from "react";
import { GitCommit, Sparkles, Shield, Bookmark } from "lucide-react";

export const metadata = {
  title: "Changelog - Jaipur Ride",
  description: "Read version logs of Jaipur Ride. Track native Capacitor shifts, timing updates, and offline assets sync notes.",
};

export default function ChangelogPage() {
  const versions = [
    {
      version: "v2.0.4",
      date: "July 8, 2026",
      badge: "Current Stable",
      changes: [
        "Fixed Lucide icons vector shapes loading locally on offline connection states.",
        "Refined modal prompt promise returns during fine-location permissions cancels.",
        "Automated local storage sync to memorize UI locale switches (EN/HI) on start.",
        "Added Indian Anime illustration filters on marketing assets.",
      ],
    },
    {
      version: "v2.0.0",
      date: "May 14, 2026",
      badge: "Major Update",
      changes: [
        "Migrated Android application from web-wrap (Median.co) to modern Capacitor.js runtime.",
        "Added background GPS tracking to compute train platform approach distances offline.",
        "Integrated vibration haptics on approaching target platform nodes.",
        "Designed new official branding systems featuring Dark Mode support.",
      ],
    },
    {
      version: "v1.5.0",
      date: "November 2, 2025",
      changes: [
        "Compiled local SQLite database bundles to enable offline timing searches.",
        "Redesigned the Interactive Map utilizing SVG layers for responsive scaling.",
        "Added walking maps and ticket prices for Jaipur tourist trails.",
      ],
    },
    {
      version: "v1.0.0",
      date: "January 10, 2025",
      badge: "Initial Release",
      changes: [
        "Launched unofficial Jaipur Metro travel guide on Google Play store.",
        "Features: basic station list, cash fare calculation, and emergency helpline dial links.",
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      <div className="space-y-4">

        <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">Version Releases Changelog</h1>
        <p className="text-base text-foreground/75 leading-relaxed">
          Follow the progress and release history of Jaipur Ride as we roll out new features.
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:width-[2px] before:bg-light-border dark:before:bg-navy-border/30">
        {versions.map((ver, idx) => (
          <div key={idx} className="relative pl-10 space-y-4">
            
            {/* Dot marker */}
            <div className="absolute left-1.5 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-navy-deep border-4 border-brand-pink flex items-center justify-center z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse"></span>
            </div>

            {/* Content card */}
            <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center space-x-3">
                  <h3 className="font-heading font-extrabold text-xl text-foreground">{ver.version}</h3>
                  {ver.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-pink/10 text-brand-pink text-[10px] font-bold uppercase tracking-wider border border-brand-pink/20">
                      {ver.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground/50 font-medium">{ver.date}</p>
              </div>

              <ul className="text-sm text-foreground/80 leading-relaxed space-y-2.5">
                {ver.changes.map((change, cIdx) => (
                  <li key={cIdx} className="flex items-start space-x-2">
                    <span className="text-brand-pink/70 font-bold select-none">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
