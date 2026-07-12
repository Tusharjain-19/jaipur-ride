import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Train,
  Clock,
  Compass,
  Map,
  ShieldAlert,
  WifiOff,
  Bell,
  CheckCircle,
  XCircle,
  ArrowRight,
  Download
} from "lucide-react";

export const metadata = {
  title: "App Features & Specifications",
  description: "Explore the core features of Jaipur Ride. Compare our fast online simulator features with our full-featured offline Android companion app.",
};

export default function FeaturesPage() {
  const specFeatures = [
    {
      icon: <Train className="w-8 h-8 text-brand-pink" />,
      title: "Smart Route Finder",
      desc: "Computes the absolute shortest path between any two station nodes on the line, outputting travel durations, ticket fares, intermediate stops checklist, and platform guidance."
    },
    {
      icon: <Map className="w-8 h-8 text-brand-pink" />,
      title: "Interactive SVG Map",
      desc: "Beautiful custom line diagram vector layout showing elevated vs underground station tags. Zoomable and hoverable for direct facility summaries."
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-pink" />,
      title: "Metro Timetable Guide",
      desc: "Never miss the first or last train. Accurate listing of standard timings, peak-hour and off-peak frequencies, and platform details."
    },
    {
      icon: <Compass className="w-8 h-8 text-brand-pink" />,
      title: "Tourist Attraction Guide",
      desc: "Curated list of Jaipur's UNESCO heritage sites, traditional markets, and forts mapped directly to their closest metro stations with walking distances."
    },
    {
      icon: <WifiOff className="w-8 h-8 text-brand-pink" />,
      title: "100% Offline Support (App)",
      desc: "No internet inside underground stations? No problem. The Android application functions completely offline without any network connections."
    },
    {
      icon: <Bell className="w-8 h-8 text-brand-pink" />,
      title: "Live GPS Alerts (App)",
      desc: "Launches location trackers while riding. Vibrates and triggers notifications automatically as your destination station is approaching."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4 mb-6">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
          Jaipur Ride Features & Specs
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/70">
          Everything you need to navigate the Pink City transit smoothly, in your browser or on your phone.
        </p>
      </div>

      {/* Detail grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specFeatures.map((spec, idx) => (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-pink/10 flex items-center justify-center mb-6">
              {spec.icon}
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-3">
              {spec.title}
            </h3>
            <p className="text-sm text-foreground/75 leading-relaxed">
              {spec.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Comparison Matrix */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground">
            Feature Comparison Matrix
          </h2>
          <p className="text-xs sm:text-sm text-foreground/60">
            Compare our quick web simulation with our primary Android application product.
          </p>
        </div>

        <div className="overflow-x-auto bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 shadow-xl">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-light-border dark:border-navy-border/40 bg-light-accent/30 dark:bg-navy-card/40 text-foreground font-heading">
                <th className="p-5 font-bold">Feature</th>
                <th className="p-5 font-bold text-center">Web Simulation (Next.js)</th>
                <th className="p-5 font-bold text-center text-brand-pink">Android Application (Capacitor)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border/60 dark:divide-navy-border/20">
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">Route Planning & Fares</td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">Interactive Stations Directory</td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">Tourist sightseeing Maps Links</td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10 text-slate-400">
                <td className="p-5 font-semibold text-foreground">Offline support (No Internet)</td>
                <td className="p-5 text-center">
                  <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">Live GPS Tracking & Dwell Tracking</td>
                <td className="p-5 text-center">
                  <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">Automatic Station Proximity Vibration Alerts</td>
                <td className="p-5 text-center">
                  <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">Hardware back-buttons integration</td>
                <td className="p-5 text-center">
                  <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="pt-6 flex justify-center">
          <Link
            href="/download"
            className="flex items-center space-x-2 px-8 py-4 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-2xl text-base font-bold shadow-lg shadow-brand-pink/20 hover:scale-[1.02] transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Download Offline Android App</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
