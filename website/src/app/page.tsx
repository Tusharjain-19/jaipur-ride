"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PhoneMockup from "@/components/PhoneMockup";
import statistics from "@/data/statistics.json";
import faqData from "@/data/faq.json";
import tourismData from "@/data/tourism.json";
import { useLanguage } from "@/context/LanguageContext";
import {
  playMetroHorn,
  playDoorOpen,
  playDoorClose,
  playStationAmbience,
  stopStationAmbience
} from "@/components/audioHelper";
import {
  Train as TrainIcon,
  Map,
  Compass,
  Download,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Smartphone,
  Check,
  Volume2,
  VolumeX
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const features = [
  {
    icon: <Compass className="w-6 h-6 text-brand-pink" />,
    title: "Offline Journey Planner",
    titleHi: "ऑफलाइन यात्रा योजनाकार",
    desc: "Calculate routes, ticket fares, and platform numbers completely offline.",
    descHi: "पूरी तरह से ऑफ़लाइन मार्ग, टिकट किराया और प्लेटफ़ॉर्म नंबरों की गणना करें।"
  },
  {
    icon: <Map className="w-6 h-6 text-brand-pink" />,
    title: "Live GPS Tracking",
    titleHi: "लाइव जीपीएस ट्रैकिंग",
    desc: "Track your metro journey in real-time with accurate distance to your stop.",
    descHi: "अपने स्टॉप की सटीक दूरी के साथ वास्तविक समय में अपनी मेट्रो यात्रा को ट्रैक करें।"
  },
  {
    icon: <Smartphone className="w-6 h-6 text-brand-pink" />,
    title: "Bilingual Support",
    titleHi: "द्विभाषी सहायता",
    desc: "Seamlessly transition between English and Hindi for all station details.",
    descHi: "सभी स्टेशन विवरणों के लिए अंग्रेजी और हिंदी के बीच आसानी से बदलें।"
  },
  {
    icon: <Shield className="w-6 h-6 text-brand-pink" />,
    title: "Zero Ads & Privacy-First",
    titleHi: "शून्य विज्ञापन और गोपनीयता-प्रथम",
    desc: "Enjoy a completely ad-free, clutter-free utility app with zero tracking.",
    descHi: "शून्य ट्रैकिंग के साथ पूरी तरह से विज्ञापन-मुक्त, अव्यवस्था-मुक्त उपयोगिता ऐप का आनंद लें।"
  }
];

const testimonials = [
  {
    content: "Jaipur Ride made my tourist experience so easy! I could find the closest metro station to Hawa Mahal and check the fare offline without internet.",
    contentHi: "जयपुर राइड ने मेरे पर्यटक अनुभव को बहुत आसान बना दिया! मैं हवा महल के निकटतम मेट्रो स्टेशन को खोज सका और बिना इंटरनेट के ऑफ़लाइन किराया देख सका।",
    name: "Aarav Mehta",
    role: "Tourist from Mumbai",
    roleHi: "मुंबई से पर्यटक"
  },
  {
    content: "As a daily commuter, the live GPS tracking and offline capabilities are life-savers. Highly recommend this app to anyone traveling in Jaipur.",
    contentHi: "एक दैनिक यात्री के रूप में, लाइव जीपीएस ट्रैकिंग और ऑफ़लाइन क्षमताएं जीवनरक्षक हैं। जयपुर में यात्रा करने वाले किसी भी व्यक्ति को इस ऐप की अत्यधिक अनुशंसा करते हैं।",
    name: "Priya Sharma",
    role: "Daily Commuter",
    roleHi: "दैनिक यात्री"
  }
];

export default function Home() {
  const { t, language } = useLanguage();
  const router = useRouter();

  // Intro states
  const [introPlayed, setIntroPlayed] = useState(false);
  const [timelineStep, setTimelineStep] = useState("idle");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Scroll frame animation states
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Statistics counters
  const [downloadCount, setDownloadCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);

  // Scroll storytelling tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Global page scroll (for station timeline indicator)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const trainY = useTransform(springScroll, [0, 1], [0, 360]);

  // Hero section container scroll
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(heroScrollY, [0, 0.9], [1, 15]);

  // Track page section indices to highlight station stops on scroll
  const [activeStationIdx, setActiveStationIdx] = useState(0);

  // Preload hero frame assets on mount
  useEffect(() => {
    for (let i = 1; i <= 15; i++) {
      const img = new window.Image();
      img.src = `/assets/hero/frame_${String(i).padStart(2, "0")}.png`;
    }
  }, []);

  // Monitor scroll progress of the hero section
  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      // Disengage autoplay once user starts scrolling
      if (latest > 1.05) {
        setIsAutoPlaying(false);
      }
      if (!isAutoPlaying) {
        const rounded = Math.min(15, Math.max(1, Math.round(latest)));
        setCurrentFrame(rounded);
        if (rounded === 15) {
          setTimelineStep("complete");
          setIntroPlayed(true);
        }
      }
    });
    return () => unsubscribe();
  }, [frameIndex, isAutoPlaying]);

  // Autoplay cinematic timeline if user is idle at top of page
  useEffect(() => {
    if (isAutoPlaying) {
      let frame = 1;
      const interval = setInterval(() => {
        frame += 1;
        if (frame > 15) {
          clearInterval(interval);
          setTimelineStep("complete");
          setIntroPlayed(true);
        } else {
          setCurrentFrame(frame);
          if (frame === 4 && soundEnabled) {
            playMetroHorn();
          }
          if (frame === 9 && soundEnabled) {
            playDoorOpen();
          }
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, soundEnabled]);

  // Trigger audio feedback on specific frame thresholds during scroll
  const lastPlayedFrame = useRef(1);
  useEffect(() => {
    if (!isAutoPlaying && soundEnabled) {
      if (currentFrame === 4 && lastPlayedFrame.current !== 4) {
        playMetroHorn();
      }
      if (currentFrame === 9 && lastPlayedFrame.current !== 9) {
        playDoorOpen();
      }
      lastPlayedFrame.current = currentFrame;
    }
  }, [currentFrame, isAutoPlaying, soundEnabled]);

  // Sync station nodes with overall scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.2) setActiveStationIdx(0);       // Mansarovar (Hero)
      else if (latest < 0.4) setActiveStationIdx(1);  // Civil Lines (Stats)
      else if (latest < 0.6) setActiveStationIdx(2);  // Sindhi Camp (Features)
      else if (latest < 0.8) setActiveStationIdx(3);  // Chandpole (Explore)
      else setActiveStationIdx(4);                    // Badi Chaupar (Download)
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Animate statistics counter when hero transition completes
  useEffect(() => {
    if (currentFrame >= 11) {
      let dl = 0;
      let users = 0;
      const interval = setInterval(() => {
        dl += 2000;
        users += 500;
        if (dl >= 50000) {
          setDownloadCount(50000);
          setActiveUsersCount(12000);
          clearInterval(interval);
        } else {
          setDownloadCount(dl);
          setActiveUsersCount(users);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [currentFrame]);

  // Sound toggling logic
  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      playStationAmbience();
      playMetroHorn();
    } else {
      stopStationAmbience();
    }
  };

  // Handle CTA simulator click with interactive door closing animation
  const handleTrySimulation = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isNavigating) return;
    setIsNavigating(true);
    setIsAutoPlaying(false);

    if (soundEnabled) {
      playDoorClose();
    }

    let frame = currentFrame;
    const interval = setInterval(() => {
      frame -= 1;
      if (frame < 8) {
        clearInterval(interval);
        setTimeout(() => {
          stopStationAmbience();
          router.push("/simulation");
        }, 400);
      } else {
        setCurrentFrame(frame);
      }
    }, 100);
  };

  // Scroll metro stations
  const metroStations = [
    { name: "Mansarovar", id: "J01", label: "Hero Center" },
    { name: "Civil Lines", id: "J03", label: "Ridership Stats" },
    { name: "Sindhi Camp", id: "J07", label: "Core Features" },
    { name: "Chandpole", id: "J09", label: "Explore Guide" },
    { name: "Badi Chaupar", id: "J11", label: "Download App" },
  ];

  return (
    <div ref={containerRef} className="space-y-24 pb-24 overflow-hidden relative min-h-screen">
      
      {/* Sound Toggle Floating Control */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggleSound}
          className={`p-3.5 rounded-full shadow-lg transition-all flex items-center justify-center space-x-2 border ${
            soundEnabled 
              ? "bg-brand-pink text-white border-brand-pink animate-pulse" 
              : "bg-white dark:bg-navy-card text-foreground/60 border-light-border dark:border-navy-border/40"
          }`}
          title="Toggle Station Audio"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          <span className="text-xs font-bold hidden md:inline">
            {soundEnabled ? "Audio Active" : "Enable Audio"}
          </span>
        </button>
      </div>

      {/* VERTICAL SCROLL STORYTELLER TIMELINE (Desktop Only) */}
      <div className="hidden lg:block fixed left-6 top-1/4 h-[400px] w-48 z-40">
        
        {/* Track Line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-1 bg-slate-200 dark:bg-navy-border/50 rounded-full"></div>
        
        {/* Active Track Highlight */}
        <motion.div
          className="absolute left-[15px] top-4 w-1 bg-brand-pink rounded-full origin-top"
          style={{ height: trainY }}
        ></motion.div>

        {/* Floating Mini Metro Train */}
        <motion.div
          className="absolute left-[7px] w-[20px] h-[20px] rounded-lg bg-brand-pink text-white flex items-center justify-center shadow-lg border border-white z-50 pointer-events-none"
          style={{ y: trainY }}
        >
          <TrainIcon className="w-3 h-3" />
        </motion.div>

        {/* Station Markers */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 pl-8 text-xs font-semibold select-none">
          {metroStations.map((station, idx) => {
            const isActive = idx === activeStationIdx;
            return (
              <div key={idx} className="relative flex items-center h-6">
                
                {/* Station Node Indicator Dot */}
                <div
                  className={`absolute left-[-29px] w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isActive 
                      ? "bg-white border-brand-pink scale-125 shadow-[0_0_8px_#ec4899]" 
                      : idx < activeStationIdx
                      ? "bg-brand-pink border-brand-pink"
                      : "bg-slate-100 dark:bg-navy-card border-slate-300 dark:border-navy-border"
                  }`}
                ></div>

                {/* Station labels */}
                <div className="flex flex-col text-left">
                  <span className={`leading-none transition-colors ${isActive ? "text-brand-pink font-bold text-sm" : "text-foreground/50 text-[11px]"}`}>
                    {station.name} ({station.id})
                  </span>
                  {isActive && (
                    <span className="text-[10px] text-foreground/40 font-normal leading-none mt-0.5">
                      {station.label}
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 1. CINEMATIC HERO SECTION */}
      <div ref={heroContainerRef} className="relative h-[300vh] w-full bg-white dark:bg-navy-deep">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
          
          {/* Frame Background */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src={`/assets/hero/frame_${String(currentFrame).padStart(2, "0")}.png`}
              alt="Jaipur Metro Station"
              className="w-full h-full object-cover transition-all duration-300 ease-out"
            />
            {/* Dark radial overlay to ensure text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/60"></div>
          </div>

          {/* Skip Intro Overlay */}
          {isAutoPlaying && currentFrame < 15 && (
            <div className="absolute top-24 right-6 z-35">
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentFrame(15);
                  setTimelineStep("complete");
                  setIntroPlayed(true);
                }}
                className="px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-full transition-all border border-white/10"
              >
                Skip Intro ➔
              </button>
            </div>
          )}

          {/* Main Content Layout */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-12 flex-1 flex flex-col justify-between">
            
            <div className="w-full flex justify-between items-center">
              {/* Optional top spacer or logo container */}
            </div>

            {/* Dynamic Content overlays corresponding to scroll progression */}
            <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto space-y-6">
              
              {/* Text overlays mapped to frames */}
              {currentFrame <= 3 && (
                <motion.div
                  key="scene-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h1 className="font-heading font-extrabold text-5xl sm:text-8xl text-white tracking-tight drop-shadow-md">
                    Jaipur Ride
                  </h1>
                  <p className="text-lg sm:text-2xl text-white/90 font-medium tracking-wide">
                    {language === "en" ? "The Journey Begins at Mansarovar" : "यात्रा मानसरोवर से शुरू होती है"}
                  </p>
                </motion.div>
              )}

              {currentFrame >= 4 && currentFrame <= 6 && (
                <motion.div
                  key="scene-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-pink/20 text-brand-pink border border-brand-pink/30 backdrop-blur-md">
                    🔔 Train Approaching
                  </span>
                  <h1 className="font-heading font-extrabold text-4xl sm:text-7xl text-white tracking-tight drop-shadow-lg leading-tight">
                    {language === "en" ? "Step Onto the Platform" : "प्लेटफ़ॉर्म पर कदम रखें"}
                  </h1>
                  <p className="max-w-2xl text-sm sm:text-lg text-white/80">
                    {language === "en" ? "Watch the Jaipur Metro Pink Line arrive in real-time." : "जयपुर मेट्रो पिंक लाइन को वास्तविक समय में आते हुए देखें।"}
                  </p>
                </motion.div>
              )}

              {currentFrame >= 7 && currentFrame <= 10 && (
                <motion.div
                  key="scene-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                    ✓ Arrived & Docked
                  </span>
                  <h1 className="font-heading font-extrabold text-4xl sm:text-7xl text-white tracking-tight drop-shadow-lg leading-tight">
                    {language === "en" ? "Doors Opening..." : "दरवाजे खुल रहे हैं..."}
                  </h1>
                  <p className="max-w-2xl text-sm sm:text-lg text-white/80">
                    {language === "en" ? "Stand behind the yellow safety line and prepare to board." : "पीली सुरक्षा रेखा के पीछे खड़े रहें और चढ़ने के लिए तैयार हों।"}
                  </p>
                </motion.div>
              )}

              {currentFrame >= 11 && (
                <motion.div
                  key="scene-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full flex flex-col items-center text-center space-y-6"
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-pink/20 text-brand-pink border border-brand-pink/30 backdrop-blur-md">
                    🚀 {t("appVersionLabel")}
                  </span>
                  
                  <h1 className="font-heading font-extrabold text-4xl sm:text-7xl text-white tracking-tight leading-tight drop-shadow-lg">
                    {language === "en" ? (
                      <>Explore Jaipur Metro <br className="hidden sm:inline" /><span className="bg-linear-to-r from-brand-pink to-brand-pink-light bg-clip-text text-transparent">Smarter</span>.</>
                    ) : (
                      <>जयपुर मेट्रो को <br className="hidden sm:inline" /><span className="bg-linear-to-r from-brand-pink to-brand-pink-light bg-clip-text text-transparent">स्मार्टली</span> समझें।</>
                    )}
                  </h1>

                  <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/95 leading-relaxed drop-shadow-md">
                    {t("heroSubtitle")}
                  </p>

                  {/* Cinematic CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto z-30">
                    <button
                      onClick={handleTrySimulation}
                      className="w-full sm:w-auto px-8 py-4 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-2xl text-base font-bold shadow-lg shadow-brand-pink/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer border-none"
                    >
                      <TrainIcon className="w-5 h-5 animate-pulse" />
                      <span>{t("btnTryOnline")}</span>
                    </button>
                    
                    <Link
                      href="/download"
                      className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl text-base font-bold border border-white/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-sm"
                    >
                      <Download className="w-5 h-5 text-brand-pink animate-bounce" />
                      <span>{t("btnDownloadApp")}</span>
                    </Link>
                  </div>
                  
                  <div className="flex justify-center space-x-6 pt-2 text-white/70 text-xs">
                    <span className="flex items-center space-x-1.5"><Check className="w-4 h-4 text-emerald-400" /> <span>Offline Maps</span></span>
                    <span className="flex items-center space-x-1.5"><Check className="w-4 h-4 text-emerald-400" /> <span>Zero Ads</span></span>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Scroll Indicator */}
            {currentFrame < 15 && (
              <div className="w-full flex flex-col items-center space-y-2 text-white/60 animate-bounce">
                <span className="text-[11px] font-bold uppercase tracking-widest">Scroll to Board</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 2. STATISTICS COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-[32px] p-8 lg:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-pink tracking-tight">
                {timelineStep === "complete" ? "50,000+" : `${downloadCount.toLocaleString()}+`}
              </p>
              <p className="text-xs sm:text-sm text-foreground/65 font-semibold">{t("statsDownloads")}</p>
            </div>
            <div className="space-y-2 border-l border-light-border dark:border-navy-border/30">
              <p className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight">
                {timelineStep === "complete" ? "12,000+" : `${activeUsersCount.toLocaleString()}+`}
              </p>
              <p className="text-xs sm:text-sm text-foreground/65 font-semibold">{t("statsActiveUsers")}</p>
            </div>
            <div className="space-y-2 border-l border-light-border dark:border-navy-border/30">
              <p className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight">
                {statistics.totalStations}
              </p>
              <p className="text-xs sm:text-sm text-foreground/65 font-semibold">{t("statsStations")}</p>
            </div>
            <div className="space-y-2 border-l border-light-border dark:border-navy-border/30">
              <p className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight">
                {statistics.touristAttractions}
              </p>
              <p className="text-xs sm:text-sm text-foreground/65 font-semibold">{t("statsAttractions")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            {language === "en" ? "Designed for Commuters & Tourists" : "यात्रियों और पर्यटकों के लिए निर्मित"}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-foreground/60">
            Jaipur Ride bridges the gap between fast route estimation and rich historical tour guides.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-navy-card hover:bg-light-accent dark:hover:bg-navy-accent/20 border border-light-border dark:border-navy-border/40 p-6 rounded-3xl transition-all duration-300 shadow-md hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                {language === "en" ? feat.title : feat.titleHi}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {language === "en" ? feat.desc : feat.descHi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PREVIEW MAP & SIMULATION LINK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
              {language === "en" ? "Simulate Routes Instantly" : "मार्गों का तुरंत सिमुलेशन करें"}
            </h2>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              Don&apos;t wait until you stand inside the station. Estimate your cash or smart-card ticket fare, examine the intermediates stops lists, and find the correct platform numbers directly from any browser.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Zero location permissions needed</span>
              </div>
              <div className="flex items-center space-x-2.5 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Cash vs Smart Card fare calculations</span>
              </div>
              <div className="flex items-center space-x-2.5 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Platform directions included</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/journey-planner"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white font-bold rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                <span>Open Journey Planner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group min-h-[300px]">
            {/* Background Map teaser graphic */}
            <div className="absolute right-0 bottom-0 opacity-20 dark:opacity-10 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
              <Image src="/images/metro_map.jpg" alt="Map Grid" width={400} height={250} className="object-cover" />
            </div>
            
            <div className="space-y-4 max-w-lg relative z-10">
              <span className="px-3 py-1 bg-brand-pink/15 text-brand-pink text-xs font-bold rounded-lg uppercase tracking-wider inline-block">
                Interactive SVG Route
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-foreground">
                Line 1: Pink Line map Guide
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Examine the complete layout of Jaipur Metro Line 1. Hover nodes to view opening dates, platforms configuration, and connectivity routes.
              </p>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/metro-map"
                className="inline-flex items-center space-x-1 text-sm font-bold text-brand-pink hover:text-brand-pink-dark group"
              >
                <span>Open Interactive Map</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TOURIST CARDS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
              {language === "en" ? "Explore Historical Sightseeing" : "ऐतिहासिक पर्यटन स्थलों को खोजें"}
            </h2>
            <p className="text-sm sm:text-base text-foreground/60">
              Find the nearest metro stations and walking distance to Jaipur&apos;s landmarks.
            </p>
          </div>
          <Link
            href="/explore-jaipur"
            className="flex items-center space-x-2 text-sm font-bold text-brand-pink hover:text-brand-pink-dark group whitespace-nowrap"
          >
            <span>View All Attractions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tourismData.slice(11, 14).map((att) => (
            <div
              key={att.id}
              className="bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
                <Image
                  src={att.image}
                  alt={att.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-pink/15 text-brand-pink font-semibold">
                      {att.type}
                    </span>
                    <span className="text-foreground/50">{att.entry_fee}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground">
                    {language === "en" ? att.name : att.nameHi}
                  </h3>
                  <p className="text-xs text-foreground/75 leading-relaxed line-clamp-2">
                    {language === "en" ? att.summary : att.summaryHi}
                  </p>
                </div>

                <div className="pt-4 border-t border-light-border dark:border-navy-border/20 text-xs flex justify-between items-center text-foreground/60 font-medium">
                  <span>Metro: {att.stationId}</span>
                  <span>{att.walk_time_min ? `${att.walk_time_min} min walk` : `${att.approx_drive_time_min} min drive`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURE COMPARISON MATRIX (APP VS WEB) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-[32px] p-8 lg:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl text-foreground tracking-tight">
              {language === "en" ? "Native Android Client vs. Web Sandbox" : "एंड्रॉइड ऐप बनाम वेब सैंडबॉक्स"}
            </h2>
            <p className="text-sm text-foreground/60 leading-relaxed">
              While our website is optimized for quick reference and search engines, the official Play Store app offers direct hardware level integration for commuters.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-light-border dark:border-navy-border/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-light-accent dark:bg-navy-deep border-b border-light-border dark:border-navy-border/20 text-sm">
                  <th className="p-4 text-xs font-bold uppercase text-foreground/60 tracking-wider">Features</th>
                  <th className="p-4 text-xs font-bold uppercase text-brand-pink tracking-wider text-center">Android Companion App</th>
                  <th className="p-4 text-xs font-bold uppercase text-foreground/60 tracking-wider text-center">Web Sandbox Simulation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-navy-border/10 text-sm">
                <tr>
                  <td className="p-4 font-semibold text-foreground">100% Offline Database (SQLite)</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="p-4 text-center text-foreground/40">—</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">Live GPS Train Route Calculations</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">Arrival Vibration Alerts (Native Haptic)</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="p-4 text-center text-foreground/40">—</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">One-Tap Emergency Hotline Dialer</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="p-4 text-center text-foreground/40">—</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">Over-The-Air Database Updates</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="p-4 text-center text-foreground/40">—</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground">Low Battery Geo-Fencing Service</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="p-4 text-center text-foreground/40">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. APP DOWNLOAD BANNER (QR Code & Version notes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-linear-to-r from-brand-pink to-brand-pink-dark rounded-[36px] p-8 lg:p-16 text-white shadow-xl shadow-brand-pink/10 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Texts */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
                {t("downloadTitle")}
              </h2>
              <p className="max-w-2xl text-white/80 leading-relaxed text-sm sm:text-base">
                {t("downloadSubtitle")}
              </p>

              {/* Release Notes */}
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-xl text-left space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Shield className="w-4 h-4" />
                  <span>Release Notes (v2.0.4)</span>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  • Fixed Lucide offline visuals for true network disconnection capability. <br />
                  • Refined modal permission checks under Android target nodes. <br />
                  • Local storage localization state sync updates.
                </p>
                <div className="text-[10px] text-white/60">
                  Minimum version: Android 7.0 (Nougat) • Size: 53.4 MB
                </div>
              </div>
            </div>

            {/* Badges and QR */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-6">
              <div className="bg-white p-4 rounded-3xl shadow-lg shadow-black/15 flex flex-col items-center space-y-2">
                <svg className="w-36 h-36 text-slate-900" viewBox="0 0 100 100">
                  <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="10" y="10" width="15" height="15" fill="currentColor" />
                  <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="75" y="10" width="15" height="15" fill="currentColor" />
                  <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="10" y="75" width="15" height="15" fill="currentColor" />
                  <rect x="35" y="15" width="10" height="10" fill="currentColor" />
                  <rect x="40" y="35" width="15" height="5" fill="currentColor" />
                  <rect x="15" y="45" width="5" height="15" fill="currentColor" />
                  <rect x="45" y="70" width="10" height="15" fill="currentColor" />
                  <rect x="70" y="45" width="20" height="10" fill="currentColor" />
                  <rect x="55" y="55" width="10" height="10" fill="currentColor" />
                  <rect x="75" y="75" width="15" height="15" fill="currentColor" />
                </svg>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Scan to Download</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link
                  href="/download"
                  className="px-6 py-3 bg-white hover:bg-slate-100 text-brand-pink-dark font-extrabold rounded-2xl shadow-md transition-all text-sm flex items-center justify-center space-x-2 hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  <span>Get App Info & APK</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading font-extrabold text-3xl text-foreground tracking-tight">
            What Commuters Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-navy-dark rounded-3xl p-8 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6"
            >
              <div className="flex space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed italic">
                &ldquo;{language === "en" ? test.content : test.contentHi}&rdquo;
              </p>
              <div className="flex items-center space-x-3 pt-4 border-t border-light-border dark:border-navy-border/20">
                <div>
                  <p className="font-bold text-foreground">{test.name}</p>
                  <p className="text-xs text-foreground/50">{language === "en" ? test.role : test.roleHi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            {t("faqTitle")}
          </h2>
          <p className="text-sm text-foreground/60">
            {t("faqSubtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <details
              key={faq.id}
              className="group bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer focus:outline-none select-none">
                <h3 className="font-heading font-bold text-base text-foreground group-hover:text-brand-pink transition-colors pr-4">
                  {language === "en" ? faq.question : faq.questionHi}
                </h3>
                <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                  <svg
                     fill="none"
                     height="24"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2.5"
                     viewBox="0 0 24 24"
                     width="24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/20 pt-4 bg-light-accent/30 dark:bg-navy-card/10">
                <p>{language === "en" ? faq.answer : faq.answerHi}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
