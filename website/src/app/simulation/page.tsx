"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
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
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("planner");

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
        en: "Lists world-famous landmarks (Hawa Mahal, Nahargarh Fort, Albert Hall) mapped directly to their nearest transit nodes. In the Play Store app, this tab calculates walking/driving times locally on your device to keep your tourism journey completely private.",
        hi: "निकटतम मेट्रो स्टेशनों से जुड़े प्रसिद्ध स्थलों (हवा महल, नाहरगढ़) को दिखाता है। प्ले स्टोर ऐप में, यह आपकी यात्रा को निजी रखने के लिए स्थानीय स्तर पर दूरी की गणना करता है।"
      },
      nativeFeature: {
        en: "Private Offline Attraction Pathfinder",
        hi: "निजी ऑफ़लाइन पर्यटन स्थल पथप्रदर्शक"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      {/* 1. HEADER SECTION */}
      <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-pink/10 text-brand-pink border border-brand-pink/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === "en" ? "Interactive Web Sandbox" : "इंटरैक्टिव वेब सैंडबॉक्स"}</span>
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
          {language === "en" ? "Jaipur Ride Web Simulator" : "जयपुर राइड वेब सिम्युलेटर"}
        </h1>
        <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
          Test the core transit utility directly in your browser. Check routes, ticket rates, and station directions inside our smartphone mockup interface.
        </p>
      </div>

      {/* 2. SPLIT SIMULATOR CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Explaining Play Store Tabs */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="bg-white dark:bg-navy-dark rounded-[32px] p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl space-y-6">
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-2xl text-foreground">
                How App Tabs Work on Google Play
              </h2>
              <p className="text-sm text-foreground/60">
                Tap any tab below to explore its native Android capability and how it enhances your real-world travel.
              </p>
            </div>

            {/* Tab selector buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2 pt-2">
              {appTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl border text-left text-sm font-semibold transition-all ${
                      isSelected
                        ? "bg-brand-pink border-brand-pink text-white shadow-md shadow-brand-pink/25 scale-[1.01]"
                        : "bg-light-accent dark:bg-navy-card/50 border-light-border dark:border-navy-border/20 text-foreground hover:border-brand-pink/40"
                    }`}
                  >
                    <span className={isSelected ? "text-white" : "text-brand-pink"}>
                      {tab.icon}
                    </span>
                    <span>{language === "en" ? tab.title : tab.titleHi}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic tab description panel */}
            <div className="bg-light-accent dark:bg-navy-deep rounded-2xl p-5 border border-light-border dark:border-navy-border/20">
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
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-brand-pink/15 text-brand-pink text-[10px] font-bold uppercase tracking-wider">
                      {language === "en" ? "Native Tab Behavior" : "मूल टैब व्यवहार"}
                    </span>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                      {language === "en" ? currentTabInfo.working.en : currentTabInfo.working.hi}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-light-border dark:border-navy-border/10 flex items-start space-x-2 text-xs text-brand-pink font-semibold">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold">Native Play Store Benefit</p>
                      <p className="mt-0.5 text-foreground">{language === "en" ? currentTabInfo.nativeFeature.en : currentTabInfo.nativeFeature.hi}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Call to action for Google Play */}
          <div className="bg-gradient-to-br from-brand-pink to-brand-pink-dark text-white rounded-[32px] p-6 lg:p-8 shadow-xl space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xl sm:text-2xl">
                Ready for the Offline Experience?
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Download the official version from the Google Play Store to unlock continuous location proximity haptics, battery optimizations, and automated station updates.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white text-navy-dark hover:bg-slate-100 font-extrabold rounded-2xl shadow-lg transition-all flex items-center space-x-2 text-sm"
              >
                <Play className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>Get it on Google Play</span>
              </a>
              
              <a
                href="/download"
                className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold rounded-2xl transition-all flex items-center space-x-2 text-sm"
              >
                <span>Sideload APK Guide</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Smartphone Device Mockup containing simulator iframe */}
        <div className="lg:col-span-6 flex justify-center">
          
          <div className="relative mx-auto w-[290px] h-[580px] sm:w-[310px] sm:h-[620px] rounded-[48px] border-12 border-slate-900 dark:border-slate-800 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] dark:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
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
              />
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 dark:bg-white/20 rounded-full z-30"></div>
          </div>

        </div>

      </div>

    </div>
  );
}
