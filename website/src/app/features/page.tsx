"use client";

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

export default function FeaturesPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const specFeatures = [
    {
      icon: <Train className="w-8 h-8 text-brand-pink" />,
      title: isEn ? "Smart Route Finder" : "स्मार्ट रूट फाइंडर",
      desc: isEn ? "Computes the absolute shortest path between any two station nodes on the line, outputting travel durations, ticket fares, intermediate stops checklist, and platform guidance." : "लाइन पर किन्हीं दो स्टेशन नोड्स के बीच सबसे छोटे रास्ते की गणना करता है, यात्रा की अवधि, टिकट का किराया, बीच के स्टॉप की सूची और प्लेटफॉर्म मार्गदर्शन दिखाता है।"
    },
    {
      icon: <Map className="w-8 h-8 text-brand-pink" />,
      title: isEn ? "Interactive SVG Map" : "इंटरएक्टिव SVG मानचित्र",
      desc: isEn ? "Beautiful custom line diagram vector layout showing elevated vs underground station tags. Zoomable and hoverable for direct facility summaries." : "एलीवेटेड और भूमिगत स्टेशन टैग दिखाने वाला सुंदर कस्टम लाइन आरेख लेआउट। सुविधाओं के विवरण के लिए ज़ूम करने योग्य।"
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-pink" />,
      title: isEn ? "Metro Timetable Guide" : "मेट्रो समय सारिणी",
      desc: isEn ? "Never miss the first or last train. Accurate listing of standard timings, peak-hour and off-peak frequencies, and platform details." : "पहली या आखिरी ट्रेन कभी न चूकें। मानक समय, पीक-आवर आवृत्तियों और प्लेटफॉर्म विवरण की सटीक सूची।"
    },
    {
      icon: <Compass className="w-8 h-8 text-brand-pink" />,
      title: isEn ? "Tourist Attraction Guide" : "पर्यटक आकर्षण मार्गदर्शिका",
      desc: isEn ? "Curated list of Jaipur's UNESCO heritage sites, traditional markets, and forts mapped directly to their closest metro stations with walking distances." : "जयपुर के यूनेस्को विरासत स्थलों, पारंपरिक बाजारों और किलों की सूची, सीधे उनके निकटतम मेट्रो स्टेशनों और पैदल दूरी के साथ मैप की गई।"
    },
    {
      icon: <WifiOff className="w-8 h-8 text-brand-pink" />,
      title: isEn ? "100% Offline Support (App)" : "100% ऑफ़लाइन सपोर्ट (ऐप)",
      desc: isEn ? "No internet inside underground stations? No problem. The Android application functions completely offline without any network connections." : "भूमिगत स्टेशनों के अंदर इंटरनेट नहीं? कोई बात नहीं। एंड्रॉइड एप्लिकेशन बिना किसी नेटवर्क कनेक्शन के पूरी तरह से ऑफ़लाइन काम करता है।"
    },
    {
      icon: <Bell className="w-8 h-8 text-brand-pink" />,
      title: isEn ? "Live GPS Alerts (App)" : "लाइव GPS अलर्ट (ऐप)",
      desc: isEn ? "Launches location trackers while riding. Vibrates and triggers notifications automatically as your destination station is approaching." : "सवारी करते समय स्थान ट्रैकर लॉन्च करता है। जैसे ही आपका गंतव्य स्टेशन आता है, स्वचालित रूप से वाइब्रेट होता है और सूचनाएं ट्रिगर करता है।"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4 mb-6">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
          {isEn ? "Jaipur Ride Features & Specs" : "जयपुर राइड की विशेषताएं और विवरण"}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/70">
          {isEn ? "Everything you need to navigate the Pink City transit smoothly, in your browser or on your phone." : "पिंक सिटी में आसानी से यात्रा करने के लिए आपकी हर जरूरत, आपके ब्राउज़र या फोन पर।"}
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
            {isEn ? "Feature Comparison Matrix" : "सुविधा तुलना मैट्रिक्स"}
          </h2>
          <p className="text-xs sm:text-sm text-foreground/60">
            {isEn ? "Compare our quick web simulation with our primary Android application product." : "हमारे त्वरित वेब सिमुलेशन की हमारे प्राथमिक एंड्रॉइड एप्लिकेशन उत्पाद से तुलना करें।"}
          </p>
        </div>

        <div className="overflow-x-auto bg-white dark:bg-navy-dark rounded-3xl border border-light-border dark:border-navy-border/40 shadow-xl">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-light-border dark:border-navy-border/40 bg-light-accent/30 dark:bg-navy-card/40 text-foreground font-heading">
                <th className="p-5 font-bold">{isEn ? "Feature" : "सुविधा"}</th>
                <th className="p-5 font-bold text-center">{isEn ? "Web Simulation (Next.js)" : "वेब सिमुलेशन (Next.js)"}</th>
                <th className="p-5 font-bold text-center text-brand-pink">{isEn ? "Android Application (Capacitor)" : "एंड्रॉइड एप्लिकेशन (Capacitor)"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border/60 dark:divide-navy-border/20">
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">{isEn ? "Route Planning & Fares" : "रूट प्लानिंग और किराया"}</td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">{isEn ? "Interactive Stations Directory" : "इंटरएक्टिव स्टेशन निर्देशिका"}</td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">{isEn ? "Tourist sightseeing Maps Links" : "पर्यटक स्थलों के नक्शे के लिंक"}</td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10 text-slate-400">
                <td className="p-5 font-semibold text-foreground">{isEn ? "Offline support (No Internet)" : "ऑफ़लाइन सपोर्ट (इंटरनेट नहीं)"}</td>
                <td className="p-5 text-center">
                  <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">{isEn ? "Live GPS Tracking & Dwell Tracking" : "लाइव GPS ट्रैकिंग"}</td>
                <td className="p-5 text-center">
                  <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">{isEn ? "Automatic Station Proximity Vibration Alerts" : "स्वचालित स्टेशन निकटता कंपन अलर्ट"}</td>
                <td className="p-5 text-center">
                  <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="p-5 text-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-light-accent/10 dark:hover:bg-navy-card/10">
                <td className="p-5 font-semibold text-foreground">{isEn ? "Hardware back-buttons integration" : "हार्डवेयर बैक-बटन एकीकरण"}</td>
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
            <span>{isEn ? "Download Offline Android App" : "ऑफ़लाइन एंड्रॉइड ऐप डाउनलोड करें"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
