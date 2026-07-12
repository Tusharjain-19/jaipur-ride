import React from "react";
import { Info, Calendar, Target, ShieldCheck, Milestone, Users } from "lucide-react";

export const metadata = {
  title: "About Jaipur Ride - Our Story & Roadmap",
  description: "Learn about the mission, history, and development timeline of Jaipur Ride. Check out our upcoming Phase 2 multi-line and admin integration roadmap.",
};

export default function AboutPage() {
  const timeline = [
    {
      year: "Jan 2025",
      title: "Jaipur Ride v1 Launch",
      desc: "Launched as a basic static web page wrapped using Median.co to distribute on Google Play. Covered the basic 11 stations of the Pink Line."
    },
    {
      year: "Feb 2026",
      title: "Offline Refactoring",
      desc: "Downloaded icons and local database caches to achieve a true 100% offline-first architecture, resolving CDN lookup bugs inside deep underground stations."
    },
    {
      year: "May 2026",
      title: "Capacitor Native Sideloading",
      desc: "Migrated from Median web wrappers to Capacitor native compilation, adding location services alerts, tactile vibration triggers, and local database managers."
    },
    {
      year: "July 2026",
      title: "Website v2 Launch",
      desc: "Released this premium marketing website featuring a web-only route simulator, interactive SVG layout map, sitemaps, and optimized search engine rankings."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* 1. TITLE HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
          The Jaipur Ride Mission
        </h1>
        <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
          Making Jaipur Metro transit accessible, fast, and completely offline-capable for tourists exploring the heritage walled city and daily commuters alike.
        </p>
      </div>

      {/* 2. HISTORY & VISION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-foreground">Why Jaipur Ride Was Built</h3>
          <p className="text-sm text-foreground/75 leading-relaxed">
            Navigating new transit networks as a tourist can be overwhelming. Standard transit maps lack proximity sightseeing details, and commercial options often require active internet and sell user location logs. Jaipur Ride was created to provide a fast, beautiful, bilingual, and 100% private offline companion app.
          </p>
        </div>

        <div className="p-8 bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-foreground">Privacy-First Navigation</h3>
          <p className="text-sm text-foreground/75 leading-relaxed">
            We believe location tracking belongs strictly on your phone. Jaipur Ride does not record, upload, or sell your coordinates. Both our web simulator and mobile geolocation triggers calculate positioning locally on your device, giving you total security.
          </p>
        </div>
      </div>

      {/* 3. TIMELINE */}
      <div className="space-y-8">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground text-center">Development Timeline</h2>
        
        <div className="relative border-l border-light-border dark:border-navy-border/40 max-w-3xl mx-auto pl-6 space-y-8">
          <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-brand-pink/30"></div>

          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* timeline node dot */}
              <div className="absolute left-[-30px] top-1.5 w-4 h-4 rounded-full border-2 border-brand-pink bg-white dark:bg-navy-deep group-hover:scale-110 transition-transform"></div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-brand-pink tracking-wider uppercase">{item.year}</span>
                <h4 className="font-heading font-bold text-lg text-foreground">{item.title}</h4>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FUTURE ROADMAP (PHASE 2 & ADMIN PANEL) */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-8 lg:p-12 border border-light-border dark:border-navy-border/40 shadow-xl space-y-8">
        <div className="space-y-3">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground flex items-center space-x-2">
            <Milestone className="w-7 h-7 text-brand-pink" />
            <span>Future Roadmap (Phase 2 & Admin APIs)</span>
          </h2>
          <p className="text-sm text-foreground/70">
            We are designing our technical architecture to scale alongside Jaipur Metro Rail Corporation expansion:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="p-5 rounded-2xl bg-light-accent dark:bg-navy-card/40 border border-light-border/60 dark:border-navy-border/20 space-y-2">
            <h4 className="font-heading font-bold text-base text-foreground">Multi-Line Support</h4>
            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
              We are ready to add the upcoming <strong>Orange Line</strong> (Ambapali ↔ Sitapura) as soon as construction completes. The relational database maps nodes dynamically.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-light-accent dark:bg-navy-card/40 border border-light-border/60 dark:border-navy-border/20 space-y-2">
            <h4 className="font-heading font-bold text-base text-foreground">Interchange Node Navigation</h4>
            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
              Sindhi Camp is set up as our core interchange vertex. Our routing pathfinder will automatically render platform transfer guides when secondary routes are activated.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-light-accent dark:bg-navy-card/40 border border-light-border/60 dark:border-navy-border/20 space-y-2">
            <h4 className="font-heading font-bold text-base text-foreground">Admin Integration</h4>
            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
              We plan to integrate a secure administrative panel to update ticket pricing ranges, edit attraction details, and broadcast metro delay notifications instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
