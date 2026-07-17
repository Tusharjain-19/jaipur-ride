"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Train,
  MapPin,
  Navigation,
  Shield,
  Clock,
  Wifi,
  WifiOff,
  Bell,
  BatteryFull,
  Signal,
  ChevronRight,
  Compass,
  Vibrate,
  ArrowRight,
  ArrowUpDown,
  Sparkles,
  Phone,
  ShieldAlert,
  Sun,
  Moon,
  X,
  ArrowLeft,
  Check,
} from "lucide-react";

// Simulation steps defining the walkthrough storyline
type SimStep =
  | "splash"
  | "plan-idle"
  | "plan-toggle-theme"
  | "plan-select-from"
  | "plan-select-to"
  | "plan-click-route"
  | "results"
  | "live-journey-intro"
  | "live-journey-moving-1" // Mansarovar depart
  | "live-journey-moving-2" // Railway Station (vibration alert + shake)
  | "live-journey-moving-3" // Sindhi Camp
  | "live-journey-arrived"  // Badi Chaupar (arrived + explore popup)
  | "live-journey-finish"   // click Finish
  | "stations-tab"          // switch to Stations tab
  | "stations-click-detail" // click Sindhi Camp
  | "stations-detail-open"  // detail modal open
  | "stations-close-detail" // close details
  | "timings-tab"           // switch to Timings tab
  | "timings-idle"          // timings screen shown
  | "explore-tab"           // switch to Explore tab
  | "explore-click-card"    // click Hawa Mahal
  | "explore-detail-open"   // Hawa Mahal details
  | "explore-back"          // click back
  | "safety-tab"            // switch to Safety tab
  | "safety-idle";          // safety contacts list

interface StepConfig {
  step: SimStep;
  duration: number;
}

// Stations list matching JMRC Line 1
const STATIONS = [
  { name: "Mansarovar", hindi: "मानसरोवर", type: "Elevated", facilities: ["Parking", "Toilet", "Lift", "Escalator"] },
  { name: "New Aatish Market", hindi: "नया आतिश मार्केट", type: "Elevated", facilities: ["Toilet", "Lift"] },
  { name: "Vivek Vihar", hindi: "विवेक विहार", type: "Elevated", facilities: ["Parking", "Toilet", "Lift"] },
  { name: "Shyam Nagar", hindi: "श्याम नगर", type: "Elevated", facilities: ["Toilet", "Lift", "Escalator"] },
  { name: "Ram Nagar", hindi: "राम नगर", type: "Elevated", facilities: ["Toilet", "Lift"] },
  { name: "Civil Lines", hindi: "सिविल लाइन्स", type: "Elevated", facilities: ["Parking", "Toilet", "Lift", "Escalator"] },
  { name: "Railway Station", hindi: "रेलवे स्टेशन", type: "Elevated", facilities: ["Toilet", "Lift", "Escalator", "Connectivity"] },
  { name: "Sindhi Camp", hindi: "सिंधी कैंप", type: "Elevated", facilities: ["Toilet", "Lift", "Escalator", "Connectivity"] },
  { name: "Chandpole", hindi: "चांदपोल", type: "Underground", facilities: ["Toilet", "Lift"] },
  { name: "Chhoti Chaupar", hindi: "छोटी चौपड़", type: "Underground", facilities: ["Toilet", "Lift", "Escalator"] },
  { name: "Badi Chaupar", hindi: "बड़ी चौपड़", type: "Underground", facilities: ["Toilet", "Lift", "Escalator"] },
];

