"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Smartphone, ShieldAlert, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function JourneyPlannerPage() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isEn = language === "en";

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const iframe = document.querySelector("iframe");
    if (iframe && iframe.contentWindow) {
      try {
        const win = iframe.contentWindow as any;
        if (typeof win.setTheme === "function") {
          win.setTheme(theme);
        }
      } catch (e) {
        console.warn("Iframe not ready or CORS blocker:", e);
      }
    }
  }, [theme]);

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = e.currentTarget;
    if (iframe && iframe.contentWindow) {
      try {
        const win = iframe.contentWindow as any;
        if (typeof win.setTheme === "function") {
          win.setTheme(theme);
        }
      } catch (err) {
        console.warn("Error setting iframe theme on load:", err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Page Title Header */}
      <div className="text-center lg:text-left space-y-4 max-w-3xl">

        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight leading-none">
          {t("plannerTitle")}
        </h1>
        <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
          {isEn 
            ? "Calculate fares, examine transit stations list, and locate platform directions inside a web-based companion simulation." 
            : "वेब-आधारित साथी सिमुलेशन के भीतर किराए की गणना करें, स्टेशनों की सूची देखें और प्लेटफॉर्म की दिशाों का पता लगाएं।"}
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
              <span>{isEn ? "Web Simulation Limit" : "वेब सिमुलेशन सीमा"}</span>
            </h3>
            <p className="text-xs text-foreground/75 leading-relaxed">
              {isEn 
                ? "This web journey planner simulates transit timings and static schedules. Real-time background GPS alerts and station arrival vibrations are ONLY available on the native mobile app."
                : "यह वेब यात्रा नियोजक पारगमन समय और स्थिर कार्यक्रम का अनुकरण करता है। रीयल-टाइम बैकग्राउंड जीपीएस अलर्ट और स्टेशन आगमन कंपन केवल मूल मोबाइल ऐप पर उपलब्ध हैं।"}
            </p>
          </div>

          {/* Quick Specifications Cards */}
          <div className="glass-panel rounded-3xl space-y-5 p-6 shadow-md">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-foreground/60">
              {isEn ? "Simulation Checklist" : "सिमुलेशन चेकलिस्ट"}
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-xs leading-tight">
                <div className="w-6 h-6 rounded-lg bg-brand-pink/15 text-brand-pink flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <p className="font-semibold text-foreground">
                    {isEn ? "Select Station Nodes" : "स्टेशन नोड्स चुनें"}
                  </p>
                  <p className="text-foreground/50 mt-0.5">
                    {isEn ? "Toggle starting points and terminals." : "प्रारंभिक बिंदु और गंतव्य स्टेशन बदलें।"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-xs leading-tight">
                <div className="w-6 h-6 rounded-lg bg-brand-pink/15 text-brand-pink flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <p className="font-semibold text-foreground">
                    {isEn ? "Ticket Fare Audit" : "टिकट किराया गणना"}
                  </p>
                  <p className="text-foreground/50 mt-0.5">
                    {isEn ? "Cash vs. Smart Card value balances." : "नकद बनाम स्मार्ट कार्ड मूल्य की तुलना करें।"}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs leading-tight">
                <div className="w-6 h-6 rounded-lg bg-brand-pink/15 text-brand-pink flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <p className="font-semibold text-foreground">
                    {isEn ? "Platform Guideline" : "प्लेटफॉर्म दिशानिर्देश"}
                  </p>
                  <p className="text-foreground/50 mt-0.5">
                    {isEn ? "Direction labels for easy boarding." : "आसान बोर्डिंग के लिए दिशा निर्देश देखें।"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Download CTA Button - Made Premium */}
          <div className="p-6 bg-linear-to-br from-brand-pink to-brand-pink-dark rounded-3xl text-white shadow-xl shadow-brand-pink/10 space-y-4">
            <h3 className="font-heading font-bold text-lg flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>{isEn ? "Get Android App" : "एंड्रॉइड ऐप प्राप्त करें"}</span>
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              {isEn
                ? "Unlock haptic vibrations, offline emergency details, and live station distance metrics on the Google Play Store."
                : "गूगल प्ले स्टोर से ऐप डाउनलोड करके हैप्टिक वाइब्रेशन, ऑफ़लाइन आपातकालीन विवरण और लाइव स्टेशन दूरी माप अनलॉक करें।"}
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full hover:scale-[1.05] active:scale-[0.95] transition-all shrink-0 inline-flex justify-center"
            >
              <Image
                src="/assets/icons/google-play.svg"
                alt="Get it on Google Play"
                width={214}
                height={64}
                className="h-[64px] w-auto shrink-0 select-none object-contain"
              />
            </a>
          </div>

        </div>

        {/* Right Side: Mock Browser Frame */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Mock Browser Container */}
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[520px] sm:h-[650px] lg:h-[750px]">
            
            {/* Browser Header Bar */}
            <div className="bg-slate-100 dark:bg-navy-deep px-4 py-3 border-b border-light-border dark:border-white/5 flex items-center justify-between shrink-0">
              
              {/* Window controls */}
              <div className="flex items-center space-x-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              </div>

              {/* URL Address Bar */}
              <div className="bg-white dark:bg-navy-card/85 text-[11px] text-foreground/50 border border-light-border dark:border-white/5 px-4 py-1.5 rounded-xl w-3/5 text-center truncate flex items-center justify-center space-x-1.5 font-medium select-none shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>jaipurride.com/simulator</span>
              </div>

              {/* Action buttons */}
              <a
                href="/simulator/index.html"
                target="_blank"
                rel="noreferrer"
                className="p-1 text-foreground/60 hover:text-brand-pink transition-colors"
                title={isEn ? "Open in new window" : "नयी विंडो में खोलें"}
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
                onLoad={handleIframeLoad}
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
