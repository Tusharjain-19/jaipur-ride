"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { 
  Play, 
  Smartphone, 
  MapPin, 
  Clock, 
  Compass, 
  ShieldAlert, 
  Download, 
  ArrowRight, 
  Navigation,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SimulationPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("planner");
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

  const appTabs = [
    {
      id: "planner",
      title: "Journey Planner",
      titleHi: "यात्रा योजनाकार",
      icon: <Navigation className="w-5 h-5" />,
      working: {
        en: "Computes route vectors between any of the 11 Pink Line stations. In the Google Play app, this view leverages the native Android Geolocation API to find your nearest station automatically, and triggers haptic vibration warnings as you approach your destination.",
        hi: "सभी 11 पिंक लाइन स्टेशनों के बीच मार्ग की गणना करता है। गूगल प्ले ऐप में, यह दृश्य स्वचालित रूप से आपके निकटतम स्टेशन को खोजने के लिए एंड्रॉइड जियोलोकेशन एपीआई का लाभ उठाता है, और गंतव्य के करीब आने पर हैप्टिक कंपन चेतावनी देता है।"
      },
      nativeFeature: {
        en: "Real-time Proximity Reminders (Vibrates on arrival)",
        hi: "वास्तविक समय निकटता अनुस्मारक (आगमन पर कंपन)"
      }
    },
    {
      id: "stations",
      title: "Metro Stations",
      titleHi: "मेट्रो स्टेशन",
      icon: <MapPin className="w-5 h-5" />,
      working: {
        en: "Displays a complete directory of JMRC station details, layout structures, boarding gates, and facility checklists (ATM, Escalators, Parking). In the Google Play app, all parameters are cached in a local SQLite file so you can look up gates deep underground without internet.",
        hi: "JMRC स्टेशनों के विवरण, द्वार और सुविधाओं (एटीएम, पार्किंग) की सूची दिखाता है। गूगल प्ले ऐप में, सभी पैरामीटर लोकल SQLite फ़ाइल में कैश किए जाते हैं ताकि आप इंटरनेट के बिना भी द्वारों की जानकारी देख सकें।"
      },
      nativeFeature: {
        en: "Zero-Latency Offline SQLite Cache Access",
        hi: "शून्य-विलंबता ऑफ़लाइन SQLite कैश एक्सेस"
      }
    },
    {
      id: "timings",
      title: "Metro Timings",
      titleHi: "मेट्रो समय सारिणी",
      icon: <Clock className="w-5 h-5" />,
      working: {
        en: "Presents schedules for first/last train dispatches from Mansarovar and Badi Chaupar, along with peak-hour frequency loops. In the Play Store app, the timetables update automatically whenever JMRC adjusts operations, keeping your offline timetables 100% accurate.",
        hi: "मानसरोवर और बड़ी चौपड़ से पहली/आखिरी ट्रेन के प्रस्थान समय को दिखाता है। प्ले स्टोर ऐप में, JMRC द्वारा समय में बदलाव करने पर यह स्वचालित रूप से अपडेट हो जाता है।"
      },
      nativeFeature: {
        en: "Automatic Over-The-Air Schedule Synchronization",
        hi: "स्वचालित ओवर-द-एयर शेड्यूल सिंक्रोनाइजेशन"
      }
    },
    {
      id: "explore",
      title: "Explore Jaipur",
      titleHi: "जयपुर घूमें",
      icon: <Compass className="w-5 h-5" />,
      working: {
        en: "Links all tourist landmarks like Hawa Mahal, City Palace, and local heritage markets with their corresponding metro station exits. In the native Android app, we use distance thresholds to estimate walking times and notify you of walking shortcuts.",
        hi: "हवा महल, सिटी पैलेस और स्थानीय विरासत बाजारों को उनके मेट्रो स्टेशनों से जोड़ता है। मूल एंड्रॉइड ऐप में, हम चलने के समय का अनुमान लगाने के लिए दूरी थ्रेशोल्ड का उपयोग करते हैं।"
      },
      nativeFeature: {
        en: "Proximity Walking Guide Computations",
        hi: "निकटता से चलने वाले गाइड की गणना"
      }
    },
    {
      id: "safety",
      title: "Safety & Helpline",
      titleHi: "सुरक्षा और हेल्पलाइन",
      icon: <ShieldAlert className="w-5 h-5" />,
      working: {
        en: "Features direct dialing buttons for metro safety control rooms, JMRC police stations, ambulance networks, and women's safety helplines. The Play Store app supports direct system dialer triggers for emergency calls even in extreme offline scenarios.",
        hi: "मेट्रो सुरक्षा नियंत्रण कक्ष, पुलिस स्टेशनों और महिला सुरक्षा हेल्पलाइन के लिए सीधे डायलिंग बटन प्रदान करता है। प्ले स्टोर ऐप आपातकालीन कॉलों के लिए सीधे सिस्टम डायलर ट्रिगर का समर्थन करता है।"
      },
      nativeFeature: {
        en: "One-Tap Direct Dial System Integration",
        hi: "वन-टैप डायरेक्ट डायल सिस्टम इंटीग्रेशन"
      }
    }
  ];

  const currentTabInfo = appTabs.find(tab => tab.id === activeTab) || appTabs[0];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-navy-deep pt-32 pb-20 text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HEADER SECTION */}
        <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-text-primary tracking-tight">
            {isEn ? "Jaipur Ride Web Simulator" : "जयपुर राइड वेब सिम्युलेटर"}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-text-secondary leading-relaxed font-sans">
            {isEn
              ? "Test the core transit utility directly in your browser. Check routes, ticket rates, and station directions inside our smartphone mockup interface."
              : "सीधे अपने ब्राउज़र में मेट्रो यूटिलिटी का परीक्षण करें। स्मार्टफ़ोन मॉकअप इंटरफ़ेस के भीतर मार्ग, टिकट दरों और स्टेशन दिशाओं की जाँच करें।"}
          </p>
        </div>

        {/* 2. SPLIT SIMULATOR CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Explaining Play Store Tabs */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="bg-white dark:bg-navy-card rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl space-y-6">
              <div className="space-y-2">
                <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-text-primary">
                  {isEn ? "How App Tabs Work on Google Play" : "गूगल प्ले पर ऐप टैब कैसे काम करते हैं"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-text-secondary font-sans">
                  {isEn
                    ? "Tap any tab below to explore its native Android capability and how it enhances your real-world travel."
                    : "अपनी वास्तविक यात्रा को बेहतर बनाने के लिए किसी भी टैब पर टैप करके उसकी मूल एंड्रॉइड क्षमताओं को देखें।"}
                </p>
              </div>

              {/* Tab selector buttons */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                {appTabs.map((tab) => {
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-brand-pink border-brand-pink text-white shadow-md shadow-brand-pink/20 scale-[1.01]"
                          : "bg-light-accent dark:bg-navy-accent/50 border border-light-border dark:border-navy-border/20 text-slate-600 dark:text-text-secondary hover:border-brand-pink/40"
                      }`}
                    >
                      <span className={isSelected ? "text-white" : "text-brand-pink"}>
                        {tab.icon}
                      </span>
                      <span>{isEn ? tab.title : tab.titleHi}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic tab description panel */}
              <div className="bg-light-accent dark:bg-navy-accent/30 rounded-2xl p-5 border border-light-border dark:border-navy-border/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-pink/15 text-brand-pink text-[10px] font-bold uppercase tracking-wider">
                        {isEn ? "Native Tab Behavior" : "मूल टैब व्यवहार"}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-on-surface-variant leading-relaxed font-sans">
                        {isEn ? currentTabInfo.working.en : currentTabInfo.working.hi}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-light-border dark:border-navy-border/20 flex items-start space-x-2 text-xs text-brand-pink font-semibold">
                      <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-text-secondary uppercase tracking-widest font-bold font-heading">
                          {isEn ? "Native Play Store Benefit" : "प्ले स्टोर ऐप का विशेष लाभ"}
                        </p>
                        <p className="mt-0.5 text-slate-900 dark:text-text-primary font-sans">
                          {isEn ? currentTabInfo.nativeFeature.en : currentTabInfo.nativeFeature.hi}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Call to action for Google Play */}
            <div className="bg-linear-to-br from-brand-pink to-brand-pink-dark text-white rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-xl sm:text-2xl">
                  {isEn ? "Ready for the Offline Experience?" : "ऑफ़लाइन अनुभव के लिए तैयार हैं?"}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-sans">
                  {isEn
                    ? "Download the official version from the Google Play Store to unlock continuous location proximity haptics, battery optimizations, and automated station updates."
                    : "कंटीन्यूअस लोकेशन प्रॉक्सिमिटी हैप्टिक्स, बैटरी ऑप्टिमाइज़ेशन और ऑटोमैटिक स्टेशन अपडेट अनलॉक करने के लिए गूगल प्ले स्टोर से आधिकारिक संस्करण डाउनलोड करें।"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-[1.05] active:scale-[0.95] transition-all shrink-0 inline-flex items-center"
                >
                  <Image
                    src="/assets/icons/google-play.svg"
                    alt="Get it on Google Play"
                    width={214}
                    height={64}
                    className="h-[64px] w-auto shrink-0 select-none object-contain"
                  />
                </a>
                <Link
                  href="/download"
                  className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold rounded-xl transition-all flex items-center space-x-2 text-sm hover:scale-[1.02]"
                >
                  <span>{isEn ? "Play Store Guide" : "प्ले स्टोर गाइड"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
          
          {/* Right Side: Smartphone Device Mockup containing simulator iframe */}
          <div className="lg:col-span-6 flex justify-center py-8">
            <div
              className="relative mx-auto w-[290px] h-[580px] min-[360px]:w-[325px] min-[360px]:h-[650px] sm:w-[380px] sm:h-[760px] rounded-[40px] sm:rounded-[48px] border-8 sm:border-10 border-slate-900 dark:border-slate-800 bg-slate-950 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.95)] overflow-hidden"
            >
              {/* Phone Speaker and Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full mb-1"></div>
              </div>

              {/* Simulated app iframe inside screen */}
              <div className="absolute inset-0 w-full h-full bg-navy-deep overflow-hidden">
                <iframe
                  src="/simulator/index.html"
                  className="absolute inset-0 w-full h-full border-none"
                  title="Jaipur Ride App Simulator Sandbox"
                  allow="geolocation"
                  onLoad={handleIframeLoad}
                />
              </div>

              {/* Gloss reflection overlay */}
              <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/0 via-white/5 to-white/10 dark:via-white/2 dark:to-white/5 z-20"></div>

              {/* Home Indicator Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 dark:bg-white/20 rounded-full z-30"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
