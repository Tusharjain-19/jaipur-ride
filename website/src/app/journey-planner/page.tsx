"use client";

import React from "react";
import Link from "next/link";
import { Train, Smartphone, Sparkles, ShieldAlert, ArrowRight, Download, Eye, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function JourneyPlannerPage() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Page Title Header */}
      <div className="text-center lg:text-left space-y-4 max-w-3xl">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-pink/10 text-brand-pink border border-brand-pink/20">
          📍 {language === "en" ? "Interactive Simulation" : "इंटरैक्टिव सिमुलेशन"}
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight leading-none">
          {language === "en" ? "Jaipur Metro Route Simulator" : "जयपुर मेट्रो रूट सिम्युलेटर"}
        </h1>
        <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
          {language === "en" 
            ? "Calculate fares, examine transit stations list, and locate platform directions inside a web-based companion simulation." 
            : "वेब-आधारित साथी सिमुलेशन के भीतर किराए की गणना करें, स्टेशनों की सूची देखें और प्लेटफॉर्म की दिशाओं का पता लगाएं।"}
        </p>
      </div>

      {/* Main Grid: Info + Mock Browser Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Comparison & Sideload Android CTA */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Web Limitation Alert */}
          <div className="p-6 bg-amber-500/10 dark:bg-amber-500/5 rounded-3xl border border-amber-500/20 space-y-4">
            <h3 className="font-heading font-bold text-base text-amber-600 dark:text-amber-500 flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{language === "en" ? "Web Simulation Limit" : "वेब सिमुलेशन सीमा"}</span>
            </h3>
            <p className="text-xs text-foreground/75 leading-relaxed">
              {language === "en" 
                ? "This web journey planner simulates transit timings and static schedules. Real-time background GPS alerts and station arrival vibrations are ONLY available on the native mobile app."
                : "यह वेब यात्रा नियोजक पारगमन समय और स्थिर कार्यक्रम का अनुकरण करता है। रीयल-टाइम बैकग्राउंड जीपीएस अलर्ट और स्टेशन आगमन कंपन केवल मूल मोबाइल ऐप पर उपलब्ध हैं।"}
            </p>
          </div>

          {/* Quick Specifications Cards */}
          <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl space-y-5">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-foreground/60">
              {language === "en" ? "Simulation Checklist" : "सिमुलेशन चेकलिस्ट"}
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-xs leading-tight">
                <div className="w-6 h-6 rounded-lg bg-brand-pink/15 text-brand-pink flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <p className="font-semibold text-foreground">Select Station Nodes</p>
                  <p className="text-foreground/50 mt-0.5">Toggle starting points and terminals.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-xs leading-tight">
                <div className="w-6 h-6 rounded-lg bg-brand-pink/15 text-brand-pink flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <p className="font-semibold text-foreground">Ticket Fare Audit</p>
                  <p className="text-foreground/50 mt-0.5">Cash vs. Smart Card value balances.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs leading-tight">
                <div className="w-6 h-6 rounded-lg bg-brand-pink/15 text-brand-pink flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <p className="font-semibold text-foreground">Platform Guideline</p>
                  <p className="text-foreground/50 mt-0.5">Direction labels for easy boarding.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download CTA Button - Made Premium */}
          <div className="p-6 bg-linear-to-br from-brand-pink to-brand-pink-dark rounded-3xl text-white shadow-xl shadow-brand-pink/10 space-y-4">
            <h3 className="font-heading font-bold text-lg flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Get Android App</span>
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Unlock haptic vibrations, offline emergency details, and live station distance metrics without internet.
            </p>
            <Link
              href="/download"
              className="w-full py-3 bg-white hover:bg-slate-100 text-brand-pink-dark rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-2 hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              <span>{t("btnDownloadApp")}</span>
            </Link>
          </div>

        </div>

        {/* Right Side: Mock Browser Frame */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Mock Browser Container */}
          <div className="bg-white dark:bg-navy-dark rounded-3xl overflow-hidden border border-light-border dark:border-navy-border/40 shadow-2xl flex flex-col h-[750px]">
            
            {/* Browser Header Bar */}
            <div className="bg-slate-100 dark:bg-navy-dark px-4 py-3 border-b border-light-border dark:border-navy-border/40 flex items-center justify-between shrink-0">
              
              {/* Window controls */}
              <div className="flex items-center space-x-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              </div>

              {/* URL Address Bar */}
              <div className="bg-white dark:bg-navy-card/80 text-[11px] text-foreground/50 border border-light-border dark:border-navy-border/20 px-4 py-1.5 rounded-xl w-3/5 text-center truncate flex items-center justify-center space-x-1.5 font-medium select-none shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>jaipurride.com/simulator</span>
              </div>

              {/* Action buttons */}
              <a
                href="/simulator/index.html"
                target="_blank"
                rel="noreferrer"
                className="p-1 text-foreground/60 hover:text-brand-pink transition-colors"
                title="Open in new window"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Browser Content Area (Iframe) */}
            <div className="flex-1 w-full bg-slate-50 dark:bg-navy-deep relative">
              <iframe
                src="/simulator/index.html"
                className="absolute inset-0 w-full h-full border-none"
                title="Jaipur Ride Route Simulator"
                allow="geolocation"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