export default function PhoneMockup() {
  const [simStep, setSimStep] = useState<SimStep>("splash");
  const [simTheme, setSimTheme] = useState<"light" | "dark">("light");
  const [statusBarTime, setStatusBarTime] = useState("08:00");

  // Keep simulated time updated
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setStatusBarTime(
        `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Main chronological simulation loop
  useEffect(() => {
    const stepsList: StepConfig[] = [
      { step: "splash", duration: 2600 },
      { step: "plan-idle", duration: 1800 },
      { step: "plan-toggle-theme", duration: 1600 },
      { step: "plan-select-from", duration: 1600 },
      { step: "plan-select-to", duration: 1600 },
      { step: "plan-click-route", duration: 1400 },
      { step: "results", duration: 2500 },
      { step: "live-journey-intro", duration: 1500 },
      { step: "live-journey-moving-1", duration: 1800 },
      { step: "live-journey-moving-2", duration: 3200 }, // Railway Station (Haptic Shake)
      { step: "live-journey-moving-3", duration: 2000 },
      { step: "live-journey-arrived", duration: 3800 },  // Badi Chaupar (Explore popup)
      { step: "live-journey-finish", duration: 1500 },
      { step: "stations-tab", duration: 1500 },
      { step: "stations-click-detail", duration: 1500 },
      { step: "stations-detail-open", duration: 2500 },
      { step: "stations-close-detail", duration: 1400 },
      { step: "timings-tab", duration: 1500 },
      { step: "timings-idle", duration: 2200 },
      { step: "explore-tab", duration: 1500 },
      { step: "explore-click-card", duration: 1600 },
      { step: "explore-detail-open", duration: 3000 },
      { step: "explore-back", duration: 1500 },
      { step: "safety-tab", duration: 1500 },
      { step: "safety-idle", duration: 2200 },
    ];

    let currentIdx = 0;
    let timer: NodeJS.Timeout;

    const runStep = () => {
      const current = stepsList[currentIdx];
      setSimStep(current.step);

      // Handle simulated theme changes dynamically in sync with simulation steps
      if (current.step === "splash") {
        setSimTheme("light");
      } else if (current.step === "plan-toggle-theme") {
        setSimTheme("dark");
      }

      timer = setTimeout(() => {
        currentIdx = (currentIdx + 1) % stepsList.length;
        runStep();
      }, current.duration);
    };

    runStep();
    return () => clearTimeout(timer);
  }, []);

  // Determine current active bottom nav tab based on simulation step
  const getActiveTab = () => {
    if (simStep === "splash") return null;
    if (
      simStep.startsWith("plan-") ||
      simStep === "results" ||
      simStep.startsWith("live-journey-")
    ) {
      return "plan";
    }
    if (simStep.startsWith("stations-")) {
      return "stations";
    }
    if (simStep.startsWith("timings-")) {
      return "timings";
    }
    if (simStep.startsWith("explore-")) {
      return "explore";
    }
    if (simStep.startsWith("safety-")) {
      return "safety";
    }
    return "plan";
  };

  const activeTab = getActiveTab();

  // Virtual cursor positions (x, y percentages relative to inner screen)
  const getCursorProps = () => {
    switch (simStep) {
      case "splash":
        return { x: "50%", y: "50%", opacity: 0, clicked: false };
      case "plan-idle":
        return { x: "50%", y: "60%", opacity: 1, clicked: false };
      case "plan-toggle-theme":
        return { x: "78%", y: "11%", opacity: 1, clicked: true };
      case "plan-select-from":
        return { x: "50%", y: "24%", opacity: 1, clicked: true };
      case "plan-select-to":
        return { x: "50%", y: "37%", opacity: 1, clicked: true };
      case "plan-click-route":
        return { x: "50%", y: "49%", opacity: 1, clicked: true };
      case "results":
        return { x: "50%", y: "83%", opacity: 1, clicked: true };
      case "live-journey-intro":
      case "live-journey-moving-1":
      case "live-journey-moving-2":
      case "live-journey-moving-3":
      case "live-journey-arrived":
        return { x: "50%", y: "50%", opacity: 0, clicked: false };
      case "live-journey-finish":
        return { x: "50%", y: "91%", opacity: 1, clicked: true };
      case "stations-tab":
        return { x: "30%", y: "95%", opacity: 1, clicked: true };
      case "stations-click-detail":
        return { x: "50%", y: "30%", opacity: 1, clicked: true };
      case "stations-detail-open":
        return { x: "50%", y: "50%", opacity: 0, clicked: false };
      case "stations-close-detail":
        return { x: "88%", y: "24%", opacity: 1, clicked: true };
      case "timings-tab":
        return { x: "50%", y: "95%", opacity: 1, clicked: true };
      case "timings-idle":
        return { x: "50%", y: "50%", opacity: 0, clicked: false };
      case "explore-tab":
        return { x: "70%", y: "95%", opacity: 1, clicked: true };
      case "explore-click-card":
        return { x: "32%", y: "42%", opacity: 1, clicked: true };
      case "explore-detail-open":
        return { x: "50%", y: "50%", opacity: 0, clicked: false };
      case "explore-back":
        return { x: "12%", y: "11%", opacity: 1, clicked: true };
      case "safety-tab":
        return { x: "90%", y: "95%", opacity: 1, clicked: true };
      case "safety-idle":
        return { x: "50%", y: "50%", opacity: 0, clicked: false };
      default:
        return { x: "50%", y: "50%", opacity: 0, clicked: false };
    }
  };

  const cursor = getCursorProps();
  const isDark = simTheme === "dark";
  const isShaking = simStep === "live-journey-moving-2";

  return (
    <motion.div
      className={`relative mx-auto w-[285px] h-[580px] sm:w-[315px] sm:h-[630px] rounded-[48px] border-10 border-slate-900 dark:border-slate-800 bg-slate-950 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.55)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)] overflow-hidden transition-colors duration-300`}
      initial={{ y: 30, opacity: 0 }}
      animate={
        isShaking
          ? {
              y: [0, -3, 3, -3, 3, -2, 2, 0],
              x: [0, 2, -2, 2, -2, 1, -1, 0],
              scale: 1.01,
            }
          : { y: 0, opacity: 1 }
      }
      transition={
        isShaking
          ? { duration: 0.4, repeat: 3, ease: "easeInOut" }
          : { duration: 0.8, delay: 0.2 }
      }
    >
      {/* 1. APPLE DYNAMIC ISLAND/NOTCH */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 dark:bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-1 bg-slate-800 dark:bg-slate-700 rounded-full mb-0.5" />
      </div>

      {/* 2. STATS BAR (iOS styled) */}
      <div className="absolute top-0 left-0 right-0 z-40 px-5 pt-1.5 pb-1 flex items-center justify-between text-[9px] font-semibold text-white pointer-events-none bg-slate-950/20 backdrop-blur-[2px]">
        <span>{statusBarTime}</span>
        <div className="flex items-center space-x-1">
          <Signal className="w-2.5 h-2.5 text-white fill-white/80" />
          <Wifi className="w-2.5 h-2.5 text-white" />
          <BatteryFull className="w-3.5 h-2 text-white" />
        </div>
      </div>

      {/* 3. SIMULATED APP INNER VIEWPORT */}
      <div
        className={`absolute inset-0 w-full h-full pt-6 pb-12 flex flex-col transition-colors duration-300 ${
          isDark ? "bg-[#0a0f1d] text-slate-100" : "bg-slate-50 text-slate-800"
        }`}
      >
        <AnimatePresence mode="wait">
          {simStep === "splash" ? (
            <SplashScreen key="splash" />
          ) : (
            <motion.div
              key="app-contents"
              className="flex-1 flex flex-col min-h-0 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* APP HEADER */}
              <AppHeader isDark={isDark} activeLang="EN" />

              {/* VIEW SWITCHER */}
              <div className="flex-1 overflow-y-auto relative min-h-0">
                {activeTab === "plan" && (
                  <PlanViewTab
                    simStep={simStep}
                    isDark={isDark}
                    statusBarTime={statusBarTime}
                  />
                )}
                {activeTab === "stations" && (
                  <StationsViewTab simStep={simStep} isDark={isDark} />
                )}
                {activeTab === "timings" && (
                  <TimingsViewTab isDark={isDark} />
                )}
                {activeTab === "explore" && (
                  <ExploreViewTab simStep={simStep} isDark={isDark} />
                )}
                {activeTab === "safety" && (
                  <SafetyViewTab isDark={isDark} />
                )}
              </div>

              {/* SIMULATED BOTTOM TAB BAR */}
              <AppBottomTabBar activeTab={activeTab} isDark={isDark} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* GLASS REFLECTION */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/0 via-white/3 to-white/8 z-30" />
      </div>

      {/* 4. HOME INDICATOR */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />

      {/* 5. VIRTUAL TOUCH POINTER OVERLAY */}
      <motion.div
        className="absolute w-5 h-5 rounded-full border-2 border-brand-pink bg-brand-pink/35 pointer-events-none z-50 flex items-center justify-center shadow-lg shadow-brand-pink/60"
        style={{ originX: 0.5, originY: 0.5 }}
        animate={{
          left: cursor.x,
          top: cursor.y,
          opacity: cursor.opacity,
          scale: cursor.clicked ? [1, 0.75, 1.25, 1] : 1,
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
      >
        {/* Pointer ring waves when "clicking" */}
        {cursor.clicked && (
          <motion.div
            className="absolute w-10 h-10 rounded-full border border-brand-pink/75 pointer-events-none"
            initial={{ scale: 0.4, opacity: 1 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ==========================================
   SUBCOMPONENTS
   ========================================== */

// 1. SPLASH SCREEN
function SplashScreen() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 z-50"
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute w-44 h-44 rounded-full bg-brand-pink/15 blur-[50px]"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative w-18 h-18 rounded-[22%] overflow-hidden shadow-xl shadow-brand-pink/30 border border-white/10"
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.35 }}
      >
        <Image
          src="/logo1.png"
          alt="Jaipur Ride"
          fill
          className="object-cover"
          sizes="72px"
        />
      </motion.div>
      <motion.p
        className="mt-3 font-extrabold text-white text-base tracking-tight"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Jaipur<span className="text-brand-pink">Ride</span>
      </motion.p>
      <motion.p
        className="text-white/40 text-[9px] font-medium tracking-wider uppercase mt-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        Pink City Metro Guide
      </motion.p>

      <div className="mt-8 w-24 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-brand-pink to-pink-city rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

// 2. HEADER
function AppHeader({
  isDark,
  activeLang,
}: {
  isDark: boolean;
  activeLang: "EN" | "HI";
}) {
  return (
    <div
      className={`px-4 pt-3.5 pb-2.5 flex items-center justify-between border-b transition-colors duration-300 ${
        isDark ? "bg-[#0d1324] border-white/5" : "bg-white border-slate-100"
      }`}
    >
      <div className="flex items-center space-x-2">
        <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/10">
          <Image
            src="/logo1.png"
            alt="Logo"
            fill
            className="object-cover"
            sizes="24px"
          />
        </div>
        <div>
          <h1
            className={`font-extrabold text-[12px] tracking-tight leading-none ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Jaipur<span className="text-brand-pink">Ride</span>
          </h1>
          <p
            className={`text-[7px] font-bold tracking-wider mt-0.5 uppercase ${
              isDark ? "text-white/40" : "text-slate-400"
            }`}
          >
            Metro Transit Guide
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-1.5">
        {/* Animated toggle indicator */}
        <div
          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer ${
            isDark ? "bg-white/5 text-amber-400" : "bg-slate-100 text-slate-600"
          }`}
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </div>
        <div
          className={`px-2 py-0.5 rounded-md text-[8px] font-bold border transition-colors duration-200 cursor-pointer uppercase ${
            isDark
              ? "bg-brand-pink/15 text-brand-pink border-brand-pink/20"
              : "bg-pink-50 text-brand-pink border-brand-pink/20"
          }`}
        >
          {activeLang}
        </div>
      </div>
    </div>
  );
}

// 3. BOTTOM TAB BAR
function AppBottomTabBar({
  activeTab,
  isDark,
}: {
  activeTab: string | null;
  isDark: boolean;
}) {
  const tabsConfig = [
    { id: "plan", icon: Compass, label: "Plan" },
    { id: "stations", icon: Train, label: "Stations" },
    { id: "timings", icon: Clock, label: "Timings" },
    { id: "explore", icon: Sparkles, label: "Explore" },
    { id: "safety", icon: Shield, label: "Safety" },
  ];

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 h-11 border-t px-2.5 flex items-center justify-between z-40 transition-colors duration-300 ${
        isDark ? "bg-[#0d1324] border-white/5" : "bg-white border-slate-100"
      }`}
    >
      {tabsConfig.map((t) => {
        const Icon = t.icon;
        const isActive = activeTab === t.id;
        return (
          <div
            key={t.id}
            className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-colors duration-200 ${
              isActive
                ? "text-brand-pink font-extrabold scale-105"
                : isDark
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[7.5px] font-medium mt-0.5">{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// 4. PLAN VIEW TAB (Includes plan inputs, results, and live simulation overlay)
function PlanViewTab({
  simStep,
  isDark,
  statusBarTime,
}: {
  simStep: SimStep;
  isDark: boolean;
  statusBarTime: string;
}) {
  // Plan route screen inputs
  const hasFrom = simStep !== "plan-idle" && simStep !== "plan-toggle-theme";
  const hasTo =
    hasFrom &&
    simStep !== "plan-select-from";

  const isShowingResults = simStep === "results";
  const isShowingLiveJourney = simStep.startsWith("live-journey-");

  return (
    <div className="absolute inset-0 p-3.5 flex flex-col min-h-0 bg-transparent">
      <AnimatePresence mode="wait">
        {/* Results Screen */}
        {isShowingResults && (
          <motion.div
            key="results-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col min-h-0 space-y-3"
          >
            <div className="flex items-center space-x-1.5">
              <ArrowLeft className="w-3.5 h-3.5 text-brand-pink" />
              <span className="text-[10px] font-bold text-brand-pink uppercase tracking-wider">
                Select Route
              </span>
            </div>

            {/* Fare and Route details card */}
            <div
              className={`p-3 rounded-2xl border transition-colors duration-300 ${
                isDark
                  ? "bg-slate-900/60 border-white/5"
                  : "bg-white border-slate-100 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-center text-[8.5px] font-semibold uppercase tracking-wider mb-2">
                <span className="text-emerald-500">Fastest Route</span>
                <span className={`${isDark ? "text-slate-400" : "text-slate-500"}`}>10 Stops</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold tracking-tight">25</span>
                <span className="text-[10px] font-bold text-slate-400">mins</span>
                <span className="text-slate-500/30 font-light">|</span>
                <span className="text-base font-extrabold text-brand-pink">₹30</span>
                <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-widest">
                  Smart Card: ₹27
                </span>
              </div>
            </div>

            {/* Scrolling stop list */}
            <div
              className={`flex-1 rounded-2xl border p-3 overflow-y-auto space-y-3 min-h-0 ${
                isDark ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-100"
              }`}
            >
              {[
                { name: "Mansarovar", type: "Elevated", active: true },
                { name: "Railway Station", type: "Elevated", active: true },
                { name: "Sindhi Camp", type: "Elevated", active: true },
                { name: "Chandpole", type: "Underground", active: true },
                { name: "Badi Chaupar", type: "Underground", active: true },
              ].map((stop, sIdx, arr) => (
                <div key={stop.name} className="flex items-start space-x-3">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-pink border-2 border-brand-pink shadow-sm" />
                    {sIdx < arr.length - 1 && (
                      <div className="w-[1.5px] h-6 bg-brand-pink/30 mt-1" />
                    )}
                  </div>
                  <div>
                    <p className="text-[9.5px] font-bold">{stop.name}</p>
                    <p className="text-[7.5px] text-slate-400 font-semibold">{stop.type}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-xl text-[10px] font-extrabold flex items-center justify-center space-x-1.5 shadow-md shadow-brand-pink/20 transition-all border-none">
              <Navigation className="w-3.5 h-3.5" />
              <span>Start Live Journey</span>
            </button>
          </motion.div>
        )}

        {/* Live Journey overlay view */}
        {isShowingLiveJourney && (
          <LiveJourneyOverlay
            simStep={simStep}
            isDark={isDark}
            statusBarTime={statusBarTime}
          />
        )}

        {/* Main Trip planner view (idle state) */}
        {!isShowingResults && !isShowingLiveJourney && (
          <motion.div
            key="plan-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Status indicators */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">
                  Metro Operational
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h2
                className={`text-base font-black tracking-tight leading-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Where to<br />go today?
              </h2>
              <p
                className={`text-[8.5px] font-bold ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Plan your Jaipur Metro journey
              </p>
            </div>

            {/* Picker card container */}
            <div
              className={`p-3.5 rounded-2xl border transition-colors duration-300 ${
                isDark
                  ? "bg-slate-900/60 border-white/5"
                  : "bg-white border-slate-100 shadow-sm shadow-slate-100"
              }`}
            >
              {/* Pick Source */}
              <div
                className={`flex items-center space-x-2.5 p-2 rounded-xl border transition-colors duration-200 ${
                  isDark
                    ? "bg-slate-950/60 border-white/5"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-[7.5px] text-slate-400 uppercase tracking-widest font-bold">
                    From Station
                  </p>
                  <p className="text-[9.5px] font-bold leading-tight mt-0.5">
                    {hasFrom ? "Mansarovar" : "Select Source"}
                  </p>
                </div>
              </div>

              {/* Swap indicator */}
              <div className="flex items-center justify-between px-3 -my-1 relative z-10">
                <div className={`w-px h-5 ${isDark ? "bg-white/10" : "bg-slate-100"}`} />
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-slate-400 hover:text-brand-pink transition-colors ${
                    isDark
                      ? "bg-[#0d1324] border-white/10"
                      : "bg-white border-slate-100 shadow-sm shadow-slate-200/50"
                  }`}
                >
                  <ArrowUpDown className="w-3 h-3" />
                </div>
                <div className="w-[1.5px]" />
              </div>

              {/* Pick Destination */}
              <div
                className={`flex items-center space-x-2.5 p-2 rounded-xl border transition-colors duration-200 ${
                  isDark
                    ? "bg-slate-950/60 border-white/5"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-brand-pink border border-brand-pink shrink-0" />
                <div className="flex-1">
                  <p className="text-[7.5px] text-slate-400 uppercase tracking-widest font-bold">
                    To Station
                  </p>
                  <p className="text-[9.5px] font-bold leading-tight mt-0.5">
                    {hasTo ? "Badi Chaupar" : "Select Destination"}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2.5 rounded-xl font-black text-[9.5px] tracking-wider uppercase border-none flex items-center justify-center space-x-1.5 transition-all mt-3 ${
                  hasTo
                    ? "bg-brand-pink hover:bg-brand-pink-dark text-white cursor-pointer shadow-md shadow-brand-pink/20 scale-[1.01]"
                    : "bg-slate-300 text-slate-500 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                <span>Plan Route</span>
              </button>
            </div>

            {/* Nearby station banner guide */}
            <div
              className={`p-2.5 rounded-xl border flex items-center space-x-3 transition-colors duration-300 ${
                isDark ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-100"
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
                <Navigation className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold">I am at...</p>
                <p className="text-[7.5px] text-slate-400 font-semibold truncate">
                  Find nearest station & navigate
                </p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 4A. LIVE JOURNEY SIMULATION OVERLAY
function LiveJourneyOverlay({
  simStep,
  isDark,
  statusBarTime,
}: {
  simStep: SimStep;
  isDark: boolean;
  statusBarTime: string;
}) {
  const getProgress = () => {
    switch (simStep) {
      case "live-journey-intro":
        return 0;
      case "live-journey-moving-1":
        return 20;
      case "live-journey-moving-2":
        return 55;
      case "live-journey-moving-3":
        return 75;
      case "live-journey-arrived":
      case "live-journey-finish":
        return 100;
      default:
        return 0;
    }
  };

  const getStationText = () => {
    switch (simStep) {
      case "live-journey-intro":
        return "Mansarovar Station";
      case "live-journey-moving-1":
        return "Departed Mansarovar";
      case "live-journey-moving-2":
        return "Railway Station Stop";
      case "live-journey-moving-3":
        return "Passing Sindhi Camp";
      case "live-journey-arrived":
      case "live-journey-finish":
        return "Arrived Badi Chaupar";
      default:
        return "";
    }
  };

  const showHapticAlert = simStep === "live-journey-moving-2";
  const showExplorePopup =
    simStep === "live-journey-arrived" || simStep === "live-journey-finish";

  return (
    <motion.div
      key="live-overlay"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="absolute inset-0 bg-[#070b14] z-30 flex flex-col min-h-0 text-white p-3.5"
    >
      {/* Live tracking state banner */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
          <span className="text-[8.5px] font-black text-brand-pink uppercase tracking-widest">
            LIVE JOURNEY
          </span>
        </div>
        <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-full font-bold">
          GPS Tracking
        </span>
      </div>

      <div className="space-y-0.5">
        <h3 className="text-xs font-black tracking-tight">Towards Badi Chaupar</h3>
        <p className="text-[9.5px] text-brand-pink font-bold">{getStationText()}</p>
      </div>

      {/* Progress bar line */}
      <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
        <motion.div
          className="h-full bg-brand-pink rounded-full"
          animate={{ width: `${getProgress()}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main scrolling path status */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-3.5 min-h-0 pr-1">
        {[
          { name: "Mansarovar", status: "Departed", passed: true },
          { name: "Railway Station", status: "Arrived", passed: getProgress() >= 55 },
          { name: "Sindhi Camp", status: "Next Stop", passed: getProgress() >= 75 },
          { name: "Badi Chaupar", status: "Terminal", passed: getProgress() >= 100 },
        ].map((stop, idx) => (
          <div
            key={stop.name}
            className={`flex items-center justify-between p-2 rounded-xl transition-all duration-300 ${
              stop.passed
                ? "bg-white/5 border border-white/10"
                : "opacity-35 bg-transparent border border-transparent"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-extrabold ${
                  stop.passed ? "bg-brand-pink text-white" : "bg-white/20 text-white/50"
                }`}
              >
                {stop.passed ? <Check className="w-2.5 h-2.5" /> : idx + 1}
              </div>
              <span className="text-[9px] font-bold">{stop.name}</span>
            </div>
            <span
              className={`text-[7.5px] font-bold uppercase tracking-widest ${
                stop.passed && idx === 3
                  ? "text-emerald-400"
                  : stop.passed
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              {stop.passed && idx === 3 ? "Arrived" : stop.status}
            </span>
          </div>
        ))}
      </div>

      {/* Haptic vibration alert push notification */}
      <AnimatePresence>
        {showHapticAlert && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className="absolute top-12 left-3 right-3 bg-slate-900/95 border border-brand-pink/35 shadow-lg shadow-brand-pink/20 rounded-xl p-2.5 flex items-center space-x-3 z-40"
          >
            <div className="w-7 h-7 bg-brand-pink/15 text-brand-pink rounded-lg flex items-center justify-center shrink-0">
              <Vibrate className="w-4 h-4 animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className="text-[7px] text-white/50 font-bold uppercase tracking-widest">
                  Arriving Alert
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
              </div>
              <p className="text-[9.5px] font-black text-white leading-tight">
                Railway Station
              </p>
              <p className="text-[7.5px] text-slate-400 font-semibold truncate">
                Interchange for Indian Railways
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explore destination recommendation popup */}
      <AnimatePresence>
        {showExplorePopup && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            className="absolute bottom-12 left-3.5 right-3.5 bg-slate-900 border border-white/10 shadow-2xl rounded-2xl p-3 z-40 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[7px] text-white/50 font-bold uppercase tracking-widest">
                Destination Arrived
              </span>
              <span className="flex items-center space-x-0.5 text-brand-pink text-[7.5px] font-bold uppercase">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Explore Near Station</span>
              </span>
            </div>

            <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-xl">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                <Image
                  src="/images/hawa_mahal.jpg"
                  alt="Hawa Mahal"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-extrabold text-white">Hawa Mahal Guide</p>
                <p className="text-[7.5px] text-slate-400 font-medium">
                  5 min walk • Pink Line Gateway
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brand-pink" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finish Journey Trigger Button */}
      <button className="w-full mt-3 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-[9px] font-bold flex items-center justify-center space-x-1 shadow-sm transition-all cursor-pointer">
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        <span>Finish Journey</span>
      </button>
    </motion.div>
  );
}

// 5. STATIONS VIEW TAB
function StationsViewTab({ simStep, isDark }: { simStep: SimStep; isDark: boolean }) {
  const isDetailsOpen =
    simStep === "stations-detail-open" || simStep === "stations-close-detail";

  return (
    <div className="absolute inset-0 p-3.5 flex flex-col min-h-0 bg-transparent">
      <div className="space-y-0.5 mb-3.5">
        <h2 className="text-xs font-black uppercase tracking-wider text-brand-pink">
          Stations
        </h2>
        <p className={`text-[8px] font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Pink Line - Tap for facilities and schedules
        </p>
      </div>

      {/* Scrollable list of stations */}
      <div className="flex-1 overflow-y-auto space-y-2.5 min-h-0 pr-0.5">
        {[
          { name: "Mansarovar", color: "border-brand-pink", under: false },
          { name: "Sindhi Camp", color: "border-brand-pink", under: false, active: true },
          { name: "Chandpole", color: "border-amber-500", under: true },
          { name: "Badi Chaupar", color: "border-amber-500", under: true },
        ].map((station) => (
          <div
            key={station.name}
            className={`p-3 rounded-2xl border flex items-center justify-between transition-all duration-200 cursor-pointer ${
              station.active && simStep === "stations-click-detail"
                ? "scale-[0.98] border-brand-pink/60 bg-brand-pink/5"
                : isDark
                ? "bg-slate-900/40 border-white/5 hover:bg-white/5"
                : "bg-white border-slate-100 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-2.5 h-2.5 rounded-full border-2 ${
                  station.under ? "border-amber-500 bg-amber-500" : "border-brand-pink bg-brand-pink"
                }`}
              />
              <div>
                <p className="text-[9.5px] font-bold">{station.name}</p>
                <p className="text-[7.5px] text-slate-400 font-semibold">
                  {station.under ? "Underground" : "Elevated"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        ))}
      </div>

      {/* Details slide-up sheet modal */}
      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            className={`absolute bottom-0 left-0 right-0 rounded-t-3xl border-t p-4 z-40 space-y-3.5 ${
              isDark
                ? "bg-slate-900 border-white/10 text-white"
                : "bg-white border-slate-200 text-slate-800 shadow-2xl"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-black">Sindhi Camp Station</h3>
                <p className="text-[7.5px] text-slate-400 font-bold uppercase tracking-widest">
                  Elevated Terminal
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  isDark ? "bg-white/5 text-white" : "bg-slate-100 text-slate-800"
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Facilities lists */}
            <div className="grid grid-cols-2 gap-2 text-[8px] font-bold">
              <div
                className={`p-2 rounded-xl ${
                  isDark ? "bg-white/5 text-white/95" : "bg-slate-50 text-slate-700"
                }`}
              >
                <span className="text-brand-pink text-[7px] block mb-0.5 uppercase tracking-wide">
                  Amenities
                </span>
                Parking, Lift, Escalators, Public Convenience
              </div>
              <div
                className={`p-2 rounded-xl ${
                  isDark ? "bg-white/5 text-white/95" : "bg-slate-50 text-slate-700"
                }`}
              >
                <span className="text-emerald-500 text-[7px] block mb-0.5 uppercase tracking-wide">
                  Transit
                </span>
                Central Bus Stand Interchange, Autos & Taxis
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 5B. TIMINGS VIEW TAB
function TimingsViewTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 p-3.5 flex flex-col min-h-0 bg-transparent space-y-3.5">
      <div className="space-y-0.5 shrink-0">
        <h2 className="text-xs font-black uppercase tracking-wider text-brand-pink">
          Timings
        </h2>
        <p className={`text-[8px] font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          First &amp; Last Metro schedules from active terminals
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-0.5 text-[8.5px]">
        {/* Terminals list */}
        {[
          { name: "Mansarovar Terminal", start: "06:20 AM", end: "09:20 PM", color: "bg-emerald-500/10 text-emerald-500" },
          { name: "Badi Chaupar Terminal", start: "06:20 AM", end: "09:21 PM", color: "bg-brand-pink/10 text-brand-pink" },
        ].map((t, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border ${
              isDark ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
            }`}
          >
            <h4 className="font-extrabold mb-2 flex items-center justify-between">
              <span>{t.name}</span>
              <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase ${t.color}`}>Active</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-400 font-semibold">
              <div>
                <p className="text-[7.5px] uppercase tracking-wider">First Train</p>
                <p className="text-[10px] font-black text-slate-800 dark:text-white mt-0.5">{t.start}</p>
              </div>
              <div>
                <p className="text-[7.5px] uppercase tracking-wider">Last Train</p>
                <p className="text-[10px] font-black text-slate-800 dark:text-white mt-0.5">{t.end}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Frequencies cards */}
        <div
          className={`p-3 rounded-2xl border ${
            isDark ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
          }`}
        >
          <h4 className="font-extrabold mb-1">Peak &amp; Off-Peak Frequencies</h4>
          <p className="text-slate-400 font-semibold mb-2 text-[8px]">Time intervals between consecutive trains</p>
          <div className="space-y-1.5 font-bold">
            <div className="flex justify-between">
              <span className="text-slate-400">Peak Hours (08:00 AM - 11:00 AM):</span>
              <span className="text-brand-pink">Every 10 mins</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Off-Peak Hours / Holidays:</span>
              <span className="text-slate-800 dark:text-white">Every 15 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. EXPLORE VIEW TAB
function ExploreViewTab({ simStep, isDark }: { simStep: SimStep; isDark: boolean }) {
  const isDetailOpen =
    simStep === "explore-detail-open" || simStep === "explore-back";

  return (
    <div className="absolute inset-0 flex flex-col min-h-0 bg-transparent">
      <AnimatePresence mode="wait">
        {/* Attraction Detail Screen */}
        {isDetailOpen ? (
          <motion.div
            key="explore-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col min-h-0 bg-transparent"
          >
            {/* Monument Cover image */}
            <div className="relative h-28 w-full bg-slate-900 shrink-0">
              <Image
                src="/images/hawa_mahal.jpg"
                alt="Hawa Mahal Details"
                fill
                className="object-cover"
                sizes="300px"
              />
              <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer z-10">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 text-white">
                <span className="px-2 py-0.5 bg-brand-pink/85 rounded-md text-[7px] font-black uppercase">
                  Historical Sight
                </span>
                <h3 className="text-xs font-black mt-1 leading-tight">Hawa Mahal</h3>
              </div>
            </div>

            {/* Description details */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-[8.5px] leading-relaxed">
              <div className="flex items-center justify-between border-b pb-2 border-slate-500/10">
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[7px]">Nearest Station</p>
                  <p className="font-extrabold text-brand-pink">Badi Chaupar (Pink Line)</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 font-bold uppercase text-[7px]">Entry Fee</p>
                  <p className="font-extrabold text-emerald-500">₹50 / ₹200</p>
                </div>
              </div>

              <div className="space-y-1 text-[8.5px]">
                <p className="font-bold text-slate-400 uppercase text-[7.5px]">Overview</p>
                <p className={isDark ? "text-slate-300" : "text-slate-600"}>
                  Hawa Mahal - the &quot;Palace of Winds&quot; - is a beautiful pink sandstone palace built in 1799
                  by Maharaja Sawai Pratap Singh, containing 953 small windows.
                </p>
              </div>

              <div
                className={`p-2.5 rounded-xl border flex items-center space-x-2 ${
                  isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100"
                }`}
              >
                <WifiOff className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-[7.5px] font-bold text-emerald-500 uppercase tracking-wide">
                  Works 100% Offline Guide
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Monuments list */
          <motion.div
            key="explore-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-3.5 flex flex-col min-h-0 space-y-3.5"
          >
            <div className="space-y-0.5 shrink-0">
              <h2 className="text-xs font-black uppercase tracking-wider text-brand-pink">
                Explore Jaipur
              </h2>
              <p className={`text-[8px] font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Top landmarks steps away from Pink Line stations
              </p>
            </div>

            {/* List cards */}
            <div className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-0.5">
              {[
                {
                  name: "Hawa Mahal",
                  img: "/images/hawa_mahal.jpg",
                  st: "Badi Chaupar",
                  dist: "5 min walk",
                  active: simStep === "explore-click-card",
                },
                {
                  name: "City Palace",
                  img: "/images/city_palace.jpg",
                  st: "Badi Chaupar",
                  dist: "8 min walk",
                },
                {
                  name: "Jantar Mantar",
                  img: "/images/jantar_mantar.jpg",
                  st: "Badi Chaupar",
                  dist: "6 min walk",
                },
              ].map((att) => (
                <div
                  key={att.name}
                  className={`rounded-2xl overflow-hidden border flex items-stretch transition-all duration-200 cursor-pointer ${
                    att.active
                      ? "scale-[0.98] border-brand-pink/60 bg-brand-pink/5"
                      : isDark
                      ? "bg-slate-900/40 border-white/5 hover:bg-white/5"
                      : "bg-white border-slate-100 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="relative w-18 h-14 bg-slate-800 shrink-0">
                    <Image
                      src={att.img}
                      alt={att.name}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </div>
                  <div className="p-2 flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="text-[9.5px] font-extrabold truncate">{att.name}</h3>
                    <p className="text-[7.5px] text-slate-400 font-semibold mt-0.5">
                      {att.st} • {att.dist}
                    </p>
                  </div>
                  <div className="flex items-center px-2">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 7. SAFETY VIEW TAB
function SafetyViewTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 p-3.5 flex flex-col min-h-0 space-y-3.5">
      <div className="space-y-0.5 shrink-0">
        <h2 className="text-xs font-black uppercase tracking-wider text-brand-pink">
          Safety Hub
        </h2>
        <p className={`text-[8px] font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Emergency helpline dials & information JMRC
        </p>
      </div>

      {/* Helpline Contact numbers list */}
      <div className="flex-1 overflow-y-auto space-y-2.5 min-h-0 pr-0.5">
        {[
          { name: "Emergency Call", num: "112", subtitle: "All Emergencies", icon: ShieldAlert },
          { name: "Women Helpline", num: "1090", subtitle: "Safety Support", icon: Bell },
          { name: "JMRC Control Room", num: "0141-2747045", subtitle: "Metro Station Help", icon: Train },
          { name: "Metro Police Station", num: "0141-2747045", subtitle: "Jaipur Transit Police", icon: Shield },
        ].map((contact, idx) => {
          const Icon = contact.icon;
          return (
            <div
              key={idx}
              className={`p-2.5 rounded-2xl border flex items-center justify-between ${
                isDark ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-brand-pink/10 text-brand-pink flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[9px] font-extrabold truncate">{contact.name}</h4>
                  <p className="text-[7.5px] text-slate-400 font-medium truncate">
                    {contact.subtitle} • {contact.num}
                  </p>
                </div>
              </div>
              <button className="w-7 h-7 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-500 rounded-lg flex items-center justify-center shrink-0 cursor-pointer">
                <Phone className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
