"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, X, Download, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppDownloadBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner on mobile devices after 1.5 seconds unless dismissed
    const isDismissed = sessionStorage.getItem("jaipur_ride_banner_dismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-md z-50 lg:hidden"
        >
          <div className="bg-slate-900/95 dark:bg-navy-dark/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-brand-pink/30 shadow-2xl shadow-black/60 flex items-center justify-between gap-3">
            
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-white/70 hover:text-white border border-white/20 flex items-center justify-center cursor-pointer shadow-md"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* App Icon + Title */}
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-brand-pink/40 shadow-md shrink-0">
                <Image
                  src="/logo1.png"
                  alt="Jaipur Ride App"
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-heading font-extrabold text-xs text-white truncate">
                    Jaipur<span className="text-brand-pink">Ride</span> App
                  </h4>
                  <span className="flex items-center text-[9px] font-bold text-amber-400 bg-amber-400/15 px-1.5 py-0.2 rounded">
                    4.9 <Star className="w-2.5 h-2.5 fill-amber-400 ml-0.5" />
                  </span>
                </div>
                <p className="text-[10px] text-white/70 truncate font-sans">
                  Offline Jaipur Metro Guide & Fares
                </p>
              </div>
            </div>

            {/* Google Play Action Button */}
            <a
              href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDismiss}
              className="shrink-0 flex items-center space-x-1.5 px-3 py-2 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-xl text-xs font-extrabold shadow-md shadow-brand-pink/30 active:scale-95 transition-all cursor-pointer"
            >
              <Image
                src="/assets/icons/google-play.svg"
                alt="Google Play"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <span>Get App</span>
            </a>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
