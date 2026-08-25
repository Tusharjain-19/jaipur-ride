"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Star, X, Download, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppDownloadBanner() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner on mobile devices after 1.5 seconds unless dismissed
    const isDismissed = sessionStorage.getItem("jaipur_ride_banner_dismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("jaipur_ride_banner_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-md z-50 lg:hidden"
        >
          <div className="relative bg-slate-950/95 dark:bg-navy-dark/95 backdrop-blur-xl text-white p-4 rounded-3xl border border-brand-pink/35 shadow-[0_15px_40px_-10px_rgba(236,72,153,0.35)] flex items-center justify-between gap-3 overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-brand-pink/20 rounded-full blur-2xl pointer-events-none"></div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors flex items-center justify-center cursor-pointer z-10"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* App Icon + Title */}
            <div className="flex items-center space-x-3 min-w-0 pr-4">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-brand-pink/50 shadow-lg shrink-0 bg-white p-0.5">
                <Image
                  src="/logo1.png"
                  alt="Jaipur Ride App"
                  fill
                  className="object-cover rounded-xl"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-heading font-extrabold text-sm text-white truncate">
                    Jaipur<span className="text-brand-pink">Ride</span> App
                  </h4>
                </div>

                {/* 5-Star Rating Pill with Golden SVGs */}
                <div className="flex items-center space-x-1">
                  <span className="text-[11px] font-extrabold text-amber-400 font-mono">5.0</span>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-slate-300 truncate font-sans font-medium">
                  Official Jaipur Metro Guide & Fares
                </p>
              </div>
            </div>

            {/* Google Play Action Button */}
            <a
              href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDismiss}
              className="shrink-0 flex items-center space-x-1.5 px-3.5 py-2.5 bg-gradient-to-r from-brand-pink to-rose-500 hover:from-rose-500 hover:to-brand-pink text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-brand-pink/40 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Image
                src="/assets/icons/google-play.svg"
                alt="Google Play"
                width={16}
                height={16}
                className="w-4 h-4 object-contain shrink-0"
              />
              <span className="whitespace-nowrap">{isEn ? "Get App" : "ऐप डाउनलोड"}</span>
            </a>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
