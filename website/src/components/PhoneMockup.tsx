"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const screenshots = [
  { src: "/images/try.jpg", alt: "Jaipur Ride Route Planner Interface" },
  { src: "/images/try2.jpg", alt: "Jaipur Ride Live Journey Simulation" }
];

export default function PhoneMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-[290px] h-[580px] sm:w-[310px] sm:h-[620px] rounded-[48px] border-12 border-slate-900 dark:border-slate-800 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] dark:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
      {/* Speaker and Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center">
        <div className="w-12 h-1 bg-slate-800 rounded-full mb-1"></div>
      </div>

      {/* Screen Container */}
      <div className="absolute inset-0 w-full h-full bg-navy-deep overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={screenshots[currentIndex].src}
              alt={screenshots[currentIndex].alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 290px, 310px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gloss reflection overlay */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/0 via-white/5 to-white/10 dark:via-white/2 dark:to-white/5 z-20"></div>
      </div>

      {/* Home Indicator Bar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 dark:bg-white/20 rounded-full z-30"></div>
    </div>
  );
}
